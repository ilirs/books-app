import {
    LOGIN,
    LOGIN_FAILED,
    LOGOUT,
} from 'actionTypes/login';

const loginRequest = (data) => ({ type: LOGIN, payload: data });
const loginRequestFailed = (data) => ({ type: LOGIN_FAILED, payload: data });

export const login = ({ data, history }) => async (dispatch) => {
    const { email, password } = data;

    if (email === 'admin@admin.com' &&
        password === 'Admin1!') {
        await dispatch(loginRequest(data));
        history.push('/');
    }
    else{
        dispatch(loginRequestFailed(data));
    }
};

export const logout = (history) => ({ type: LOGOUT, payload: history });