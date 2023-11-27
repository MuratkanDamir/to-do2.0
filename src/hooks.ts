import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux';
import {RootState, AppDispatch} from 'store/index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuth = () => {
    const {email, token, id}  = useSelector((state: RootState) => state.user);

    return {
        isAuth: !!email,
        email,
        token,
        id,
    }
}