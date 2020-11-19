
import React from 'react';
import {
    Route,
    Redirect,
} from 'react-router-dom';

const SecretRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('login_status'));

    return <Route {...rest} render={(props) => (
        isAuthenticated
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
};

export default SecretRoute;