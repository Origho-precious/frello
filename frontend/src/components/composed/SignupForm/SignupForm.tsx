import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import { selectSignupState, signup } from "../../../store/slices/signup.slice";

const SignupForm = () => {
	const dispatch = useDispatch();
	const { signingUp, signupError } = useSelector(selectSignupState);

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
		<div className="-mt-6">
			<h2 className="text-2xl text-center">Create a free frello account</h2>
			<form onSubmit={handleSubmit} className="mt-8">
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
						errorMsg={errors.name && touched.name ? errors.name : undefined}
					/>
				</div>
				<div className="my-8 w-full md:w-2/3 mx-auto">
					<Input
						label="Email address"
						id="email"
						name="email"
						type="email"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						placeholder="Enter your email address"
						errorMsg={errors.email && touched.email ? errors.email : undefined}
					/>
				</div>
				<div className="w-full mb-8 md:w-2/3 mx-auto">
					<Input
						label="Password"
						id="password"
						name="password"
						type="password"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						placeholder="Choose a password"
						errorMsg={
							errors.password && touched.password ? errors.password : undefined
						}
					/>
				</div>
				<div className="w-full md:w-2/3 mx-auto">
					<Input
						label="Confirm password"
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						value={values.confirmPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Confirm password"
						errorMsg={
							errors.confirmPassword && touched.confirmPassword
								? errors.confirmPassword
								: undefined
						}
					/>
				</div>
				{signupError && (
					<p className="text-red-600 mt-4 -mb-3 w-full text-sm font-bold md:w-2/3 mx-auto text-center">
						😪 {signupError}
					</p>
				)}
				<div className="mt-8 w-full md:w-2/3 mx-auto">
					<Button loading={signingUp} disabled={signingUp} type="submit">
						Signup
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignupForm;
