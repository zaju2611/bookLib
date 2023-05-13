import { useState } from "react";
import FormInput from "../components/FormInput";
import { auth } from "../serivces/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ErrorInfo from "../components/ErrorInfo";

export default function Login() {
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
		signInWithEmailAndPassword(auth, values.email, values.password)
			.then((userCredential) => {
				console.log(userCredential);
				navigate("/");
			})
			.catch((error) => {
				if (error.code === "auth/user-not-found") {
					setError("User with this email not exists. Sign up.");
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
		navigate("/register");
	};

	return (
		<div>
			{error && <ErrorInfo onClose={closeErrorPopup}>{error}</ErrorInfo>}
			<form onSubmit={handleSubmit} className="loginForm">
				<h4 className="formTitle">LOGIN HERE!</h4>
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
					Log In
				</button>
			</form>
		</div>
	);
}
