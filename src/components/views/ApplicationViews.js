import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "../HomePage/HomePage"
import { ViewProfile } from "../Profile/ViewProfile"
import { PostSearchParent } from "../Posts/PostSearchParent"
import { IndividualPost } from "../Posts/IndividualPost"
import { CreateMessage } from "../Messages/CreateMessage"
import { Inbox } from "../Messages/Inbox"
import { YourPosts } from "../Posts/YourPosts"
import { EditPost } from "../Posts/EditPost"
import { CreatePost } from "../Posts/CreatePost"
import { EditProfile } from "../Profile/EditProfile"

export const ApplicationViews = () => {
	return <>

		<Routes>
			<Route path="/" element={
				<>
					<h1 className="title--main">TOO MUCH TO CAN</h1>


					<Outlet />
				</>
			}>
				<Route path="home" element={<HomePage />} />
				<Route path="profile" element={<ViewProfile />} />
				<Route path="editprofile/:userId" element={<EditProfile />} />
				<Route path="inbox" element={<Inbox />} />
				<Route path="yourposts" element={<YourPosts/>} />
				<Route path="editpost/:postId" element={<EditPost/>} />
				<Route path="createpost" element={<CreatePost />} />
				<Route path="posts" element={<PostSearchParent />} />
				<Route path="posts/:postId" element={  <IndividualPost /> } />
				<Route path="createmessage/:postId" element={<CreateMessage />} />


			</Route>


		</Routes>
	</>
}

