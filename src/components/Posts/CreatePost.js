import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreatePost = () => {
    const [cropTypes, setCropTypes] = useState([])
    const [counties, setCounties] = useState([])

    const [post, setPost] = useState({
        countyId: 0,
        dateAvailableTil: "",
        dateCreated: "",
        trade: false,
        userId: 0,
        description: "",
        photoURL: "",
        cropTypeId: 0,
        title: ""
    })

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    const navigate = useNavigate()

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


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const postToSendToAPI =
        {
            countyId: 0,
            dateAvailableTil: "",
            dateCreated: "",
            trade: false,
            userId: currentUser.id,
            description: "",
            photoURL: "",
            cropTypeId: 0,
            title: ""
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/yourposts")
            })
    }

    return <form className="messageForm">

        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    required autoFocus
                    type="text"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    placeholder="Title for your post..."
                    value={post.title}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.title = evt.target.value
                            setPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="availableTil">Pick up before:</label>
                <input
                    required autoFocus
                    type="date"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    value={post.dateAvailableTil}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.dateAvailableTil = evt.target.value
                            setPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="dateCreated">Today's Date:</label>
                <input
                    required autoFocus
                    type="date"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    value={post.dateCreated}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.dateCreated = evt.target.value
                            setPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Looking to Trade?</label>
                <input type="checkbox"
                    value={post.trade}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.trade = evt.target.checked
                            setPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                    required autoFocus
                    type="text"
                    style={{
                        height: "5rem"
                    }}
                    className="form-control"
                    placeholder="Amount, variety, etc..."
                    value={post.description}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.description = evt.target.value
                            setPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="photo">Photo:</label>
                <input
                    required autoFocus
                    type="text"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    placeholder="Link to a photo of your goodies..."
                    value={post.photoURL}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.photoURL = evt.target.value
                            setPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="cropType">"Crop" Type:</label>
                <select value={post.cropTypeId}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.cropTypeId = JSON.parse(evt.target.value)
                            setPost(copy)
                        }
                    } >
                    <option value="0">Select Crop Type</option>
                    {cropTypes.map((cropType) =>
                        <option value={cropType.id}>{cropType.name}</option>
                    )}

                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="counties">County:</label>
                <select value={post.countyId}
                    onChange={
                        (evt) => {
                            const copy = { ...post }
                            copy.countyId = JSON.parse(evt.target.value)
                            setPost(copy)
                        }
                    } >
                    <option value="0">Select Crop Type</option>
                    {counties.map((county) =>
                        <option value={county.id}>{county.name}</option>
                    )}

                </select>
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary"
        >Send</button>

    </form>

}
