import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useCookies } from 'react-cookie';
import Button from "../../components/shared/Button";
import Link from "../../components/shared/Link";
import { useAuth } from '../../hooks/useAuth';

const style = {
    display: "flex",
    justifyContent: "center",
    marginTop: 200
}

type LoginProps = {
    data: {
        user: string,
        token: {
            accessToken: string,
            refreshToken: string,
            expiresIn: string
        }
    }
}

const Login = ({ data }: LoginProps): JSX.Element => {

    useAuth(data);

    return (
        <div style={ style }>
            <Fade direction="up">
                <Link 
                    href={ 
                        process.env.NODE_ENV === 'development' ? 
                        'http://localhost:3001/auth' 
                        : 
                        'https://server-hulmers.herokuapp.com/auth'
                    }
                >
                    <Button>
                        Log in with Spotify
                    </Button>
                </Link>
            </Fade>
        </div>
    )
}



export default Login;