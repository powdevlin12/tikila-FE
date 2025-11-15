'use client';

import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import type { FooterColumn, FooterLink } from '../../interfaces/Footer';
import { useMediaQuery } from '../../hooks';
import { MOBILE_MAX_WIDTH } from '../../contants/size';

export type ColumnFooterProps = {
	column: FooterColumn;
	isMobile?: boolean;
};

export const ColumnFooter = ({ column, isMobile }: ColumnFooterProps) => {
	// Always call hook, but use provided prop if available
	const detectedMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
	const isResponsive = isMobile ?? detectedMobile;

	// Sort links by orderPosition
	const sortedLinks =
		column.footerLinks?.sort(
			(a, b) => (a.orderPosition || 0) - (b.orderPosition || 0),
		) || [];

	return (
		<Col
			lg={3}
			md={isResponsive ? 6 : 3}
			sm={isResponsive ? 6 : 12}
			xs={12}
			className={isResponsive ? 'mb-3' : 'mb-4 mb-lg-0'}
		>
			<FooterTitle $isMobile={isResponsive}>{column.title}</FooterTitle>
			{sortedLinks.map(link => (
				<FooterLink key={link.id} href={link.url} $isMobile={isResponsive}>
					{link.title}
				</FooterLink>
			))}
		</Col>
	);
};

const FooterTitle = styled.h5<{ $isMobile?: boolean }>`
	color: white;
	font-weight: 700;
	margin-bottom: ${props => (props.$isMobile ? '1rem' : '1.5rem')};
	text-transform: uppercase;
	font-size: ${props => (props.$isMobile ? '1rem' : '1.1rem')};
	letter-spacing: 0.5px;
	line-height: 1.3;

	@media (max-width: 768px) {
		font-size: 1.05rem;
		margin-bottom: 1.2rem;
	}

	@media (max-width: 576px) {
		font-size: 1rem;
		margin-bottom: 1rem;
	}
`;

const FooterLink = styled.a<{ $isMobile?: boolean }>`
	display: block;
	color: #9ca3af;
	margin-bottom: ${props => (props.$isMobile ? '0.6rem' : '0.8rem')};
	text-decoration: none;
	transition: color 0.2s ease-in-out;
	font-size: ${props => (props.$isMobile ? '0.9rem' : '0.95rem')};
	line-height: 1.4;

	&:hover {
		color: white;
		text-decoration: none;
	}

	@media (max-width: 768px) {
		font-size: 0.92rem;
		margin-bottom: 0.7rem;
	}

	@media (max-width: 576px) {
		font-size: 0.9rem;
		margin-bottom: 0.6rem;
	}
`;
