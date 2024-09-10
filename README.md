# IW-C Landing Page

## Overview

The IW-C Landing Page project is a high-performance, responsive web application built to replace an existing WordPress-based site. This project leverages modern web technologies to deliver a fast, scalable, and maintainable landing page, significantly improving user experience and operational efficiency.

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org/) - A React framework for server-side rendering and static site generation.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
  - [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
  
- **Backend**:
  - [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 engine.
  - [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework.
 
- **Email Handling**:
  - [React Email](https://react.email/) - A library for building email templates using React.

## Key Features

- **Optimized Performance**: Achieves fast load times and smooth user interactions through server-side rendering (SSR) and static site generation (SSG) with Next.js.
- **Responsive Design**: Fully responsive design ensures that the site looks great and functions well on any device, from desktops to smartphones.
- **Scalability**: Built with scalability in mind, allowing for easy expansion and feature addition as the client’s needs grow.
- **SEO Optimization**: Utilizes Next.js's built-in SEO features to improve search engine rankings, driving more organic traffic.
- **Custom Email Integration**: Includes custom email handling for user interactions, such as contact forms and newsletters, powered by Resend and React Email.
- **Secure and Reliable**: Ensures data security and application reliability using MongoDB and Prisma for robust backend management.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/OctavioWebDev/IW-C.git
   cd IW-C
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add the necessary environment variables:

   ```env
   NEXT_PUBLIC_API_URL=your-api-url
   DATABASE_URL=your-database-url
   RESEND_API_KEY=your-resend-api-key
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries or feedback, please contact the project maintainer:

- **Name**: Octavio Sanchez
- **Email**: [tavowebdev419@gmail.com.com](mailto:tavowebdev419@gmail.com)
