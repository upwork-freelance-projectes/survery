import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import Home from "./components/Home";
import Question from "./components/Question";
import "./index.css";
import { Questions } from "./questions";
import Result from "./components/Result";
import { persistor, store } from "./redux";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		// element: App
	},
	{
		path: "/1",
		element: <Question />,
	},
	{
		path: "/2",
		element: <Question />,
	},
	{
		path: "/3",
		element: <Question />,
	},
	{
		path: "/4",
		element: <Question />,
	},
	,
	{
		path: "/5",
		element: <Question />,
	},
	,
	{
		path: "/6",
		element: <Question />,
	},
	{
		path: "/7",
		element: <Question />,
	},
	,
	{
		path: "/8",
		element: <Question />,
	},
	{
		path: "/result",
		element: <Result />,
	},
]);

ReactDOM.createRoot(document.getElementById("main")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<RouterProvider router={router} />
		</PersistGate>
	</Provider>,
);
