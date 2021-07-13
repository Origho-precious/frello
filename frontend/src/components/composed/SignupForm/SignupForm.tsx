import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import { signup } from "../../../store/slices/signup.slice";

const SignupForm = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const submitHandler = (values: {
		email: string;
		name: string;
		password: string;
	}) => {
		dispatch(
			signup({
				email: values.email,
				name: values.name,
				password: values.password,
			})
		);
	};

	const { errors, touched, handleBlur, values, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
			},
			validationSchema: Yup.object().shape({
				name: Yup.string().required("Please enter your fullname"),
				email: Yup.string()
					.email("Please enter a valid email address")
					.required("Please enter your email address"),
				password: Yup.string()
					.required("Please choose a password")
					.min(8, "Password must have at least 8 characters"),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref("password"), null], "Passwords must match")
					.required("Please confirm your password"),
			}),
			onSubmit: submitHandler,
		});

	return (
		<>
			<h2 className="text-2xl text-center">Create a free frello account</h2>
			<form className="mt-10">
				<div className="w-full md:w-2/3 mx-auto">
					<Input
						label="Full name"
						type="text"
						id="name"
						name="name"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Enter your fullname"
					/>
				</div>
				<div className="my-8 w-full md:w-2/3 mx-auto">
					<Input
						onChange={(e) => setEmail(e.target.value)}
						name="email"
						type="email"
						placeholder="Enter your email address"
						value={email}
					/>
				</div>
				<div className="w-full mb-8 md:w-2/3 mx-auto">
					<Input
						onChange={(e) => setPassword(e.target.value)}
						name="password"
						type="password"
						placeholder="Choose a password"
						value={password}
					/>
				</div>
				<div className="w-full md:w-2/3 mx-auto">
					<Input
						onChange={(e) => setConfirmPassword(e.target.value)}
						name="password"
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
					/>
				</div>
				<div className="mt-12 w-full md:w-2/3 mx-auto">
					<Button type="button">Signup</Button>
				</div>
			</form>
		</>
	);
};

export default SignupForm;
