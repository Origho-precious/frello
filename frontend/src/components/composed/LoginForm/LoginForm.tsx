import { useState } from "react";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<h2 className="text-2xl text-center">Welcome back!</h2>
			<form className="mt-10">
				<div className="my-8 w-2/3 mx-auto">
					<Input
						onChange={(e) => setEmail(e.target.value)}
						name="email"
						type="email"
						placeholder="Enter your email address"
						value={email}
					/>
				</div>
				<div className="w-2/3 mx-auto">
					<Input
						onChange={(e) => setPassword(e.target.value)}
						name="password"
						type="password"
						placeholder="Choose a password"
						value={password}
					/>
				</div>
				<div className="mt-12 w-2/3 mx-auto">
					<Button type="button">Signup</Button>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
