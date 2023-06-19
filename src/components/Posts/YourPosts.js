import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./YourPosts.css"

export const YourPosts = () => {
    const [posts, setPosts] = useState([])
    const [sortedPosts, setSorted] = useState([])
    const [sortByDate, setByDate] = useState(false)
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


    useEffect(
        ()=> {
            if(sortByDate) {
                const postsToSort = [...posts].sort((a, b) => {
                    const dateA = new Date(a.dateCreated)
                    const dateB = new Date(b.dateCreated)
                    return dateA - dateB;
                })
                setSorted(postsToSort)
            }
            else{
                setSorted(posts)}

        },
        [posts, sortByDate]
    )

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }


    return <>
        <div className="form-group">
            <label>Sort By Oldest Post</label>
            <input type="checkbox"
                value={sortByDate}
                onChange={
                    (evt) => {
                        setByDate(evt.target.checked)
                    }
                } />
        </div>
        <article className="posts">
            {
                sortedPosts.map(post => {
                    return <section className="post" key={`post--${post.id}`}>
                        <Link className="post__link" to={`/posts/${post.id}`}>{post.title}</Link>
                        <div>Date Posted: {formatDate(post.dateCreated)}</div>
                        <img className="postPhoto" src={post.photoURL} alt="photo of produce" />
                        <img className="editPostIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1yUH3mIs0Em_iY6RkTztzAHaHa%26pid%3DApi&f=1&ipt=42e7e1566b75a8ce3647acfa4b1c8da58776f3787cb14d35d6f7cc3d857442a7&ipo=images" alt="edit post"
                            onClick={() => { navigate(`/editpost/${post.id}`) }} />
                        <img className="deletePostIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.WYJg_e2tOPf1eAHMG-h8UgHaHa%26pid%3DApi&f=1&ipt=6205f7ec3ea45406318651bb20b8da54383ac143cfca7a62d6511aaaaf0d053a&ipo=images" alt="delete post"
                            onClick={() => { deletePost(post) }} />
                    </section>
                })
            }
        </article>
    </>
}
