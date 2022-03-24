import { Box, Flex, Text } from "@chakra-ui/react";
import styles from './Highlights.module.css';

const Highlights = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
    <Box 
        paddingY={15}>
        <Text 
            fontSize="25px" 
            fontWeight="bold"
            marginBottom={10}
            className={ styles.title }
        >
            { title }
        </Text>
        <Flex
            flexWrap="wrap"
            className={ styles.content }
        >
            { children }
        </Flex>
      </Box>
    );
}

export default Highlights;