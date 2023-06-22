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
        () => {
            if (sortByDate) {
                const postsToSort = [...posts].sort((a, b) => {
                    const dateA = new Date(a.dateCreated)
                    const dateB = new Date(b.dateCreated)
                    return dateA - dateB;
                })
                setSorted(postsToSort)
            }
            else {
                setSorted(posts)
            }

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


    return <section className="yourposts">
        <h1>Your Posts:</h1>
        <div className="sortOldest">
            <label>Sort By Oldest</label>
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
                        <img className="postPhoto" src={post.photoURL} alt="photo of produce" />
                        <div className="post-date">Posted: {formatDate(post.dateCreated)}</div>
                        <div className="icons-div">
                            <img className="editPostIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.psrgInv2Fjtk6Oj2nGqB_gHaFC%26pid%3DApi&f=1&ipt=43f0ce55ccbf6f8d7559b0331d7c9aa4bf5c3d3689c154f5c08edcf3e003e124&ipo=images" alt="edit post"
                                onClick={() => { navigate(`/editpost/${post.id}`) }} />
                            <img className="deletePostIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fbasic-ui-elements-color%2F700%2F010_trash-2-512.png&f=1&nofb=1&ipt=c999eb42090a6b28e04bcf294487ee440f1dd22a683d351fbf954e9d8f848a43&ipo=images" alt="delete post"
                                onClick={() => { deletePost(post) }} />
                        </div>
                    </section>
                })
            }
        </article>
    </section>
}
