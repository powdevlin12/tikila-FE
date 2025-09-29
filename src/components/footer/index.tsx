import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { ColumnFooter } from './ColumnFooter';
import { useMediaQuery } from '../../hooks';
import { MOBILE_MAX_WIDTH } from '../../contants/size';

const Footer = () => {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	return (
		<FooterWrapper $isMobile={isMobile}>
			<Container>
				<Row>
					{/* Column 1: Company Info */}
					<ColumnFooter columnPosition={1} isMobile={isMobile} />
					{/* Column 2: Services */}
					<ColumnFooter columnPosition={2} isMobile={isMobile} />
					{/* Column 3: Policies */}
					<ColumnFooter columnPosition={3} isMobile={isMobile} />
					<ColumnFooter columnPosition={4} isMobile={isMobile} />
				</Row>
				<Divider $isMobile={isMobile} />
				<Row>
					<Col className='text-center'>
						<CopyrightText $isMobile={isMobile}>
							© {new Date().getFullYear()} Tikila. All Rights Reserved.
						</CopyrightText>
					</Col>
				</Row>
			</Container>
		</FooterWrapper>
	);
};

const FooterWrapper = styled.footer<{ $isMobile?: boolean }>`
	background-color: #111827;
	color: #9ca3af;
	padding: ${props => (props.$isMobile ? '2.5rem 0 1.5rem' : '4rem 0 2rem')};
	font-size: ${props => (props.$isMobile ? '0.9rem' : '0.95rem')};

	@media (max-width: 768px) {
		padding: 3rem 0 2rem;
	}

	@media (max-width: 576px) {
		padding: 2.5rem 0 1.5rem;
		font-size: 0.9rem;
	}
`;

const Divider = styled.hr<{ $isMobile?: boolean }>`
	border-color: #374151;
	margin-top: ${props => (props.$isMobile ? '2rem' : '3rem')};
	margin-bottom: ${props => (props.$isMobile ? '1.5rem' : '2rem')};

	@media (max-width: 768px) {
		margin-top: 2.5rem;
		margin-bottom: 1.8rem;
	}

	@media (max-width: 576px) {
		margin-top: 2rem;
		margin-bottom: 1.5rem;
	}
`;

const CopyrightText = styled.p<{ $isMobile?: boolean }>`
	margin: 0;
	font-size: ${props => (props.$isMobile ? '0.85rem' : '0.9rem')};
	color: #6b7280;
	line-height: 1.4;

	@media (max-width: 576px) {
		font-size: 0.8rem;
	}
`;

export default Footer;
