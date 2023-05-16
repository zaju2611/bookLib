import FavoriteItem from "./FavoriteItem";

export default function FavoritesList({ books }) {
	const renderedBooks = books.map((book, index) => {
		return <FavoriteItem key={index} book={book} />;
	});

	return (
		<div>
			<h1>Your favorite books</h1>
			{renderedBooks}
		</div>
	);
}
