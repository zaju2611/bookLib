import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultsList";
export default function Home() {
	const [books, setBooks] = useState([]);

	const handleSetBooks = (books) => {
		setBooks(books);
	};

	console.log(books);

	return (
		<div className="container search">
			<h1>Search your book</h1>
			<SearchBar onSetBooks={handleSetBooks} />
			<SearchResultsList books={books} />
		</div>
	);
}
