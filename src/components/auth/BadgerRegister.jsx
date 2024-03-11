import React, { useState, useContext } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();
    
    function handleRegister(e) {
        e?.preventDefault();
        if (username == "" || password == "") {
            alert("You must provide both a username and password!");
            return;
        } else if (password !== repeatPassword) {
            alert("Your passwords do not match!");
            return;
        } else {
            
            fetch("https://cs571.org/api/s24/hw6/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => {
                if (res.status === 409) {
                    alert("That username has already been taken!");
                }
                if (res.status === 200) {
                    alert("Registration was successful!")
                    navigate("/");
                    sessionStorage.setItem("loginStatus", username)
                    setLoginStatus(sessionStorage.getItem("loginStatus"));
                }
            })
        }

        setUsername("");
        setPassword("");
        setRepeatPassword("");
    }

    return <>
        <h1>Register</h1>
        <Form onSubmit={handleRegister}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control 
                id="usernameInput" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}>
            </Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control 
                id="passwordInput" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
            <Form.Label htmlFor="repeatPasswordInput">Repeat Password</Form.Label>
            <Form.Control 
                id="repeatPasswordInput" 
                type="password" 
                value={repeatPassword} 
                onChange={(e) => setRepeatPassword(e.target.value)}>
            </Form.Control>
            <br/>
            <Button type="submit" onClick={handleRegister}>Register</Button>
        </Form>
    </>
}
