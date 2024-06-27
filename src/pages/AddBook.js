import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { postBook } from '../services/books';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const AppContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background-image: linear-gradient(90deg, #002F52 35%, #326589);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #fff;
`;

const FormContainer = styled.div`
	background-color: white;
	padding: 30px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	max-width: 400px;
	width: 100%;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const Input = styled.input`
	padding: 12px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
	width: 100%;
	box-sizing: border-box;
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

	&:hover {
		background-color: #002F52;
	}
`;

const Title = styled.h2`
	margin-bottom: 20px;
	text-align: center;
	color: #000;
`;

function AddBook() {
	const { register, handleSubmit } = useForm();
	const [data, setData] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const onSubmit = async (formData) => {
		try {
			const response = await postBook(formData);
			setData(JSON.stringify(response));
			setError(null);
			Swal.fire({
				title: 'Bom Trabalho!',
				text: "Cadastrado com sucesso!",
				icon: 'success',
				confirmButtonText: 'Ok!'
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/", { replace: true });
				}
			})
		} catch (err) {
			setError('Falha ao enviar livro.');
		}
	};

	return (
		<AppContainer>
			<FormContainer>
				<Title>Adicionar Livro</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Input {...register("title")} placeholder="Título" />
					<Input {...register("author")} placeholder="Autor" />
					<Input {...register("isbn")} placeholder="ISBN" />
					<Input {...register("publicationYear")} placeholder="Ano de Publicação" />
					<Button type="submit">Adicionar</Button>
				</Form>
			</FormContainer>
		</AppContainer>
	);
}

export default AddBook;
