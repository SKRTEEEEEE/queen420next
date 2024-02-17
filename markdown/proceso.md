# Process

## Commits
Orden: *anitguo -> nuevo*
### 1.01 Start 11/2023

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
_-*This part is not working. When a user login it text Wrong credentials but it makes good the autorize. It gives a error abot NEXT_redirect and it doesnt goes automaticly to /dashboard but when u try to refresh or enter again in /login cant*._

- Next-auth for autenticate

```bash
npm i next-auth
```

#### .04 Start of Blog

Started creating the basic structure for the blog. Established a connection to the articles in the database. Integrated Tailwind CSS into the project, transitioning from regular CSS to Tailwind. _Note that the main view of the dashboard is yet to be migrated to Tailwind._

#### .05 Blog UI&Link

Create the structure of the basic blog. Maked elements responsive with tailwind.
Protected routes for dashboard.

- ReactQuill for style Articles

```bash
npm i react-quill
```

_*Till this point im going to try to fix the error of authorize, doing it again*_
DEBUGGED!
_*The error will disaper when in signIn function inside autenticate you put redirect: false*_

#### .06 Blog Back-p1

Starting to make database models relational using objectId.
Maked that admin can change passwords.
Created the article and comment post (basic). Both related and with a separate collection. Rendered the comments of each article on its page.

#### .07 Blog Back-p2

Maked that user can give like to article and to comments of the article. Show and refresh new data. Saving it relational and not using hooks or client actions. Same for reposts.
Added to author page the articles that he has reposted and show to another people.


## Tareas a Realizar 

**HAY QUE HACER LAS COSAS MOBILE RESP.!!**

### Future versions

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

### Without version

OTHER

- Hay que ir haciendo el diagrama de la estructura de la web

### Route

- .05
    - [ ] End blog basic functionality 
    - [ ] autenticate & ?authorize
- .10
    - [ ] Blog mid fn(limit inputs, sec?, likes, repost_inwritter, isStore_writter) 
    - [ ] ecommerc basic fn
- .15



