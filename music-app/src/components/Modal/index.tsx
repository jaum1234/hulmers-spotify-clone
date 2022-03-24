import { 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal as ChakraModal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Switch, 
    Text, 
    useDisclosure 
} from "@chakra-ui/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { api } from "../../api";
import InputFile from "../InputFile";

const Modal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }): JSX.Element => {

    const [name, setName] = useState<string>("");
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [cookies] = useCookies();

    const createPlaylist = () => {
        const data: { 
            name: string,
            isPublic: boolean 
        } = { name, isPublic };

        api.post('/users/playlists', data, {
            headers: {
                'Authorization': cookies.token
            }
        })
        .then((res: any) => {
            console.log("🚀 ~ file: index.tsx ~ line 40 ~ .then ~ res", res)
        }, (err: any) => {
            console.log("🚀 ~ file: index.tsx ~ line 42 ~ .then ~ err", err.response.data)
            console.log(err.response.status);
        });
    }
   
    return (
        <>
        <ChakraModal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a new playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody> 
                    <FormControl
                        mb={5}
                    >
                        <FormLabel htmlFor="playlist-name">Name</FormLabel>
                        <Input 
                            id="playlist-name" 
                            name="playlist-name"
                            placeholder="My Awesome Playlist"
                            value={ name }
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl
                        display='flex'
                        alignItems='center'
                    >
                        <FormLabel htmlFor='public' mb='0'>
                            Public
                        </FormLabel>
                        <Switch id='public'
                            checked={ isPublic }
                            onChange={() => setIsPublic((prevState) => !prevState)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        bg='green'
                        color='#fff'
                        onClick={ createPlaylist }
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
        </>
    )
}

export default Modal;