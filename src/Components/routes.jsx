import SinglePost from "../../Pages/SinglePost";
import LoginPage from "../../Pages/LoginPage";
import SignupPage from "../../Pages/SignupPage";
import HomePage from "../../Pages/HomePage";

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
];

export default routes;
