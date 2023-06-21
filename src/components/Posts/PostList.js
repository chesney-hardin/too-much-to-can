import { useEffect, useState } from "react"
import "./PostList.css"
import { PostListJSX } from "./PostListJSX"

export const PostList = ({ searchTermState, advancedSearch, sortByDate }) => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))


    useEffect(
        () => {
            if (advancedSearch.chosenCounty === 0 && advancedSearch.chosenCrop === 0) {
                const searchedPosts = posts.filter(post => {
                    return post.description.toLowerCase().includes(searchTermState.toLowerCase())
                        || post.title.toLowerCase().includes(searchTermState.toLowerCase())
                })
                setFilteredPosts(searchedPosts)
            }
            else if (advancedSearch.chosenCounty !== 0 && advancedSearch.chosenCrop === 0) {
                const searchedPosts = posts.filter(post => {
                    return post.countyId === advancedSearch.chosenCounty
                })
                setFilteredPosts(searchedPosts)
            }
            else if (advancedSearch.chosenCounty === 0 && advancedSearch.chosenCrop !== 0) {
                const searchedPosts = posts.filter(post => {
                    return post.cropTypeId === advancedSearch.chosenCrop
                })
                setFilteredPosts(searchedPosts)
            }
            else if (advancedSearch.chosenCounty !== 0 && advancedSearch.chosenCrop !== 0) {
                const searchedPosts = posts.filter(post => {
                    return post.cropTypeId === advancedSearch.chosenCrop
                        && post.countyId === advancedSearch.chosenCounty
                })
                setFilteredPosts(searchedPosts)
            }
        },
        [searchTermState, advancedSearch]
    )


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

    useEffect(
        () => {
            if (posts.length !== 0) {
                const nonUsersPosts = posts.filter(post => {
                    return post?.userId !== currentUser.id
                })
                if (sortByDate) {
                    const postsToSort = [...nonUsersPosts].sort((a, b) => {
                        const dateA = new Date(a.dateCreated)
                        const dateB = new Date(b.dateCreated)
                        return dateB - dateA;
                    })
                    setFilteredPosts(postsToSort)
                }
                else {
                    setFilteredPosts(nonUsersPosts)
                }
            }
        },
        [posts, sortByDate]
    )
    useEffect(
        () => {
            <PostListJSX filteredPosts={filteredPosts} />
        },
        [filteredPosts]
    )

    return <>
        <PostListJSX filteredPosts={filteredPosts} />
    </>
}
