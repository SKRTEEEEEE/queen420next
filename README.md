# NextJS MongoDB app

A fully functional big app with various features and Web3 integration.

# Table of Contents

1. [Objective](#objective)
   - [Games](#games)
   - [Contests](#contests)
   - [Ecommerce](#ecommerce)
   - [Blog](#blog)
   - [Dashboard](#dashboard)
   - [Other Functions](#other-functions)
2. [Information](#information)
   - [Getting Started](#getting-started)
   - [Learn More](#learn-more)
   - [Deploy on Vercel](#deploy-on-vercel)
3. [Process](#process)
   - [1.01 DASHBOARD UI&Link](#101-dashboard)

## Objective

The objective of this project is to create a fully functional app with the following features:

### Games

- Implement Web3 features like NFT objects and avatars.

### Contests

- Implement Web3 features like NFT, Tokens, and Products.

### Ecommerce

- Implement Web3 integration for payments, and support regular payments too.
- In V2, allow users to create their own stores and sell products.

### Blog

- Create a fully functional blog where users can publish articles.
- Enable interactions like liking, sharing, and commenting on posts.
- In V2, users with a store can also post articles.

### Dashboard

- Develop a fully functional dashboard for user management, product management, transaction tracking, and settings.
- Provide analytics capabilities.
- In V2, allow users with a store to have their own dashboard.

### Other Functions

- Include various interactive elements to give users a futuristic experience.

## Information

### Getting starting

First, run the development server:

```bash
npm run dev
```

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Process

### 1.01 DASHBOARD

#### .01 Dashboard UI&Link

Created the basic structure of the README.md, the fully Ui with Css modules and all the structure of the Dashboard following the tutorial of [Lama Dev](https://www.youtube.com/watch?v=cBg6xA5C60s&t=5669s) starting with this [Github](https://github.com/safak/nextadmin)

#### .02 MongoDb Connection

Connected the MongoDb database and fetch the users.

- Mongoose for connect with MongoDB

```bash
npm i mongoose
```

#### .03 Dashboard Backend

Use querry for filter by name and numb of items in a page.
Create user and products; add new, delete and update funtionality. Use Bcrypt for encrypt the password.

- Bcrypt for crypt the password

```bash
npm i bcrypt
```

Create authconfig for make the logic that will do the autenticate, in auth archive we put all the actions like signin or signout, and all the info that we should save in the cookies, and we created the middleware in the root folder.
Create a handleLogin logic that show the errors if user makes some error when he is trying to signin.
\*-This part is not working. When a user login it text Wrong credentials but it makes good the autorize. It gives a error abot NEXT_redirect and it doesnt goes automaticly to /dashboard but when u try to refresh or enter again in /login cant.

-Next-auth for autenticate

```bash
npm i next-auth
```
