import axios from "axios";

async function getBooks() {
	const response = await axios.get('https://localhost:7256/api/books')

	return response.data;
}

async function getBookById(bookId) {
	const response = await axios.get(`https://localhost:7256/api/books/${bookId}`);
	return response.data;
}

async function postBook(data) {
	const response = await axios.post('https://localhost:7256/api/books', data)

	return response.data;
}

async function deleteBook(bookId) {
	const response = await axios.delete(`https://localhost:7256/api/books`);
	return response.data;
}

async function loanBook(data) {
	const response = await axios.put(`https://localhost:7256/loan`, data);
	return response.data;
}

async function receiveBook(bookId) {
	const response = await axios.put(`https://localhost:7256/api/books/${bookId}/receive`);
	return response.data;
}

export {
	getBooks,
	getBookById,
	postBook,
	deleteBook,
	loanBook,
	receiveBook,
}