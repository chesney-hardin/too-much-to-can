import { useEffect, useState } from "react"
import "./PostSearch.css"

export const PostSearch = ({ setterFunction, advancedSearchFunction, setByDate }) => {
    const [advancedSearch, setAdvancedSearch] = useState(false)
    const [cropTypes, setCropTypes] = useState([])
    const [chosenCrop, setChosenCrop] = useState(0)
    const [counties, setCounties] = useState([])
    const [chosenCounty, setChosenCounty] = useState(0)
    const [sortDate, setSortDate] = useState(false)
    


    useEffect(
        () => {
            fetch("http://localhost:8088/counties")
                .then(response => response.json())
                .then((countiesArray) => {
                    setCounties(countiesArray)
                })

            fetch("http://localhost:8088/cropTypes")
                .then(response => response.json())
                .then((cropTypesArray) => {
                    setCropTypes(cropTypesArray)
                })


        },
        []
    )


    const seeAllPostsButton = () => {
        setAdvancedSearch(false)
        setChosenCounty(0)
        setChosenCrop(0)
        setSortDate(false)
    }

    useEffect(
        () => {
            advancedSearchFunction({ chosenCrop, chosenCounty })
        },
        [chosenCrop, chosenCounty]
    )

    useEffect(
        () => {
            setByDate(sortDate)
        },
        [sortDate]
        )


    return <>
        {
            advancedSearch ?
                <>
                    <form className="advancedSearch--form">
                        <fieldset>
                            <div className="form-group">
                                <label>Sort By Newest</label>
                                <input type="checkbox"
                                    //value={sortDate}
                                    onChange={
                                        (evt) => {
                                            setSortDate(evt.target.checked)
                                        }
                                    } />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label>Crop Type:</label>
                                <select
                                    value={chosenCrop.id}
                                    onChange={
                                        (evt) => {
                                            setChosenCrop(JSON.parse(evt.target.value))
                                        }
                                    } >
                                    <option value="0">Select Crop Type</option>
                                    {cropTypes.map((cropType) =>
                                        <option key={`cropSearch--${cropType.id}`} value={cropType.id}>{cropType.name}</option>
                                    )}

                                </select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label>County:</label>
                                <select value={chosenCounty.id}
                                    onChange={
                                        (evt) => {
                                            setChosenCounty(JSON.parse(evt.target.value))
                                        }
                                    } >
                                    <option value="0">Select County</option>
                                    {counties.map((county) =>
                                        <option key={`county--${county.id}`} value={county.id}>{county.name}</option>
                                    )}

                                </select>
                            </div>
                        </fieldset>
                    </form>
                    <button className="seeAllPosts-btn" onClick={seeAllPostsButton}>See All Posts</button>
                </>
                : <div className="search">
                    <input
                        className="search--input"
                        onChange={
                            (changeEvent) => {
                                setterFunction(changeEvent.target.value)
                            }
                        }
                        type="text" placeholder="Enter search terms" />

                    <button className="advancedSearch-btn" onClick={() => { setAdvancedSearch(true) }}>Advanced Search</button>
                </div>
        }
    </>

}