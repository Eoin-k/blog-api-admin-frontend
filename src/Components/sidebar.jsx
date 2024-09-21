import { Link } from "react-router-dom";

const SideBar = (user) => {
	return (
		<>
			{user ? (
				<div>
					<p>Hey there {user.user}</p>
				</div>
			) : (
				<div>
					<h1>This is my component</h1>
					<h2>Havent used react ina while</h2>
					<Link to="/post/1">This is a link to the single post</Link>
				</div>
			)}
		</>
	);
};

export default SideBar;
