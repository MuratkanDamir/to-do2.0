import {TextField, Button} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import { Link } from "react-router-dom";
import { auth } from 'firebaseApp';
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { setUser } from "store/slices/userSlices";
import { db } from 'firebaseApp';
import { collection, query, getDocs, getDoc, Timestamp, doc, deleteDoc, updateDoc, setDoc, orderBy} from "firebase/firestore";
import { getFirestore, addDoc } from 'firebase/firestore';

import { useAppDispatch } from "hooks";
import { useNavigate } from "react-router-dom";

type Inputs = {
    email: string
    password: string
}

type Todo = {
    id: string;
    title : string;
    createdAt: string;
    completed: boolean;
}

const RegisterPage: React.FC = () =>{
    const {
        register,
        reset,
        handleSubmit,
      } = useForm<Inputs>()
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        // console.log(data)
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            // Signed in
            const user = userCredential.user;
            const token = await user.getIdToken(); 
            const email = data.email;
            const id = user.uid;
            dispatch( setUser({email, token, id }) );
            reset();
            navigate("/");
            
            // Создание документа в Firestore с данными пользователя
            const userDocRef = doc(db, 'users', user.uid);
            const userData = {
                id: userDocRef.id,
                username: email,
            };

            await setDoc(userDocRef, userData);

            // Создание подколлекции (например, "tasks") для пользователя

            const taskDocRef = collection(userDocRef, 'todos');
            // const todo: Todo = {
            //     id: taskDocRef.id,
            //     title: "example",
            //     createdAt: Timestamp.now().toDate().toISOString(),
            //     completed: false,
            // };
            // Add a new todo document to the 'todos' subcollection
            await addDoc(taskDocRef,{});

        }catch(error){
            console.log(error);
            reset();
        }
    }

    return (
        <div style={{width:'400px'}}>
            <h1 style={{textAlign:'center'}}>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column', gap:'10px', marginTop:'10px', marginBottom:'10px'}}>
                <TextField
                    label="Email"
                    type="text"
                    {...register("email")}/>
                <TextField
                    label="Password"
                    type="password"
                    {...register("password")}/> 
                <Button variant="contained" type="submit">
                    Register
                </Button>                   
            </form>
            <p>Already have an account <Link to="/login">login</Link></p>
        </div>
    );
};


export default RegisterPage;

