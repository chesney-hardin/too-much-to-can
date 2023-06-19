import { useState } from "react"
import { PostSearch } from "./PostSearch"
import { PostList } from "./PostList"

export const PostSearchParent = () => {
    const [searchTerms, setSearchTerms] = useState("")
    const [advancedSearch, setAdvancedSearch] = useState({
        chosenCrop: 0,
        chosenCounty: 0
    })
    const [sortByDate, setByDate] = useState(false)
   

    return <>
        <PostSearch setterFunction={setSearchTerms} advancedSearchFunction={setAdvancedSearch} setByDate={setByDate}/>
        <PostList searchTermState={searchTerms} advancedSearch={advancedSearch} sortByDate={sortByDate}/>
    </>
}