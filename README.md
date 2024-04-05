# Notes App

The "Notes App" project is a web application for creating, viewing, and managing notes.

## Installation

1. Clone the repository to your local machine:

```bash
git clone vue3-jest-auth0-notes
```

2. Navigate to the project directory:

```bash
cd vue3-jest-auth0-notes
```

3. Install dependencies:

```bash
npm install
```

## Local Development Setup with Environment Variables

To run the application locally, you need to set up environment variables by creating a `.env` file in the root directory of the project. Here are the required environment variables:

- `VITE_API_SERVER_URL`: The URL of the API server. Example: `http://localhost:6060`
- `VITE_AUTH0_DOMAIN`: The Auth0 domain for your application.
- `VITE_AUTH0_CLIENT_ID`: The client ID generated for your Auth0 application.
- `VITE_AUTH0_CALLBACK_URL`: The callback URL for Auth0 authentication. Example: `http://localhost:5173/login`

Before running the application, make sure to create an Auth0 application on the Auth0 dashboard and obtain the client ID and domain. Then, add these values to your `.env` file.


## Usage

### Running the Application

To run the application, execute the following command:

```bash
npm run dev
```

The application will then be available at [http://localhost:5173](http://localhost:5173).

### Running Tests

To run the tests, execute the command:

```bash
npm run test
```

## Project Structure
- `src/` - directory containing the application source code
  - `assets/` - directory for storing assets such as images, icons, etc.
  - `interfaces/` - directory for defining TypeScript interfaces
  - `constants/` - directory for storing constant values used in the application
  - `store/` - Pinia files for managing the application state
  - `templates/` - Vue.js templates for rendering pages and components
    - `views/` - directory for views templates
    - `layouts/` - directory for layout templates
    - `components/` - directory for reusable components
  - `tests/` - directory containing tests for application components and functionality
- `public/` - directory for storing static resources such as HTML files, images, etc.

## Contributions

If you would like to contribute to the "Notes App" project, you can open a new pull request. We welcome any suggestions and improvements!

