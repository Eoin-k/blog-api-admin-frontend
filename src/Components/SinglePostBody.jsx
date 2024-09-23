import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Comments from "./Comments";

const SinglePostBody = () => {
	const url = import.meta.env.VITE_BACKEND_URL;
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	let { id } = useParams();
	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);

	const deletePost = async (e) => {
		const postid = e.target.id;
		confirm("Sure you wanna delete this?");
		if (confirm) {
			try {
				const res = await fetch(`${url}/deletepost/${postid}`, {
					method: "POST",
					headers: {
						Authorization: token,
						"content-type": "application/json",
					},
				});
				if (res.ok) {
					console.log("post deleted");
					navigate("/");
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		const getpost = async () => {
			try {
				const res = await fetch(`${url}/post/${id}`);
				const data = await res.json();
				setPost(data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getpost();
	}, []);

	if (loading) {
		return <div className="container">Loading....</div>;
	}

	return (
		<>
			<div className="container">
				<div className="post-header">
					<h1>{post.title}</h1>
					<div className="buttons-wrapper">
						<Link className="button-primary" to={`/edit-post/${post.id}`}>
							Edit post
						</Link>
						<button
							type="button"
							id={post.id}
							onClick={(e) => deletePost(e)}
							className="button-primary"
						>
							Delete Post
						</button>
					</div>
				</div>
				<div className="post-body">
					<p>{post.content}</p>
				</div>
				<div className="comments-wrapper">
					<div className="comments-inner">
						<Comments />
					</div>
				</div>
			</div>
		</>
	);
};

export default SinglePostBody;
