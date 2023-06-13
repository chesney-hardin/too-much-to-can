import { useEffect, useState } from "react"

export const Inbox = () => {
    const[messages, setMessages] = useState([])
    //const[filteredMessages, setFilteredMessages] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))

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
                return <section className="message">
                    <div>From: {message?.user?.username}</div>
                    <div>Post Title: {message?.post?.title}</div>
                    <div>Description: {message?.text}</div>
                </section>
            })
        }

    </article>
}