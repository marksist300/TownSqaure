# TownSquare

A Social media App to connect with friends

<h2>
    <a href="https://townsquareapp.netlify.app">View Demo*</a>
  </h2>
  *<sub>Note: The backend server is running on a free tier, which means after 20 minutes of inactivity it spins down. So, please be patient, starting from cold the server can take around 20 seconds to start up and respond.</sub>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Installation](#gear-installation)
  - [Run Locally](#running-run-locally)

<!-- About the Project -->

## :star2: About the Project

<div align="center"> 
<img width="894" alt="Screenshot From TownSquare project" src="">
</div>

### What is TownSquare

TownSquare is a full-stack social media CRUD application. It was built to focus on some key elements of developing social networking apps and APIS, as well as providing a good opportunity to deepen my understanding of developing accessible components such as modals and other such UI features.
<br/>
<br/>
It is built using NodeJS on the back-end with MongoDB for the database. The front-end is all built in React with Redux toolkit being used for the state management and RTK Query being using to handle all API requests to the backend. JWT are being used to handle all user authentication on login & signnup.

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
    <li><a href="https://redux-toolkit.js.org/">Redux Toolkit & RTK Query</a></li>
    <li><a href="https://reactrouter.com/en/main">React Router</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org/en">Node JS</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- Create User account
- Set up your account (add your information, your photos and personality)
- Create posts and share them with your followers
- Search for other users (Follow friends, see and like their posts)

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project was built using Yarn, but you can user either Yarn or NPM to install the server and client side node packages.

<!-- Installation -->

### :gear: Installation

Install `./client` and `./server` with yarn

<!-- Run Locally -->

#### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/marksist300/TownSquare.git
```

Go to the client directory

```bash
  cd client
  yarn install
  yarn  dev
```

Go to the server directory

```bash
  cd server
  yarn install
  yarn dev
```
