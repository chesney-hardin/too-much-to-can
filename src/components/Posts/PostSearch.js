import "./PostSearch.css"

export const PostSearch = ({ setterFunction }) => {
    return (
        <>
            <div className="search">
                <input
                    className="search--input"
                    onChange={
                        (changeEvent) => {
                            setterFunction(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="Enter search terms" />
            
                <button className="advancedSearch-btn">Advanced Search</button>
            </div>
        </>
    )
}