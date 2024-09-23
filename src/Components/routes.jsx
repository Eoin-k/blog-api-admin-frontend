import SinglePost from "../../Pages/SinglePost";
import LoginPage from "../../Pages/LoginPage";
import SignupPage from "../../Pages/SignupPage";
import HomePage from "../../Pages/HomePage";
import EditPostPage from "../../Pages/EditPostPage";
import CreatePostPage from "../../Pages/CreatePostPage";

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
	{
		path: "/createpost",
		element: <CreatePostPage />,
	},
];

export default routes;
