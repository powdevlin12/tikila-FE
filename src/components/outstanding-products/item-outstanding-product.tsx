'use client';

import { Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { PhoneCall } from 'lucide-react';

type ItemOutstandingProductProps = {
	title: string;
	description: string;
	image: string;
	buttonText: string;
	productId?: number;
};

const ItemOutstandingProduct = ({
	title,
	description,
	image,
	buttonText,
	productId,
}: ItemOutstandingProductProps) => {
	const router = useRouter();

	const handleCardClick = () => {
		if (productId) {
			router.push(`/product/${productId}`);
		}
	};

	const handleButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Ngăn sự kiện click của card
		if (productId) {
			router.push(`/product/${productId}`);
		}
	};

	return (
		<ProductCard onClick={handleCardClick} clickable={!!productId}>
			<ImageWrapper>
				<ProductImage src={image} alt={title} />
			</ImageWrapper>

			<CardContent>
				<ProductTitle>{title}</ProductTitle>
				<ProductDescription>{description}</ProductDescription>

				<ActionButton onClick={handleButtonClick}>
					<PhoneCall size={20} className='me-2' />
					{buttonText}
				</ActionButton>
			</CardContent>
		</ProductCard>
	);
};

// Styled Components
const ProductCard = styled(Card)<{ clickable?: boolean }>`
	border: none;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
	height: 100%;
	background: white;
	cursor: ${props => (props.clickable ? 'pointer' : 'default')};

	&:hover {
		transform: translateY(-8px);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	height: 280px;
	overflow: hidden;
	padding: 16px;
`;

const ProductImage = styled.img`
	width: 100%;
	height: 100% !important;
	object-fit: cover;
	object-position: center;
	transition: transform 0.3s ease;
	border-radius: 10px;

	${ProductCard}:hover & {
		transform: scale(1.05);
	}
`;

const CardContent = styled(Card.Body)`
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	height: 250px;
`;

const ProductTitle = styled.h5`
	font-size: 1.2rem;
	font-weight: 600;
	color: #0966c5;
	line-height: 1.4;
	min-height: 2rem;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	position: relative;
	overflow: hidden;
	margin-bottom: 16px;
	border-bottom: 3px solid #0966c5;
`;

const ProductDescription = styled.p`
	font-size: 1rem;
	color: #191c1f;
	line-height: 1.6;
	flex-grow: 1;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

const ActionButton = styled.button`
	background: #0966c5;
	color: white;
	border: none;
	padding: 16px 32px;
	border-radius: 100px;
	font-weight: 600;
	font-size: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-top: auto;

	&:hover {
		background: #1565c0;
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(25, 118, 210, 0.4);
	}

	&:active {
		transform: translateY(0);
	}
`;

export default ItemOutstandingProduct;
