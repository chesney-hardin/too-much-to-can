import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    //const kandyUserObject = JSON.parse(localKandyUser)


    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Logo</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/inbox">Inbox</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">{currentUser.username}</Link>
            </li>
            {
                localStorage.getItem("tomato_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("tomato_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

