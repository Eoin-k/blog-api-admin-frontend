import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const SinglePostBody = () => {
	const url = import.meta.env.VITE_BACKEND_URL;
	let { id } = useParams();
	const [post, setPost] = useState([]);

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getpost = async () => {
			try {
				const res = await fetch(`${url}/post/${id}`);
				const data = await res.json();
				setPost(data[0]);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getpost();
	}, []);

	if (post.published == false) {
		return <p>sorry it seems we dont have that post here</p>;
	}

	if (loading) {
		return <div className="container">Loading....</div>;
	}

	return (
		<>
			<div className="container">
				<div className="post-header">
					<h1>{post.title}</h1>
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
