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
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../api";

const Modal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }): JSX.Element => {

    const [name, setName] = useState<string>("");
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const token = useSelector((state: any) => state.auth.token.accessToken);

    const createPlaylist = () => {
        if (name === '') {
            return;
        }

        const data: { 
            name: string,
            isPublic: boolean 
        } = { name, isPublic };

        api.post('/users/playlists', data, {
            headers: {
                'Authorization': token
            }
        })

        onClose();
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
                        isRequired
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