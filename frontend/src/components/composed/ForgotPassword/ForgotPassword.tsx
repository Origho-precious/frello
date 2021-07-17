import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	sendResetLink,
	selectAuthState,
} from "../../../store/slices/auth.slice";
import Button from "../../atoms/Button/Button";
import DefaultButton from "../../atoms/Button/DefaultButton";
import Input from "../../atoms/Input/Input";

interface ILoginForgotPasswordProps {
	gotoLogin: () => void;
}

const ForgotPassword: React.FC<ILoginForgotPasswordProps> = ({ gotoLogin }) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const { sendingResetLink, sendResetLinkError, sendResetLinkSuccess } =
		useSelector(selectAuthState);

	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		dispatch(sendResetLink(email));
	};

	return (
		<>
			<h2 className="text-lg text-center">Enter your email below.</h2>
			{sendResetLinkSuccess && (
				<p className="text-green-700 mt-4 -mb-3 w-full text-sm font-bold md:w-2/3 mx-auto text-center">
					{sendResetLinkSuccess}
				</p>
			)}
			{sendResetLinkError && (
				<p className="text-red-600 mt-4 -mb-3 w-full text-sm font-bold md:w-2/3 mx-auto text-center">
					😪 {sendResetLinkError}
				</p>
			)}
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
				<div className="mt-10 w-full md:w-2/3 mx-auto">
					<Button
						disabled={sendingResetLink || !email}
						loading={sendingResetLink}
						type="submit"
					>
						Send
					</Button>
				</div>
			</form>
			<div className="flex items-center mt-6 w-max mx-auto text-center text-sm font-semibold text-primary-color">
				<span className="block mr-3">Want to login instead?</span>
				<DefaultButton
					onClick={gotoLogin}
					type="button"
					style={{ fontSize: "0.875rem" }}
					className="text-primary-color text-sm underline"
				>
					Goto login
				</DefaultButton>
			</div>
		</>
	);
};

export default ForgotPassword;
