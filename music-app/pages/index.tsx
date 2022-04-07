import { GetServerSideProps } from "next";
import { fetchData } from "../src/api";
import Home from "../src/screens/home";

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  
    const recommendations = await fetchData('/tracks/recommendations', req.cookies.token);
    const albums = await fetchData('/albums', req.cookies.token);
   
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