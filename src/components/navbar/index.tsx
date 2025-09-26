import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsTelephone } from 'react-icons/bs';
import './styles.css';
import { useLocation } from 'react-router-dom';

type CustomNavbarProps = {
	phone?: string;
	logo?: string;
};

const CustomNavbar = ({ phone, logo }: CustomNavbarProps) => {
	const location = useLocation();

	return (
		<Navbar bg='white' expand='lg' className='custom-navbar shadow-sm'>
			<Container fluid className='container-navbar'>
				{/* Logo */}
				<Navbar.Brand href='/' className='navbar-brand-custom'>
					<img
						src={logo}
						alt='TIKILA Logo'
						width='60'
						height='60'
						className='d-inline-block align-top me-2'
					/>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					{/* Navigation Menu */}
					<Nav className='me-auto navbar-nav-custom'>
						<Nav.Link
							href='/'
							className={`nav-link-custom ${
								location.pathname === '/' ? 'active' : ''
							}`}
						>
							TRANG CHỦ
						</Nav.Link>
						<Nav.Link
							href='/introduce'
							className={`nav-link-custom ${
								location.pathname === '/introduce' ? 'active' : ''
							}`}
						>
							GIỚI THIỆU
						</Nav.Link>
						<Nav.Link
							href='/products'
							className={`nav-link-custom ${
								location.pathname === '/products' ? 'active' : ''
							}`}
						>
							SẢN PHẦM
						</Nav.Link>
						<Nav.Link
							href='#'
							className={`nav-link-custom ${
								location.pathname === '/services' ? 'active' : ''
							}`}
						>
							DỊCH VỤ
						</Nav.Link>
					</Nav>
					{/* Hotline */}
					<div className='hotline-container'>
						<div className='hotline-info'>
							<span className='hotline-label'>Hotline 24/7</span>
							<div className='hotline-number'>
								<BsTelephone className='me-1' />
								{phone}
							</div>
						</div>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default CustomNavbar;
