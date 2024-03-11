import React from "react"
import { Button, Card } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    function handleDelete(e) {
        e?.preventDefault();
        fetch(`https://cs571.org/api/s24/hw6/messages?id=${props.id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            }  
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully deleted the post!");
                props.delete();
            }
        })
    }

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            props.poster === sessionStorage.getItem("loginStatus") ? 
            <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
            : ""
        }
    </Card>
}

export default BadgerMessage;