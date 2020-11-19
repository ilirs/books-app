import {
    LOGIN,
    LOGIN_FAILED,
    LOGOUT,
} from 'actionTypes/login';

const initialState = {
    user: '',
    loginStatus: false,
    error: ''
};

function loginReducer(state = initialState, action) {

    switch (action.type) {
        case LOGIN: {
            localStorage.setItem('login_status', true);
            localStorage.setItem('user', action.payload.email);
            return {
                ...state,
                user: action.payload.email,
                loginStatus: true,
                error: '',
            };
        }
        case LOGIN_FAILED:{
            return {
                ...state,
                error: 'Wrong password'
            };
        }
        case LOGOUT: {
            localStorage.setItem('login_status', false);
            action.payload.push('/login');
            return {
                ...state,
                loginStatus: false,
            };
        }
        default:
            return state;
    }
}
export default loginReducer;