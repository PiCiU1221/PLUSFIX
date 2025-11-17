# Frontend Setup (React + TS + MUI)

This guide details how to set up and run the React frontend locally. The project is built using **Vite**, **TypeScript**, and the **MUI** component library.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**
- **NPM**

---

## Installation Steps

Follow these steps to get the project running.

### 1. Install Dependencies
Navigate to the main frontend directory and install the required node modules.

~~~bash
npm install
~~~

### 2. Configure Environment
The frontend needs to know where the backend API is running. This is managed through an environment file.

1.  Create a new file named `.env` in the root of the frontend directory.
2.  Add the following variable, pointing to your Laravel backend's URL (which runs on port 8000 by default):

~~~ini
# This must start with VITE_ to be exposed by Vite
VITE_API_URL=http://127.0.0.1:8000/api
~~~

The application code (using `import.meta.env.VITE_API_URL`) will now automatically use this URL to make API requests.

---

## Running the Development Server

To start the local development server, run the following command:

~~~bash
npm run dev
~~~

The application will be accessible at `http://localhost:5173`. Vite will automatically show you the correct port if `5173` is already in use.
