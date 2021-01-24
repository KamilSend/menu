import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../helpers/auth'

export default class SignUp extends Component {

    state = {
        error: null,
        email: '',
        password: '',
    };

    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up
                    </h1>
                    <p>Fill in the form below to create an account.</p>
                    <div>
                        <input placeholder="Email" name="email" type="email" onChange={this.handleChange.bind(this)} value={this.state.email}></input>
                    </div>
                    <div>
                        <input placeholder="Password" name="password" onChange={this.handleChange.bind(this)} value={this.state.password} type="password"></input>
                    </div>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                        <button type="submit" onClick={this.handleSubmit.bind(this)}>Sign up</button>
                    </div>
                    <hr></hr>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        )
    }
}