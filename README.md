# blog-api-be

This backend serves two frontend applications:

- **Author Frontend:** <https://github.com/YousifEltayeb/blog-api-fe-author>
- **Visitor Frontend:** <https://github.com/YousifEltayeb/blog-api-fe-visitor>

This is a backend API for a blog application.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/blog-api-be.git
    ```

2. Navigate to the project directory:

    ```bash
    cd blog-api-be
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

To start the development server:

```bash
npm start
```

## Project Structure

```
.
├───.env.example
├───.gitignore
├───LICENSE
├───package-lock.json
├───package.json
├───README.md
├───prisma/
└───src/
    ├───app.js
    ├───config/
    ├───controllers/
    ├───generated/
    └───routes/
```

## API Endpoints

### Authentication

- `POST /auth/login`: User login

### Posts

- `GET /posts`: Get all posts
- `POST /posts`: Create a new post
- `GET /posts/:postId`: Get a single post by ID
- `PUT /posts/:postId`: Update a post by ID
- `DELETE /posts/:postId`: Delete a post by ID

### Comments

- `GET /comments`: Get all comments
- `POST /comments/:postId`: Create a new comment for a post
- `DELETE /comments/:commentId`: Delete a comment by ID

## Environment Variables

Create a `.env` file in the root directory based on `.env.example` and fill in the necessary environment variables.

```
# Example .env content
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
PORT=3000
```
