import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { InboxCount } from "./InboxCount"
import { useState } from "react"



export const NavBar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    let currentUser = JSON.parse(localStorage.getItem("tomato_user"))

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    return (
        <section className="navbar">
            <div className="navbar__item active">
                <img className="tomatoLogo" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Fgardener-clipart-enormous-16.png&f=1&nofb=1&ipt=501d2699ef885a852234c68c21acdc694f75d1b5db3fdb5f6ee17071dd60b72f&ipo=images" alt="tomato logo"
                    onClick={() => { navigate(`/home`) }} />
            </div>
            <div className="title--div"><h1 className="title--main">TOO  MUCH  TO  CAN</h1></div>
            <div className="dropdown navbar__item active">
                <div className="dropdown-button" onClick={toggleDropdown}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                {isOpen 
                    ? ( 
                        <div className="dropdown-content">
                            <a className="navbar__link active" href="/profile">{currentUser.username}</a>
                            <a className="navbar__link active" href="/inbox"><InboxCount /></a>
                            {localStorage.getItem("tomato_user") 
                                ? (
                                    <a className="navbar__link active" href="" onClick={() => {
                                        localStorage.removeItem("tomato_user")
                                        navigate("/", { replace: true })
                                    }}>Logout</a>
                                    ) : null}
                        </div>
                    ) : null}
            </div>
        </section>
    )
}

