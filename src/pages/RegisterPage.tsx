import {TextField, Button} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';

type Inputs = {
    email: string
    password: string
}

const RegisterPage: React.FC = () =>{
    const {
        register,
        handleSubmit,
      } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Email"
                    type="text"
                    {...register("email")}/>
                <TextField
                    label="Password"
                    type="password"
                    {...register("password")}/> 
                <Button variant="contained" type="submit">
                    Log in
                </Button>                   
            </form>

        </div>
    );
};


export default RegisterPage;

