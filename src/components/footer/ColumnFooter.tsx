import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import type { FooterLink } from '../../interfaces/Footer';
import { useApiWithQuery } from '../../services';

export type ColumnFooterProps = {
	columnPosition: number;
};

export const ColumnFooter = ({ columnPosition }: ColumnFooterProps) => {
	const { data, loading } = useApiWithQuery<FooterLink[]>(
		`/footer-links/column/${columnPosition}`,
		{},
	);

	if (loading) return <div>Loading...</div>;

	return (
		<Col lg={3} md={3} className='mb-4 mb-lg-0'>
			<FooterTitle>{data?.[0]?.title_column ?? ''}</FooterTitle>
			{data?.map(link => (
				<FooterLink key={link.id} href={link.url}>
					{link.title}
				</FooterLink>
			))}
		</Col>
	);
};

const FooterTitle = styled.h5`
	color: white;
	font-weight: 700;
	margin-bottom: 1.5rem;
	text-transform: uppercase;
	font-size: 1.1rem;
	letter-spacing: 0.5px;
`;

const FooterLink = styled.a`
	display: block;
	color: #9ca3af;
	margin-bottom: 0.8rem;
	text-decoration: none;
	transition: color 0.2s ease-in-out;

	&:hover {
		color: white;
	}
`;
