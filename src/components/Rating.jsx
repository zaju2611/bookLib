import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { update, ref, onValue } from "firebase/database";
import { db } from "../serivces/firebase";
import { useAuth } from "../hooks/useAuth";

export default function Rating({ book }) {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);
	const user = useAuth();

	useEffect(() => {
		if (!user) return;

		const ratingRef = ref(
			db,
			`users/${user.uid}/favorites/${book.title}/rating`
		);
		onValue(ratingRef, (snapshot) => {
			const rate = snapshot.val();
			setRating(rate);
		});

		return;
	}, [user, book.title]);

	const addRate = (yourRate, book) => {
		update(ref(db, `users/${user.uid}/favorites/${book.title}`), {
			rating: yourRate,
		});
	};

	return (
		<div className="iconStar">
			{[...Array(5)].map((star, index) => {
				const currentRating = index + 1;
				return (
					<label key={index}>
						<input
							type="radio"
							name="rating"
							value={currentRating}
							onClick={() => setRating(currentRating)}
						/>
						<FaStar
							className="star"
							color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
							onMouseEnter={() => setHover(currentRating)}
							onMouseLeave={() => setHover(null)}
							onClick={() => addRate(currentRating, book)}
						/>
					</label>
				);
			})}
		</div>
	);
}
