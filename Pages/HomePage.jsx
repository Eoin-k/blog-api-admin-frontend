import Footer from "../src/Components/Footer";
import Header from "../src/Components/Header";
import "../src/index.css";
import { useState, useEffect } from "react";
import PostGrid from "../src/Components/PostGrid";

export default function HomePage() {
	const url = import.meta.env.VITE_BACKEND_URL;
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getAllPosts = async () => {
			try {
				const res = await fetch(`${url}`);
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
				<div className="container">Loading posts.......</div>
				<Footer />
			</>
		);
	}
	return (
		<>
			<Header />

			<PostGrid posts={posts} />
			<Footer />
		</>
	);
}
