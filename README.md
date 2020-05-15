# Hooked (MERN application)

A MERN application that fetches the latest nature and animal videos from multiple subreddits and displays them in a mobile first view with the abillity to login and save your favourites/build collections.
Videos are automatically fetched and pushed into the database via node on a daily bases.
This site was a project to further learn the MERN stack, databases and API's. It is not for profit.

## Why

I built this to further learn more advanced features of modern web development and to gain a better understanding of server/database concepts and structures for a modern web application.

This includes:

- Automatic daily fetching and displaying of specific data from the reddit API under multiple different subreddits and writing them to their relevant mongoDB database (excluding duplicates). Written using node.
- User authentication and password security using JWT tokens and storing the relevant user information inside local memory
- Create, delete or update users and user information
- Ability for users to save or delete videos in their personal collections
- Password reset or update with secure email sent to the user
- Full frontend and UI using React, Redux, React-router, React-Spring, React-Awesome-Slider

## Getting Started

Place your mongoDB url and JWT secret inside config/default.json
Place your email on line 127 of routes/api/auth (this is for user email reset/update)

## Run

# Run front and backend

npm run dev

# Backend only

npm run server

# Frontend only

npm run client

### Prerequisites

npm install on main project folder and inside client folder

## Built With

- React
- Redux
- Node
- Express
- MongoDB

## Author

- **Apollo Freeman** - (https://github.com/369geofreeman)
