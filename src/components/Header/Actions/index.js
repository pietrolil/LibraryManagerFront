import plus from '../../../assets/plus.png'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ActionsUl = styled.ul`
	display: flex;
`;

const Action = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100%;
	padding: 0 5px;
	cursor: pointer;
	min-width: 120px;
`;

const ActionText = styled.span`
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-left: 10px;
	margin-right: 20px;
`;

const StyledLink = styled(Link)`
	text-decoration: none;  /* Remove o sublinhado */
	color: inherit;          /* Inherit the color from the parent */
	display: flex;
	align-items: center;
`;

const options = { "/add_book": 'Adicionar Livro', "/add_user": 'Adicionar Cliente' };

function Actions() {
	return (
		<ActionsUl>
			{Object.entries(options).map(([key, option]) => (
				<Action key={key}>
					<img src={plus} alt="plus"/>
					<StyledLink to={key}>
						<ActionText>{option}</ActionText>
					</StyledLink>
				</Action>
			))}
		</ActionsUl>
	);
}

export default Actions;
