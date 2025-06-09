# CreditGoose Backend

Project Structure

.
├── controllers
│ ├── authController.js
│ ├── fundController.js
│ ├── healthController.js
│ ├── invoiceController.js
│ ├── reportController.js
│ └── simulateController.js
├── routes
│ ├── authRoutes.js
│ ├── fundRoutes.js
│ ├── index.js
│ ├── invoiceRoutes.js
│ └── reportRoutes.js
├── services
│ └── simulateService.js
├── index.js
├── server.js
├── package.json
└── README.md


## API Routes

| Method | Route                   | Description                              |
|--------|-------------------------|------------------------------------------|
| POST   | `/auth/connect`          | Simulate connection to Square API (mock)|
| POST   | `/fund/request`          | Request funding for invoices            |
| POST   | `/invoices/connect-square` | Simulate connection to Square API     |
| GET    | `/invoices/invoices`     | Get list of invoices                    |
| POST   | `/invoices/fund`         | Request funding (mock)                  |
| POST   | `/invoices/auto-funding` | Enable auto-funding                     |
| GET    | `/invoices/report`       | Get monthly report data                 |
| GET    | `/report/monthly`        | Alternative monthly report endpoint     |
| GET    | `/simulate`              | Simulate monthly payments with interest |
| GET    | `/health`                | Backend health check                    |
