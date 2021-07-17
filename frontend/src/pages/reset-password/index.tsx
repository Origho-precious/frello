import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import {
	clearForgotPasswordStates,
	clearResetPasswordStates,
	resetPassword,
	selectAuthState,
} from "../../store/slices/auth.slice";

const ResetPassword = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { resettingPassword, resetPasswordSuccess, resetPasswordError } =
		useSelector(selectAuthState);

	const token = history?.location?.search?.split("=")[1];

	useEffect(() => {
		dispatch(clearForgotPasswordStates());

		return () => {
			dispatch(clearResetPasswordStates());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		!token && history.push("/");
	}, [history, token]);

	useEffect(() => {
		setTimeout(() => {
			resetPasswordSuccess && history.push("/");
		}, 2500);
	}, [history, resetPasswordSuccess]);

	const submitHandler = (values: {
		password: string;
		confirmPassword: string;
	}) => {
		dispatch(resetPassword(token, values.password));
	};

	const { errors, touched, handleBlur, handleChange, handleSubmit, values } =
		useFormik({
			initialValues: {
				password: "",
				confirmPassword: "",
			},
			validationSchema: Yup.object().shape({
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
		<Wrapper className="flex flex-col items-center h-screen">
			<section className="w-11/12 sm:w-9/12 md:w-3/5 mt-24">
				<h2 className="text-2xl text-center">
					Final Step!, Create a new secure password
				</h2>
				<form onSubmit={handleSubmit} className="mt-16">
					<div className="w-full md:w-2/3 mx-auto">
						<Input
							style={{ background: "transparent" }}
							label="New Password"
							id="password"
							name="password"
							type="password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							placeholder="New Password"
							errorMsg={
								errors.password && touched.password
									? errors.password
									: undefined
							}
						/>
					</div>
					<div className="my-10 w-full md:w-2/3 mx-auto">
						<Input
							style={{ background: "transparent" }}
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.confirmPassword}
							placeholder="Confirm New Password"
							errorMsg={
								errors.confirmPassword && touched.confirmPassword
									? errors.confirmPassword
									: undefined
							}
						/>
					</div>
					{resetPasswordError && (
						<p className="text-red-600 mt-4 -mb-2 w-full text-sm font-bold md:w-2/3 mx-auto text-center">
							😪 {resetPasswordError}
						</p>
					)}
					{resetPasswordSuccess && (
						<p className="text-green-700 mt-4 -mb-2 w-full text-sm font-bold md:w-2/3 mx-auto text-center">
							{resetPasswordSuccess}
						</p>
					)}
					<div className="mt-10 w-full md:w-2/3 mx-auto">
						<Button
							disabled={resettingPassword}
							loading={resettingPassword}
							type="submit"
						>
							Reset Password
						</Button>
					</div>
				</form>
			</section>
		</Wrapper>
	);
};

const Wrapper = styled.article`
	background: hsla(218, 100%, 42%, 1);

	background: linear-gradient(
		270deg,
		hsla(218, 100%, 42%, 0.6) 0%,
		hsla(0, 0%, 98%, 1) 15%
	);

	background: -moz-linear-gradient(
		270deg,
		hsla(218, 100%, 42%, 0.6) 0%,
		hsla(0, 0%, 98%, 1) 15%
	);

	background: -webkit-linear-gradient(
		270deg,
		hsla(218, 100%, 42%, 0.6) 0%,
		hsla(0, 0%, 98%, 1) 15%
	);

	filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#0050d6", endColorstr="#F9F9F9", GradientType=1 );
`;

export default ResetPassword;
