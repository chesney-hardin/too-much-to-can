import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = () => {
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        password: "",
        countyId: 0,
        username: ""
    })
    const [counties, setCounties] = useState([])
    let navigate = useNavigate()

    useEffect(
        () => {
            fetch("http://localhost:8088/counties")
                .then(response => response.json())
                .then((countiesArray) => {
                    setCounties(countiesArray)
                })
        },
        []
    )

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("tomato_user", JSON.stringify({
                        id: createdUser.id,
                        name: createdUser.name,
                        username: createdUser.username
                    }))

                    navigate("/home")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    window.alert("Account with that email address already exists")
                }
                else {
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <h1 className="h3 mb-3 font-weight-normal">Please Register for Too Much To Can</h1>
            <form className="form--login" onSubmit={handleRegister}>
                <fieldset>
                    <label> Full Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="name" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label> Username </label>
                    <input onChange={updateCustomer}
                        type="text" id="username" className="form-control"
                        placeholder="username" required />
                </fieldset>
                <fieldset>
                    <label> Password </label>
                    <input onChange={updateCustomer}
                        type="password" id="password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <div className="form-dropdown">
                        <label>County:</label>
                        <select
                            id="countyId"
                            onChange={(evt) => {
                                const copy = { ...customer }
                                copy.countyId = JSON.parse(evt.target.value)
                                setCustomer(copy)
                            }} >
                            <option value="0">Select County</option>
                            {counties.map((county) =>
                                <option key={`county--${county.id}`} value={county.id}>{county.name}</option>
                            )}

                        </select>
                    </div>
                </fieldset>
                <div className="form-wrapper">
                    <fieldset>
                        <button className="register-btn" type="submit"> Register </button>
                    </fieldset>
                </div>
            </form>
        </main>
    )
}

