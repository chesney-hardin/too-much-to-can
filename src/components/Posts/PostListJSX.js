import { Link } from "react-router-dom"

export const PostListJSX = ({filteredPosts}) => {
    return <>
    {filteredPosts.length !== 0
        ? (
            <article className="posts">
                {
                    filteredPosts.map(post => {
                        return <section className="post" key={`post--${post.id}`}>
                            <Link className="post__link" to={`/posts/${post.id}`}>{post.title}</Link>
                            <img className="postPhoto" src={post.photoURL} alt="photo of produce" />

                        </section>
                    })
                }
            </article>
        )
        : <div className="noPostsDisplayed">**No posts meet your search requirements at this time**</div>
    }
</>
}