# Re-Shop (Inventory Management System)

## Introduction

This project is a [Next.js](https://nextjs.org/) application that provides an inventory management system. It allows users to add items to the inventory and manage them effectively. The application is built with a focus on performance, scalability, and usability.

## Technologies Used

- [Next.js](https://nextjs.org/) for the frontend framework.
- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework.
- [Formik](https://formik.org/) for form management.
- [React Query](https://react-query.tanstack.com/) for data fetching, caching, and state management.
- [Zod](https://github.com/colinhacks/zod) for schema validation.
- [Axios](https://axios-http.com/) for promise-based HTTP client.

## How to Launch the Project

1. Clone the repository to your local machine.
2. Install the dependencies by running `yarn`.
3. Create a `.env` file in the root directory and add the api URL as follows:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```
   Replace the `NEXT_PUBLIC_API_URL` with the URL of the API server.
4. Start the development server by running `yarn dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the file.

For production, you can create a build by running `yarn build` and then start the server with `yarn start`.
