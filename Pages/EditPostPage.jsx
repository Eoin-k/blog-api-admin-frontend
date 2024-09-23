import Footer from "../src/Components/Footer";
import Header from "../src/Components/Header";
import { useParams } from "react-router-dom";
import "../src/index.css";
import { useState, useEffect } from "react";
import PostEditForm from "../src/Components/PostEditForm";

export default function EditPostPage() {
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(true);
	const url = import.meta.env.VITE_BACKEND_URL;
	let { id } = useParams();

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
			<PostEditForm post={post} />
			<Footer />
		</>
	);
}
