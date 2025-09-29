import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsTelephone } from 'react-icons/bs';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOBILE_MAX_WIDTH } from '../../contants/size';
import { useMediaQuery } from '../../hooks';

type CustomNavbarProps = {
	phone?: string;
	logo?: string;
};

const CustomNavbar = ({ phone, logo }: CustomNavbarProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	return (
		<StyledNavbar bg='white' expand='lg' className='shadow-sm'>
			<StyledContainer fluid $isMobile={isMobile}>
				{/* Logo */}
				<StyledNavbarBrand onClick={() => navigate('/')}>
					<img
						src={logo}
						alt='TIKILA Logo'
						width='60'
						height='60'
						className='d-inline-block align-top me-2'
					/>
				</StyledNavbarBrand>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					{/* Navigation Menu */}
					<StyledNav className='me-auto' $isMobile={isMobile}>
						<StyledNavLink
							$isActive={location.pathname === '/'}
							onClick={() => navigate('/')}
						>
							TRANG CHỦ
						</StyledNavLink>
						<StyledNavLink
							$isActive={location.pathname === '/introduce'}
							onClick={() => navigate('/introduce')}
						>
							GIỚI THIỆU
						</StyledNavLink>
						<StyledNavLink
							$isActive={location.pathname === '/products'}
							onClick={() => navigate('/products')}
						>
							SẢN PHẦM
						</StyledNavLink>
						<StyledNavLink
							$isActive={false}
							onClick={() =>
								window.open('https://www.tikila.com.vn/', '_blank')
							}
						>
							QUẢN LÝ DỊCH VỤ
						</StyledNavLink>
					</StyledNav>
					{/* Hotline */}
					<HotlineContainer $isMobile={isMobile}>
						<HotlineInfo $isMobile={isMobile}>
							<HotlineLabel>Hotline 24/7</HotlineLabel>
							<HotlineNumber>
								<BsTelephone className='me-1' />
								{phone}
							</HotlineNumber>
						</HotlineInfo>
					</HotlineContainer>
				</Navbar.Collapse>
			</StyledContainer>
		</StyledNavbar>
	);
};

// Styled Components
const StyledNavbar = styled(Navbar)`
	border-bottom: 1px solid #e0e0e0;
	padding: 0.5rem 0;
	background-color: #ffffff !important;
	flex-direction: row;
	justify-content: space-between;
`;

const StyledContainer = styled(Container)<{ $isMobile?: boolean }>`
	padding: ${props => (props.$isMobile ? '0.25rem 2rem' : '0.25rem 10rem')};
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #0066cc !important;
	font-weight: bold;
	cursor: pointer;
`;

const StyledNav = styled(Nav)<{ $isMobile?: boolean }>`
	margin-left: ${props => (props.$isMobile ? '0' : '2rem')};
	text-align: ${props => (props.$isMobile ? 'center' : 'left')};
	row-gap: ${props => (props.$isMobile ? '1rem' : '0')};
`;

const StyledNavLink = styled(Nav.Link)<{ $isActive?: boolean }>`
	color: #333 !important;
	font-weight: 500;
	padding: 0.5rem 1rem !important;
	text-decoration: none;
	border-bottom: 3px solid transparent;
	transition: all 0.3s ease;
	cursor: pointer;

	${props =>
		props.$isActive &&
		`
		color: #0066cc !important;
		border-bottom-color: #0066cc;
	`}

	&:hover {
		color: #0066cc !important;
		border-bottom-color: #0066cc;
	}
`;

const HotlineContainer = styled.div<{ $isMobile?: boolean }>`
	display: flex;
	align-items: center;
	color: #0066cc;
	font-weight: 500;
	margin-top: ${props => (props.$isMobile ? '1rem' : '0')};
	justify-content: ${props => (props.$isMobile ? 'center' : 'flex-end')};
`;

const HotlineInfo = styled.div<{ $isMobile?: boolean }>`
	text-align: ${props => (props.$isMobile ? 'center' : 'right')};
`;

const HotlineLabel = styled.span`
	display: block;
	font-size: 0.8rem;
	color: #666;
	margin-bottom: 2px;
`;

const HotlineNumber = styled.div`
	display: flex;
	align-items: center;
	font-size: 1rem;
	font-weight: bold;
	color: #0066cc;
`;

export default CustomNavbar;
