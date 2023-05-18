import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function SearchBar({ onSetBooks, onSetLoading }) {
	const [input, setInput] = useState("");

	const fetchData = () => {
		onSetLoading(true);
		axios
			.get(
				"https://www.googleapis.com/books/v1/volumes?q=" +
					input +
					"&key=AIzaSyDTOLJ1SKYmhbPjjOvd_2KHJ9VdJ2ehBds"
			)
			.then((res) => {
				onSetBooks(res.data.items);
				onSetLoading(false);
			})
			.catch((err) => console.log(err));
	};

	const handleSearch = (e) => {
		e.preventDefault();
		fetchData();
		setInput("");
	};

	return (
		<form onSubmit={handleSearch} className="input-wrapper">
			<FaSearch id="searchIcon" onClick={handleSearch} />
			<input
				className="searchInput"
				placeholder="Search book"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
		</form>
	);
}
