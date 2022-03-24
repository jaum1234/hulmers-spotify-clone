import { useRouter } from 'next/router';
import { Fade } from 'react-awesome-reveal';
import Button from "../../components/Button";
import Link from "../../components/Link";
import { useAuth } from '../../hooks/useAuth';

const style = {
    display: "flex",
    justifyContent: "center",
    marginTop: 200
}

const Login = (): JSX.Element => {

    const router = useRouter();
    const { code } = router.query;

    useAuth(code);

    return (
        <div style={ style }>
            <Fade direction="up">
                <Link href='https://server-hulmers.herokuapp.com/auth'>
                    <Button>
                        Log in with Spotify
                    </Button>
                </Link>
            </Fade>
        </div>
    )
}

export default Login;