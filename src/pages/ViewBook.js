import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getBookById } from '../services/books';
import { useParams, useNavigate } from 'react-router-dom';
import { statusEnum } from '../enums/status';

const BookContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(90deg, #002F52 35%, #326589);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #fff;
`;

const BookCard = styled.div`
	background-color: white;
	padding: 30px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	max-width: 400px;
	width: 100%;
	color: #000;
`;

const Title = styled.h2`
	margin-bottom: 20px;
	text-align: center;
	color: #000;
`;

const Detail = styled.p`
	margin: 10px 0;
	font-size: 18px;
	color: #333;
`;

const Button = styled.button`
	padding: 12px;
	background-color: #326589;
	color: white;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s;
	margin-top: 20px;

	&:hover {
		background-color: #002F52;
	}
`;

function BookView() {
	const { id } = useParams();
	const [book, setBook] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchBook = async () => {
			try {
				const data = await getBookById(id);
				console.log(data)
				setBook(data);
			} catch (error) {
				setError('Failed to fetch book');
			}
		};

		fetchBook();
	}, [id]);

	if (error) {
		return (
			<BookContainer>
				<BookCard>
					<Title>Erro</Title>
					<Detail>{error}</Detail>
					<Button onClick={() => navigate('/')}>Voltar</Button>
				</BookCard>
			</BookContainer>
		);
	}

	if (!book) {
		return (
			<BookContainer>
				<BookCard>
					<Title>Carregando...</Title>
				</BookCard>
			</BookContainer>
		);
	}

	return (
		<BookContainer>
			<BookCard>
				<Title>{book.title}</Title>
				<Detail><strong>Autor:</strong> {book.author}</Detail>
				<Detail><strong>Ano de Publicação:</strong> {book.publicationYear}</Detail>
				<Detail><strong>ISBN:</strong> {book.isbn}</Detail>
				<Detail><strong>Status:</strong> {statusEnum[book.status]}</Detail>
				{book.status === 2 && (
					<>
						<Detail><strong>Empréstimo para:</strong> {book.clientName}</Detail>
						<Detail><strong>Data do Empréstimo:</strong> {book.loanDate}</Detail>
					</>
				)}
				<Button onClick={() => navigate('/')}>Voltar</Button>
			</BookCard>
		</BookContainer>
	);
}

export default BookView;
