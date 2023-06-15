import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    const currentUser = JSON.parse(localStorage.getItem("tomato_user"))
    //const kandyUserObject = JSON.parse(localKandyUser)


    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <img className="tomatoLogo" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Fgardener-clipart-enormous-16.png&f=1&nofb=1&ipt=501d2699ef885a852234c68c21acdc694f75d1b5db3fdb5f6ee17071dd60b72f&ipo=images" alt="tomato logo"
                    onClick={() => { navigate(`/home`) }} />
            </li>
            {/* <li className="navbar__item active">
            TOO MUCH TO CAN
          </li> */}
            <li className="navbar__item active navbar__list">
                <Link className="navbar__link" to="/inbox">Inbox</Link> <br />
                <Link className="navbar__link" to="/profile">{currentUser.username}</Link> <br />
                {
                    localStorage.getItem("tomato_user")
                        ?
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("tomato_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>

                        : ""
                }
            </li>
        </ul>
    )
}

//<Link className="navbar__link" to="/home">Logo</Link>