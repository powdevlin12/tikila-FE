import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import ItemOutstandingProduct from './item-outstanding-product';

const OutstandingProducts = () => {
	// Fake data giống như trong hình
	const outstandingProducts = [
		{
			id: 1,
			title: 'HỖ TRỢ KHỞI NGHIỆP KINH DOANH',
			description:
				'Cung cấp các dịch vụ hỗ trợ hoàn chỉnh cho doanh nghiệp được nhượng quyền',
			image:
				'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop',
			buttonText: 'LIÊN HỆ NGAY',
		},
		{
			id: 2,
			title: 'CÁC THIẾT BỊ GIẶT CÔNG NGHIỆP TỰ PH..',
			description:
				'Máy móc hiện đại. Đảm bảo quần áo luôn sạch sẽ và thơm tho. Dịch vụ chuyên nghiệp. Đội ngũ nh..',
			image:
				'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
			buttonText: 'LIÊN HỆ NGAY',
		},
		{
			id: 3,
			title: 'ĐIỀU QUAN TRỌNG KHI MỞ TIỆM GIẶT',
			description:
				'Trước khi mở tiệm giặt sấy bạn nên xem 10 điều này để thành công.. Liên hệ tư vấn: 0868937128',
			image:
				'https://images.unsplash.com/photo-1528699633788-424224dc89b5?w=400&h=300&fit=crop',
			buttonText: 'LIÊN HỆ NGAY',
		},
	];

	return (
		<SectionWrapper>
			<Container fluid>
				{/* Title */}
				<TitleWrapper>
					<SectionTitle>Dịch vụ nổi bật</SectionTitle>
				</TitleWrapper>

				{/* Products Grid */}
				<Row>
					{outstandingProducts.map(product => (
						<Col lg={4} md={6} sm={12} key={product.id}>
							<ItemOutstandingProduct
								title={product.title}
								description={product.description}
								image={product.image}
								buttonText={product.buttonText}
							/>
						</Col>
					))}
				</Row>

				{/* View All Button */}
				<ViewAllWrapper>
					<ViewAllButton>
						XEM TẤT CẢ
						<ArrowIcon>→</ArrowIcon>
					</ViewAllButton>
				</ViewAllWrapper>
			</Container>
		</SectionWrapper>
	);
};

// Styled Components
const SectionWrapper = styled.section`
	background: linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%);
	padding: 4rem 10rem;
	position: relative;
	overflow: hidden;

	@media (max-width: 768px) {
		padding: 3rem 1rem;
	}
`;

const TitleWrapper = styled.div`
	text-align: center;
	margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
	font-size: 2.5rem;
	font-weight: 700;
	color: #0966c5;
	margin-bottom: 1rem;
	position: relative;
	display: inline-block;

	&::after {
		content: '';
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 3px;
		background: #1976d2;
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		font-size: 2rem;
	}

	@media (max-width: 576px) {
		font-size: 1.8rem;
	}
`;

const ViewAllWrapper = styled.div`
	text-align: center;
	margin-top: 3rem;
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
