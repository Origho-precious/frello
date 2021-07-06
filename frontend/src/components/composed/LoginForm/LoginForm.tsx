import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<h2 className="text-2xl text-center">Welcome back!</h2>
			<form className="mt-10">
				<div className="my-8 w-full md:w-2/3 mx-auto">
					<Input
						onChange={(e) => setEmail(e.target.value)}
						name="email"
						type="email"
						placeholder="Your email address"
						value={email}
					/>
				</div>
				<div className="w-full md:w-2/3 mx-auto">
					<Input
						onChange={(e) => setPassword(e.target.value)}
						name="password"
						type="password"
						placeholder="Your password"
						value={password}
					/>
				</div>
				<div className="mt-12 w-full md:w-2/3 mx-auto">
					<Button type="button">Signup</Button>
				</div>
				<Link className="mt-4 w-max mx-auto block text-center text-sm hover:underline" to="/forgot-password">Forgot password? click here</Link>
			</form>
		</>
	);
};

export default LoginForm;
