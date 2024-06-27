import React from 'react';
import styled from 'styled-components';
import trash from '../../assets/trash.png';
import { deleteBook, loanBook, receiveBook } from '../../services/books';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const BookCard = styled.ul`
	list-style-type: none;
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #ffffff;
	width: 250px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
	color: #000;
`;

const Actions = styled.li`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin: 10px;
`;

const ActionButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border: 1px solid #ccc;
	background-color: #e0e0e0;
	cursor: pointer;
	transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
	border-radius: 8px;

	:hover {
		transform: scale(1.10);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
`;

const ImgButton = styled.img`
	width: 20px;
	height: 20px;
`;

function Book({ book, onDelete }) {
	const navigate = useNavigate();
	const status = {
		1: 'Disponível',
		2: 'Em Empréstimo',
		3: 'Fora de Estoque',
	};

	const handleDelete = async () => {
		try {
			await deleteBook(book.id);
			if (onDelete) {
				onDelete(book.id);
				Swal.fire({
					title: 'Bom Trabalho!',
					text: "Deletado com sucesso!",
					icon: 'success',
					confirmButtonText: 'Ok!'
				}).then((result) => {
					if (result.isConfirmed) {
						navigate("/", { replace: true });
					}
				});
			}
		} catch (error) {
			console.error("Failed to delete book", error);
		}
	};

	const handleLoan = async () => {
		try {
			await loanBook(book.id);
			Swal.fire({
				title: 'Bom Trabalho!',
				text: "Empréstimo realizado com sucesso!",
				icon: 'success',
				confirmButtonText: 'Ok!'
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/", { replace: true });
				}
			});
		} catch (error) {
			console.error("Failed to loan book", error);
		}
	};

	const handleReturn = async () => {
		try {
			await receiveBook(book.id);
			Swal.fire({
				title: 'Bom Trabalho!',
				text: "Livro recebido com sucesso!",
				icon: 'success',
				confirmButtonText: 'Ok!'
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/", { replace: true });
				}
			});
		} catch (error) {
			console.error("Failed to return book", error);
		}
	};

	return (
		<BookCard>
			<li>
				<strong>Título: {book.title}</strong>
			</li>
			<li>Autor: {book.author}</li>
			<li>Ano de Publicação: {book.publicationYear}</li>
			<li>Status: {status[book.status] || 'Status desconhecido'}</li>
			<li>ISBN: {book.isbn}</li>
			<Actions>
				<ActionButton onClick={handleLoan}>
					Empréstimo
				</ActionButton>
				<ActionButton onClick={handleReturn}>
					Recebimento
				</ActionButton>
				<ActionButton onClick={handleDelete}>
					<ImgButton src={trash} alt="Excluir" />
				</ActionButton>
			</Actions>
		</BookCard>
	);
}

export default Book;