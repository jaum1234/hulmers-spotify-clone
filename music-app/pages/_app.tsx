import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import { PlayBackContext } from '../src/contexts/PlayBackContext';
import '../styles/reset.css';
import '../styles/globals.css';
import { CookiesProvider } from 'react-cookie';
import {  useState } from 'react';
import "nprogress/nprogress.css";
import { useRefreshToken, useLoading } from '../src/hooks';
import { Provider } from 'react-redux';
import { persistor, store } from '../src/services/store';
import { PersistGate } from 'redux-persist/integration/react';

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
    <Provider store={ store }>
      <PersistGate loading={null} persistor={ persistor }>
        <CookiesProvider>
            <ChakraProvider>
              <PlayBackContext.Provider value={{ chooseTrack, playingTrack }}> 
                <Component {...pageProps} />
              </PlayBackContext.Provider>
            </ChakraProvider>
        </CookiesProvider>
      </PersistGate>
    </Provider>
    </>
  )
}


export default MyApp
