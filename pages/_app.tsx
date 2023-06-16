import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import '@/styles/colors.css'
import TopNavbar from '@/components/TopNavbar'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import LeftMenu from '@/components/LeftMenu'
import LoginPage from './login';
import router from 'next/router'
import { checkAuth } from './api/checkAuth'

export default function App({ Component, pageProps }: AppProps) {
  const [loginStatus, setLoginStatus] = useState(false);

  const handleLoginStatus = (isLoggedIn: boolean) => {
    setLoginStatus(isLoggedIn);
  };
  
  useEffect(() => {
    // vreau din 7 in 7 secunde sa verifice daca userul e conectat sau nu
    // deoarece functia interval pe care am scris-o mai jos face asta in secundele 7, 14, 21 etc (nu si la inceput),  o sa mai scriu o functie
    // initialState care va mai apela la inceput (on page load)
    const initialState = async() => {
      const isAuthenticated = await checkAuth()
      handleLoginStatus(isAuthenticated);
    }
    initialState();
    const interval = setInterval(async () => {
      const isAuthenticated = await checkAuth()
      handleLoginStatus(isAuthenticated);
    }, 7000)
    return () => {
      clearInterval(interval);
    }
  })

  return (
    
    <div style={{ margin: 0 }}>
      <TopNavbar handleLoginStatus={handleLoginStatus} isLoggedIn = {loginStatus}/>
      {!loginStatus ? null : (
        <div style = {{ display: "block" }}>
          <LeftMenu />
        </div>
      )}
      {loginStatus && (
        <div style = {{marginLeft: "15%"}}>
          <Component handleLoginStatus={handleLoginStatus} {...pageProps} />
        </div>
      )}
      {!loginStatus && (
        <div style = {{marginLeft: "0"}}>
          <Component handleLoginStatus={handleLoginStatus} {...pageProps} />
        </div>
      )}
    </div>
    
  );
}