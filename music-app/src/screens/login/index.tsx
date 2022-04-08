import { Fade } from 'react-awesome-reveal';
import Button from "../../components/shared/Button";
import Link from "../../components/shared/Link";
import { useAuth } from '../../hooks/useAuth';
import style from './Login.module.css';

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
        <div className={ style.container }>
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