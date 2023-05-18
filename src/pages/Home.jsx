import { useState } from "react";
import InfoComponent from "../components/InfoComponent";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultsList";
import { ClipLoader } from "react-spinners";

export default function Home() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);

	const user = useAuth();
	const handleSetBooks = (books) => {
		setBooks(books);
	};

	return (
		<div className="container search">
			<h1 className="pageTitle">Search your book </h1>
			<SearchBar onSetBooks={handleSetBooks} onSetLoading={setLoading} />
			{loading ? (
				<ClipLoader className="clipLoader" color="fea1a1" size={50} />
			) : (
				<SearchResultsList books={books} />
			)}
			{!user && <InfoComponent />}
		</div>
	);
}
