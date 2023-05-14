import SearchResult from "./SearchResult";

export default function SearchResultsList({ books }) {
	const renderedBooks = books.map((book, index) => {
		return <SearchResult key={index} data={book} />;
	});

	return <div className="resultsList">{renderedBooks}</div>;
}
