

<h1 align="center">Triviamania</h1>

<div align="center">
  <h3>
    <a href="https://triviamania-gamcode.netlify.app">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/gamcode98/triviamania">
      Solution
    </a>        
  </h3>
</div>

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview

![home](/public/design/home.png)

In this screenshot you can see the **home** page

![session modal](/public/design/session-modal.gif)

Here you can see the **login**, **signup** and **reset password** on home page where you can enter in the app.

![playform](/public/design/playform.gif)

Here you can set the options like **categories**, **difficulty** and **limit** of questions what you want, also you can see the fields are validated.

![playground](/public/design/playground.gif)

Once you set your **configurations** about the game, you can **play**. And if your select a **difficulty** like **hard**, you can see a **countdown** on the top. After send the answers, you can see a **review**.

![score](/public/design/score.gif)

Here you can see your historial game.

![settings](/public/design/settings.gif)

Here you can change your **password** or **delete your account**.

### Built With

- [React](https://reactjs.org/)
- [React router dom](https://reactrouter.com/en/main)
- [NES.css](https://nostalgic-css.github.io/NES.css/#)
- [React Hook Form](https://react-hook-form.com/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [Yup](https://github.com/jquense/yup)

## Features

- You can play answering the questions.
- You can change your password.
- You can recover your password sending an email.
- You can delete your account.
- You can login with google.
- You can see your historial about the game.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone git@github.com:gamcode98/triviamania.git
# Install dependencies
$ npm install
# Run the app
$ npm run dev
```

You will need to clone too the [backend repository](https://github.com/gamcode98/triviamania-backend)

Also need the [trivia api](https://the-trivia-api.com)

**Note**: Replace your *VITE_BACKEND_URL="your_backend_url"* in your **.env** file, the *trivia api* is included in the file **.env.example**

## Acknowledgements

- [trivia api](https://the-trivia-api.com), to let me use their api.

## Contact

- Website [portfolio-gamcode.netlify.app/](https://portfolio-gamcode.netlify.app/)
- GitHub [@gamcode98](https://github.com/gamcode98)