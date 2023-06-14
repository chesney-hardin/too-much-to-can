import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ViewProfile.css"

export const ViewProfile = () => {
    const[user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      countyId: 0,
      username: ""
    })
    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    const navigate = useNavigate()

    useEffect(
        ()=> {
            fetch(`http://localhost:8088/users/${currentUser.id}?_expand=county`)
            .then(response => response.json())
            .then((userToView) => {
                setUser(userToView)
            })
        },
        []
    )


    return <section>
        <ul>
            <li>Name: {user.name}</li>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
            <li>County: {user?.county?.name}</li>
        </ul>
        <img className="editProfileIcon" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1yUH3mIs0Em_iY6RkTztzAHaHa%26pid%3DApi&f=1&ipt=42e7e1566b75a8ce3647acfa4b1c8da58776f3787cb14d35d6f7cc3d857442a7&ipo=images" alt="edit post"
                            onClick={() => { navigate(`/editprofile/${currentUser.id}`) }} />

    </section>
}