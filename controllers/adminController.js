exports.getPrompts = (req, res) => {
  console.log('getPrompts')
  res.json({
    web_searches: [
      {
        text: 'Find PepsiCo company financial report',
        active: true,
      }
    ],
    goose_prompts: [
      {
        text: 'Retrieve last year Gross and Net profit margins. Return as JSON with "gross" and "net" fields.',
        active: true,
      }
    ],
  });
};

const https = require('https');
const { exec } = require('child_process');

exports.setPrompts = (req, res) => {
  console.log(`Received: ${req.body.web_searches}, ${req.body.goose_prompts}`);

  console.log('Doing Web Search...');
  web_search = req.body.web_search;

  // Actual Web Search
  const webSearchQuery = "Find product description for GitLab Ultimate";
  const geminiApiKey = process.env.GEMINI_API_KEY; // Assuming you have the API key in environment variables
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
  const geminiData = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: webSearchQuery
          }
        ]
      }
    ]
  });

  const webSearchPromise = new Promise((resolve, reject) => {
    const geminiReq = https.request(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (geminiRes) => {
      let geminiResponseData = '';

      geminiRes.on('data', (chunk) => {
        geminiResponseData += chunk;
      });

      geminiRes.on('end', () => {
        try {
          const parsedGeminiResponse = JSON.parse(geminiResponseData);
          resolve(parsedGeminiResponse);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });

    geminiReq.write(geminiData);
    geminiReq.end();
  });

  // Actual Goose CLI call
  goose_prompt = req.body.goose_prompt;
  const gooseCliCommand = `goose run -t "${goose_prompt}"`; // Assuming 'goose' is in the system's PATH

  const goosePromise = new Promise((resolve, reject) => {
    exec(gooseCliCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        try {
            const parsedGooseResponse = JSON.parse(stdout);
            resolve(parsedGooseResponse);
        } catch (parseError) {
            resolve(stdout);
        }
      }
    });
  });


  Promise.all([webSearchPromise, goosePromise])
    .then(([webSearchResult, goosePromptResult]) => {
        console.debug("Web Search Result:", webSearchResult);
      res.json({
        web_search_result: webSearchResult || null,
        goose_prompt_result: goosePromptResult || null,
      });
    })
    .catch(errors => {
      console.error("One or more promises rejected:", errors);
      res.status(500).json({ error: "An error occurred during web search or Goose execution." });
    });
};

function extractGooseResponse(gooseOutput) {
  if (!gooseOutput || typeof gooseOutput !== 'string') {
    return null;
  }

  // Split by lines and find the actual response
  const lines = gooseOutput.split('\n');

  // Look for the line that contains the actual response (after ANSI color codes)
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // Remove ANSI color codes (like [38;2;222;222;222m and [0m)
    // Remove ANSI escape sequences and ESC characters
    let cleanLine = line
      .replace(/\x1b\[[0-9;]*m/g, '') // Remove ANSI color codes (ESC[...m)
      .replace(/\x1b/g, '') // Remove standalone ESC characters
      .replace(/\u001b\[[0-9;]*m/g, '') // Alternative ANSI format
      .replace(/\u001b/g, '') // Alternative ESC format
      .trim();

    // Skip system messages (lines containing session info, logging, working directory)
    if (cleanLine.includes('starting session') ||
        cleanLine.includes('logging to') ||
        cleanLine.includes('working directory') ||
        cleanLine.includes('provider:') ||
        cleanLine.includes('model:')) {
      continue;
    }

    // Return the first non-system message we find
    if (cleanLine) {
      return cleanLine;
    }
  }

  return null;
}

// Updated runGoose function with extraction
exports.runGoose = (req, res) => {
  console.log(`Received: ${req.body.web_searches}, ${req.body.goose_prompts}`);

  console.log('Doing Web Search...');
  web_search = req.body.web_search;

  // Filter active prompts and extract their text
  const activePrompts = req.body.goose_prompts
    .filter(prompt => prompt.active)
    .map(prompt => prompt.text);

  // Join multiple active prompts with a separator, or use the first one
  goose_prompt = activePrompts.length > 0 ? activePrompts.join(' ') : '';

  // Handle case where no active prompts exist
  if (!goose_prompt) {
    return res.status(400).json({ error: "No active prompts found" });
  }

  const gooseCliCommand = `goose run -t "${goose_prompt}"`; // Assuming 'goose' is in the system's PATH

  const goosePromise = new Promise((resolve, reject) => {
    exec(gooseCliCommand, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        try {
            const parsedGooseResponse = JSON.parse(stdout);
            resolve(parsedGooseResponse);
        } catch (parseError) {
            resolve(stdout);
        }
      }
    });
  });

  Promise.all([goosePromise])
    .then(([goosePromptResult]) => {
        console.debug("Goose result:", goosePromptResult);

        // Extract the actual response from Goose output
        const extractedResponse = extractGooseResponse(goosePromptResult);

      res.json({
        goose: extractedResponse || null,
      });
    })
    .catch(errors => {
      console.error("The promise rejected:", errors);
      res.status(500).json({ error: "An error occurred during Goose execution." });
    });
};