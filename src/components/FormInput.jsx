import { useState } from "react";

export default function FormInput(props) {
	const { label, errorMessage, onChange, id, ...inputProps } = props;
	const [focused, setFocused] = useState(false);

	const handleFocus = (e) => {
		setFocused(true);
	};

	return (
		<div className="FormInput">
			<label>{label}</label>
			<input
				{...inputProps}
				onChange={onChange}
				onBlur={handleFocus}
				onFocus={() =>
					inputProps.name === "confirmPassword" && setFocused(true)
				}
				focused={focused.toString()}
			/>
			<span className="error">{errorMessage}</span>
		</div>
	);
}
