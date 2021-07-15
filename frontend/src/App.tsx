import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthState } from "./store/slices/auth.slice";
import Home from "./pages/home";
import Boards from "./pages/boards";

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
			</Switch>
		</BrowserRouter>
	);
};

export default App;
