import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./YourPosts.css"

export const YourPosts = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))




    useEffect(
        () => {
            fetch(`http://localhost:8088/posts?userId=${currentUser.id}`)
                .then(response => response.json())
                .then((arrayOfPosts) => {
                    setPosts(arrayOfPosts)
                })
        },
        []
    )

    const deletePost = (post) => {
        fetch(`http://localhost:8088/posts/${post.id}`, {
            method: "DELETE",
        })
            .then(renderAllYourPosts)

    }
    
    const renderAllYourPosts = () => {
        fetch(`http://localhost:8088/posts?userId=${currentUser.id}`)
                .then(response => response.json())
                .then((arrayOfPosts) => {
                    setPosts(arrayOfPosts)
                })
    }



    return <>
        <article className="posts">
            {
                posts.map(post => {
                    return <section className="post">
                        <Link className="post__link" to={`/posts/${post.id}`}>{post.title}</Link>
                        <img className="postPhoto" src={post.photoURL} alt="photo of produce" />
                        <img className="editPostIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1yUH3mIs0Em_iY6RkTztzAHaHa%26pid%3DApi&f=1&ipt=42e7e1566b75a8ce3647acfa4b1c8da58776f3787cb14d35d6f7cc3d857442a7&ipo=images" alt="edit post"
                            onClick={() => { navigate(`/editpost/${post.id}`) }} />
                        <img className="deletePostIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.WYJg_e2tOPf1eAHMG-h8UgHaHa%26pid%3DApi&f=1&ipt=6205f7ec3ea45406318651bb20b8da54383ac143cfca7a62d6511aaaaf0d053a&ipo=images" alt="delete post"
                            onClick={() => {deletePost(post)}} />
                    </section>
                })
            }
        </article>
    </>
}
