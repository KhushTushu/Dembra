# Dembra Pharmacy ERP

Professional, scalable, and AI-powered Pharmacy Management System.

## Features
- **Dashboard**: Real-time sales overview, revenue tracking, and stock alerts.
- **AI Forecast**: Demand prediction powered by Google Gemini 3.0.
- **POS Billing**: Fast checkout system with cart management and tax calculation.
- **Inventory**: Complete catalog management with batch tracking and low-stock alerts.
- **Supplier Management**: Track vendor balances and contact information.
- **Security**: Role-Based Access Control (RBAC) and Firebase Authentication.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Recharts, Framer Motion.
- **Backend**: Node.js, Express.
- **Database**: Google Cloud Firestore.
- **AI**: Gemini API (@google/genai).

## Installation & Setup
1. **Initialize Firebase**: Run the `set_up_firebase` tool to provision the database.
2. **Environment Variables**:
   - `GEMINI_API_KEY`: Required for AI insights.
3. **Usage**:
   - Login with any Google account.
   - Use the Sidebar to navigate between POS, Inventory, and Dashboard.

## Deployment
This application is designed for Cloud Run deployment. The Express server handles both API requests and static file serving.
- Build command: `npm run build`
- Start command: `node server.ts` (handled by `npm start` in production).

## Sample Data
The system initializes with mock data in `Inventory.tsx`, `POS.tsx`, and `Dashboard.tsx` for immediate evaluation. These can be replaced with live Firestore data fetching using the provided `Medicine` and `Sale` types.
