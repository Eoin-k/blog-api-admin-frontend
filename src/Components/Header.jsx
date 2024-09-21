import { Link } from "react-router-dom";
import SideBar from "./sidebar";
import { useNavigate } from "react-router-dom";
function Header() {
	const user = localStorage.getItem("user");
	const navigate = useNavigate();
	const logout = () => {
		localStorage.clear();
		navigate("/login");
	};
	if (user) {
		return (
			<>
				<div className="header-outer">
					<div className="header-inner container">
						<div className="heading-wrapper">
							<Link to="/">The blog zone</Link>
							<SideBar user={user} />
						</div>
						<div className="buttons-wrapper">
							<button onClick={logout} className="button-primary" to="/logout">
								Log Out
							</button>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
				<>
					<div className="header-outer">
						<div className="header-inner container">
							<div className="heading-wrapper">
								<Link to="/">
									<h2>The blog zone</h2>
								</Link>
							</div>
							<div className="buttons-wrapper">
								<Link className="button-primary" to="/signup">
									Sign up
								</Link>
								<Link className="button-primary" to="/login">
									Login
								</Link>
							</div>
						</div>
					</div>
				</>
			</>
		);
	}
}

export default Header;
