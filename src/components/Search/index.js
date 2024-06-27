import Input from "../InputSearch";
import Book from "../Book";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { getBooks } from "../../services/books";

const SearchContainer = styled.section`

	color: #FFF;
	text-align: center;
	padding: 85px 0;
	height: 270px;
	width: 100%;
`;

const Title = styled.h2`
	color: #FFF;
	font-size: 36px;
	text-align: center;
	width: 100%;
`;

const BookSection = styled.section`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	padding: 20px;
	justify-content: center;
`;

const normalizeText = (text) => {
	return text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
};

function Search() {
	const [books, setBooks] = useState([]);
	const [searchBooks, setBookSearch] = useState([]);

	useEffect(() => {
		async function fetchBooks() {
			try {
				const booksApi = await getBooks();
				setBooks(booksApi);
				setBookSearch(booksApi);
			} catch (error) {
				console.error("Error fetching books:", error);
			}
		}

		fetchBooks();
	}, []);

	const handleSearch = (event) => {
		const digitText = normalizeText(event.target.value);
		if (digitText === "") {
			setBookSearch(books);
		} else {
			const resultSearch = books.filter(book =>
				normalizeText(book.title).includes(digitText)
			);
			setBookSearch(resultSearch);
		}
	};

	const handleDelete = (id) => {
		setBooks(books.filter(book => book.id !== id));
	};

	return (
		<SearchContainer>
			<Title>Encontre o Livro solicitado.</Title>
			<Input
				placeholder="Digite o Título para Buscar"
				onChange={handleSearch}
			/>
			<BookSection>
				{searchBooks && searchBooks.map(book => (
					<Book key={book.id} book={book} onDelete={handleDelete}/>
				))}
			</BookSection>
		</SearchContainer>
	);
}

export default Search;
