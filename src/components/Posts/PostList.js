import { useEffect, useState } from "react"
import "./PostList.css"

export const PostList = ({ searchTermState }) => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    
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
                setFilteredPosts(posts)
            }
        },
        [posts]
    )
    
    return <>
    <article className= "posts">
        {
            filteredPosts.map(post => {
                return <section className="post">
                    <header>{post.title}</header>
                    <img src={post.photoURL} alt="photo of produce"/>

                </section>
            } )
        }
    </article>
    </>
}