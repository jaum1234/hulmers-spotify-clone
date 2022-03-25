import { Box, ChakraProvider, Container, Text } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import { PlayBackContext } from '../src/contexts/PlayBackContext';
import Navbar from '../src/components/Navbar';
import '../styles/reset.css';
import '../styles/globals.css';
import { Fade, Slide } from 'react-awesome-reveal';
import { CookiesProvider, useCookies } from 'react-cookie';
import {  useEffect, useState } from 'react';
import SongPlayer from '../src/components/shared/SongPlayer';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import { useRefreshToken } from '../src/hooks/useAuth';

NProgress.configure({
  showSpinner: false,
})

function MyApp({ Component, pageProps }: AppProps) {

  const [playingTrack, setPlayingTrack] = useState<string | string[]>();
  const router = useRouter();

  useRefreshToken();

  const chooseTrack = (track: string[] | string) => {
    if (track === [] || track === '') {
      return;
    }

    //setCookies('last_song_played', Array.isArray(track) ? track : [track]);
    setPlayingTrack(Array.isArray(track) ? track : [track]);
  }

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", () => NProgress.start());
      router.events.off("routeChangeComplete", () => NProgress.done());
    }
  }, [router.events])

  return (
    <>
      <CookiesProvider>
          <ChakraProvider>
            <PlayBackContext.Provider value={ {chooseTrack} }>
              <Navbar/>
              <Fade>
                <Container 
                  maxW='container.lg' 
                  paddingBottom={70}
                >
                  
                  <Component {...pageProps} />
                  
                </Container>
              </Fade>
              <Box
                position='fixed'
                bottom={0}
                width='100%'
              >

                <SongPlayer 
                  trackUri={ playingTrack }
                />
              </Box>
            </PlayBackContext.Provider>
          </ChakraProvider>
      </CookiesProvider>
    </>
  )
}



export default MyApp
