**NextJS MongoDB app**

A fully functional big app with various features and Web3 integration.

**Table of Contents**

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
   - [1.01 Start](#101-start)
4. [ToDo](#works)
   - [Remember](#remember)
   - [Future versions](#future-versions)
   - [Whitout version](#whitout-version)
   - [Route](#route)

# Objective

The objective of this project is to create the web of our social organization focused in grow technologies helping to grow the future. For that we will offer more effective sales and advertising channels using 3.0 technologies, thus helping to achieve energy efficiency and doubly returning our help to the planet, since all our profits are invested in projects focused on saving resources.
A fully functional app with the following features:

## Ecommerce

- **Implement Web3 integration for payments, and support regular payments too.**
  1.01.20 Will have a fully functionaly template for a ecommerce with dashboard, MongoDb, CRUD, autenticate, authorize admin to dashboard, stripe payment, ?blockchain payment...
- **In V2, allow users to create their own stores and sell products.**

## Blog

- **Create a fully functional blog where users can publish articles.**
- **Enable interactions like liking, sharing, and commenting on posts.**
  1.01.10 Will have a fully functionaly template for a blog with MongoDb, CRUD, autenticate, authorize admin, ?dashbord....
- **In V2, users with a store can also post articles.**

## Dashboard

- **Develop a fully functional dashboard for user management, product management, transaction tracking, and settings.**
- **Provide analytics capabilities.**
- **In V2, allow users with a store to have their own dashboard.**

## Other Functions

- **Include various interactive elements to give users a futuristic experience.**

## Games

- **In V2?, Implement Web3 features like NFT objects and avatars.**

## Contests

- **In V2?, Implement Web3 features like NFT, Tokens, and Products.**

# Information

## Development tools

- [Email project owner](adanreh.m@gmail.com) - email's owner
- [Architecture diagram](https://app.eraser.io) - web architecture diagram
- [Database atlas](https://cloud.mongodb.com) - online database control

## Getting starting

First, run the development server:

```bash
npm run dev
```

## Learn More

To learn more about how i did this project, have a look of this:

- ### About React.js
- [React-icons github](https://react-icons.github.io/react-icons/) - basic icons from React.
- ### [Next.js Documentation](https://nextjs.org/docs) About Next.js.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- ### [Tailwind css Documentation](https://tailwindcss.com/docs/) About Tailwind Css.
- [Floatui Tailwind ui ](https://floatui.com/) - free modern tailwind ui.
- [Flowbite Tailwind ui](https://flowbite.com/) - fast tailwind ui with Figma integration.

- [Slick carousel library ](https://kenwheeler.github.io/slick/) - jQuery based carousel library.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Process

## 1.01 Start 11/2023

### .01 Dashboard UI&Link

Created the basic structure of the README.md, the fully Ui with Css modules and all the structure of the Dashboard following the tutorial of [Lama Dev](https://www.youtube.com/watch?v=cBg6xA5C60s&t=5669s) starting with this [Github](https://github.com/safak/nextadmin)

### .02 MongoDb Connection

Connected the MongoDb database and fetch the users.

- Mongoose for connect with MongoDB

```bash
npm i mongoose
```

### .03 Dashboard Backend

Use querry for filter by name and numb of items in a page.
Create user and products; add new, delete and update funtionality. Use Bcrypt for encrypt the password.

- Bcrypt for crypt the password

```bash
npm i bcrypt
```

Create authconfig for make the logic that will do the autenticate, in auth archive we put all the actions like signin or signout, and all the info that we should save in the cookies, and we created the middleware in the root folder.
Create a handleLogin logic that show the errors if user makes some error when he is trying to signin.
_-*This part is not working. When a user login it text Wrong credentials but it makes good the autorize. It gives a error abot NEXT_redirect and it doesnt goes automaticly to /dashboard but when u try to refresh or enter again in /login cant*._

- Next-auth for autenticate

```bash
npm i next-auth
```

### .04 Start of Blog

Started creating the basic structure for the blog. Established a connection to the articles in the database. Integrated Tailwind CSS into the project, transitioning from regular CSS to Tailwind. _Note that the main view of the dashboard is yet to be migrated to Tailwind._

### .05 Blog UI&Link

Create the structure of the basic blog. Maked elements responsive with tailwind.
Protected routes for dashboard.

- ReactQuill for style Articles

```bash
npm i react-quill
```

_*Till this point im going to try to fix the error of authorize, doing it again*_
DEBUGGED!
_*The error will disaper when in signIn function inside autenticate you put redirect: false*_

### .06 Blog Back-p1

Starting to make database models relational using objectId.
Maked that admin can change passwords.
Created the article and comment post (basic). Both related and with a separate collection. Rendered the comments of each article on its page.

### .07 Blog Back-p2

Maked that user can give like to article and to comments of the article. Show and refresh new data. Saving it relational and not using hooks or client actions. Same for reposts.
Added to author page the articles that he has reposted and show to another people.

# **WORKS**

## Remember

**HAY QUE HACER LAS COSAS MOBILE RESP.!!**

## Future versions

BLOG BACK-P3

- Hay que permitir al usuario colgar una foto, un gif y un sonido si lo desea.
- Limitar is.Store hacer articles y tener articles page"ruta" (?Backend, rutas, links...?)

- ?Utilizarlo en el frontend?

AUTH BASICS

- Permitir al usuario logearse con usuario o telefono
- Permitir al usuario recuperar su contraseña si la ha olvidado(?a traves tel, a traves mail?)
- Limitar e obligar a introducir ciertos parametros en el usuario y la contraseña

BLOG UI&LINK-P2

- Hay que hacer la fun de vista de los coments funcional
- Hay que pasar el dashboard a mobile responsive
- Terminar de pasar los elementos de css a tailwind y eliminar todo el css

## Without version

OTHER

- Hay que ir haciendo el diagrama de la estructura de la web

## Route

.05
| End blog basic functionality + autenticate & ?authorize
.10
| Blog mid fn(limit inputs, sec?, likes, repost_inwritter, isStore_writter) + ecommerc basic fn
.15
