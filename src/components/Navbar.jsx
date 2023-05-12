import CustomLink from "./CustomLink";
import { Link } from "react-router-dom";
import logo from "../icons/logo.svg";

export default function NavBar() {
	return (
		<nav className="nav">
			<Link to="/" className="site-title">
				<img src={logo} alt="logo"></img>
			</Link>
			<ul>
				<CustomLink to="/login">Login</CustomLink>
				<CustomLink to="/register">Register</CustomLink>
			</ul>
		</nav>
	);
}
