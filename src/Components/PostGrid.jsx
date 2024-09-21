import { Link } from "react-router-dom";
export default function PostGrid(posts) {
	posts = posts.posts;
	return (
		<>
			<div className=" container card-grid">
				{posts.map((post, index) => {
					return (
						<>
							<div className="post-card" key={index}>
								<p key={index}>{post.title}</p>
								<Link to={`/post/${post.id}`}>View Post</Link>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}
