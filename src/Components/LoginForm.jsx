import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
	const user = localStorage.getItem("user");
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginSubmission = async () => {
		const url = import.meta.env.VITE_BACKEND_URL;
		try {
			const res = await fetch(`${url}/login`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (res.ok) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", data.user);
				localStorage.setItem("role", data.role);
				localStorage.setItem("id", data.id);
				navigate("/");
			}
		} catch (err) {
			console.log(err);
		}
	};

	if (user) {
		return (
			<>
				<div className="container login-message-wrapper">
					<h1>Looks Like your already logged in</h1>
					<Link className="button-primary" to="/">
						Go to home
					</Link>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="container login-outer-wrapper">
				<div className="login-text-wrapper">
					<h1>This is the login form</h1>
				</div>
				<div className="login-form-wrapper">
					<form>
						<label htmlFor="email">
							Email:
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</label>
						<label htmlFor="password">
							Password:
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<button className="button-primary" onClick={loginSubmission} type="button">
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
