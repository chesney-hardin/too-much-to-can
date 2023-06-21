import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ViewProfile.css"

export const ViewProfile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        countyId: 0,
        username: ""
    })
    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${currentUser.id}?_expand=county`)
                .then(response => response.json())
                .then((userToView) => {
                    setUser(userToView)
                })
        },
        []
    )

    return <div className="profile-div">
    <section className="profile">
        <div className="profile--list">
            <div className="profile--listItem">
                <h3 className="profile--header">Name:</h3>
                <div>{user.name}</div>
            </div>
            <div className="profile--listItem">
                <h3 className="profile--header">Username: </h3>
                <div>{user.username}</div>
            </div>
            <div className="profile--listItem">
                <h3 className="profile--header">Email: </h3>
                <div>{user.email}</div>
            </div>
            <div className="profile--listItem">
                <h3 className="profile--header">Password: </h3>
                <div>{user.password}</div>
            </div>
            <div className="profile--listItem">
                <h3 className="profile--header">County: </h3>
                <div>{user?.county?.name}</div>
            </div>
        </div>
        <img className="editProfileIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.psrgInv2Fjtk6Oj2nGqB_gHaFC%26pid%3DApi&f=1&ipt=43f0ce55ccbf6f8d7559b0331d7c9aa4bf5c3d3689c154f5c08edcf3e003e124&ipo=images" alt="edit post"
            onClick={() => { navigate(`/editprofile/${currentUser.id}`) }} />

    </section>
    </div>

    /* 
    Some code for adding a profile photo. Would need to add a property to user objects

        <div className="photo--icon">
            <img className="profilePhoto" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Fclipart-free-strawberry-16.png&f=1&nofb=1&ipt=588c2ddc9b3483266e0ce85fa2cf94e5668ef5b6957cd628a51a24962e4c757f&ipo=images"/>
            <img className="editProfileIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1yUH3mIs0Em_iY6RkTztzAHaHa%26pid%3DApi&f=1&ipt=42e7e1566b75a8ce3647acfa4b1c8da58776f3787cb14d35d6f7cc3d857442a7&ipo=images" alt="edit post"
                onClick={() => { navigate(`/editprofile/${currentUser.id}`) }} />
        </div>
     */
}