import { Box, Flex, Text } from "@chakra-ui/react";

const Highlights = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
    <Box 
        paddingY={15}>
        <Text 
            fontSize="25px" 
            fontWeight="bold" 
            marginBottom={10}
            sx={{
                "@media screen and (max-width: 1024px)" : {
                    textAlign: "center"
                }
            }}
        >
            { title }
        </Text>
        <Flex
            flexWrap="wrap"
            sx={{
                "@media screen and (max-width: 1024px)": {
                    justifyContent: "space-around",
                },
                "@media screen and (max-width: 780px)": {
                    justifyContent: "space-evenly",
                },
            }}
        >
            { children }
        </Flex>
      </Box>
    );
}

export default Highlights;