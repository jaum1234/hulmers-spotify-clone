import '../styles/globals.css';
import '../styles/reset.css';
import "nprogress/nprogress.css";
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import { PlayBackContext } from '../src/contexts/PlayBackContext';
import {  useState } from 'react';
import { useLoading } from '../src/hooks';
import { Provider } from 'react-redux';
import { persistor, store } from '../src/services/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SongPlayer } from '../src/components/shared';

function MyApp({ Component, pageProps }: AppProps) {

  const [playingTrack, setPlayingTrack] = useState<string | string[]>();

  const chooseTrack = (track: string[] | string) => {
    if (track === [] || track === '') {
      return;
    }
    
    setPlayingTrack(Array.isArray(track) ? track : [track]);
  }
  
  useLoading();

  return (
    <>
      <Provider store={ store }>
        <PersistGate loading={null} persistor={ persistor }>
          <ChakraProvider>
            <PlayBackContext.Provider value={{ chooseTrack, playingTrack }}> 
              <Component {...pageProps} />
              <SongPlayer/>
            </PlayBackContext.Provider>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </>
  )
}


export default MyApp; 
