'use client';

import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useMediaQuery } from '../../../../hooks';
import { MOBILE_MAX_WIDTH } from '../../../../contants/size';

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
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	return (
		<>
			<BannerWrapper banner={banner} $isMobile={isMobile}>
				<Overlay />
				{!isMobile && (
					<StatsWrapper $isMobile={isMobile}>
						<Container>
							<Row>
								<Col md={4} className='mb-3 mb-md-0'>
									<StatBox $isMobile={isMobile}>
										<StatNumber>{COUNT_CUSTOMER}+</StatNumber>
										<StatLabel>Khách hàng</StatLabel>
									</StatBox>
								</Col>
								<Col md={4} className='mb-3 mb-md-0'>
									<StatBox $isMobile={isMobile}>
										<StatNumber>{COUNT_CUSTOMER_SATISFY}%</StatNumber>
										<StatLabel>Khách hài lòng</StatLabel>
									</StatBox>
								</Col>
								<Col md={4}>
									<StatBox $isMobile={isMobile}>
										<StatNumber>{COUNT_QUANLITY}%</StatNumber>
										<StatLabel>Chất lượng & Uy tín</StatLabel>
									</StatBox>
								</Col>
							</Row>
						</Container>
					</StatsWrapper>
				)}
			</BannerWrapper>
			{isMobile && (
				<MobileStatsWrapper>
					<Container>
						<Row>
							<Col xs={4}>
								<StatBox $isMobile={isMobile}>
									<StatNumber>{COUNT_CUSTOMER}+</StatNumber>
									<StatLabel>Khách hàng</StatLabel>
								</StatBox>
							</Col>
							<Col xs={4}>
								<StatBox $isMobile={isMobile}>
									<StatNumber>{COUNT_CUSTOMER_SATISFY}%</StatNumber>
									<StatLabel>Khách hài lòng</StatLabel>
								</StatBox>
							</Col>
							<Col xs={4}>
								<StatBox $isMobile={isMobile}>
									<StatNumber>{COUNT_QUANLITY}%</StatNumber>
									<StatLabel>Chất lượng & Uy tín</StatLabel>
								</StatBox>
							</Col>
						</Row>
					</Container>
				</MobileStatsWrapper>
			)}
		</>
	);
};

const BannerWrapper = styled.section<{ banner: string; $isMobile?: boolean }>`
	position: relative;
	width: 100%;
	height: ${props => (props.$isMobile ? '50vh' : '80vh')};
	background-image: url(${props => props.banner});
	background-size: cover;
	background-position: center;
	display: flex;
	align-items: ${props => (props.$isMobile ? 'center' : 'flex-end')};
	padding-bottom: ${props => (props.$isMobile ? '0' : '2rem')};

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

const StatsWrapper = styled.div<{ $isMobile?: boolean }>`
	position: relative;
	width: 100%;
	z-index: 2;
`;

const MobileStatsWrapper = styled.div`
	width: 100%;
	padding: 1rem 0;
	background: #f8f9fa;
`;

const StatBox = styled.div<{ $isMobile?: boolean }>`
	background: #191c1f;
	color: white;
	padding: ${props => (props.$isMobile ? '0.8rem 0.5rem' : '1.5rem')};
	text-align: center;
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	transition: all 0.3s ease;
	margin: ${props => (props.$isMobile ? '0 0.25rem' : '0')};
	height: ${props => (props.$isMobile ? '100px' : 'auto')};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

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
		font-size: 1.4rem;
		margin-bottom: 0.25rem;
	}
`;

const StatLabel = styled.p`
	font-size: 1rem;
	margin: 0;
	color: #d1d5db;
	line-height: 1.2;

	@media (max-width: 768px) {
		font-size: 0.75rem;
		line-height: 1.1;
	}
`;

export default BannerSection;
