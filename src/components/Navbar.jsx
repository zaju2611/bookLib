import CustomLink from "./CustomLink";
import { Link } from "react-router-dom";
import logo from "../icons/logo.svg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../serivces/firebase";
import { VscSignOut } from "react-icons/vsc";

export default function NavBar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoggedIn(!!user);
		});
		return unsubscribe;
	}, []);

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("Sign out successful");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<nav className="nav">
			<Link to="/" className="site-title">
				<img src={logo} alt="logo"></img>
			</Link>
			<ul>
				{isLoggedIn ? (
					<>
						<CustomLink to="/favorites">Favorites</CustomLink>
						<CustomLink to="/home" onClick={handleSignOut}>
							Sign out&nbsp;
							<VscSignOut />
						</CustomLink>
					</>
				) : (
					<>
						<CustomLink to="/login">Login</CustomLink>
						<CustomLink to="/register">Register</CustomLink>
					</>
				)}
			</ul>
		</nav>
	);
}
