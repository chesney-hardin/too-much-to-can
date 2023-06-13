import { Outlet, Route, Routes } from "react-router-dom"
import { HomePage } from "../HomePage/HomePage"
import { ViewProfile } from "../Profile/ViewProfile"
import { PostSearchParent } from "../Posts/PostSearchParent"

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
				<Route path="posts" element={<PostSearchParent />} />


			</Route>


		</Routes>
	</>
}

