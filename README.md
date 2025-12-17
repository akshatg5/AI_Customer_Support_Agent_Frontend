# Frontend - Customer Support Agent

A React + TypeScript frontend application for the AI Customer Support Agent.

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see [Backend README](https://github.com/akshatg5/AI_Customer_Support_Agent_Backend) for setup)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Backend URL Configuration:**
   The backend API URL is already configured in `src/config/api.ts`:
   ```
   https://ai-customer-support-agent-backend.vercel.app
   ```
   
   For local development, you can update this to `http://localhost:3000` if running the backend locally.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - The frontend will be available at `http://localhost:5173` (Vite default port)
   - Open your browser and navigate to the URL shown in the terminal

## Testing the Frontend

Once the frontend is running:

- **Sign Up**: Create a new account
- **Login**: Sign in with your credentials
- **Chat**: Test the AI customer support chat functionality
- **Navigation**: Use the UI to interact with all backend endpoints

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
