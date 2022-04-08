import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Button, Link } from '../../../shared';
import { navbar } from "../../../../fixtures/navbar";
import { NavItem } from "../../../../types/navbar";
import { MdCreateNewFolder } from "react-icons/md";
import { MouseEventHandler } from "react";
import styles from './Nav.module.css';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../services/store/actions/auth";
import Cookies from "js-cookie";

const Nav = ({ onOpen }: { onOpen?: MouseEventHandler }): JSX.Element => {

    const token = useSelector((state: any) => state.auth.token.accessToken);
    const dispatch = useDispatch();
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
                    token &&
                    <Flex 
                        alignItems='center'
                        cursor='pointer' 
                        color='#fff'
                        marginLeft={25}
                        className={ styles.createPlaylist }
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
                        token ? 
                        <Button
                            buttonStyle="menuButton"
                            onClick={() => {

                                //these are meant for the server-side
                                Cookies.remove('token');
                                Cookies.remove('refresh_token');
                                Cookies.remove('expires_in');
                                dispatch(logout());
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