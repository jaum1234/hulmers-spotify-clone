import { GetServerSideProps } from "next";
import Login from "../src/screens/login";

export default Login;

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const code = context.query.code;

    if (!code) {
        return {
            props: {}
        }
    }
    
    const data = await fetch('http://localhost:3001/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code})
    })
    .then(res => res.json())

    return {
      props: {
        data
      }
    }
}