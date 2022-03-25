import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import TracksList from "../../components/shared/TracksList";
import { useFetch } from "../../hooks/useFetch";

const Search = (): JSX.Element => {

    const [searchFilter, setSearchFilter] = useState<string>(`Best of ${moment().year() - 1}`);
    const { data: searchResult } = useFetch(`/tracks/search?q=${searchFilter}`); 

    useEffect(() => {
        console.log("🚀 ~ file: index.tsx ~ line 12 ~ searchResult", searchResult);        
    })

    return(
        <Box paddingTop={100} >
            <InputGroup
                marginBottom={5}
            >
                <InputLeftElement>
                    <AiOutlineSearch
                        color="#CC180B"
                    />
                </InputLeftElement>
                <Input
                    type='search'
                    placeholder="Search for a song..."
                    focusBorderColor="#F3281A"
                    _hover={{ borderColor: '#F3281A' }}
                    borderColor='#F3281A'
                    color='#000'
                    bgColor='#fff'
                    value={ searchFilter }
                    onChange={ (event) => {
                            const filter = event.target.value; 
                            setSearchFilter(filter) 
                        }
                    }
                />
            </InputGroup>
            <TracksList tracks={ searchResult } artist={ '' }/>
        </Box>
    )
}

export default Search;