import { ChakraProvider, Container } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import { PlayBackContext } from '../src/contexts/PlayBackContext';
import { Navbar } from '../src/components/layout';
import '../styles/reset.css';
import '../styles/globals.css';
import { CookiesProvider } from 'react-cookie';
import {  useState } from 'react';
import SongPlayer from '../src/components/shared/SongPlayer';
import "nprogress/nprogress.css";
import { useRefreshToken, useLoading } from '../src/hooks';

function MyApp({ Component, pageProps }: AppProps) {

  const [playingTrack, setPlayingTrack] = useState<string | string[]>();

  useRefreshToken();
  useLoading();

  const chooseTrack = (track: string[] | string) => {
    if (track === [] || track === '') {
      return;
    }

    setPlayingTrack(Array.isArray(track) ? track : [track]);
  }

  return (
    <>
      <CookiesProvider>
          <ChakraProvider>
            <PlayBackContext.Provider value={{ chooseTrack, playingTrack }}> 
              <Component {...pageProps} />
            </PlayBackContext.Provider>
          </ChakraProvider>
      </CookiesProvider>
    </>
  )
}



export default MyApp
