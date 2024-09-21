import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Comments = () => {
	const [content, setContent] = useState("");
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const user = localStorage.getItem("user");
	const token = localStorage.getItem("token");
	const url = import.meta.env.VITE_BACKEND_URL;
	const authorId = localStorage.getItem("id");
	let { id } = useParams();

	useEffect(() => {
		const getcomments = async () => {
			try {
				const res = await fetch(`${url}/post/${id}/comments`);
				const data = await res.json();
				setComments(...comments, data);
				console.log("This is data: ", data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getcomments();
	}, []);

	function timeAgo(timestamp) {
		const now = new Date();
		const createdAt = new Date(timestamp);

		const diffInSeconds = Math.floor((now - createdAt) / 1000);

		const secondsInMinute = 60;
		const secondsInHour = 60 * secondsInMinute;
		const secondsInDay = 24 * secondsInHour;
		const secondsInWeek = 7 * secondsInDay;
		const secondsInYear = 365 * secondsInDay;

		if (diffInSeconds < secondsInMinute) {
			return `${diffInSeconds} seconds ago`;
		} else if (diffInSeconds < secondsInHour) {
			const minutes = Math.floor(diffInSeconds / secondsInMinute);
			return `${minutes} minutes ago`;
		} else if (diffInSeconds < secondsInDay) {
			const hours = Math.floor(diffInSeconds / secondsInHour);
			return `${hours} hours ago`;
		} else if (diffInSeconds > secondsInDay) {
			const days = Math.floor(diffInSeconds / secondsInDay);
			return `${days} days ago`;
		} else if (diffInSeconds > secondsInWeek) {
			const weeks = Math.floor(diffInSeconds / secondsInWeek);
			return `${weeks} weeks ago`;
		} else {
			const years = Math.floor(diffInSeconds / secondsInYear);
			return `${years} years ago`;
		}
	}

	const submitComment = async () => {
		const url = import.meta.env.VITE_BACKEND_URL;
		try {
			const res = await fetch(`${url}/post/${id}/comments`, {
				method: "POST",
				headers: {
					Authorization: token,
					"content-type": "application/json",
				},
				body: JSON.stringify({ content, authorId, id }),
			});
			if (res.ok) {
				console.log("Comment Added");
				setContent("");
			}
			setLoading(true);
			const createdAt = new Date().toISOString();
			const newComment = {
				content: content,
				authorId: authorId,
				id: id,
				createdAt: createdAt,
			};
			setComments([...comments, newComment]);
			console.log(newComment);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	if (loading) {
		return <div className="container">Loading....</div>;
	}
	if (user) {
		return (
			<>
				<div className="container comments-wrapper">
					<div className="container comment-card-wrapper">
						{comments.map((comment) => {
							if (comment.content == "") {
								return <></>;
							} else {
								return (
									<div className="comment-card" key={comment.id}>
										<p>{comment.content}</p>
										<div className="comment-author-wrapper">
											<p>Commented: {timeAgo(comment.createdAt)}</p>
										</div>
									</div>
								);
							}
						})}
					</div>
					<div className="comment-form-wrapper">
						<form action="">
							<label htmlFor="comment">
								<p>Add a comment:</p>
								<textarea
									onChange={(e) => setContent(e.target.value)}
									cols={40}
									rows={15}
									name="content"
									id="content"
								></textarea>
							</label>
							<button className="button-primary" onClick={submitComment} type="button">
								Submit Comment
							</button>
						</form>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="container comment-card-wrapper">
					{comments.map((comment, index) => {
						if (comment.content == "") {
							return <></>;
						} else {
							return (
								<div className="comment-card" key={index}>
									<p>{comment.content}</p>
									<div className="comment-author-wrapper">
										<p>Commented: {timeAgo(comment.createdAt)}</p>
									</div>
								</div>
							);
						}
					})}
				</div>
				<div className="comment-form-wrapper">
					<p>You must be logged in to post a comment</p>
					<Link className="button-primary comment-login" to={"/login"}>
						Login
					</Link>
				</div>
			</>
		);
	}
};

export default Comments;
