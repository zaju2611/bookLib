import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<>
			<NavBar />
			<div className="container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
