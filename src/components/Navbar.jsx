import CustomLink from "./CustomLink";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<nav className="nav">
			<Link to="/" className="site-title">
				BookLib
			</Link>
			<ul>
				<CustomLink to="/login">Login</CustomLink>
				<CustomLink to="/register">Register</CustomLink>
			</ul>
		</nav>
	);
}
