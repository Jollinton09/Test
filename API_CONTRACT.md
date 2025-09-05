*****API_CONTRACT.md*****

This document defines the contract between the frontend and backend of Review Mate AI.
It includes features, endpoints, request/response formats, and error structures.
This is the single source of truth for all API communication.


---

**Data Models**
---

User
```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string"
}
```

AuthToken
```json
{
  "token": "string (JWT)"
}
```
Contract
```json
{
  "id": "string (UUID)",
  "ownerId": "string (UUID - user id)",
  "title": "string",
  "text": "string",
  "uploadedAt": "ISO8601 timestamp"
}
```
AnalysisResult
```json
{
  "contractId": "string (UUID)",
  "reviewedAt": "ISO8601 timestamp",
  "summary": "string",
  "issues": [
    { "code": "string", "message": "string" }
  ],
  "riskScore": "number (0-100)"
}
```
Error
```json
{
  "error": "string"
}
```

---

**Endpoints**
---

1. Register User

Feature: User Registration

Method: POST

Path: /api/auth/register

Description: Registers a new user.


Request Body:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret123"
}
```
Success Response (201):
```json
{
  "user": {
    "id": "uuid",
    "name": "Alice",
    "email": "alice@example.com"
  },
  "token": "jwt-token-string"
}
```
Error Responses:

400 Bad Request: { "error": "name, email and password are required" }

409 Conflict: { "error": "Email already registered" }


---

2. Login User

Feature: User Login

Method: POST

Path: /api/auth/login

Description: Authenticates user and returns token.


Request Body:
```json
{
  "email": "alice@example.com",
  "password": "secret123"
}
```
Success Response (200):
```json
{
  "user": {
    "id": "uuid",
    "name": "Alice",
    "email": "alice@example.com"
  },
  "token": "jwt-token-string"
}
```
Error Responses:

400 Bad Request: { "error": "email and password required" }

401 Unauthorized: { "error": "Invalid credentials" }



---

3. Upload Contract

Feature: Upload Contract

Method: POST

Path: /api/contracts

Description: Uploads a new contract (authenticated).


Headers:
Authorization: Bearer <jwt-token>
Request Body:
```json
{
  "title": "Service Agreement",
  "text": "This contract states the terms and conditions..."
}
```
Success Response (201):
```json
{
  "id": "uuid",
  "ownerId": "uuid",
  "title": "Service Agreement",
  "text": "This contract states the terms and conditions...",
  "uploadedAt": "2025-09-05T10:00:00Z"
}
```
Error Response:

400 Bad Request: { "error": "title and text required" }



---

4. List Contracts

Feature: Get All Contracts

Method: GET

Path: /api/contracts

Description: Returns all contracts owned by the authenticated user.


Headers:
Authorization: Bearer <jwt-token>

Success Response (200):
```json
[
  {
    "id": "uuid",
    "ownerId": "uuid",
    "title": "Service Agreement",
    "text": "This contract states the terms and conditions...",
    "uploadedAt": "2025-09-05T10:00:00Z"
  }
]

```
---

5. Get Contract by ID

Feature: View Contract

Method: GET

Path: /api/contracts/{id}

Description: Returns contract details if owned by authenticated user.


Headers:
Authorization: Bearer <jwt-token>

Success Response (200):
```json
{
  "id": "uuid",
  "ownerId": "uuid",
  "title": "Service Agreement",
  "text": "This contract states the terms and conditions...",
  "uploadedAt": "2025-09-05T10:00:00Z"
}
```
Error Response:

404 Not Found: { "error": "Contract not found" }



---

6. Delete Contract

Feature: Delete Contract

Method: DELETE

Path: /api/contracts/{id}

Description: Deletes contract if owned by authenticated user.


Headers:
Authorization: Bearer <jwt-token>

Success Response (200):
```json
{
  "ok": true,
  "removed": {
    "id": "uuid",
    "title": "Service Agreement"
  }
}
```
Error Response:

404 Not Found: { "error": "Contract not found" }



---

7. Review Contract with AI

Feature: AI Review

Method: POST

Path: /api/contracts/{id}/review

Description: Runs AI review simulation for a contract.


Headers:
Authorization: Bearer <jwt-token>

Success Response (200):
```json
{
  "contractId": "uuid",
  "reviewedAt": "2025-09-05T10:00:00Z",
  "summary": "Simulated review: 2 flagged issue(s). Word count: 120.",
  "issues": [
    { "code": "LIABILITY_NOTICE", "message": "Liability clause found — check limits" },
    { "code": "TERMINATION", "message": "Termination clause present — review notice period" }
  ],
  "riskScore": 68
}
```
Error Response:

404 Not Found: { "error": "Contract not found" }



---
