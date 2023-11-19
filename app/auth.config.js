// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   providers: [],
//   pages: {
//     signIn: '/login', //<--- Pagina a la que seremos redirigidos si no hay auth
//   },
//   callbacks: {
//     authorized({ auth, request }) {
//       const isLoggedIn = auth?.user;
//       const isOnPage = request.nextUrl.pathname.startsWith('/main');
//       if (isOnPage) {
//         if (isLoggedIn) return true;
//         return false;
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/main', request.nextUrl));
//       }
//       return true;
//     },
//   },
// };

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/main');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/main', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
};
