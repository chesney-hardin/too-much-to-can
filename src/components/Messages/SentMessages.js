import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Inbox.css"

export const SentMessages = () => {
    const [sentMessages, setSentMessages] = useState([])
    const [sortedSentMessages, setSortedSentMessages] = useState([])
    const [users, setUsers] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages?userId=${currentUser.id}&_expand=user&_expand=post`)
                .then(response => response.json())
                .then((arrayOfMessages) => {
                    setSentMessages(arrayOfMessages)
                })
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((users) => {
                    setUsers(users)
                })
        },
        []
    )

    useEffect(
        () => {
            if (sentMessages.length !== 0) {
                const newestMessagesFirst = sentMessages.sort((a, b) => b.id - a.id)
                setSortedSentMessages(newestMessagesFirst)
            }
        },
        [sentMessages]
    )


    return <section className="inbox">
        <h1>Your Sent Messages:</h1>
        <button className="inbox__btn" onClick={() => { navigate(`/inbox`) }}>Back To Inbox</button>
        <article className="messages">
            {
                sortedSentMessages.map(message => {
                    const recipient = users.find(user => {
                        return message?.recipientId === user.id
                    })
                    return <section key={`message--${message.id}`} className={`message`}>
                        <div className="message--div">
                            <h3>To:</h3>
                            <div>{recipient?.username}</div>
                        </div>
                        <div className="message--div">
                            <h3>Post Title:</h3>
                            <Link className="postTitle__link" to={`/posts/${message?.post?.id}`}>{message?.post?.title}</Link>
                        </div>
                        <div className="message--div">
                            <h3>Message:</h3>
                            <div>{message?.text}</div>
                        </div>
                    </section>

                })

            }

        </article>
    </section>
}