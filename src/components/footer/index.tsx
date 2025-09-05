import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { ColumnFooter } from './ColumnFooter';

const Footer = () => {
	return (
		<FooterWrapper>
			<Container>
				<Row>
					{/* Column 1: Company Info */}
					<ColumnFooter columnPosition={1} />
					{/* Column 2: Services */}
					<ColumnFooter columnPosition={2} />
					{/* Column 3: Policies */}
					<ColumnFooter columnPosition={3} />
					<ColumnFooter columnPosition={4} />
				</Row>
				<Divider />
				<Row>
					<Col className='text-center'>
						<CopyrightText>
							© {new Date().getFullYear()} Tikila. All Rights Reserved.
						</CopyrightText>
					</Col>
				</Row>
			</Container>
		</FooterWrapper>
	);
};

const FooterWrapper = styled.footer`
	background-color: #111827;
	color: #9ca3af;
	padding: 4rem 0 2rem;
	font-size: 0.95rem;
`;

const Divider = styled.hr`
	border-color: #374151;
	margin-top: 3rem;
	margin-bottom: 2rem;
`;

const CopyrightText = styled.p`
	margin: 0;
	font-size: 0.9rem;
	color: #6b7280;
`;

export default Footer;
