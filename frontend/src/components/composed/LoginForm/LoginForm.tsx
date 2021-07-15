import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, selectAuthState } from "../../../store/slices/auth.slice";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

const LoginForm = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { authenticating, loginError } = useSelector(selectAuthState);

	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();

		dispatch(login({ email, password }));
	};

	return (
		<>
			<h2 className="text-2xl text-center">Welcome back!</h2>
			<form onSubmit={submitHandler} className="mt-10">
				<div className="my-8 w-full md:w-2/3 mx-auto">
					<Input
						label="Email Address"
						onChange={(e) => setEmail(e.target.value)}
						name="email"
						type="email"
						placeholder="Your email address"
						value={email}
					/>
				</div>
				<div className="w-full md:w-2/3 mx-auto">
					<Input
						label="Password"
						onChange={(e) => setPassword(e.target.value)}
						name="password"
						type="password"
						placeholder="Your password"
						value={password}
					/>
				</div>
				{loginError && (
					<p className="text-red-600 mt-4 -mb-3 w-full text-sm font-bold md:w-2/3 mx-auto text-center">
						😪 {loginError}
					</p>
				)}
				<div className="mt-10 w-full md:w-2/3 mx-auto">
					<Button
						disabled={authenticating}
						loading={authenticating}
						type="submit"
					>
						Login
					</Button>
				</div>
			</form>
			<p className="mt-6 w-max mx-auto block text-center text-sm font-semibold text-primary-color">
				Forgot password? &nbsp;
				<Link className="text-black underline" to="/forgot-password">
					click here
				</Link>
			</p>
		</>
	);
};

export default LoginForm;
