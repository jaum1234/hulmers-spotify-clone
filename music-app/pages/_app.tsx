import { Box, ChakraProvider, Container } from '@chakra-ui/react';
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


function MyApp({ Component, pageProps }: AppProps) {

  const [playingTrack, setPlayingTrack] = useState<string | string[]>();
  const [cookies, setCookies] = useCookies();
  const router = useRouter();
  
  useEffect(() => {
    if (!cookies.last_song_played) {
      setCookies('last_long_played', []);
    }
  }, [cookies.last_song_played, setCookies]);

  const chooseTrack = (track: string[] | string) => {
    if (track === [] || track === '') {
      return;
    }

    //setCookies('last_song_played', Array.isArray(track) ? track : [track]);
    setPlayingTrack(Array.isArray(track) ? track : [track]);
  }

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
