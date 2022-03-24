import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Cookies, useCookies } from "react-cookie";
import Button from "../../Button";
import Link from "../../Link";
import { navbar } from "../../../fixtures/navbar";
import { NavItem } from "../../../types/navbar";
import { MdCreateNewFolder } from "react-icons/md";
import { MouseEventHandler } from "react";
import styles from './Nav.module.css';

const Nav = ({ onOpen }: { onOpen?: MouseEventHandler }): JSX.Element => {

    const [cookie, setCookies, removeCookies] = useCookies();
    const router = useRouter();

    return(
        <Box
            className={ styles.nav }
        >
            <Flex
                alignItems='center'
                
            >
                { navbar.items.map((item: NavItem, index: number): JSX.Element => (
                    <Link href={ item.href } key={ item.id }>
                        <Flex 
                            alignItems='center'
                            cursor='pointer' 
                            color='white'
                            marginLeft={ index == 0 ? 0 : 25 }
                        >
                            { item.icon }
                            <Text marginLeft={1}>{ item.label }</Text>
                        </Flex>
                    </Link>
                )) }
                {
                    cookie.token &&
                    <Flex 
                        alignItems='center'
                        cursor='pointer' 
                        color='#fff'
                        marginLeft={25}
                        onClick={ onOpen }
                    >
                        <MdCreateNewFolder/>
                        <Text marginLeft={1}>
                            New playlist
                        </Text>
                    </Flex>
                }
                
                <Flex 
                    cursor='pointer' 
                    color='#CC180B' 
                    marginLeft={25}
                >
                    {
                        cookie.token ? 
                            
                            <Button
                                buttonStyle="menuButton"
                                onClick={() => {

                                    removeCookies('token');
                                    removeCookies('expires_in');
                                    removeCookies('refresh_token');

                                    router.push('/login')
                                }}
                            >
                                Log out
                            </Button>
                            :
                            <Button 
                                buttonStyle="menuButton"
                                onClick={() => {
                                    router.push('/login')
                                }}
                            >
                                Log in
                            </Button>
                    }   
                </Flex>
            </Flex>
        </Box>
    )
}

export default Nav;