import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	sendResetCode,
	selectAuthState,
} from "../../../store/slices/auth.slice";
import Button from "../../atoms/Button/Button";
import DefaultButton from "../../atoms/Button/DefaultButton";
import Input from "../../atoms/Input/Input";

interface ILoginResetPasswordProps {
	gotoLogin: () => void;
}

const ResetPassword: React.FC<ILoginResetPasswordProps> = ({ gotoLogin }) => {
	const dispatch = useDispatch();
	// const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const { sendingResetCode, sendResetCodeError, sendResetCodeSuccess } =
		useSelector(selectAuthState);

	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		dispatch(sendResetCode(email));
	};

	return (
		<>
			<h2 className="text-lg text-center">
				Enter your email below, a validation code will be sent to you
			</h2>
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
				{sendResetCodeError && (
					<p className="text-red-600 mt-4 -mb-3 w-full text-sm font-bold md:w-2/3 mx-auto text-center">
						😪 {sendResetCodeError}
					</p>
				)}
				<div className="mt-10 w-full md:w-2/3 mx-auto">
					<Button
						disabled={sendingResetCode}
						loading={sendingResetCode}
						type="submit"
					>
						Get Reset Code
					</Button>
				</div>
			</form>
			<p className="mt-6 w-max mx-auto block text-center text-sm font-semibold text-primary-color">
				Want to login instead? &nbsp;
				<DefaultButton
					onClick={gotoLogin}
					type="button"
					className="text-black underline"
				>
					Goto login
				</DefaultButton>
			</p>
		</>
	);
};

export default ResetPassword;
