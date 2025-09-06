import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

type BannerSectionProps = {
	banner: string;
	COUNT_CUSTOMER: number;
	COUNT_CUSTOMER_SATISFY: number;
	COUNT_QUANLITY: number;
};
const BannerSection = ({
	banner,
	COUNT_CUSTOMER,
	COUNT_CUSTOMER_SATISFY,
	COUNT_QUANLITY,
}: BannerSectionProps) => {
	console.log({
		COUNT_CUSTOMER,
		COUNT_CUSTOMER_SATISFY,
		COUNT_QUANLITY,
	});
	return (
		<BannerWrapper
			banner={
				banner ||
				'https://images.samsung.com/is/image/samsung/p6pim/vn/ww90cg544daxsv/gallery/vn-front-loading-washer-ww90cg544daxsv-533661619?$2052_1641_PNG$'
			}
		>
			<Overlay />
			<StatsWrapper>
				<Container>
					<Row>
						<Col md={4} className='mb-3 mb-md-0'>
							<StatBox>
								<StatNumber>{COUNT_CUSTOMER}+</StatNumber>
								<StatLabel>Khách hàng</StatLabel>
							</StatBox>
						</Col>
						<Col md={4} className='mb-3 mb-md-0'>
							<StatBox>
								<StatNumber>{COUNT_CUSTOMER_SATISFY}%</StatNumber>
								<StatLabel>Khách hài lòng</StatLabel>
							</StatBox>
						</Col>
						<Col md={4}>
							<StatBox>
								<StatNumber>{COUNT_QUANLITY}%</StatNumber>
								<StatLabel>Chất lượng & Uy tín</StatLabel>
							</StatBox>
						</Col>
					</Row>
				</Container>
			</StatsWrapper>
		</BannerWrapper>
	);
};

const BannerWrapper = styled.section<{ banner: string }>`
	position: relative;
	width: 100%;
	height: 80vh;
	background-image: url(${props => props.banner});
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: flex-end;
	padding-bottom: 2rem;

	@media (max-width: 768px) {
		height: 40vh;
	}
	@media (max-width: 576px) {
		height: 30vh;
		padding-bottom: 1rem;
	}
`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
`;

const StatsWrapper = styled.div`
	position: relative;
	width: 100%;
	background-color: 'red';
	z-index: 2;
`;

const StatBox = styled.div`
	background: #191c1f;
	color: white;
	padding: 1.5rem;
	text-align: center;
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	transition: all 0.3s ease;

	&:hover {
		transform: translateY(-5px);
		background: rgba(17, 24, 39, 0.95);
	}
`;

const StatNumber = styled.h3`
	font-size: 2.2rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	color: #ffffff;

	@media (max-width: 768px) {
		font-size: 1.8rem;
	}
`;

const StatLabel = styled.p`
	font-size: 1rem;
	margin: 0;
	color: #d1d5db;

	@media (max-width: 768px) {
		font-size: 0.9rem;
	}
`;

export default BannerSection;
