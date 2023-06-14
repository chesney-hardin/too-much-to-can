import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Inbox.css"

export const Inbox = () => {
    const[messages, setMessages] = useState([])
    
    //const[filteredMessages, setFilteredMessages] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    const navigate = useNavigate()

    useEffect(
        ()=> {
            fetch(`http://localhost:8088/messages?recipientId=${currentUser.id}&_expand=user&_expand=post`)
            .then(response => response.json())
            .then((arrayOfMessages) => {
                setMessages(arrayOfMessages)
            })
        },
        []
    )

    return <article className="messages">
        {
            messages.map(message => {
                return <section key={`message--${message.id}`} className="message">
                    <div>From: {message?.user?.username}</div>
                    <div>Post Title: {message?.post?.title}</div>
                    <div>Message: {message?.text}</div>

                    <img className="sendMessageIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F361-3618042_transparent-envelope-icon-png-circle-email-logo-png.png&f=1&nofb=1&ipt=9512d26463a4b5eb6ce48a981247c36a3e6a3d7284d6c1454f4a2feaed53bbc6&ipo=images" alt="send message"
                onClick={() => { navigate(`/replymessage/${message?.id}`) }} />
                </section>
                
            })
            
        }

    </article>
}