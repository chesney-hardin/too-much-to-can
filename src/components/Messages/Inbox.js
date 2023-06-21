import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Inbox.css"

export const Inbox = () => {
    const [messages, setMessages] = useState([])
    const [sortedMessages, setSortedMessages] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages?recipientId=${currentUser.id}&_expand=user&_expand=post`)
                .then(response => response.json())
                .then((arrayOfMessages) => {
                    setMessages(arrayOfMessages)
                })
        },
        []
    )

    useEffect(
        () => {
            if (messages.lenght !== 0) {
                const newestMessagesFirst = messages.sort((a, b) => b.id - a.id)
                setSortedMessages(newestMessagesFirst)
            }
        },
        [messages]
    )

    const deleteMessage = (message) => {
        fetch(`http://localhost:8088/messages/${message.id}`, {
            method: "DELETE",
        })
            .then(renderAllYourMessages)

    }

    const renderAllYourMessages = () => {
        fetch(`http://localhost:8088/messages?recipientId=${currentUser.id}&_expand=user&_expand=post`)
            .then(response => response.json())
            .then((arrayOfMessages) => {
                setMessages(arrayOfMessages)
            })
    }

    return <section className="inbox">
        <h1>Your Messages:</h1>
        <article className="messages">
            {
                sortedMessages.map(message => {
                    return <section key={`message--${message.id}`} className={`message replied--${message.replied}`}>
                        <div className="message--div">
                            <h3>From:</h3>
                            <div>{message?.user?.username}</div>
                        </div>
                        <div className="message--div">
                            <h3>Post Title:</h3>
                            <Link className="postTitle__link" to={`/posts/${message?.post?.id}`}>{message?.post?.title}</Link>
                        </div>
                        <div className="message--div">
                            <h3>Message:</h3>
                            <div>{message?.text}</div>
                        </div>
                        <div className="message--icons">
                            <div>{message.replied
                                ? <div className="repliedNotice">You have replied to this message</div>
                                : ""}
                            </div>

                            <img className="replyMessageIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fpreview%2Fgreen%2Fmessage-outline-xxl.png&f=1&nofb=1&ipt=7ea8ccc6b7721ea41e488477b799a9c6e8fa996a43fb3a204576ca9024924c49&ipo=images" alt="send message"
                                onClick={() => { navigate(`/replymessage/${message?.id}`) }} />
                            <img className="deleteMessageIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fbasic-ui-elements-color%2F700%2F010_trash-2-512.png&f=1&nofb=1&ipt=c999eb42090a6b28e04bcf294487ee440f1dd22a683d351fbf954e9d8f848a43&ipo=images" alt="delete message"
                                onClick={() => { deleteMessage(message) }} />
                        </div>
                    </section>

                })

            }

        </article>
    </section>
}