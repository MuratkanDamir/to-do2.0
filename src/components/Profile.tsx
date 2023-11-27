import { useSelector } from "react-redux";
import {RootState} from 'store/index';
import {Button, Grid, Avatar} from "@mui/material";
import { removeUser } from "store/slices/userSlices";
import { emptyTodos } from "store/slices/todoSlices";
import { useAppDispatch } from "hooks";

const Profile: React.FC = () =>{

    const {email} = useSelector((state: RootState) => state.user);
    
    const dispatch = useAppDispatch();

    return(
        <div style={{backgroundColor:'#713ABE',width:'100vw',height:'10vh', padding:'10px'}}>
            <div style={{display:'flex', alignItems:'center' ,gap:'10px', marginLeft:'20px'}}>
                <Avatar>H</Avatar>
                {email}
                <Button style={{marginLeft:'30px'}}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        dispatch( removeUser() )
                        dispatch( emptyTodos())
                    }} 
                    >
                    sign out
                </Button>
            </div>
        </div>
    )
}

export default Profile;