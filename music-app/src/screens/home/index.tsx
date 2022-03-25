import { Button, Flex, Text } from '@chakra-ui/react';

import SpotifyCard from '../../components/shared/SpotifyCard';

import { Fade } from 'react-awesome-reveal';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from '../../components/shared/Link';
import { useFetch } from '../../hooks/useFetch';
import { CardType } from '../../types/spotify-card';
import Highlights from '../../components/shared/Highlights';
import { Album } from '../../types/album';
import { Track } from '../../types/tracks';
import { useEffect } from 'react';
import styles from './Home.module.css';

const Home = (): JSX.Element => {
      
  const { data: recommendations } = useFetch('/tracks/recommendations');
  const { data: albums } = useFetch('/albums');

  useEffect(() => {
    console.log(2);
    console.log("🚀 ~ file: index.tsx ~ line 23 ~ recommendations", recommendations)
  }, [recommendations])
    
  return (
    <Flex 
      paddingTop={100}
      flexDir="column" >
      
      <Flex
        alignItems='center'
        flexDir='column'
        paddingBottom={150} 
      >
      
          <Text 
            fontSize='60px' 
            textAlign='center'
            textTransform='uppercase' 
            fontWeight='bold'
            transition='0.5s ease-in-out'
            marginBottom={5}
            className={ styles.title }
          >
              Listen to your <br></br> favorite songs 
          </Text>
          <Button 
            bgColor='#F55246' 
            _hover={{ background: "#F3281A" }}

          >
            <Link href='/search'>
              <Flex
                alignItems='center'
                color='white'
              >
                <Text marginRight={2}>Search for a track</Text>
                <AiOutlineSearch/>
              </Flex>
            </Link>
          </Button>
      </Flex>
      <Fade direction='left' triggerOnce>
        <Highlights
          title='Our Recomendations'
        >
          {
            Array.isArray(recommendations) && recommendations.map((recommendation: Track) => (
              <SpotifyCard 
                key={ recommendation.id }
                id={ recommendation.album.id }
                name={ recommendation.name } 
                artist={ recommendation.album.artist }
                type={ CardType.album }
                src={ recommendation.album.images[1].url } 
                uris={ recommendation.uri }
              />
            ))
          }
        </Highlights>
      </Fade>
      <Fade direction='left' triggerOnce>
        <Highlights
          title='Some Albums For You'
        >
          {
            Array.isArray(albums) && albums.map((album: Album) => (
              <SpotifyCard 
                key={ album.id }
                id={ album.id }
                name={ album.name } 
                artist={ album.artist } 
                type={ CardType.album }
                src={ album.album_image[1].url } 
                uris={ album.uri }
              />
            ))
          }
        </Highlights>
      </Fade>
    </Flex>  
  )
}


export default Home
