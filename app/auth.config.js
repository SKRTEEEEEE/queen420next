export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('isLoggedIn:', !!auth?.user);
      const isLoggedIn = !!auth?.user;
      const isOn = nextUrl.pathname.startsWith('/');
      const isOnMain = nextUrl.pathname.startsWith('/main'); //<- /main to /

      console.log('nextUrl:', nextUrl, 'isOnMain:', isOnMain, 'isOn:', isOn);
      if (isOn) {
        if (isOnMain) {
          if (isLoggedIn) return true; //<--(/main  logeado)
          return false; //<-- (/main  no logeado) Redirect unauthenticated users to login page
        }
        return true;
      }
    },
  },
  providers: [],
};
