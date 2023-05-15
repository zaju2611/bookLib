import { GiBookmarklet } from "react-icons/gi";
import { useState } from "react";
import FavoritesButton from "./FavoritesButton";
import { useAuth } from "../hooks/useAuth";

export default function SearchResult({ data }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const user = useAuth();
	let image = null;

	if (
		data &&
		data.volumeInfo &&
		data.volumeInfo.imageLinks &&
		data.volumeInfo.imageLinks.thumbnail
	) {
		image = (
			<img
				className="resultImage"
				src={data.volumeInfo.imageLinks.thumbnail}
				alt={data.volumeInfo.title}
			/>
		);
	} else {
		image = <GiBookmarklet className="resultImage" />;
	}

	const handleClick = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className="accordion">
			<div
				className="resultContainer"
				onClick={handleClick}
				style={{ borderRadius: isExpanded ? "10px 10px 0px 0px" : "10px" }}>
				{image}
				<div className="infoContainer">
					<p className="author">
						Author:
						{data.volumeInfo.authors && data.volumeInfo.authors[0]
							? data.volumeInfo.authors[0]
							: "--"}
					</p>
					<p className="title">{data.volumeInfo.title}</p>
				</div>
				{user && (
					<FavoritesButton className="buttonAddToFavorites" book={data} />
				)}
			</div>
			<div
				className="descriptionContainer"
				style={{ padding: isExpanded ? "10px" : "0px" }}>
				{isExpanded && (
					<p>
						{data.volumeInfo && data.volumeInfo.description
							? data.volumeInfo.description
							: "No description"}
					</p>
				)}
			</div>
		</div>
	);
}
