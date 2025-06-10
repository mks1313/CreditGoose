FROM node:18-bullseye

# Add tool which will fix init process
# RUN apk add dumb-init curl bash

# Install goose CLI
# Install dependencies
RUN apt-get update && apt-get install -y dumb-init  curl bash bzip2 libxcb1

# Download and extract Goose CLI manually (replace version as needed)
ENV GOOSE_VERSION=v1.0.24
RUN curl -L -o goose.tar.bz2 \
      "https://github.com/block/goose/releases/download/v1.0.24/goose-aarch64-unknown-linux-gnu.tar.bz2" \
    && tar -xjf goose.tar.bz2 \
    && mv goose /usr/local/bin/goose \
    && chmod +x /usr/local/bin/goose \
    && rm goose.tar.bz2

# Create Goose config directory
RUN mkdir -p /root/.config/goose

# Copy pre-generated Goose config file (see below for example content)
COPY ./goose/config.yaml /root/.config/goose/config.yaml

ENV GOOSE_PROVIDER=google
ENV GOOSE_MODEL=gemini-2.0-flash

# (Optional) Add a non-root user
RUN useradd -ms /bin/bash goose

# Optimise for production
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy app files
COPY --chown=node:node . /usr/src/app

# Install only production dependencies
RUN npm ci --only=production

# friends don’t let friends run containers as root!
USER node

# Make port 8080 accessible outside of container
EXPOSE 8080
CMD ["dumb-init", "node", "server.js" ]
