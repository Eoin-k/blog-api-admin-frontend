import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Comments = () => {
	const [content, setContent] = useState("");
	const [editedComment, setEditedComment] = useState("");
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
				setComments([...data]);
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

	const editDialog = (e, commentid) => {
		const dialog = document.getElementById("editdialog");
		dialog.showModal();
		const commentToEdit = e.target.parentNode.parentNode.firstChild.textContent;
		setEditedComment(commentToEdit);
		const submitButton = document.getElementById("editcommentsubmit");
		submitButton.setAttribute("data-commentid", commentid);
		console.log(`this is: ${editedComment}`);
	};

	const closeDialog = () => {
		const dialog = document.getElementById("editdialog");
		dialog.close();
	};

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

	const updateComment = async (e, commentid) => {
		commentid = e.target.getAttribute("data-commentid");
		try {
			const res = await fetch(`${url}/updatecomment/${commentid}`, {
				method: "POST",
				headers: {
					Authorization: token,
					"content-type": "application/json",
				},
				body: JSON.stringify({ editedComment }),
			});

			if (res.ok) {
				alert("Comment updated");
				closeDialog();
				return;
			} else {
				console.log("Cannot complete request");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteComment = async (e, commentid) => {
		const index = e.target.id;
		const newCommentArray = comments
			.slice(0, index)
			.concat(comments.slice(index + 1, comments.length));
		confirm("Sure you wanna delete this?");
		if (confirm) {
			setComments(newCommentArray);
			try {
				const res = await fetch(`${url}/deletecomment/${commentid}`, {
					method: "POST",
					headers: {
						Authorization: token,
						"content-type": "application/json",
					},
				});
				if (res.ok) {
					console.log("comment deleted");
					return;
				}
			} catch (error) {
				console.error(error);
			}
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
										<div className="buttons-wrapper">
											<button
												id={index}
												onClick={(e) => editDialog(e, `${comment.id}`)}
												className="button-primary edit-button"
											>
												Edit comment
											</button>
											<button
												onClick={(e) => deleteComment(e, `${comment.id}`)}
												type="button"
												id={index}
												className="button-primary"
											>
												Delete comment
											</button>
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
				<dialog id="editdialog">
					<p>Hi I am a dialog</p>
					<form action="">
						<label htmlFor="editcomment">
							<p>Add a comment:</p>
							<textarea
								defaultValue={editedComment}
								onChange={(e) => setEditedComment(e.target.value)}
								cols={40}
								rows={15}
								name="editcontent"
								id="editcontent"
							></textarea>
						</label>
					</form>
					<div className="buttons-wrapper">
						<button className="button-primary" onClick={closeDialog}>
							Close
						</button>
						<button className="button-primary" id="editcommentsubmit" onClick={updateComment}>
							Submit edit
						</button>
					</div>
				</dialog>
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
