import { GetServerSideProps } from "next";
import { fetchData } from "../src/api";
import Profile from "../src/screens/profile";

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies;

    var currentUser = await fetchData('/users/me', {
        headers: {
            Authorization: cookies.token
        }
    });

    var userPlaylists = await fetchData(`/users/${currentUser?.id}/playlists`, {
        headers: {
            Authorization: cookies.token
        }
    });

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