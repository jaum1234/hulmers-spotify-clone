import { GetServerSideProps } from "next";
import { fetchData } from "../src/api";
import Profile from "../src/screens/profile";

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    var currentUser = await fetchData('/users/me', req.cookies.token);
    var userPlaylists = await fetchData(`/users/${currentUser?.id}/playlists`, req.cookies.token);

    if (currentUser.statusCode === 401 || userPlaylists.statusCode === 401) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            currentUser,
            userPlaylists
        }
    }
}