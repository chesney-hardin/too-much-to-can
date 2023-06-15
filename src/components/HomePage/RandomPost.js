import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RandomPost.css"

export const RandomPost = () => {
    const [posts, setPosts] = useState([])
    const [randomPost, setRandomPost] = useState({})

    useEffect(
        () => {
            fetch("http://localhost:8088/posts")
                .then(response => response.json())
                .then((arrayOfPosts) => {
                    setPosts(arrayOfPosts)
                })
        },
        []
    )
    useEffect(()=>{
        if(posts.length !=0) {
        createRandomPost()
        }
    },
    [posts]
) 

    const createRandomPost = () => {
        const randomIndex = Math.floor(Math.random() * posts.length)
        const randomPostObject = posts[randomIndex]
        setRandomPost(randomPostObject)
        console.log(randomPost)
    }




    return <>
        {
            randomPost.id ?
                <section className="randomPost" key={`randomPost--${randomPost?.id}`}>
                    <Link className="randomPost__link" to={`/posts/${randomPost?.id}`}>{randomPost?.title}</Link>
                    <img className="randomPostPhoto" src={randomPost.photoURL} alt="photo of produce" />
                </section>
                : null
        }

    </>

}


