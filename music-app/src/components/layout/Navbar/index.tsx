import { Box, Container, Flex, Text, useDisclosure, useMediaQuery} from "@chakra-ui/react";

import { GiMusicSpell } from 'react-icons/gi';
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { Modal } from "../../shared";

const Navbar = (): JSX.Element => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <Box  bg='#F55246' color='#fff' as='nav' >

            <Modal isOpen={isOpen} onClose={onClose}/>

            <Container 
                maxW='container.lg'  
                paddingTop={2} 
                paddingBottom={2}
                
                position='relative'
                zIndex={2}
            >
                <Flex
                    justifyContent='space-between'
                    alignItems='center'
                >

                    <Flex
                        alignItems='center'
                    >
                        <GiMusicSpell fontSize='30px'/>
                        <Text 
                            fontSize='30px' 
                            fontWeight='bold'
                            marginLeft={3}
                            as='h2'
                        >
                            Hulmers
                        </Text>
                    </Flex>
                    <MobileNav onOpen={ onOpen }/>
                    <Nav onOpen={ onOpen }/>
                </Flex>
            </Container>
        </Box>
    )
}

export default Navbar;