
# ReviewMateAI - Backend (Node.js + Express)

## Setup

1. Install Node.js (v16+ recommended).
2. From the `/backend` folder run:

```bash
npm install

3. Start server:



npm run dev
# or
npm start

4. Open Swagger UI: http://localhost:4000/api-docs



Endpoints (examples)

Register: POST /api/auth/register body { name, email, password }

Login: POST /api/auth/login body { email, password } -> returns token

Upload contract: POST /api/contracts (Authorization: Bearer <token>) body { title, text }

List contracts: GET /api/contracts (Authorization header required)

Get contract: GET /api/contracts/:id

Delete contract: DELETE /api/contracts/:id

Review contract: POST /api/contracts/:id/review -> returns simulated AnalysisResult


Notes

This implementation uses an in-memory store. When the server restarts all data is lost.

simulateContractReview is a deterministic, local function that mimics AI output.


Testing

You can use Swagger UI to test endpoints interactively, or use curl/Postman.


Example curl flow

1. Register



curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret"}'

2. Login



curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'

3. Upload contract (use token from login response)



curl -X POST http://localhost:4000/api/contracts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Cool contract","text":"This contract describes..."}'

---

_End of document._
