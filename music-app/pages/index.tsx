import { GetServerSideProps } from "next";
import { fetchData } from "../src/api";
import Home from "../src/screens/home";

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies
  
    var recommendations = await fetchData('/tracks/recommendations', {
        headers: {
            Authorization: cookies.token
        }
    });

    var albums = await fetchData('/albums', {
        headers: {
            Authorization: cookies.token
        }
    });
   
    if (recommendations.statusCode === 401 || albums.statusCode === 401) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    
    return {
        props: {
            recommendations,
            albums
        }
    }
}