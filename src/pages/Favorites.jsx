import { useState, useEffect } from "react";
import FavoritesList from "../components/FavoritesList";
import { auth, db } from "../serivces/firebase";
import { get, ref } from "firebase/database";

export default function Favorites() {
	const [favoriteBooks, setFavoriteBooks] = useState([]);

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

	return (
		<div>
			<FavoritesList books={favoriteBooks} />
		</div>
	);
}
