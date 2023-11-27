
import TodoComponent from "components/TodoComponent";
import TodoPage from "components/TodoPage";
import { getAuth } from "firebase/auth";
import { useAuth } from "hooks";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { RootState } from "store";

const HomePage: React.FC = () =>{

    const { email } = useSelector((state: RootState) => state.user);
    // console.log("isAuth:",email);
    return  !!email ? (<TodoPage />) : (<Navigate to="/login" />)

}

export default HomePage;