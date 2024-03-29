import React from "react";
import axios from "../config/config";

export default class Logout extends React.Component {
    componentDidMount() {
        axios.delete("/users/logout", {
            headers: {
                "x-auth": localStorage.getItem("userAuthToken")
            }
        })
        .then(response => {
            localStorage.removeItem("userAuthToken")
            this.props.handleAuth(false)
            this.props.history.push("/users/login")
        })
        .catch(err => {
            this.props.history.push("/users/login")
        })
    }

    render() {
        return(
            <div>Logging out...</div>
        );
    }
}