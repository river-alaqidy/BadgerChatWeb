import React, { useEffect, useState, useContext, useRef } from "react"
import BadgerMessage from "./BadgerMessage";
import { Col, Container, Row, Pagination, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const postTitle = useRef();
    const postContent = useRef();

    const deletePost = () => {
        loadMessages();
    }

    const loadMessages = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=${activePage}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    function handlePost(e) {
        e?.preventDefault();
        if (postTitle.current.value == "" || postContent.current.value == "") {
            alert("You must provide both a title and content!");
            return;
        } else {
            fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: postTitle.current.value,
                    content: postContent.current.value
                })
            }).then(res => {
                if (res.status === 200) {
                    alert("Successfully posted!")
                    loadMessages();
                }
            })
        }
    }


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, activePage]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            loginStatus ? <>
            <Form onSubmit={handlePost}>
                <Form.Label htmlFor="titleInput">Post Title</Form.Label>
                <Form.Control 
                    id="titleInput" 
                    ref={postTitle}>
                </Form.Control>
                <Form.Label htmlFor="passwordInput">Post Content</Form.Label>
                <Form.Control 
                    id="titleInput" 
                    ref={postContent}>
                </Form.Control>
                <br/>
                <Button type="submit" onClick={handlePost}>Create Post</Button>
                </Form>
            </> 
        : <><p>You must be logged in to post!</p></>
            
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                <Container>
                    <Row>
                    {
                        messages.map((message) => {
                            return (    
                                <Col key={message.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <BadgerMessage  {...message} delete={deletePost}/>
                                </Col>   
                            );})
                    }
                    </Row>
                </Container>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination>
            <Pagination.Item key={1} active={activePage === 1} onClick={() => setActivePage(1)}>1</Pagination.Item>
            <Pagination.Item key={2} active={activePage === 2} onClick={() => setActivePage(2)}>2</Pagination.Item>
            <Pagination.Item key={3} active={activePage === 3} onClick={() => setActivePage(3)}>3</Pagination.Item>
            <Pagination.Item key={4} active={activePage === 4} onClick={() => setActivePage(4)}>4</Pagination.Item>
        </Pagination>
    </>
}
