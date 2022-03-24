import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Collection from '../../components/Collection';
import TracksList from '../../components/TracksList';
import { useFetch } from '../../hooks/useFetch';

const Playlist = () => {

  const router = useRouter();

  const { data: playlist } = useFetch(`/playlists/${router.query.id}`);

  useEffect(() => {
    console.log("🚀 ~ file: index.tsx ~ line 13 ~ Playlist ~ playlist", playlist?.tracks)    
  });

  return (
    <>
      <Collection
        name={ playlist?.name }
        owner={ playlist?.owner }
        tracks={ playlist?.tracks }
        imageSrc={ playlist?.images[0]?.url }
      />
    </>
  )
}

export default Playlist;
