import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<>
			<footer>
				<div className="footer-outer-wrapper">
					<div className="container footer-inner-wrapper">
						<Link to="/">Home</Link>
						<Link to="/signup">Sign Up</Link>
					</div>
				</div>
			</footer>
		</>
	);
}
