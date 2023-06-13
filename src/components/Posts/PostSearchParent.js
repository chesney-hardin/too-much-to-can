import { useState } from "react"
import { PostSearch } from "./PostSearch"
import { PostList } from "./PostList"

export const PostSearchParent = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <PostSearch setterFunction={setSearchTerms}/>
        <PostList searchTermState={searchTerms}/>
    </>
}