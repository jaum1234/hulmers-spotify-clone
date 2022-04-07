import { useRouter } from "next/router";
import { useEffect } from "react";
import Collection from "../../components/shared/Collection";
import { useFetch } from "../../hooks";
import Layout from "../../Layout";

const Album = (): JSX.Element | null => {

    const router = useRouter();

    const { 
        data: albumInfo, 
        error, 
        loading 
    }: { 
        data: any, 
        error: any, 
        loading: boolean 
    } = useFetch(`/albums/${router.query.id}`);

    if (error?.statusCode === 400) {
        router.push('/');
        return null
    }

    return(
        <Layout>
            <Collection
                name={ albumInfo?.name }
                owner={ albumInfo?.artist }
                tracks={ albumInfo?.tracks }
                imageSrc={ albumInfo?.images[0].url }
            />
        </Layout>
    )
}

export default Album;