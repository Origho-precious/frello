import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthState } from "./store/slices/auth.slice";
import Home from "./pages/home";
import Boards from "./pages/boards";
import ResetPassword from "./pages/reset-password";

const App = () => {
	const { authenticated } = useSelector(selectAuthState);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					{authenticated ? <Redirect to="/board" /> : <Home />}
				</Route>
				<Route exact path="/board">
					{!authenticated ? <Redirect to="/" /> : <Boards />}
				</Route>
				<Route exact path="/reset-password">
					{authenticated ? <Redirect to="/boards" /> : <ResetPassword />}
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
