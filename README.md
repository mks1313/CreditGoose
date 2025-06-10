# CreditGoose Backend

Project Structure

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

## Build everything locally

1. Backend:

```bash
npm install
npm start
```

2. Frontend:
```bash
npm run build
REACT_APP_API_URL='http://localhost:8080' npm start
```
... and keep an eye on backend running.
