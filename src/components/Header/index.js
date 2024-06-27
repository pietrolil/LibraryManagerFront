import Logo from './Logo';
import Actions from './Actions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
	background-color: #FFF;
	display: flex;
	justify-content: center;
`;

const StyledLink = styled(Link)`
	text-decoration: none;  /* Remove o sublinhado */
	color: inherit;          /* Inherit the color from the parent */
	display: flex;
	align-items: center;
`;

function Header() {
	return (
		<HeaderContainer>
			<StyledLink to="/">
				<Logo/>
			</StyledLink>
			<Actions/>
		</HeaderContainer>
	);
}

export default Header;