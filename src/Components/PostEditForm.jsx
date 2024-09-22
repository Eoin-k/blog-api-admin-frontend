import { useState } from "react";
export default function PostEditForm(post) {
	const [title, setTitle] = useState(`${post.title}`);
	const [content, setContent] = useState(`${post.contene}`);
	const [published, setPublished] = useState(false);

	const url = import.meta.env.VITE_BACKEND_URL;
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");
	const handleCheckbox = (e) => {
		const checkedval = e.target.checked;
		setPublished(checkedval);
	};
	post = post.post;
	const updatePost = async () => {
		try {
			if (role == "ADMIN") {
				const res = await fetch(`${url}/updatepost/${post.id}`, {
					method: "POST",
					headers: {
						Authorization: token,
						"content-type": "application/json",
					},
					body: JSON.stringify({ title, content, published }),
				});

				if (res.ok) {
					alert("Post was successfully updated");
					return;
				}
			} else {
				console.log("Cannot complete request");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{role == "ADMIN" ? (
				<div className="container post-header">
					<h1>Update post</h1>
					<p>{post.title}</p>
					<form action="">
						<label htmlFor="title">
							Post title
							<input
								defaultValue={post.title}
								type="text"
								id="title"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
						<label htmlFor="content">
							Post Content
							<textarea
								defaultValue={post.content}
								name="content"
								id="content"
								onChange={(e) => setContent(e.target.value)}
							></textarea>
						</label>
						<label htmlFor="published">
							Publish Post?
							<input onChange={handleCheckbox} type="checkbox" name="published" id="published" />
						</label>
						<button type="button" onClick={updatePost}>
							Update Post
						</button>
					</form>
				</div>
			) : (
				<div>
					<h2>
						You do not have permission to access this page please login or request access from an
						admin
					</h2>
				</div>
			)}
		</>
	);
}
