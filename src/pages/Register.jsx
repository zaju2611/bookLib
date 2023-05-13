import { useState } from "react";
import FormInput from "../components/FormInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../serivces/firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import ErrorInfo from "../components/ErrorInfo";

export default function Register() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const inputs = [
		{
			id: 1,
			name: "name",
			type: "text",
			placeholder: "name",
			errorMessage:
				"Username should be 3-10 characters and shouldn't include any special character",
			label: "Enter username below",
			pattern: "^[A-Za-z0-9]{3,16}$",
			required: true,
		},
		{
			id: 2,
			name: "email",
			type: "email",
			placeholder: "youremail@gmail.com",
			errorMessage: "It should be a valid email address",
			label: "Enter email below",
			required: true,
		},
		{
			id: 3,
			name: "password",
			type: "password",
			placeholder: "*********",
			errorMessage:
				"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
			label: "Enter password below",
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-z)-9!@#$%^&*]{8,20}$`,
			required: true,
		},
		{
			id: 4,
			name: "confirmPassword",
			type: "password",
			placeholder: "*********",
			errorMessage: "Passwords don't match",
			label: "Confirm password below",
			pattern: values.password,
			required: true,
		},
	];

	const writeToDatabase = () => {
		const uuid = uid();
		set(ref(db, `users/${uuid}`), {
			userId: uuid,
			name: values.name,
			email: values.email,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then((userCredential) => {
				console.log(userCredential);
				writeToDatabase();
				navigate("/");
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					setError("User with this email already exists. Log in.");
				} else {
					setError("An error occurred. Please try again later.");
				}
			});
	};

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const closeErrorPopup = () => {
		setError("");
		navigate("/login");
	};

	return (
		<div>
			{error && <ErrorInfo onClose={closeErrorPopup}>{error}</ErrorInfo>}
			<form onSubmit={handleSubmit} className="registerForm">
				<h4 className="formTitle">REGISTER HERE!</h4>
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
				<button className="submitButton" type="submit">
					Register
				</button>
			</form>
		</div>
	);
}
