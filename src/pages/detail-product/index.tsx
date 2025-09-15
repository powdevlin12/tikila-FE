import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import HTMLReactParser from 'html-react-parser';
import { useApiWithQuery } from '../../services';
import Header from '../../components/header';
import LoadingView from '../../components/loading-view';
import type { Product } from '../../interfaces/Product';

const DetailProduct = () => {
	const { id } = useParams<{ id: string }>();

	const {
		data: productData,
		loading,
		error,
	} = useApiWithQuery<Product>(`/products/${id}`, {});

	if (loading) {
		return (
			<Wrapper>
				<Header loading={true} />
				<LoadingView />
			</Wrapper>
		);
	}

	if (error) {
		return (
			<Wrapper>
				<Header />
				<ContentContainer>
					<ErrorMessage>Có lỗi xảy ra khi tải thông tin sản phẩm</ErrorMessage>
				</ContentContainer>
			</Wrapper>
		);
	}

	if (!productData) {
		return (
			<Wrapper>
				<Header />
				<ContentContainer>
					<ErrorMessage>Không tìm thấy sản phẩm</ErrorMessage>
				</ContentContainer>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Header />
			<ContentContainer>
				<ProductTitle>{productData.title}</ProductTitle>
				<ProductImage src={productData.image_url} alt={productData.title} />
				<ProductContent>
					{productData.detail_info ? (
						HTMLReactParser(productData.detail_info)
					) : (
						<div>
							<p>{productData.description}</p>
							<p>Chưa có thông tin chi tiết cho sản phẩm này</p>
						</div>
					)}
				</ProductContent>
			</ContentContainer>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	background: #ffffff;
	width: 100vw;
	min-height: 100vh;
	box-sizing: border-box;
	margin: 0;
`;

const ContentContainer = styled.div`
	max-width: 100%;
	padding: 2rem 10rem;
	margin: 0 auto;

	@media (max-width: 768px) {
		padding: 2rem 2rem;
	}
`;

const ProductTitle = styled.h1`
	font-size: 2.5rem;
	color: #2c3e50;
	margin-bottom: 30px;
	text-align: center;
	font-weight: bold;

	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

const ProductImage = styled.img`
	max-width: 60%;
	width: 100%;
	object-fit: cover;
	border-radius: 12px;
	margin: 30px auto;
	display: block;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		max-width: 100%;
		height: 250px;
		margin: 20px auto;
	}

	@media (max-width: 480px) {
		height: 200px;
	}
`;

const ProductContent = styled.div`
	line-height: 1.8;
	font-size: 16px;
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
		margin: 40px 0 20px 0;
		font-weight: bold;

		&:first-child {
			margin-top: 0;
		}
	}

	h1 {
		font-size: 2.5rem;
		color: #2c3e50;
		margin-bottom: 30px;

		@media (max-width: 768px) {
			font-size: 2rem;
		}
	}

	h2 {
		font-size: 2rem;
		color: #34495e;

		@media (max-width: 768px) {
			font-size: 1.5rem;
		}
	}

	h3 {
		font-size: 1.5rem;
		color: #34495e;
	}

	p {
		margin-bottom: 20px;
		text-indent: 2em;

		&:first-of-type {
			text-indent: 0;
		}
	}

	img {
		max-width: 60%;
		width: 100%;
		object-fit: cover;
		border-radius: 12px;
		margin: 30px auto;
		display: block;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s ease, box-shadow 0.3s ease;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
		}

		@media (max-width: 768px) {
			max-width: 100%;
			height: 250px;
			margin: 20px auto;
		}

		@media (max-width: 480px) {
			height: 200px;
		}
	}

	blockquote {
		border-left: 4px solid #007bff;
		background: #f8f9fa;
		padding: 20px;
		margin: 30px 0;
		font-style: italic;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		p {
			margin-bottom: 0;
			text-indent: 0;
		}
	}

	ul,
	ol {
		margin: 20px 0;
		padding-left: 30px;
	}

	li {
		margin-bottom: 10px;
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

	/* Style cho các đoạn văn đặc biệt */
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

export default DetailProduct;
