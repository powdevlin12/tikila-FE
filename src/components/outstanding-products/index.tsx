'use client';

import { Container, Row, Col, Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import ItemOutstandingProduct from './item-outstanding-product';
import type { Product } from '../../interfaces/Product';
import { useMediaQuery } from '../../hooks';
import { MOBILE_MAX_WIDTH } from '../../contants/size';
import { useState, useMemo } from 'react';

type OutstandingProductsProps = {
	listProduct: Product[];
	title: string;
	isHiddenViewAll?: boolean;
	isFromProductPage?: boolean;
	itemsPerPage?: number; // Số item mỗi trang
};

const OutstandingProducts = ({
	listProduct,
	title,
	isHiddenViewAll = false,
	isFromProductPage = false,
	itemsPerPage = 10, // Mặc định 6 items mỗi trang
}: OutstandingProductsProps) => {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
	const [currentPage, setCurrentPage] = useState(1);

	// Tính toán pagination
	const { paginatedProducts, totalPages, startIndex, endIndex } =
		useMemo(() => {
			// Nếu là mobile và không phải product page thì hiển thị tất cả (carousel)
			if (isMobile && !isFromProductPage) {
				return {
					paginatedProducts: listProduct,
					totalPages: 1,
					startIndex: 0,
					endIndex: listProduct.length,
				};
			}

			// Nếu không phải từ product page và không ẩn "Xem tất cả" thì chỉ hiển thị 3 items đầu
			if (!isFromProductPage && !isHiddenViewAll) {
				return {
					paginatedProducts: listProduct.slice(0, 3),
					totalPages: 1,
					startIndex: 0,
					endIndex: Math.min(3, listProduct.length),
				};
			}

			// Pagination cho product page
			const total = Math.ceil(listProduct.length / itemsPerPage);
			const start = (currentPage - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			const paginated = listProduct.slice(start, end);

			return {
				paginatedProducts: paginated,
				totalPages: total,
				startIndex: start,
				endIndex: Math.min(end, listProduct.length),
			};
		}, [
			listProduct,
			currentPage,
			itemsPerPage,
			isMobile,
			isFromProductPage,
			isHiddenViewAll,
		]);

	// Reset trang khi số lượng sản phẩm thay đổi
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll lên đầu section khi chuyển trang
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<SectionWrapper $isMobile={isMobile}>
			<Container fluid>
				{/* Title */}
				<TitleWrapper $isMobile={isMobile}>
					<SectionTitle $isMobile={isMobile}>{title}</SectionTitle>
				</TitleWrapper>

				{/* Products Grid/Carousel */}
				{isMobile && !isFromProductPage ? (
					<CarouselWrapper>
						<StyledCarousel
							interval={2000}
							indicators={paginatedProducts && paginatedProducts.length > 1}
							controls={paginatedProducts && paginatedProducts.length > 1}
							pause='hover'
						>
							{paginatedProducts?.map(product => (
								<Carousel.Item key={product.id}>
									<CarouselItemContainer>
										<ItemOutstandingProduct
											title={product?.title || ''}
											description={product?.description || ''}
											image={product?.imageUrl || ''}
											buttonText={'XEM CHI TIẾT'}
											productId={product?.id}
										/>
									</CarouselItemContainer>
								</Carousel.Item>
							)) ?? []}
						</StyledCarousel>
					</CarouselWrapper>
				) : (
					<>
						<Row>
							{paginatedProducts?.map(product => (
								<Col
									lg={4}
									md={6}
									sm={isMobile && isFromProductPage ? 12 : 12}
									key={product.id}
									className={!isHiddenViewAll ? 'mb-4' : 'mb-5'}
								>
									<ItemOutstandingProduct
										title={product?.title || ''}
										description={product?.description || ''}
										image={product?.imageUrl || ''}
										buttonText={'XEM CHI TIẾT'}
										productId={product?.id}
									/>
								</Col>
							)) ?? []}
						</Row>

						{/* Pagination - chỉ hiển thị khi là product page và có nhiều hơn 1 trang */}
						{isFromProductPage && totalPages > 1 && (
							<PaginationWrapper $isMobile={isMobile}>
								<PaginationInfo $isMobile={isMobile}>
									Hiển thị {startIndex + 1}-{endIndex} trong tổng số{' '}
									{listProduct.length} sản phẩm
								</PaginationInfo>
								<PaginationControls>
									<PageButton
										$isMobile={isMobile}
										disabled={currentPage === 1}
										onClick={() => handlePageChange(currentPage - 1)}
									>
										« Trước
									</PageButton>

									{Array.from({ length: totalPages }, (_, index) => {
										const page = index + 1;
										// Hiển thị tối đa 5 số trang
										if (
											page === 1 ||
											page === totalPages ||
											(page >= currentPage - 1 && page <= currentPage + 1)
										) {
											return (
												<PageButton
													key={page}
													$isMobile={isMobile}
													$isActive={currentPage === page}
													onClick={() => handlePageChange(page)}
												>
													{page}
												</PageButton>
											);
										}
										// Hiển thị dấu "..." khi cần
										if (page === currentPage - 2 || page === currentPage + 2) {
											return (
												<PageEllipsis key={`ellipsis-${page}`}>
													...
												</PageEllipsis>
											);
										}
										return null;
									})}

									<PageButton
										$isMobile={isMobile}
										disabled={currentPage === totalPages}
										onClick={() => handlePageChange(currentPage + 1)}
									>
										Tiếp »
									</PageButton>
								</PaginationControls>
							</PaginationWrapper>
						)}
					</>
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
	font-size: ${props => (props.$isMobile ? '1.6rem !important' : '2.3rem')};
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

// Pagination Styled Components
const PaginationWrapper = styled.div<{ $isMobile?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${props => (props.$isMobile ? '15px' : '20px')};
	margin-top: ${props => (props.$isMobile ? '2rem' : '3rem')};
	padding: ${props => (props.$isMobile ? '0 1rem' : '0')};
`;

const PaginationInfo = styled.div<{ $isMobile?: boolean }>`
	font-size: ${props => (props.$isMobile ? '0.9rem' : '1rem')};
	color: #666;
	text-align: center;
	font-weight: 500;
`;

const PaginationControls = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	flex-wrap: wrap;
	justify-content: center;
`;

const PageButton = styled.button<{ $isMobile?: boolean; $isActive?: boolean }>`
	background: ${props => (props.$isActive ? '#0966c5' : 'transparent')};
	color: ${props => (props.$isActive ? 'white' : '#0966c5')};
	border: 2px solid #0966c5;
	padding: ${props => (props.$isMobile ? '8px 12px' : '10px 15px')};
	border-radius: 8px;
	font-weight: 600;
	font-size: ${props => (props.$isMobile ? '0.9rem' : '1rem')};
	cursor: pointer;
	transition: all 0.3s ease;
	min-width: ${props => (props.$isMobile ? '40px' : '45px')};
	height: ${props => (props.$isMobile ? '40px' : '45px')};
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover:not(:disabled) {
		background: ${props => (props.$isActive ? '#1976d2' : '#0966c5')};
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(9, 102, 197, 0.3);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	@media (max-width: 576px) {
		padding: 6px 10px;
		font-size: 0.85rem;
		min-width: 35px;
		height: 35px;
	}
`;

const PageEllipsis = styled.span`
	color: #666;
	font-weight: 500;
	padding: 0 5px;
	display: flex;
	align-items: center;
	height: 45px;

	@media (max-width: 576px) {
		height: 35px;
		font-size: 0.85rem;
	}
`;

export default OutstandingProducts;
