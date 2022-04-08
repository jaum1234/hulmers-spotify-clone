import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { GiHamburger } from "react-icons/gi";
import { Button, Link } from '../../../shared';
import { navbar } from "../../../../fixtures/navbar";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { NavItem } from "../../../../types/navbar";
import { MdCreateNewFolder } from "react-icons/md";
import styles from './MobileNav.module.css';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../services/store/actions/auth";
import { AuthState } from "../../../../services/store/reducers/auth";

const MobileNav = ({ onOpen }: { onOpen: MouseEventHandler }): JSX.Element => {

    const token = useSelector((state: any) => state.auth.token.accessToken);
    const dispatch = useDispatch();

    const router = useRouter();
    const [dropdown, setDropdown] = useState<boolean>(false);

    return(
        <Box
            position='relative'
            className={ styles.mobileNav }
        >
            <Box
                color='#F55246'
                background='#fff'
                padding={2}
                borderRadius={5}
                onClick={() => {
                    setDropdown((prev) => !prev);
                }}
            >
                <GiHamburger />
            </Box>
            {
                dropdown &&
                    <List
                        background='#fff'
                        color='#000'
                        borderRadius={5}
                        padding={3}
                        width={200}
                        position='absolute'
                        right={2}
                        top={10}
                    >
                    {
                        navbar.items.map((item: NavItem) => (
                            <ListItem key={ item.id }
                                onClick={() => setDropdown(false)}
                                mb={2}
                            >
                                <Link href={ item.href }>
                                    <Flex
                                        alignItems='center'
                                    >
                                        { item.icon }
                                        <Box marginLeft={3}>{ item.label }</Box>
                                    </Flex>
                                </Link>
                            </ListItem>
                        ))
                    }
                    {
                        token &&
                        <ListItem>
                            <Flex 
                                alignItems='center'
                                cursor='pointer' 
                                onClick={ onOpen }
                                mb={2}
                            >
                                <MdCreateNewFolder/>
                                <Text marginLeft={1}>
                                    New playlist
                                </Text>
                            </Flex>
                        </ListItem>
                    }
                    <ListItem
                        onClick={() => setDropdown(false)}
                    >
                    {
                        token ?
                            <Button
                                buttonStyle="menuButtonDark"
                                onClick={() => {
                                    dispatch(logout());
                                    router.push('/login')
                                }}
                            >
                                Log out
                            </Button>
                            :
                            <Button 
                                buttonStyle="menuButtonDark"
                                onClick={() => {
                                    router.push('/login')
                                }}
                            >
                                Log in
                            </Button>
                    }
                    </ListItem>
                    </List>
            }
        </Box>
        // <Menu

        // >

        //     <MenuButton 
        //         as={ IconButton } 
        //         icon={<GiHamburger />} 
        //         color="#CC180B"/>
        //     <MenuList
        //         color='black'
        //     >
        //         {
        //             navbar.items.map((item: NavItem) => (
        //                 <MenuItem key={ item.id }>
        //                     <Link href={ item.href }>
        //                         <Flex
        //                             alignItems='center'
        //                         >
        //                             { item.icon }
        //                             <Box marginLeft={3}>{ item.label }</Box>
        //                         </Flex>
        //                     </Link>
        //                 </MenuItem>
        //             ))
        //         }
        //         <MenuItem>
        //             <Flex 
        //                 alignItems='center'
        //                 cursor='pointer' 
        //                 onClick={ onOpen }
        //             >
        //                 <MdCreateNewFolder/>
        //                 <Text marginLeft={1}>
        //                     New playlist
        //                 </Text>
        //             </Flex>
        //         </MenuItem>
        //         <MenuItem>
        //         {
        //             token ?
        //                 <Button
        //                     buttonStyle="menuButtonDark"
        //                     onClick={() => {

        //                         removeCookies('token');
        //                         removeCookies('expires_in');
        //                         removeCookies('refresh_token');

        //                         router.push('/login')
        //                     }}
        //                 >
        //                     Log out
        //                 </Button>
        //                 :
        //                 <Button 
        //                     buttonStyle="menuButtonDark"
        //                     onClick={() => {
        //                         router.push('/login')
        //                     }}
        //                 >
        //                     Log in
        //                 </Button>
        //         }
        //         </MenuItem>
        //     </MenuList>
        // </Menu>
    )
}

export default MobileNav;