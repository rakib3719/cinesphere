# Cinesphere

This project is built using Next.js and includes features like SSR, ISR, CSR, mock memory storage, and various libraries for form validation and API response validation. It’s designed to offer a smooth and professional UI with efficient data handling.

## Getting Started

Follow the steps below to set up and run this project on your local machine.

### Installation

1. **Clone the repository:**

   Open your terminal and execute the following command:

   ```bash 
   git clone https://github.com/rakib3719/cinesphere.git
   cd <project-directory>
   npm install
   npm run dev



## 
   2.**Open the app in your browser:**

Once the server is running, open http://localhost:3000 to view the application.

## Technologies Used

### Next.js
This project is built with [Next.js](https://nextjs.org/), leveraging:
- **SSR (Server-Side Rendering)**: For optimal page load performance and SEO benefits, especially for pages that require up-to-date data on each request.
- **ISR (Incremental Static Regeneration)**: Allows pages to be statically generated at build time and updated incrementally, ensuring both performance and freshness of data.
- **CSR (Client-Side Rendering)**: Employed for dynamic user interactions and components that need real-time data updates, such as the watchlist feature.

### Mock Memory Storage
For testing and development purposes, this project uses **Mock Memory Storage** as a simulated database. This allows testing without the need for actual persistent storage, streamlining development and ensuring functionality before connecting a full database.

### Zod
[Zod](https://zod.dev/) is used for **API response validation**. It ensures that incoming data is accurate, secure, and follows expected formats. This validation process prevents data discrepancies and enhances API robustness.

### React Hook Form
The project incorporates [React Hook Form](https://react-hook-form.com/) for managing form inputs, ensuring efficient handling of form states and validation. This is particularly useful in search and other form components, where responsive and user-friendly validation is essential.


## Live Demo
Check out the live version of this project at: [https://cinesphere-movie.vercel.app/](#)

## Additional Notes
- **Node.js and npm** are required to run this project locally. Ensure you have the latest stable versions of both installed.
- To start the project, clone the repository, navigate to the project directory, and install dependencies with `npm install`. Then, you can launch the development server with `npm run dev`.
