import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Collection from '../../components/shared/Collection';
import { useFetch } from '../../hooks';
import Layout from '../../Layout';

const Playlist = () => {

  const router = useRouter();

  const { data: playlist } = useFetch(`/playlists/${router.query.id}`);

  return (
    <Layout>
      <Collection
        name={ playlist?.name }
        owner={ playlist?.owner }
        tracks={ playlist?.tracks }
        imageSrc={ playlist?.images[0]?.url }
      />
    </Layout>
  )
}

export default Playlist;
