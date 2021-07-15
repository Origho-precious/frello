import { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import LoginForm from "../../components/composed/LoginForm/LoginForm";
import SignupForm from "../../components/composed/SignupForm/SignupForm";
import TabNav from "../../components/composed/TavNav/Tabnav";
import ResetPassword from "../../components/composed/ResetPassword/ResetPassword";

const Homepage = () => {
	const [index, setIndex] = useState<number>(0);

	const styles = useSpring({
		transform: index === 0 ? "scale(1, 1)" : "scale(0, 0)",
	});

	const styles1 = useSpring({
		transform: index === 1 ? "scale(1, 1)" : "scale(0, 0)",
	});

	return (
		<Wrapper className="flex md:overflow-hidden md:flex-row flex-col">
			<section className="section-1 md:w-1/2 lg:w-2/5 pt-4 pb-16 h-full px-8 sm:px-28 md:px-10 lg:px-20">
				<h3 className="text-3xl font-black logo">Frello</h3>
				<div className="mt-12 md:mt-20">
					<h2 className="text-4xl sm:text-5xl mb-4">
						Frello is a{" "}
						<a
							className="opacity-60"
							href="https://trello.com/"
							target="_blank"
							rel="noreferrer"
						>
							trello
						</a>{" "}
						clone.
					</h2>
					<p className="text-sm sm:text-base tracking-wide">
						built with Nodejs, Reactjs with TS, Redux, MongoDB and Express.
						Using Socket.io for realtime updates on the board.
					</p>
				</div>
				<div className="mt-12">
					<h3 className="text-2xl">Features</h3>
					<ul className="text-sm tracking-wide mt-3">
						<li>
							<i className="fas fa-hand-point-right" />
							&nbsp; <strong>Authentication</strong>: Only authenticated Users
							can access their boards
						</li>
						<li className="my-3">
							<i className="fas fa-hand-point-right" />
							&nbsp; <strong>Invitation</strong>: Board creators can invite more
							users to their boards
						</li>
					</ul>
				</div>
			</section>
			<section className="section-2 mt-12 flex flex-col md:w-1/2 lg:w-3/5">
				<article className="md:w-5/6 mb-12 form-section mx-auto">
					<TabNav
						setIndex={setIndex}
						index={index}
						options={["Login", "Signup", "Reset Password"]}
					/>
					<div className="mt-16">
						<animated.div
							style={{ ...styles, display: index !== 0 ? "none" : "block" }}
						>
							<LoginForm gotoResetPassword={() => setIndex(2)} />
						</animated.div>
						<animated.div
							style={{ ...styles1, display: index !== 1 ? "none" : "block" }}
						>
							<SignupForm />
						</animated.div>
						<animated.div
							style={{ ...styles1, display: index !== 2 ? "none" : "block" }}
						>
							<ResetPassword gotoLogin={() => setIndex(0)} />
						</animated.div>
					</div>
				</article>
			</section>
		</Wrapper>
	);
};

const Wrapper = styled.article`
	height: 100vh;

	& .section-1 {
		background: #0050d6;
		color: #fff;

		& .logo {
			color: #293856;
			font-family: "Cousine", monospace;
		}
	}

	& .section-2 {
		& .form-section {
			@media screen and (max-width: 767px) {
				width: 70%;
			}

			@media screen and (max-width: 400px) {
				width: 80%;
			}
		}
	}
`;

export default Homepage;
