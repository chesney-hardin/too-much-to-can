import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const EditProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        countyId: 0,
        username: ""
    })
    const [counties, setCounties] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${currentUser.id}`)
                .then(response => response.json())
                .then((userToView) => {
                    setUser(userToView)
                })
            fetch("http://localhost:8088/counties")
                .then(response => response.json())
                .then((countiesArray) => {
                    setCounties(countiesArray)
                })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/users/${currentUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then((user) => {
                localStorage.setItem("tomato_user", JSON.stringify({
                    id: user.id,
                    name: user.name,
                    username: user.username
                }))
            })
            .then(() => {
                navigate("/profile")
            })
    }


    return <>
        <form className="editProfileForm">
            <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        style={{
                            height: "2rem"
                        }}
                        className="form-control"
                        placeholder={user.name}
                        value={user.name}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.name = evt.target.value
                                setUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        style={{
                            height: "2rem"
                        }}
                        className="form-control"
                        placeholder={user.email}
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                setUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        required autoFocus
                        type="text"
                        style={{
                            height: "2rem"
                        }}
                        className="form-control"
                        placeholder={user.password}
                        value={user.password}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.password = evt.target.value
                                setUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        required autoFocus
                        type="text"
                        style={{
                            height: "2rem"
                        }}
                        className="form-control"
                        placeholder={user.username}
                        value={user.username}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.username = evt.target.value
                                setUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>County:</label>
                    <select value={user.countyId}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.countyId = JSON.parse(evt.target.value)
                                setUser(copy)
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
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn saveProfileButton"
                >Save</button>
            </fieldset>
        </form>
    </>
}