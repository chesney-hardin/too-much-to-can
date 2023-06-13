import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CreateMessage = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [message, setMessage]=useState({
            senderId: 0,
            recipientId: 0,
            text: "",
            postId: 0
    })

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))

    useEffect(
        () => {
            if (postId) {
                fetch(`http://localhost:8088/posts?id=${postId}&_expand=county&_expand=cropType&_expand=user`)
                    .then(response => response.json())
                    .then((postObject) => {
                        const postToReply = postObject[0]
                        setPost(postToReply)
                    })
            }

        },
        [postId]
    )

    return <form className="messageForm">

        <fieldset>
            <div className="form-group">
                <label htmlFor="recipient">To:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    value={post?.user?.username}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.user.username = evt.target.value
                            setPost(copy)
                        }
                    }>{post?.user?.username}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="postTitle">Post Title:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    value={post?.title}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.title = evt.target.value
                            setPost(copy)
                        }
                    }>{post?.title}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    placeholder="Reply to post"
                    value={message?.text}
                    onChange={
                        (evt) => {
                            const copy = { ...message }
                            copy.text = evt.target.value
                            setMessage(copy)
                        }
                    }></textarea>
            </div>
        </fieldset>
        <button>Send</button>

    </form>

}

/* <fieldset>
        <div className="form-group">
            <label htmlFor="name">Emergency:</label>
            <input type="checkbox"
                value={ticket.emergency}
                onChange={
                    (evt) => {
                        const copy = { ...ticket }
                        copy.emergency = evt.target.checked
                        assignTicket(copy)
                    }
                } />
        </div>
    </fieldset>
    <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Save Edits
    </button> */