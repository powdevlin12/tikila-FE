import { Container, Row, Col, Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import ItemOutstandingProduct from './item-outstanding-product';
import type { Product } from '../../interfaces/Product';
import { useMediaQuery } from '../../hooks';
import { MOBILE_MAX_WIDTH } from '../../contants/size';

type OutstandingProductsProps = {
	listProduct: Product[];
	title: string;
	isHiddenViewAll?: boolean;
};

const OutstandingProducts = ({
	listProduct,
	title,
	isHiddenViewAll = false,
}: OutstandingProductsProps) => {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	return (
		<SectionWrapper $isMobile={isMobile}>
			<Container fluid>
				{/* Title */}
				<TitleWrapper $isMobile={isMobile}>
					<SectionTitle $isMobile={isMobile}>{title}</SectionTitle>
				</TitleWrapper>

				{/* Products Grid/Carousel */}
				{isMobile ? (
					<CarouselWrapper>
						<StyledCarousel
							interval={2000}
							indicators={listProduct && listProduct.length > 1}
							controls={listProduct && listProduct.length > 1}
							pause='hover'
						>
							{listProduct?.map(product => (
								<Carousel.Item key={product.id}>
									<CarouselItemContainer>
										<ItemOutstandingProduct
											title={product?.title || ''}
											description={product?.description || ''}
											image={product?.image_url || ''}
											buttonText={'XEM CHI TIẾT'}
											productId={product?.id}
										/>
									</CarouselItemContainer>
								</Carousel.Item>
							)) ?? []}
						</StyledCarousel>
					</CarouselWrapper>
				) : (
					<Row>
						{listProduct?.map(product => (
							<Col
								lg={4}
								md={6}
								sm={12}
								key={product.id}
								className={!isHiddenViewAll ? '' : 'mb-5'}
							>
								<ItemOutstandingProduct
									title={product?.title || ''}
									description={product?.description || ''}
									image={product?.image_url || ''}
									buttonText={'XEM CHI TIẾT'}
									productId={product?.id}
								/>
							</Col>
						)) ?? []}
					</Row>
				)}

				{/* View All Button */}
				{!isHiddenViewAll && (
					<ViewAllWrapper
						$isMobile={isMobile}
						onClick={() => (window.location.href = '/products')}
					>
						<ViewAllButton>
							XEM TẤT CẢ
							<ArrowIcon>→</ArrowIcon>
						</ViewAllButton>
					</ViewAllWrapper>
				)}
			</Container>
		</SectionWrapper>
	);
};

// Styled Components
const SectionWrapper = styled.section<{ $isMobile?: boolean }>`
	background: linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%);
	padding: ${props => (props.$isMobile ? '2rem 0' : '4rem 10rem')};
	position: relative;
	overflow: hidden;
`;

const TitleWrapper = styled.div<{ $isMobile?: boolean }>`
	text-align: center;
	margin-bottom: ${props => (props.$isMobile ? '1.5rem' : '3rem')};
	padding: ${props => (props.$isMobile ? '0 1rem' : '0')};
`;

const SectionTitle = styled.h2<{ $isMobile?: boolean }>`
	font-size: ${props => (props.$isMobile ? '1.6rem !important' : '2.5rem')};
	font-weight: 700;
	color: #0966c5;
	margin: 0rem 0 !important;
	position: relative;
	display: inline-block;

	&::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: ${props => (props.$isMobile ? '40px' : '60px')};
		height: 3px;
		background: #1976d2;
		border-radius: 2px;
	}
`;

const ViewAllWrapper = styled.div<{ $isMobile?: boolean }>`
	text-align: center;
	margin-top: ${props => (props.$isMobile ? '1.5rem' : '3rem')};
	padding: ${props => (props.$isMobile ? '0 1rem' : '0')};
`;

// Carousel Components
const CarouselWrapper = styled.div`
	padding: 1rem 0rem;
	max-width: 100%;
	overflow: hidden;
	margin: 0 auto;
`;

const StyledCarousel = styled(Carousel)`
	.carousel-control-prev,
	.carousel-control-next {
		width: 40px;
		height: 40px;
		background: rgba(9, 103, 197, 0.493);
		border-radius: 50%;
		top: 50%;
		transform: translateY(-50%);
		border: none;
		transition: all 0.3s ease;
		opacity: 0.8;

		&:hover {
			background: rgba(9, 102, 197, 1);
			transform: translateY(-50%) scale(1.1);
			opacity: 1;
		}

		&:focus {
			box-shadow: 0 0 0 3px rgba(9, 102, 197, 0.3);
		}
	}

	.carousel-control-prev {
		left: 4px;
	}

	.carousel-control-next {
		right: 4px;
	}

	.carousel-control-prev-icon,
	.carousel-control-next-icon {
		width: 16px;
		height: 16px;
	}

	.carousel-indicators {
		bottom: -30px;

		button {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin: 0 4px;
			background-color: #bdc3c7;
			border: none;
			transition: all 0.3s ease;

			&.active {
				background-color: #0966c5;
				transform: scale(1.2);
			}
		}
	}
`;

const CarouselItemContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 0rem 10px;
	max-width: 100%;
	width: 100%;
	margin: 0 auto;

	@media (max-width: 480px) {
		max-width: 280px;
		padding: 0rem 0;
		padding-bottom: 1.2rem;
	}
`;

const ViewAllButton = styled.button`
	background: transparent;
	color: #0966c5;
	border: 2px solid #0966c5;
	padding: 12px 30px;
	border-radius: 25px;
	font-weight: 700;
	font-size: 1rem;
	display: inline-flex;
	align-items: center;
	gap: 10px;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.5px;

	&:hover {
		background: #0966c5;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(25, 118, 210, 0.3);
	}

	&:active {
		transform: translateY(0);
	}
`;

const ArrowIcon = styled.span`
	font-size: 1.2rem;
	transition: transform 0.3s ease;

	${ViewAllButton}:hover & {
		transform: translateX(5px);
	}
`;

export default OutstandingProducts;
