import axios from 'axios';

async function postUser(data) {
	const response = await axios.post('https://localhost:7256/api/users', data)

	return response.data;
}

async function getUsers() {
	const response = await axios.get('https://localhost:7256/api/users')

	return response.data;
}

export {
	postUser,
	getUsers,
}