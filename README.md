# Smart Support Inbox

### About This Project:
This project is a small full-stack **_support inbox_** app. It lets a user create support tickets, browse them in a list (with category/priority filters), open a ticket to see the full details, and submit feedback on whether the suggested reply was helpful (accept/reject).
The backend is a Django REST API that stores tickets in SQLite and generates an analysis for every new ticket (category, priority, summary, and a suggested reply) using simple keywords. The frontend is a React app that connects to the backend API and implements the three pages required by the challenge: ticket list, ticket details + feedback, and ticket creation.

#### Backend (Django + DRF) inside Smart Support Inbox:
*    \`POST /api/tickets/\` – create a ticket 
*   \`GET /api/tickets/?category=&priority=\` – list tickets + filter
*    \`GET /api/tickets/<id>/\` – retrieve a single ticket
*    \`POST /api/tickets/<id>/feedback/\` – accept/reject the suggestion (\`{"accepted": true/false}\`)
*   \`GET /api/analytics/\` – basic analytics (acceptance rate per category)
####   

#### Frontend (React) inside Smart Support Frontend:
*   Tickets list with filters (category + priority)
*   Create ticket page with validation
*   Ticket detail page with suggested reply + accept/reject

#### Admin
*    Django admin enabled with Ticket model registered for easy inspection/editing.

### 1.Setup instructions
#### Requirements:
\- Python 3.9+
\- Node.js + npm

#### Backend setup:


cd smart-support-inbox
python3 -m venv .venv
source .venv/bin/activate
./.venv/bin/python3 -m pip install -r requirements.txt
python3 manage.py migrate


#### Frontend setup:


cd ../smart-support-frontend
npm install


### 2.Running The Server:

#### Run Backend:


cd smart-support-inbox

source .venv/bin/activate
python3 manage.py runserver


#### Run Frontend:


cd smart-support-frontend
npm start


Make sure `package.json` in the frontend includes:


"proxy": "http://127.0.0.1:8000"


#### Admin:
Creating admin


cd smart-support-inbox
source .venv/bin/activate
python3 manage.py createsuperuser


### 3.Running Tests
All Backend tests run with this command:


cd smart-support-inbox
source .venv/bin/activate
python3 -m pytest


The tests includes:
*   Unit tests for analysis output validation and model behavior
*   Integration test covering: create → list → retrieve → submit feedback

### 4.Key Design Decisions & Trade-Offs
*   The ticket analysis uses a keyword approach (category + priority) instead of an LLM. It’s fast, predictable, and easy to test. The trade-off is that it won’t be as flexible as a real LLM.
*   Category/priority/summary/suggested reply are computed on the backend when a ticket is created.
*   The main endpoints are implemented as a DRF ViewSet with a custom feedback action.
*   Chose SQLite here because it’s quick to run locally and makes the project easy to set up. In practice, Postgres for production would be better since it handles constraints, and growth much better.

### 5.Known limitations / assumptions:
*   The UI is kept minimal and focused on the required flows.
*   The logic is simple and keyword-based, easy to understand, and easy to test.
*   Analytics only consider tickets that actually have feedback tickets with `feedback_accepted = null` are treated as _not rated yet_ and are excluded from the acceptance-rate calculation.
*   No authentication/authorization is implemented
