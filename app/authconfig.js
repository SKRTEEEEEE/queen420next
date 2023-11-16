export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login', //<--- Pagina a la que seremos redirigidos si no hay auth
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }
      return true;
    },
  },
};
// export const authConfig = {
//   providers: [],
//   pages: {
//     signIn: '/login', //<--- Página a la que seremos redirigidos si no hay auth
//   },
//   callbacks: {
//     authorized({ auth, request }) {
//       const isLoggedIn = auth?.user;
//       console.log('Is logged in:', isLoggedIn);

//       // Verifica si request.nextUrl está presente y tiene la propiedad pathname
//       const isOnDashboard =
//         request.nextUrl?.pathname?.startsWith('/dashboard') || false;

//       if (isOnDashboard) {
//         if (isLoggedIn) {
//           return true; // Permite el acceso al dashboard si ya está en él y el usuario está autenticado.
//         } else {
//           // Manejar el caso en que no hay un usuario autenticado y está en la página del dashboard
//           return Response.redirect(new URL('/login', request.nextUrl || '/'));
//         }
//       } else if (isLoggedIn) {
//         // Manejar el caso en que hay un usuario autenticado y no está en la página del dashboard
//         return Response.redirect(new URL('/dashboard', request.nextUrl || '/'));
//       }

//       return true; // Permitir el acceso por defecto si ninguna condición se cumple.
//     },
//   },
// };
