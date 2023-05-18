import { useState } from "react";
import { BsFillInfoSquareFill } from "react-icons/bs";
import MessageComponent from "./MessageComponent";

export default function InfoComponent() {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	return (
		<div className="alertContainer">
			<BsFillInfoSquareFill className="alertIcon" onClick={handleClick} />
			{isClicked && (
				<MessageComponent className=" animate__animated animate__zoomIn" />
			)}
		</div>
	);
}
