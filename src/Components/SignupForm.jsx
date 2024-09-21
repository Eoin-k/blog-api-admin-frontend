import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");

	const signupSubmission = async () => {
		const url = import.meta.env.VITE_BACKEND_URL;
		try {
			const res = await fetch(`${url}/signup`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			if (res.status == 201) {
				alert("congrats on signing up - redirecting you to login");
				navigate("/login");
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<div className="container login-outer-wrapper">
				<div className="login-text-wrapper">
					<h1>This is the signup form</h1>
				</div>
				<div className="login-form-wrapper">
					<form>
						<label htmlFor="username">
							Username:
							<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
						</label>
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
						<button className="button-primary" onClick={signupSubmission} type="button">
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignupForm;
