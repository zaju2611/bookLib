import { useState, useEffect } from "react";
import FavoriteTable from "../components/FavoriteTable";
import { FaSearch } from "react-icons/fa";
import { auth, db } from "../serivces/firebase";
import { get, ref } from "firebase/database";
import Rating from "../components/Rating";

export default function Favorites() {
	const [favoriteBooks, setFavoriteBooks] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			if (currentUser) {
				fetchData(currentUser.uid);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const fetchData = (userUid) => {
		get(ref(db, `users/${userUid}/favorites`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					setFavoriteBooks(Object.values(data));
				} else {
					console.log("no data available");
				}
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	};

	const config = [
		{
			label: "Author",
			render: (book) => book.author,
			sortValue: (book) => book.author,
		},
		{
			label: "Title",
			render: (book) => book.title,
			sortValue: (book) => book.title,
		},
		{
			label: "Your rating",
			render: (book) => <Rating book={book} />,
		},
	];

	const keyFn = (book) => {
		return book.title;
	};

	const filteredBooks = favoriteBooks.filter((book) => {
		const title = book.title.toLowerCase();
		const author = book.author.toLowerCase();
		const searchQuery = searchValue.toLowerCase();

		return title.includes(searchQuery) || author.includes(searchQuery);
	});

	const handleSearchInputChange = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<div className="container favorite">
			<h1 className="pageTitle">Your favorite books</h1>
			<form className="input-wrapper">
				<FaSearch id="searchIcon" />
				<input
					className="searchInput"
					placeholder="Search book"
					value={searchValue}
					onChange={handleSearchInputChange}
				/>
			</form>
			<FavoriteTable data={filteredBooks} config={config} keyFn={keyFn} />
		</div>
	);
}
