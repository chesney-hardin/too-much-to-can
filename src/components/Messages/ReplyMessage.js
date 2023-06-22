import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./CreateMessage.css"

export const ReplyMessage = () => {
    const { messageId } = useParams()
    const [receivedMessage, setReceivedMessage] = useState({})
    const [messageToSend, setMessageToSend] = useState({
        userId: 0,
        recipientId: 0,
        text: "",
        postId: 0,
        replied: false
    })

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    const navigate = useNavigate()

    useEffect(
        () => {
            if (messageId) {
                fetch(`http://localhost:8088/messages?id=${messageId}&_expand=user&_expand=post`)
                    .then(response => response.json())
                    .then((messageArray) => {
                        const messageToReplyTo = messageArray[0]
                        setReceivedMessage(messageToReplyTo)
                    })
            }

        },
        [messageId]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const modifiedReceivedMessage =
        {
            userId: receivedMessage.userId,
            recipientId: receivedMessage.recipientId,
            text: receivedMessage.text,
            postId: receivedMessage.postId,
            replied: true,
            id: receivedMessage.id
        }
        const messageToSendToAPI =
        {
            userId: currentUser.id,
            recipientId: receivedMessage.user.id,
            text: messageToSend.text,
            postId: receivedMessage.post.id,
            replied: false
        }


        fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modifiedReceivedMessage)
        })
            .then(response => response.json())

            .then(() => {
                return fetch(`http://localhost:8088/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageToSendToAPI)
                })
                    .then(response => response.json())
                    .then(() => {
                        navigate("/inbox")
                    })
            }
            )
    }

    return <div className="replyMessage-parent">
        <h1>Reply Message:</h1>
        <section className="replyMessage-container">
            <section className="receivedMessage">
                <div className="message--div">
                    <h3>From:</h3>
                    <div>{receivedMessage?.user?.username}</div>
                </div>
                <div className="message--div">
                    <h3>Post Title:</h3>
                    <Link className="postTitle--link" to={`/posts/${receivedMessage?.post?.id}`}>{receivedMessage?.post?.title}</Link>
                </div>
                <div className="message--div">
                    <h3>Message:</h3>
                    <div>{receivedMessage?.text}</div>
                </div>
            </section>


            <form className="replyMessage">
                <fieldset>
                    <div className="replyMessage-group">
                        <label>Reply:</label>
                        <textarea
                            required autoFocus
                            type="text"
                            style={{
                                height: "10rem"
                            }}
                            className="form-control"
                            placeholder="Reply to message..."
                            value={messageToSend?.text}
                            onChange={
                                (evt) => {
                                    const copy = { ...messageToSend }
                                    copy.text = evt.target.value
                                    setMessageToSend(copy)
                                }
                            }></textarea>
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="sendMessage-btn"
                >Send</button>

            </form>
        </section>
    </div>
}

