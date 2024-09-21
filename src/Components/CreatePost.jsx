import { useState } from "react";
import { Link } from "react-router-dom";
const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [published, setPublished] = useState(false);

	const url = import.meta.env.VITE_BACKEND_URL;
	const token = localStorage.getItem("token");
	const authorId = localStorage.getItem("id");
	const role = localStorage.getItem("role");
	const handleCheckbox = (e) => {
		const checkedval = e.target.checked;
		setPublished(checkedval);
	};
	const createPost = async () => {
		try {
			if (role == "ADMIN") {
				const res = await fetch(`${url}/createpost`, {
					method: "POST",
					headers: {
						Authorization: token,
						"content-type": "application/json",
					},
					body: JSON.stringify({ title, content, published, authorId }),
				});

				if (res.ok) {
					alert("Post was successfully created");
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
				<div>
					<h1>This is the form to submit a post</h1>
					<form action="">
						<label htmlFor="title">
							Post title
							<input
								type="text"
								id="title"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
						<label htmlFor="content">
							Post Content
							<textarea
								name="content"
								id="content"
								onChange={(e) => setContent(e.target.value)}
							></textarea>
						</label>
						<label htmlFor="published">
							Publish Post?
							<input
								onChange={handleCheckbox}
								type="checkbox"
								name="published"
								id="published"
							/>
						</label>
						<button type="button" onClick={createPost}>
							Create Post
						</button>
					</form>
					<Link to="/">Go home</Link>
				</div>
			) : (
				<div>
					<h2>
						You do not have permission to access this page please login or
						request access from an admin
					</h2>
				</div>
			)}
		</>
	);
};

export default CreatePost;
