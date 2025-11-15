'use client';

import { useState } from 'react';
import styled from 'styled-components';
import HTMLReactParser from 'html-react-parser';
import { useMediaQuery, useScrollToTop } from '../../../src/hooks';
import { MOBILE_MAX_WIDTH } from '../../../src/contants/size';
import Header from '../../../src/components/header';
import Footer from '../../../src/components/footer';
import type { Product } from '../../../src/interfaces/Product';

interface DetailProductClientProps {
	product: Product | null;
	productId: string;
}

export default function DetailProductClient({
	product,
	productId,
}: DetailProductClientProps) {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
	const [isPortraitImage, setIsPortraitImage] = useState(false);

	useScrollToTop(productId);

	const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const img = event.currentTarget;
		const isPortrait = img.naturalHeight > img.naturalWidth;
		setIsPortraitImage(isPortrait);
	};

	if (!product) {
		return (
			<Wrapper>
				<Header />
				<ContentContainer $isMobile={isMobile}>
					<ErrorMessage>Không tìm thấy sản phẩm</ErrorMessage>
				</ContentContainer>
				<Footer />
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Header />
			<ContentContainer $isMobile={isMobile}>
				<ProductTitle $isMobile={isMobile}>{product.title}</ProductTitle>
				<ProductImage
					$isMobile={isMobile}
					$isPortrait={isPortraitImage}
					src={product.imageUrl}
					alt={product.title}
					onLoad={handleImageLoad}
				/>
				<ProductContent $isMobile={isMobile}>
					{product.detailInfo ? (
						HTMLReactParser(product.detailInfo)
					) : (
						<div>
							<p>{product.description}</p>
							<p>Chưa có thông tin chi tiết cho sản phẩm này</p>
						</div>
					)}
				</ProductContent>
			</ContentContainer>
			<Footer />
		</Wrapper>
	);
}

const Wrapper = styled.section`
	background: #ffffff;
	width: 100vw;
	min-height: 100vh;
	box-sizing: border-box;
	margin: 0;
`;

const ContentContainer = styled.div<{ $isMobile?: boolean }>`
	max-width: 100%;
	padding: ${props => (props.$isMobile ? '1.5rem 1rem' : '2rem 10rem')};
	margin: 0 auto;

	@media (max-width: 768px) {
		padding: 1.5rem 1.2rem;
	}

	@media (max-width: 576px) {
		padding: 1rem 0.8rem;
	}
`;

const ProductTitle = styled.h1<{ $isMobile?: boolean }>`
	font-size: ${props => (props.$isMobile ? '1.8rem' : '2.5rem')};
	color: #2c3e50;
	margin-bottom: ${props => (props.$isMobile ? '20px' : '30px')};
	text-align: center;
	font-weight: bold;
	line-height: 1.3;

	@media (max-width: 768px) {
		font-size: 2rem;
		margin-bottom: 25px;
	}

	@media (max-width: 576px) {
		font-size: 1.6rem;
		margin-bottom: 20px;
		line-height: 1.2;
	}
`;

const ProductImage = styled.img<{ $isMobile?: boolean; $isPortrait?: boolean }>`
	max-width: ${props => {
		if (props.$isMobile && props.$isPortrait) {
			return '80%';
		}
		return props.$isMobile ? '100%' : '70%';
	}};
	width: 100%;
	height: ${props => {
		if (props.$isMobile && props.$isPortrait) {
			return '350px';
		}
		return props.$isMobile ? '250px' : '450px';
	}};
	object-fit: cover;
	object-position: center;
	border-radius: ${props => (props.$isMobile ? '8px' : '12px')};
	margin: ${props => (props.$isMobile ? '15px auto 20px' : '30px auto')};
	display: block;

	@media (max-width: 768px) {
		max-width: ${props => (props.$isPortrait ? '85%' : '100%')};
		height: ${props => (props.$isPortrait ? '320px' : '280px')};
		margin: 20px auto;
		border-radius: 10px;
	}
`;

const ProductContent = styled.div<{ $isMobile?: boolean }>`
	line-height: 1.8;
	font-size: ${props => (props.$isMobile ? '15px' : '16px')};
	color: #555;
	text-align: justify;

	.ql-align-center {
		text-align: center;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: #333;
		margin: ${props => (props.$isMobile ? '25px 0 15px 0' : '40px 0 20px 0')};
		font-weight: bold;
		line-height: 1.3;

		&:first-child {
			margin-top: 0;
		}
	}

	h1 {
		font-size: ${props => (props.$isMobile ? '1.8rem' : '2.5rem')};
		color: #2c3e50;
		margin-bottom: ${props => (props.$isMobile ? '20px' : '30px')};

		@media (max-width: 768px) {
			font-size: 2rem;
		}

		@media (max-width: 576px) {
			font-size: 1.6rem;
		}
	}

	h2 {
		font-size: ${props => (props.$isMobile ? '1.4rem' : '2rem')};
		color: #34495e;

		@media (max-width: 768px) {
			font-size: 1.5rem;
		}

		@media (max-width: 576px) {
			font-size: 1.3rem;
		}
	}

	h3 {
		font-size: ${props => (props.$isMobile ? '1.2rem' : '1.5rem')};
		color: #34495e;

		@media (max-width: 576px) {
			font-size: 1.1rem;
		}
	}

	p {
		margin-bottom: ${props => (props.$isMobile ? '15px' : '20px')};
		text-indent: ${props => (props.$isMobile ? '1.5em' : '2em')};
		line-height: ${props => (props.$isMobile ? '1.6' : '1.8')};

		&:first-of-type {
			text-indent: 0;
		}

		@media (max-width: 576px) {
			margin-bottom: 12px;
			text-indent: 1em;
			line-height: 1.5;
		}
	}

	img {
		width: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: ${props => (props.$isMobile ? '8px' : '12px')};
		margin: ${props => (props.$isMobile ? '15px auto 20px' : '30px auto')};
		display: block;

		@media (max-width: 768px) {
			height: 180px;
			margin: 15px auto;
			border-radius: 8px;
		}
	}

	blockquote {
		border-left: 4px solid #007bff;
		background: #f8f9fa;
		padding: ${props => (props.$isMobile ? '15px' : '20px')};
		margin: ${props => (props.$isMobile ? '20px 0' : '30px 0')};
		font-style: italic;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		p {
			margin-bottom: 0;
			text-indent: 0;
		}

		@media (max-width: 576px) {
			padding: 12px;
			margin: 15px 0;
		}
	}

	ul,
	ol {
		margin: ${props => (props.$isMobile ? '15px 0' : '20px 0')};
		padding-left: ${props => (props.$isMobile ? '25px' : '30px')};

		@media (max-width: 576px) {
			margin: 12px 0;
			padding-left: 20px;
		}
	}

	li {
		margin-bottom: ${props => (props.$isMobile ? '8px' : '10px')};

		@media (max-width: 576px) {
			margin-bottom: 6px;
		}
	}

	a {
		color: #007bff;
		text-decoration: none;
		font-weight: 500;

		&:hover {
			text-decoration: underline;
			color: #0056b3;
		}
	}

	strong {
		color: #2c3e50;
		font-weight: 600;
	}

	em {
		color: #7f8c8d;
	}
`;

const ErrorMessage = styled.div`
	text-align: center;
	padding: 60px 20px;
	font-size: 18px;
	color: #dc3545;
	background-color: #f8d7da;
	border: 1px solid #f5c6cb;
	border-radius: 8px;
`;
