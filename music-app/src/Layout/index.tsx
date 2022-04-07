import { Container } from '@chakra-ui/react';
import { useContext } from 'react';
import { Navbar } from '../components/layout';
import { SongPlayer } from '../components/shared';
import { PlayBackContext } from '../contexts/PlayBackContext';

const Layout = ({ children }: { children: React.ReactNode}): JSX.Element => {

    const { playingTrack } = useContext(PlayBackContext);

    return (
        <>
            <Navbar/>
            <Container
                maxW='container.lg' 
                paddingBottom={70}
            >
                { children }
            </Container>
            <SongPlayer 
                trackUri={ playingTrack }
            />
        </>
    )
}

export default Layout;