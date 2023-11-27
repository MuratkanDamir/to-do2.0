import { useAppDispatch } from "hooks";
import {TextField, Button} from '@mui/material';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from 'firebaseApp';
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "store/slices/userSlices";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () =>{
    
    type Inputs = {
        email: string,
        password: string,
    }
    const {
        register,
        reset,
        handleSubmit,
    } = useForm<Inputs>()

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
        // console.log(data)
        try{
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            // Signed in
            const user = userCredential.user;
            const token = await user.getIdToken(); 
            const email = data.email;
            const id = user.uid;
            dispatch( setUser({email, token, id }) );
            reset();
            navigate("/");
        }catch(error){
            console.log(error);
            reset();
        }
    };

    return (
        <div  style={{width:'400px'}}>
            <h1  style={{textAlign:'center'}}>Login</h1>
            <form onSubmit={ handleSubmit(onFormSubmit) } style={{display:'flex', flexDirection:'column', gap:'10px', marginTop:'10px', marginBottom:'10px'}}>
                <TextField
                    label="Email"
                    type="text"
                    {...register("email")}
                />
                <TextField
                    label="Password"
                    type="password"
                    {...register("password")}
                />
                <Button variant="contained" type="submit">
                    Log in
                </Button> 
            </form>
            <p>You dont have an account <Link to="/register">register</Link></p>
        </div>
    );
}

export default LoginPage;