import logo from '../../../assets/logo.svg';
import styled from 'styled-components';

const LogoContainer = styled.div`
		display: flex;
		font-size: 30px;
`;

const LogoImage = styled.img`
	margin-right: 10px;
	margin-left: 10px;
`;

const LogoTitle = styled.p`
	white-space: nowrap;
`;

function Logo() {
	return (
		<LogoContainer>
			<LogoImage src={logo} alt="logo" />
			<LogoTitle><strong>Library</strong > Manager</LogoTitle>
		</LogoContainer>
	);
}

export default Logo;