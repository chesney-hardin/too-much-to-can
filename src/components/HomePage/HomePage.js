import { Link } from "react-router-dom"
import "./HomePage.css"
import { RandomPost } from "./RandomPost"

export const HomePage = () => {
    return <section className="homepage">
        <h3 className="subtitle">Trade your backyard treats with other<br />home gardeners all across Middle Tennessee</h3>
        <ul className="homepage__links">
            <li className="homepage__item active">
                <Link className="homepage__link" to="/about">ABOUT</Link>
            </li>
            <li className="homepage__item active">
                <Link className="homepage__link" to="/posts">SEARCH POSTS</Link>
            </li>
            <li className="homepage__item active">
                <Link className="homepage__link" to="/createpost">MAKE A POST</Link>
            </li>
            <li className="homepage__item active">
                <Link className="homepage__link" to="/yourposts">YOUR POSTS</Link>
            </li>

        </ul>

        <div className="randomPost--function">
            <RandomPost />
        </div>
    </section>
}