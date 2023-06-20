import { useEffect, useState } from "react"

export const InboxCount = () => {
    const [messages, setMessages] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages?recipientId=${currentUser.id}`)
                .then(response => response.json())
                .then((arrayOfMessages) => {
                    setMessages(arrayOfMessages)
                })
        },
        []
    )

    return <div>
        Inbox <strong className="inboxCount">{messages.length}</strong>
    </div>
}