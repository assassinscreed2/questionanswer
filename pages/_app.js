import Header from 'components/shared/header'
import {UserProvider} from '@auth0/nextjs-auth0'
import React,{useState} from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';

function MyApp({ Component, pageProps }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [role,setRole] = useState("guest") 

  return <>
  <ThemeProvider theme={theme}>
  <UserProvider>
  <Header />
  <Component {...pageProps} role/>
  </UserProvider>
  </ThemeProvider>
  </>
}

export default MyApp