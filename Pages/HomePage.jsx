import Footer from "../src/Components/Footer";
import Header from "../src/Components/Header";
import "../src/index.css";
import { useState, useEffect } from "react";
import PostGrid from "../src/Components/PostGrid";

export default function HomePage() {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");
	const url = import.meta.env.VITE_BACKEND_URL;
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const deletePost = async (e, postid) => {
		const index = e.target.id;
		const newpostArray = posts.slice(0, index).concat(posts.slice(index + 1, posts.length));
		confirm("Sure you wanna delete this?");
		if (confirm) {
			setPosts(newpostArray);
			console.log(postid);
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
					return;
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		const getAllPosts = async () => {
			try {
				const res = await fetch(`${url}/admin`);
				const data = await res.json();
				setPosts(data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getAllPosts();
	}, []);

	if (loading) {
		return (
			<>
				<Header />
				<div className="container">Loading Content</div>
				<Footer />
			</>
		);
	}
	if (role == "ADMIN") {
		return (
			<>
				<Header />
				<PostGrid posts={posts} deletePost={deletePost} />
				<Footer />
			</>
		);
	} else {
		return (
			<>
				<Header />
				<div className="container post-header">
					<h2>
						You must be logged in to view content. Please login or contact admin for assistance
					</h2>
				</div>
				<Footer />
			</>
		);
	}
}
