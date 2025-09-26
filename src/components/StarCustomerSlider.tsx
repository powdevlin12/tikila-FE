import React, { useState, useEffect } from 'react';
import { Carousel, Card, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useApi } from '../services';
import type { StarCustomer } from '../interfaces/StarCustomer';

// Styled components
const StyledSection = styled.section`
	padding: 80px 0;
	background: #8bafe973;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
			repeat;
		pointer-events: none;
	}
`;

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
	position: relative;
	z-index: 1;
`;

const SectionTitle = styled.h2`
	text-align: center;
	font-size: 2.5rem;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 20px;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 80px;
		height: 4px;
		background: linear-gradient(45deg, #3498db, #2ecc71);
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		font-size: 2rem;
	}

	@media (max-width: 576px) {
		font-size: 1.8rem;
	}
`;

const SectionSubtitle = styled.p`
	text-align: center;
	font-size: 1.2rem;
	color: #7f8c8d;
	margin-bottom: 50px;
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: 768px) {
		font-size: 1.1rem;
		margin-bottom: 40px;
		padding: 0 20px;
	}

	@media (max-width: 576px) {
		font-size: 1rem;
		margin-bottom: 30px;
	}
`;

const StyledCarousel = styled(Carousel)`
	.carousel-control-prev,
	.carousel-control-next {
		width: 50px;
		height: 50px;
		background: rgba(52, 152, 219, 0.8);
		border-radius: 50%;
		top: 50%;
		transform: translateY(-50%);
		border: none;
		transition: all 0.3s ease;
		opacity: 0.8;

		&:hover {
			background: rgba(52, 152, 219, 1);
			transform: translateY(-50%) scale(1.1);
			opacity: 1;
		}

		&:focus {
			box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
		}

		@media (max-width: 768px) {
			width: 40px;
			height: 40px;
			left: 10px !important;
			right: 10px !important;
		}
	}

	.carousel-control-prev {
		left: -60px;

		@media (max-width: 768px) {
			left: 10px !important;
		}
	}

	.carousel-control-next {
		right: -60px;

		@media (max-width: 768px) {
			right: 10px !important;
		}
	}

	.carousel-control-prev-icon,
	.carousel-control-next-icon {
		width: 20px;
		height: 20px;

		@media (max-width: 768px) {
			width: 16px;
			height: 16px;
		}
	}

	.carousel-indicators {
		bottom: -50px;

		@media (max-width: 768px) {
			bottom: -40px;
		}

		button {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			margin: 0 5px;
			background-color: #bdc3c7;
			border: none;
			transition: all 0.3s ease;

			&.active {
				background-color: #3498db;
				transform: scale(1.2);
			}
		}
	}

	@media (max-width: 768px) {
		margin: 0 -10px;
	}
`;

const ReviewCard = styled(Card)`
	border: none;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	border-radius: 20px;
	overflow: hidden;
	transition: all 0.3s ease;
	background: white;
	margin: 0 15px;
	height: 280px;
	display: flex;
	flex-direction: column;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	@media (max-width: 768px) {
		margin: 0 10px;
		height: 260px;
	}

	@media (max-width: 576px) {
		margin: 0 5px;
		height: 240px;
	}
`;

const CardHeader = styled.div`
	padding: 30px 25px 0;
	text-align: center;
	position: relative;
`;

const QuoteIcon = styled(FaQuoteLeft)`
	font-size: 2rem;
	color: #3498db;
	margin-bottom: 15px;
	opacity: 0.3;
`;

const ReviewContent = styled.p`
	font-size: 1rem;
	line-height: 1.6;
	color: #2c3e50;
	font-style: italic;
	margin-bottom: 20px;
	flex-grow: 1;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	min-height: 80px;

	@media (max-width: 768px) {
		font-size: 0.95rem;
		-webkit-line-clamp: 3;
		min-height: 70px;
	}

	@media (max-width: 576px) {
		font-size: 0.9rem;
		-webkit-line-clamp: 3;
		min-height: 60px;
	}
`;

const CardFooter = styled.div`
	padding: 0 25px 25px;
	text-align: center;
	border-top: 1px solid #ecf0f1;
	margin-top: auto;
	padding-top: 20px;

	@media (max-width: 768px) {
		padding: 0 20px 20px;
		padding-top: 15px;
	}
`;

const CustomerName = styled.h5`
	color: #2c3e50;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 1.1rem;

	@media (max-width: 768px) {
		font-size: 1rem;
		margin-bottom: 8px;
	}
`;

const ReviewDate = styled.small`
	color: #95a5a6;
	font-size: 0.85rem;
	display: block;
	margin-bottom: 8px;

	@media (max-width: 768px) {
		font-size: 0.8rem;
		margin-bottom: 6px;
	}
`;

const StarsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2px;
`;

const StarIcon = styled(FaStar)<{ $filled: boolean }>`
	color: ${props => (props.$filled ? '#f39c12' : '#ddd')};
	font-size: 1rem;
	transition: color 0.2s ease;
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 300px;
	font-size: 1.2rem;
	color: #7f8c8d;
`;

const ErrorContainer = styled.div`
	text-align: center;
	padding: 40px;
	color: #e74c3c;
	background: #fff;
	border-radius: 15px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const NoDataContainer = styled.div`
	text-align: center;
	padding: 60px 20px;
	color: #7f8c8d;
	background: #fff;
	border-radius: 15px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

	h4 {
		margin-bottom: 15px;
		color: #95a5a6;
	}

	p {
		font-size: 1.1rem;
	}
`;

interface StarCustomerSliderProps {
	itemsPerSlide?: number;
}

const StarCustomerSlider: React.FC<StarCustomerSliderProps> = ({
	itemsPerSlide = 3,
}) => {
	const {
		data: starCustomers,
		loading,
		error,
	} = useApi<StarCustomer[]>('/star-customers');
	const [currentItemsPerSlide, setCurrentItemsPerSlide] =
		useState(itemsPerSlide);

	// Responsive breakpoints
	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setCurrentItemsPerSlide(1); // Mobile: 1 item per slide
			} else if (width < 992) {
				setCurrentItemsPerSlide(2); // Tablet: 2 items per slide
			} else {
				setCurrentItemsPerSlide(itemsPerSlide); // Desktop: original value
			}
		};

		handleResize(); // Initial check
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [itemsPerSlide]);

	// Format date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};
	const renderStars = (rating: number) => {
		return (
			<StarsContainer>
				{[1, 2, 3, 4, 5].map(star => (
					<StarIcon key={star} $filled={star <= rating} />
				))}
			</StarsContainer>
		);
	};

	// Split reviews into chunks for slides
	const chunkArray = (
		array: StarCustomer[],
		chunkSize: number,
	): StarCustomer[][] => {
		const chunks: StarCustomer[][] = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			chunks.push(array.slice(i, i + chunkSize));
		}
		return chunks;
	};

	if (loading) {
		return (
			<StyledSection>
				<Container>
					<SectionTitle>Đánh giá từ khách hàng</SectionTitle>
					<SectionSubtitle>
						Những phản hồi chân thực từ khách hàng của chúng tôi
					</SectionSubtitle>
					<LoadingContainer>
						<div>Đang tải đánh giá...</div>
					</LoadingContainer>
				</Container>
			</StyledSection>
		);
	}

	if (error) {
		return (
			<StyledSection>
				<Container>
					<SectionTitle>Đánh giá từ khách hàng</SectionTitle>
					<ErrorContainer>
						<h4>Không thể tải đánh giá</h4>
						<p>Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.</p>
					</ErrorContainer>
				</Container>
			</StyledSection>
		);
	}

	if (!starCustomers || starCustomers.length === 0) {
		return (
			<StyledSection>
				<Container>
					<SectionTitle>Đánh giá từ khách hàng</SectionTitle>
					<SectionSubtitle>
						Những phản hồi chân thực từ khách hàng của chúng tôi
					</SectionSubtitle>
					<NoDataContainer>
						<h4>Chưa có đánh giá nào</h4>
						<p>Hãy là người đầu tiên để lại đánh giá cho chúng tôi!</p>
					</NoDataContainer>
				</Container>
			</StyledSection>
		);
	}

	const reviewChunks = chunkArray(starCustomers, currentItemsPerSlide);

	return (
		<StyledSection>
			<Container>
				<SectionTitle>Đánh giá từ khách hàng</SectionTitle>
				<SectionSubtitle>
					Những phản hồi chân thực từ khách hàng đã sử dụng dịch vụ của chúng
					tôi
				</SectionSubtitle>

				<StyledCarousel
					interval={5000}
					indicators={reviewChunks.length > 1}
					controls={reviewChunks.length > 1}
					pause='hover'
				>
					{reviewChunks.map((chunk, chunkIndex) => (
						<Carousel.Item key={chunkIndex}>
							<Row className='justify-content-center'>
								{chunk.map(review => (
									<Col
										key={review.id}
										xl={4}
										lg={currentItemsPerSlide === 2 ? 6 : 4}
										md={currentItemsPerSlide === 1 ? 12 : 6}
										sm={12}
										className='mb-4'
									>
										<ReviewCard>
											<CardHeader>
												<QuoteIcon />
												<ReviewContent>
													{review.content ||
														'Khách hàng đã để lại đánh giá tích cực về dịch vụ của chúng tôi.'}
												</ReviewContent>
											</CardHeader>
											<CardFooter>
												<CustomerName>{review.name_customer}</CustomerName>
												<ReviewDate>{formatDate(review.created_at)}</ReviewDate>
												{renderStars(review.star)}
											</CardFooter>
										</ReviewCard>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</StyledCarousel>
			</Container>
		</StyledSection>
	);
};

export default StarCustomerSlider;
