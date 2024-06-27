import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import AddUser from './pages/AddUser';
import BookLoan from './pages/BookLoan';
import ViewBook from './pages/ViewBook';
import { createGlobalStyle, styled } from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	li {
		list-style: none;
	}

`;

const AppContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(90deg, #002F52 35%, #326589);
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GlobalStyle/>
			<BrowserRouter>
				<AppContainer>
					<Header/>
					<Routes>
						<Route path="/" element={<Home />}/>
						<Route path="/book/:id" element={<ViewBook />}/>
						<Route path="/book/loan/:id" element={<BookLoan />}/>
						<Route path="/add_book" element={<AddBook />}/>
						<Route path="/add_user" element={<AddUser />}/>
					</Routes>
				</AppContainer>
			</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
