import React, { Component } from 'react';
import { logout } from 'actions/login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import './styles.css';

class Header extends Component {

    state = {
        user: localStorage.getItem('user')
    }

    handleLogout = () => {
        const { history } = this.props;
        this.props.logout(history)
    }

    render() {
        const { user } = this.state;

        return (
            <React.Fragment>
                <div className="main-header">
                    <div className="col-8 main-logged-user">
                        {user}
                    </div>
                    <div className="col-4 main-logout-btn">
                        <button type="submit" className="btn btn-secondary" onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    logout,
}, dispatch);

const mapStateToProps = ({ loginReducer }) => ({
    user: loginReducer.user
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
