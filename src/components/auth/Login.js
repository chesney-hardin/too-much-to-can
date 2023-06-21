import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("elizabethd@example.com")
    const [password, setPassword] = useState("strawberry")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}&password=${password}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("tomato_user", JSON.stringify({
                        id: user.id,
                        name: user.name,
                        username: user.username
                    }))

                    navigate("/home")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <h1><img className="tomatoLogoLogin" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Fgardener-clipart-enormous-16.png&f=1&nofb=1&ipt=501d2699ef885a852234c68c21acdc694f75d1b5db3fdb5f6ee17071dd60b72f&ipo=images" alt="tomato logo" />  Too Much To Can</h1>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <fieldset>
                        <label>Email address</label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <input type="password"
                            value={password}
                            onChange={evt => setPassword(evt.target.value)}
                            className="form-control"
                            placeholder="password"
                            required autoFocus />
                    </fieldset>
                    <div className="form-wrapper">
                        <fieldset>
                            <button className="signIn-btn" type="submit">
                                Sign in
                            </button>
                        </fieldset>
                    </div>
                </form>
            </section>
            <section>
                <Link className="link--register" to="/register">Need to register?</Link>
            </section>
        </main>
    )
}

