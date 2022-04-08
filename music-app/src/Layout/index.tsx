import { Container } from '@chakra-ui/react';
import { Navbar } from '../components/layout';
import { useRefreshToken } from '../hooks';

const Layout = ({ children }: { children: React.ReactNode}): JSX.Element => {

    useRefreshToken();

    return (
        <>
            <Navbar/>
            <Container
                maxW='container.lg' 
                paddingBottom={70}
            >
                { children }
            </Container>
        </>
    )
}

export default Layout;