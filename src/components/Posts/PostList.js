import { useEffect, useState } from "react"
import "./PostList.css"
import { Link } from "react-router-dom"

export const PostList = ({ searchTermState }) => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    
    
    useEffect(
        () => {
            const searchedPosts = posts.filter(post => {
                return post.description.toLowerCase().includes(searchTermState.toLowerCase())
                || post.title.toLowerCase().includes(searchTermState.toLowerCase())
            })
            setFilteredPosts(searchedPosts)
        },
        [searchTermState]
    )


    useEffect(
        ()=> {
            fetch("http://localhost:8088/posts")
            .then(response => response.json())
            .then((arrayOfPosts) => {
                setPosts(arrayOfPosts)
            })
        },
        []
    )

    useEffect(
        ()=> {
            if(posts.length !== 0) {
                const nonUsersPosts = posts.filter(post => {
                    return post?.userId !== currentUser.id
                })
                setFilteredPosts(nonUsersPosts)
            }
        },
        [posts]
    )

    
    return <>
    <article className= "posts">
        {
            filteredPosts.map(post => {
                return <section className="post" key={`post--${post.id}`}>
                    <Link className="post__link" to={`/posts/${post.id}`}>{post.title}</Link>
                    <img className="postPhoto" src={post.photoURL} alt="photo of produce"/>
                    
                </section>
            } )
        }
    </article>
    </>
}

//onClick={() => { navigate(`/posts/${post.id}`) }}