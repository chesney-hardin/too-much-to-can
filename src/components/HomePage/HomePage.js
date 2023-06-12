import { Link } from "react-router-dom"
import "./HomePage.css"

export const HomePage = () => {
    return <>
     <h3>Trade your backyard treats with other home gardeners all across Middle Tennessee</h3>
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
                <Link className="homepage__link" to="/usersposts">YOUR POSTS</Link>
            </li>

    </ul>
    </>
}