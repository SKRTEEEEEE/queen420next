export const authConfig = {
  pages: {
    signIn: '/login',
  },
  //PROBLEMA AQUI?
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('isLoggedIn:', !!auth?.user);
      const isLoggedIn = !!auth?.user;
      const isOn = nextUrl.pathname.startsWith('/');
      const isOnMain = nextUrl.pathname.startsWith('/main'); //<- /main to /

      /*nextUrl esta vacio
      El error NEXT_REDIRECT indica que se está intentando realizar una redirección en el servidor, lo cual puede ser problemático ya que ciertas operaciones de redirección no están permitidas en Server Components en Next.js.

      En este caso, la información que proporcionas sugiere que hay un intento de redireccionar a /login desde el servidor. La parte relevante del mensaje de error es:

      rust
      Copy code
      digest: 'NEXT_REDIRECT;replace;http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Flogin;false',
      Este tipo de redirección debería manejarse en el lado del cliente para evitar problemas en Server Components.

      */
      console.log('nextUrl:', nextUrl, 'isOnMain:', isOnMain, 'isOn:', isOn);
      if (isOnMain) {
        if (isLoggedIn) return true; //<--(/main  logeado)
        return false; //<-- (/main  no logeado) Redirect unauthenticated users to login page
      }
      if (isLoggedIn && isOn) {
        return true;
      }
    },
  },
  providers: [],
};
