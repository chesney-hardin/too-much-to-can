import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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

    return <article className="messages">
        {
            sortedMessages.map(message => {
                return <section key={`message--${message.id}`} className="message">
                    <div className="message--div">
                        <h3 className="message--header">From:</h3>
                        <div className="message--response">{message?.user?.username}</div>
                    </div>
                    <div className="message--div">
                        <h3 className="message--header">Post Title:</h3>
                        <div className="message--response">{message?.post?.title}</div>
                    </div>
                    <div className="message--div">
                        <h3 className="message--header">Message:</h3>
                        <div className="message--response">{message?.text}</div>
                    </div>
                    <div className="icons">
                        <img className="sendMessageIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F361-3618042_transparent-envelope-icon-png-circle-email-logo-png.png&f=1&nofb=1&ipt=9512d26463a4b5eb6ce48a981247c36a3e6a3d7284d6c1454f4a2feaed53bbc6&ipo=images" alt="send message"
                            onClick={() => { navigate(`/replymessage/${message?.id}`) }} />
                        <img className="deleteMessageIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.WYJg_e2tOPf1eAHMG-h8UgHaHa%26pid%3DApi&f=1&ipt=6205f7ec3ea45406318651bb20b8da54383ac143cfca7a62d6511aaaaf0d053a&ipo=images" alt="delete message"
                            onClick={() => { deleteMessage(message) }} />
                    </div>
                </section>

            })

        }

    </article>
}