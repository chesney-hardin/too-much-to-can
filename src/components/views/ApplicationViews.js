import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "../HomePage/HomePage"
import { ViewProfile } from "../Profile/ViewProfile"
import { PostList } from "../Posts/PostList"

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
				<Route path="posts" element={<PostList />} />


			</Route>


		</Routes>
	</>
}

