import { useState } from "react";
import FormInput from "../components/FormInput";

export default function Login() {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const inputs = [
		{
			id: 1,
			name: "email",
			type: "email",
			placeholder: "youremail@gmail.com",
			errorMessage: "It should be a valid email address",
			label: "Enter email below",
			required: true,
		},
		{
			id: 2,
			name: "password",
			type: "password",
			placeholder: "*********",
			errorMessage:
				"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
			label: "Enter password below",
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-z)-9!@#$%^&*]{8,20}$`,
			required: true,
		},
	];

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={handleSubmit} className="registerForm">
			<h4>LOGIN HERE!</h4>
			{inputs.map((input) => {
				return (
					<FormInput
						key={input.id}
						{...input}
						values={values[input.name]}
						onChange={onChange}
					/>
				);
			})}
			<button type="submit">Register</button>
		</form>
	);
}
