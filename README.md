# Issue Tracker Frontend

A modern, responsive issue tracking system frontend built with React, Vite, Redux Toolkit, TypeScript, and Tailwind CSS.

## Features

- User authentication and role-based access (admin/user)
- Dashboard with real-time issue statistics
- Create, edit, delete, and filter issues
- User management (admin)
- Export issues to CSV
- Responsive and accessible UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- Tailwind CSS (already configured in this project)

### Installation

1.  Clone the repository:
    ```sh
    git clone <your-repo-url>
    cd issue-tracker-frontend
    ```
2.  Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```
    Tailwind CSS is already set up and will work out of the box.
3.  Configure environment variables:
    - Copy `.env.example` to `.env` and set your API endpoints:
      ```env
      VITE_API_AUTH_URL=<your-auth-api-url>
      VITE_API_ISSUES_URL=<your-issues-api-url>
      ```
4.  Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```
    The app will be available at http://localhost:5173

### Build for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Folder Structure

- `src/` — Main source code
  - `components/` — Reusable UI components
  - `pages/` — Page-level components
  - `redux/` — Redux Toolkit slices and store
  - `services/` — API service functions
  - `assets/` — Static assets
  - `index.css`, `App.css` — Includes Tailwind CSS imports and custom styles
- `public/` — Static files

## Environment Variables

- `VITE_API_AUTH_URL` — Backend authentication API endpoint
- `VITE_API_ISSUES_URL` — Backend issues API endpoint
"# issue-tracker-frontend" 
