import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./IndividualPost.css"

export const IndividualPost = () => {
    const { postId } = useParams()
    const [post, setPost] = useState(
        {
            id: 0,
            countyId: 0,
            dateAvailableTil: "",
            dateCreated: "",
            trade: false,
            userId: 0,
            description: "",
            photoURL: "",
            cropTypeId: 0,
            title: ""
        }
    )
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))

    useEffect(
        () => {
            if (postId) {
                fetch(`http://localhost:8088/posts?id=${postId}&_expand=county&_expand=cropType&_expand=user`)
                    .then(response => response.json())
                    .then((postObject) => {
                        const postToView = postObject[0]
                        setPost(postToView)
                    })
            }

        },
        [postId]
    )

    return <>
        <section className="post">
            <header>{post?.title}</header>
            <img className="postPhoto" src={post?.photoURL} alt="photo of produce" />
            <ul>
                <li>County: {post?.county?.name}</li>
                <li>Pick Up Before: {post?.dateAvailableTil}</li>
                <li>Posted By: {post?.user?.username}</li>
                <li> {
                    post?.trade
                        ? `Looking to trade`
                        : `Available to anyone- no trade necessary`
                    }</li>
                <li>Description: {post?.description}</li>
            </ul>
            {
                post?.userId !== currentUser.id
                   ? <img className="sendMessageIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F361-3618042_transparent-envelope-icon-png-circle-email-logo-png.png&f=1&nofb=1&ipt=9512d26463a4b5eb6ce48a981247c36a3e6a3d7284d6c1454f4a2feaed53bbc6&ipo=images" alt="send message"
                onClick={() => { navigate(`/createmessage/${post.id}`) }} />
                : ""
            }
            </section></>
             
}
 // Add onClick={} to send message icon to route to create a message page
