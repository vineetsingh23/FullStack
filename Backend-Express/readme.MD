# Full Stack web development.

## Key Architectural Concepts & Explanation

1. Backend: Express.js API & Database Layer
RESTful API Design: Express handles HTTP requests (GET, POST, PUT, DELETE) routed to specific endpoint URLs (e.g., /api/notes).

Database Connection (MongoDB Atlas + Mongoose): Uses Mongoose Object Data Modeling (ODM) to interact with MongoDB. The database URI is safely stored in .env and loaded via dotenv.

ES Module Support ("type": "module"): Modern JavaScript import/export syntax is used consistently across backend modules instead of CommonJS require().

Custom Controller Pattern: Decouples endpoint definitions from business logic by delegating handler logic to controller functions.

2. Frontend: React Client & Client-Side Navigation
Single Page Application (SPA): React loads a single HTML shell and dynamically updates visual components without requiring full page reloads.

Client-Side vs Server-Side Routing:

React Routing (react-router-dom): Manages visual page transitions within the browser interface (e.g., navigating from / to /dashboard).

Express API Routing: Operates behind the scenes, processing HTTP requests sent by React components (via fetch or axios) to send/receive raw JSON data.

State Management & Data Flow: Component states manage asynchronous API responses, keeping UI views synchronized with database records.