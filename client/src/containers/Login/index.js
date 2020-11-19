import React, { Component } from 'react';
import './styles.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from 'actions/login';

class Login extends Component {

    loginFormSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is missing"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Z])/,
                'Passwords must contain: 1 uppercase'
            )
            .matches(
                /^(?=.*[0-9])/,
                'Passwords must contain: 1 number'
            )
            .matches(
                /^(?=.*[!@#$%^&*])/,
                'Passwords must contain: 1 special character'
            )
            .matches(
                /^(?=.{6,})/,
                'Passwords must contain: min 6 characters'
            )
    });

    handleLogin = async (data) => {
        this.props.login({
            data: data,
            history: this.props.history
        });
    }

    render() {
        const  {error} = this.props;
        return (
            <div className="container-login">
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={this.loginFormSchema}
                    onSubmit={(values) => {
                        this.handleLogin(values)
                    }}>
                    {
                        props => (
                            <Form onSubmit={props.handleSubmit} className="login-form">
                                <div className="login-header">
                                    Login
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={`form-control ${props.errors.email ? "is-invalid" : ""}`}
                                        value={props.values.email}
                                        id="email"
                                        onChange={props.handleChange} />
                                    <ErrorMessage
                                        component="div"
                                        name="email"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`form-control ${props.errors.password ? "is-invalid" : ""}`}
                                        id="password"
                                        value={props.values.password}
                                        onChange={props.handleChange} />
                                    <ErrorMessage
                                        component="div"
                                        name="password"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div className="wrong-pw">{error ? error : ''}</div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </Form>)}
                </Formik>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch);

const mapStateToProps = ({loginReducer}) => ({
    error: loginReducer.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
