import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { loanBook } from '../services/books';
import { getUsers } from '../services/user';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

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

const Select = styled.select`
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

function BookLoan() {
	const { register, handleSubmit, setValue } = useForm();
	const [data, setData] = useState("");
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setValue("bookId", id);

		const fetchUsers = async () => {
			try {
				const response = await getUsers();
				setUsers(response);
			} catch (error) {
				console.error('Failed to fetch users', error);
			}
		};

		fetchUsers();
	}, [id, setValue]);

	const onSubmit = async (formData) => {
		try {
			console.log(formData);
			const response = await loanBook(formData);
			setData(JSON.stringify(response));
			setError(null);
			Swal.fire({
				title: 'Bom Trabalho!',
				text: "Empréstimo feito com sucesso!",
				icon: 'success',
				confirmButtonText: 'Ok!'
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/", { replace: true });
				}
			});
		} catch (err) {
			setError('Failed to add loan');
		}
	};

	return (
		<AppContainer>
			<FormContainer>
				<Title>Fazer Empréstimo</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Input type="hidden" {...register("bookId")} />
					<Select {...register("userId")}>
						<option value="">Selecione um Cliente</option>
						{users.map(user => (
							<option key={user.id} value={user.id}>{user.name}</option>
						))}
					</Select>
					<Button type="submit">Enviar</Button>
				</Form>
			</FormContainer>
		</AppContainer>
	);
}

export default BookLoan;