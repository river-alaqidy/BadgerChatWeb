import React, { useRef, useState, useContext, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    function handleLogin(e) {
        e?.preventDefault();
        if (username.current.value == "" || password.current.value == "") {
            alert("You must provide both a username and password!")
            return;
        } else {
            fetch("https://cs571.org/api/s24/hw6/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.current.value,
                    password: password.current.value
                })
            }).then(res => {
                if (res.status === 401) {
                    alert("Incorrect username or password!");
                }
                if (res.status === 200) {
                    alert("Login was successful!")
                    navigate("/");
                    sessionStorage.setItem("loginStatus", username.current.value)
                    setLoginStatus(sessionStorage.getItem("loginStatus"));
                }

            })
        }
    }

    return <>
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control 
                id="usernameInput" 
                ref={username}>
            </Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control 
                id="passwordInput" 
                type="password" 
                ref={password}>
            </Form.Control>
            <br/>
            <Button type="submit" onClick={handleLogin}>Login</Button>
        </Form>
    </>
}
