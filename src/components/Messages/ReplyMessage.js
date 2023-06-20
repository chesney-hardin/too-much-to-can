import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

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

            .then( () => {
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

    return <>
        <section className="receivedMessage">
            <div>From: {receivedMessage?.user?.username}</div>
            <div>Post Title:
                <Link className="postTitle__link" to={`/posts/${receivedMessage?.post?.id}`}>{receivedMessage?.post?.title}</Link>
            </div>
            <div>Message: {receivedMessage?.text}</div>
        </section>


        <form>
            <fieldset>
                <div className="form-group">
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
                className="btn btn-primary"
            >Send</button>

        </form>
    </>

}

