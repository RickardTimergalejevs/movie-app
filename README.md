# Exam assignment

This project is an exam assignment, and its goal was to create a full-fledged website for booking tickets for new movies. The project includes the following complete features: viewing current and upcoming movies in theaters, creating movie sessions, booking tickets for movie sessions, user authentication, a profile with orders, payment using the Stripe payment system, and so on.

# Recommendations and development

For full use of this project, it is recommended to use the latest versions of Google Chrome, as the site was developed specifically for it. Minor bugs may occur when using other browsers.

## Frontend Development

This project used the frontend bundler Vite version "^5.0.8" as the foundation, React as the main framework version "^18.2.0," and TypeScript for typing version "^5.2.2."
As well as the following main development packages:

- RTK Query
- Stripe-js (react)
- Formik
- Redux
- React-router-dom
- Yup

Backend Development
For the server-side of the project, Node.js with the Express framework version "^4.18.2" was used to run the server. TypeScript was also used for typing, version "^5.3.3."
MongoDB was used as the database, and MongoDB Compass version 1.38.0 was used for development.
As well as the following main development packages:

- Bcrypt
- Cors
- Express
- JWT
- Mongoose
- Stripe

To view all other packages and their versions, see the package.json file in the client and server folders!

# Preparatory Steps for Installing and Running the Project Locally

- Download and install MongoDB Compass. (https://www.mongodb.com/products/tools/compass)
- Register on the STRIPE API to obtain public and secret keys. (https://stripe.com/)
- Register on TMDB API to get a token. (https://www.themoviedb.org/)
- Clone this repository.

## Follow these steps to run the project

### Backend

1. Go to the server folder - cd server
2. npm install (To install all packages)
3. Go to the .env file and fill in the
   DB_HOST(Host url from MongoDB Compass) at your discretion
   STRIPE_SECRET_KEY(You can get it from https://stripe.com/ after registration)
   (Don't change PORT number!)
4. npm start (To start a server)

### Frontend

1. Go to the client folder - cd client
2. npm install (To install all packages)
3. Go to the .env file and fill in the
   VITE_TMBD_TOKEN(You can get it from https://www.themoviedb.org/ after registration)
   VITE_STRIPE_PUBLIC_KEY(You can get it from https://stripe.com/ after registration)
4. npm run dev (To start client localhost)
