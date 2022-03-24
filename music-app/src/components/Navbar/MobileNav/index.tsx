import { Box, Flex, IconButton, List, ListItem, Menu, MenuButton, MenuItem, MenuList, Modal, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { GiHamburger } from "react-icons/gi";
import Button from "../../Button";
import { navbar } from "../../../fixtures/navbar";
import { MouseEventHandler, useState } from "react";
import Link from "../../Link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { NavItem } from "../../../types/navbar";
import { MdCreateNewFolder } from "react-icons/md";

const MobileNav = ({ onOpen }: { onOpen: MouseEventHandler }): JSX.Element => {

    const [cookie, setCookies, removeCookies] = useCookies();
    const router = useRouter();

    return(
        <Menu

        >

            <MenuButton 
                as={ IconButton } 
                icon={<GiHamburger />} 
                color="#CC180B"/>
            <MenuList
                color='black'
            >
                {
                    navbar.items.map((item: NavItem) => (
                        <MenuItem key={ item.id }>
                            <Link href={ item.href }>
                                <Flex
                                    alignItems='center'
                                >
                                    { item.icon }
                                    <Box marginLeft={3}>{ item.label }</Box>
                                </Flex>
                            </Link>
                        </MenuItem>
                    ))
                }
                <MenuItem>
                    <Flex 
                        alignItems='center'
                        cursor='pointer' 
                        onClick={ onOpen }
                    >
                        <MdCreateNewFolder/>
                        <Text marginLeft={1}>
                            New playlist
                        </Text>
                    </Flex>
                </MenuItem>
                <MenuItem>
                {
                    cookie.token ?
                        <Button
                            buttonStyle="menuButtonDark"
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
                            buttonStyle="menuButtonDark"
                            onClick={() => {
                                router.push('/login')
                            }}
                        >
                            Log in
                        </Button>
                }
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MobileNav;