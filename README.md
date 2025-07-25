# Y – React Frontend

This repository contains the frontend for **Y**, a full-stack social media application. Built with React and styled using Tailwind CSS and DaisyUI, this frontend connects to a Spring Boot backend to support a complete user experience, including authentication, post interactions, following, and notifications.

**Backend Repository:** [Y-Spring-Boot](https://github.com/eemass/Y-Spring-Boot)  
**Live Demo:** [https://y-frontend.onrender.com](https://y-frontend.onrender.com)

## Features

- User signup, login, and logout
- Profile viewing and editing
- Post creation with image uploads
- Like and comment functionality
- Follow/unfollow users
- Notifications for likes, comments, and follows
- Protected routes using React Router
- Responsive layout built with Tailwind CSS and DaisyUI
- Global server state management via React Query
- Toast notifications with `react-hot-toast`

## Technologies Used

- React 18
- Vite
- React Router DOM v7
- React Query (TanStack)
- Tailwind CSS 4
- DaisyUI
- React Hot Toast
- React Icons

## Getting Started

### Prerequisites

- Node.js v16 or higher
- A running instance of the [Spring Boot backend](https://github.com/eemass/Y-Spring-Boot)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/eemass/Y-Frontend.git
cd Y-Frontend
npm install
```

### Environment Configuration

Create a `.env` file in the root directory and add the following:

```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

Make sure this matches the base URL of your backend server and supports credentials.

### Running the Application

To start the development server:

```bash
npm run dev
```

The app will run at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
```

## Folder Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom hooks for fetching and logic
├── pages/          # Page components (routes)
├── utils/          # Helper functions and constants
├── App.jsx         # Route layout and app entry point
├── main.jsx        # React root rendering
├── index.css       # Global styles (Tailwind)
```

## Deployment

This frontend is deployed on Render and connects to the deployed backend. To deploy manually:

1. Build the app:

   ```bash
   npm run build
   ```

2. Serve the `dist/` folder using a static host or integrate into the backend server.

## License

This project is licensed under the MIT License.

## Author

**Samiul Islam**  
[Portfolio](https://islamsamiul.netlify.app) | [GitHub](https://github.com/eemass) | [LinkedIn](https://www.linkedin.com/in/eemass)
