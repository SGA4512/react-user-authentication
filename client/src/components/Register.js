import React from 'react';
import axios from "../config/config"

export default class Register extends  React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: ""
        }    
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.id]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        console.log(formData)
        axios.post("/users/register", formData)
            .then(response => {
                if(response.data.errors) {
                    alert(response.data.alert);
                } else {
                    this.props.history.push("/users/login");
                }
            })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={this.handleChange}
                />
                <input
                    type="email"
                    placeholder="email"
                    id="email"
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={this.handleChange}
                />
                <input type="submit" />
            </form>
        )
    }
}