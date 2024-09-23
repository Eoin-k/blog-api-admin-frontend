import { Link } from "react-router-dom";
export default function PostGrid({ posts, deletePost }) {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");
	const url = import.meta.env.VITE_BACKEND_URL;

	const changePublishedStatus = async (e) => {
		const id = e.target.id;
		const status = e.target.checked;
		console.log(id, status);
		try {
			if (role == "ADMIN") {
				const res = await fetch(`${url}/changepoststatus/${id}`, {
					method: "POST",
					headers: {
						Authorization: token,
						"content-type": "application/json",
					},
					body: JSON.stringify({ status }),
				});
				if (res.ok) {
					console.log("Status updated");
					return;
				}
			} else {
				console.log("cannot complete update request");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className=" container card-grid">
				{posts.map((post, index) => {
					return (
						<>
							<div className="post-card" key={index}>
								<h3 key={index}>Title: {post.title}</h3>
								<div className="checkbox-wrapper">
									<div className="published-status-wrapper">
										<p>Published Status: </p>
										<label className="switch">
											{post.published == false ? (
												<input
													onChange={(e) => changePublishedStatus(e)}
													className="switch"
													type="checkbox"
													id={post.id}
												></input>
											) : (
												<input
													onChange={(e) => changePublishedStatus(e)}
													className="switch"
													type="checkbox"
													id={post.id}
													defaultChecked
												></input>
											)}
											<span className="slider round"></span>
										</label>
									</div>
								</div>

								<div className="buttons-wrapper">
									<Link className="button-primary" to={`/post/${post.id}`}>
										View Post
									</Link>
									<Link to={`/edit-post/${post.id}`} className="button-primary">
										Edit post
									</Link>
								</div>
								<button
									type="button"
									id={index}
									onClick={(e) => deletePost(e, `${post.id}`)}
									className="button-primary"
								>
									Delete Post
								</button>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}
