import SinglePost from "../../Pages/SinglePost";
import LoginPage from "../../Pages/LoginPage";
import SignupPage from "../../Pages/SignupPage";
import HomePage from "../../Pages/HomePage";
import EditPostPage from "../../Pages/EditPostPage";

const routes = [
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/post/:id",
		element: <SinglePost />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signup",
		element: <SignupPage />,
	},
	{
		path: "/edit-post/:id",
		element: <EditPostPage />,
	},
];

export default routes;
