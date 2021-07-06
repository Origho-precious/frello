import { useState } from "react";
import styled from "styled-components";
import { useSpring, animated, to } from "react-spring";
import LoginForm from "../../components/composed/LoginForm/LoginForm";
import SignupForm from "../../components/composed/SignupForm/SignupForm";
import TabNav from "../../components/composed/TavNav/Tabnav";

const Homepage = () => {
	const [index, setIndex] = useState<number>(0);

	const styles = useSpring({
		transform: index === 0 ? "scale(1, 1)" : "scale(0, 0)",
	});

	const styles1 = useSpring({
		transform: index === 1 ? "scale(1, 1)" : "scale(0, 0)",
	});

	return (
		<Wrapper className="flex">
			<section className="section-1 w-2/5 py-4 h-full px-20">
				<h3 className="text-3xl font-black logo">Frello</h3>
				<div className="mt-20">
					<h2 className="text-5xl mb-4">
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
					<p className="text-base tracking-wide">
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
			<section className="section-2 mt-16 flex flex-col w-3/5">
				<article className="w-2/3 mx-auto">
					<TabNav
						setIndex={setIndex}
						index={index}
						options={["Login", "Signup"]}
					/>
					<div className="mt-20">
						<animated.div
							style={{ ...styles, display: index !== 0 ? "none" : "block" }}
						>
							<LoginForm />
						</animated.div>
						<animated.div style={styles1}>
							<SignupForm />
						</animated.div>
					</div>
				</article>
			</section>
			<section></section>
		</Wrapper>
	);
};

const Wrapper = styled.article`
	height: 100vh;
	overflow: hidden;

	.section-1 {
		background: #0050d6;
		color: #fff;

		.logo {
			color: #293856;
			font-family: "Cousine", monospace;
		}
	}
`;

export default Homepage;
