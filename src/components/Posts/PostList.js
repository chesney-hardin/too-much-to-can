import { useEffect, useState } from "react"
import "./PostList.css"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    
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
    
    return <>
    <article className= "posts">
        {
            posts.map(post => {
                return <section className="post">
                    <header>{post.title}</header>
                    <img src={post.photoURL} alt="photo of produce"/>

                </section>
            } )
        }
    </article>
    </>
}