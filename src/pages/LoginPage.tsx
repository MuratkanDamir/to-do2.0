import { SubmitHandler, useForm } from "react-hook-form";

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

    const onFormSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        reset();
    };

    return (
        <div>
            <form onSubmit={ handleSubmit(onFormSubmit) }>
                <input 
                    {...register("email")}
                />
                <input 
                    {...register("password")}
                />
                <input 
                    type = "submit"
                />
            </form>
        </div>
    );
}

export default LoginPage;