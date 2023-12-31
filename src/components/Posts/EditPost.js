import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./CreatePost.css"

export const EditPost = () => {
    const { postId } = useParams()
    const [cropTypes, setCropTypes] = useState([])
    const [counties, setCounties] = useState([])
    const [updatedPost, setUpdatedPost] = useState({
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

    useEffect(
        () => {
            if (postId) {
                fetch(`http://localhost:8088/posts?id=${postId}`)
                    .then(response => response.json())
                    .then((postArray) => {
                        const postToEdit = postArray[0]
                        setUpdatedPost(postToEdit)
                    })
            }

        },
        [postId]
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/yourposts")
            })
    }

    return <section className="editPost-container">
    <section className="editPost-parent">
        <h1>Edit Your Post:</h1>
        <form className="editPost">

        <fieldset>
            <div className="editPost-group">
                <label htmlFor="title">Title:</label>
                <input
                    required autoFocus
                    type="text"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    placeholder={updatedPost.title}
                    value={updatedPost.title}
                    onChange={
                        (evt) => {
                            const copy = { ...updatedPost }
                            copy.title = evt.target.value
                            setUpdatedPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="editPost-group">
                <label htmlFor="cropType">Crop Type:</label>
                <select value={updatedPost.cropTypeId}
                    onChange={
                        (evt) => {
                            const copy = { ...updatedPost }
                            copy.cropTypeId = JSON.parse(evt.target.value)
                            setUpdatedPost(copy)
                        }
                    } >
                    <option value="0">Select Crop Type</option>
                    {cropTypes.map((cropType) =>
                        <option key={`cropType--${cropType.id}`} value={cropType.id}>{cropType.name}</option>
                    )}

                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="editPost-group">
                <label htmlFor="counties">County:</label>
                <select value={updatedPost.countyId}
                    onChange={
                        (evt) => {
                            const copy = { ...updatedPost }
                            copy.countyId = JSON.parse(evt.target.value)
                            setUpdatedPost(copy)
                        }
                    } >
                    <option value="0">Select County</option>
                    {counties.map((county) =>
                        <option key={`county--${county.id}`} value={county.id}>{county.name}</option>
                    )}

                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="editPost-group">
                <label htmlFor="availableTil">Pick up before:</label>
                <input
                    required 
                    type="date"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    value={updatedPost.dateAvailableTil}
                    onChange={
                        (evt) => {
                            const copy = { ...updatedPost }
                            copy.dateAvailableTil = evt.target.value
                            setUpdatedPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="editPost-group">
                <label>Date Posted:</label>
                <input
                    required 
                    type="date"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    value={updatedPost.dateCreated}
                    onChange={
                        (evt) => {
                            const copy = { ...updatedPost }
                            copy.dateCreated = evt.target.value
                            setUpdatedPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="editPost-group">
                <label>Photo:</label>
                <input
                    required 
                    type="text"
                    style={{
                        height: "2rem"
                    }}
                    className="form-control"
                    placeholder="Link to a photo of your goodies..."
                    value={updatedPost.photoURL}
                    onChange={
                        (evt) => {
                            const copy = { ...updatedPost }
                            copy.photoURL = evt.target.value
                            setUpdatedPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="editPost-group">
                <label>Looking to Trade?</label>
                <input type="checkbox"
                    value={updatedPost.trade}
                    checked={updatedPost.trade}
                    onChange={
                        (evt) => {
                            const copy = { ...updatedPost }
                            copy.trade = evt.target.checked
                            setUpdatedPost(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="editPost-group">
                <label>Description:</label>
                <textarea
                    required 
                    style={{
                        height: "5rem"
                    }}
                    className="form-control"
                    value={updatedPost.description}
                    onChange={
                        (evt) => {
                            const copy = { ...updatedPost }
                            copy.description = evt.target.value
                            setUpdatedPost(copy)
                        }
                    }>
                    </textarea>
            </div>
        </fieldset>
        <div className="update-post-btn-div">
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="update-post-btn"
            >Update Post</button>
        </div>
    </form>
</section>
</section>
}
