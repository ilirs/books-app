import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SecretRoute from './secretRoute';
import Login from 'containers/Login';
import Main from 'containers/Main';
import AddOrEdit from 'containers/AddOrEdit';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <SecretRoute exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <SecretRoute path={"/book"} component={AddOrEdit} />
                <SecretRoute path={"/book/:id"} component={AddOrEdit} />
            </Switch>
        </Router>
    )
};

export default AppRouter;