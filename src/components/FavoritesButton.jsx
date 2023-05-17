import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { useState, useEffect } from "react";
import { set, ref, onValue } from "firebase/database";
import { db } from "../serivces/firebase";
import { useAuth } from "../hooks/useAuth";

export default function FavoritesButton({ book }) {
	const [isFavorite, setIsFavorite] = useState(false);
	const user = useAuth();

	useEffect(() => {
		if (user) {
			const userFavoritesRef = ref(db, `users/${user.uid}/favorites`);
			const favoritesListener = onValue(userFavoritesRef, (snapshot) => {
				const favorites = snapshot.val() || {};
				const isBookInFavorites = Object.values(favorites).some(
					(favorite) => favorite.title === book.volumeInfo.title
				);
				setIsFavorite(isBookInFavorites);
			});

			return () => {
				favoritesListener();
			};
		}
	}, [book, user]);

	const addToFavorites = (book) => {
		set(ref(db, `users/${user.uid}/favorites/${book.volumeInfo.title}`), {
			title: book.volumeInfo.title,
			author: book.volumeInfo.authors[0],
		});
	};

	const removeFromFavorites = (book) => {
		const userFavoritesRef = ref(db, `users/${user.uid}/favorites`);

		const favoritesToRemove = [];

		onValue(userFavoritesRef, (snapshot) => {
			const favorites = snapshot.val() || {};

			Object.entries(favorites).forEach(([favoriteId, favorite]) => {
				if (favorite.title === book.volumeInfo.title) {
					favoritesToRemove.push(favoriteId);
				}
			});

			favoritesToRemove.forEach((favoriteId) => {
				set(ref(db, `users/${user.uid}/favorites/${favoriteId}`), null);
			});
		});
	};

	const handleClick = (event) => {
		event.stopPropagation();

		if (isFavorite === false) {
			addToFavorites(book);
			setIsFavorite(true);
		} else {
			removeFromFavorites(book);
			setIsFavorite(false);
		}
	};

	return (
		<div className="circleButton" onClick={handleClick}>
			{isFavorite ? (
				<BsSuitHeartFill className="heart" />
			) : (
				<BsSuitHeart className="heart" />
			)}
		</div>
	);
}
