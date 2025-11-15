'use client';

import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { ColumnFooter } from './ColumnFooter';
import { useMediaQuery } from '../../hooks';
import { useApiWithQuery } from '../../services';
import { MOBILE_MAX_WIDTH } from '../../contants/size';
import type { FooterColumn } from '../../interfaces/Footer';

const Footer = () => {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	// Fetch footer columns with their links
	const { data: footerColumns, loading } = useApiWithQuery<FooterColumn[]>(
		'/footer-columns',
		{},
	);

	if (loading) {
		return (
			<FooterWrapper $isMobile={isMobile}>
				<Container>
					<Row>
						<Col className='text-center'>
							<LoadingText $isMobile={isMobile}>Loading footer...</LoadingText>
						</Col>
					</Row>
				</Container>
			</FooterWrapper>
		);
	}

	// Sort columns by position
	const sortedColumns =
		footerColumns?.sort((a, b) => a.position - b.position) || [];

	return (
		<FooterWrapper $isMobile={isMobile}>
			<Container>
				<Row>
					{sortedColumns.map(column => (
						<ColumnFooter key={column.id} column={column} isMobile={isMobile} />
					))}
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

const LoadingText = styled.div<{ $isMobile?: boolean }>`
	color: #9ca3af;
	font-size: ${props => (props.$isMobile ? '0.9rem' : '0.95rem')};
	padding: ${props => (props.$isMobile ? '1rem' : '2rem')};
	text-align: center;

	@media (max-width: 576px) {
		font-size: 0.85rem;
		padding: 1rem;
	}
`;

export default Footer;
