
import TodoPage from "pages/TodoPage";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { RootState } from "store";
import Profile from "components/Profile";

const HomePage: React.FC = () =>{

    const { token } = useSelector((state: RootState) => state.user);
    return  !!token ? 
    (   
        <div>
            <Profile /> 
            <TodoPage />
        </div>
    ) : (<Navigate to="/login" />)

}

export default HomePage;