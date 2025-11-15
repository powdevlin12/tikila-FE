'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useMediaQuery } from '../../../../hooks';
import { MOBILE_MAX_WIDTH } from '../../../../contants/size';

type SectionIntroProps = {
	introContent: string;
	introImg: string;
};

const SectionIntro = ({ introContent, introImg }: SectionIntroProps) => {
	const router = useRouter();
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	return (
		<SectionWrapper $isMobile={isMobile}>
			<Container fluid>
				<Row className='align-items-center'>
					{/* Mobile: Image first, Desktop: Content first */}
					{isMobile ? (
						<>
							{/* Image Column - Mobile First */}
							<Col xs={12} className='mb-3'>
								<ImageWrapper $isMobile={isMobile}>
									<MainImage src={introImg || ''} alt='Công ty Tikila' />
								</ImageWrapper>
							</Col>
							{/* Content Column - Mobile Second */}
							<Col xs={12}>
								<ContentWrapper $isMobile={isMobile}>
									{!isMobile && <BadgeWrapper>VỀ CHÚNG TÔI</BadgeWrapper>}

									<CompanyTitle $isMobile={isMobile}>
										Công ty TIKILA
									</CompanyTitle>

									<ContentText $isMobile={isMobile}>
										{introContent || `Công ty TIKILA`}
									</ContentText>

									<ActionButton onClick={() => router.push('/introduce')}>
										XEM THÊM
										<ArrowIcon>→</ArrowIcon>
									</ActionButton>
								</ContentWrapper>
							</Col>
						</>
					) : (
						<>
							{/* Left Column - Content */}
							<Col lg={6} md={12} className='mb-4 mb-lg-0'>
								<ContentWrapper $isMobile={isMobile}>
									<BadgeWrapper>VỀ CHÚNG TÔI</BadgeWrapper>

									<CompanyTitle $isMobile={isMobile}>
										Công ty TIKILA
									</CompanyTitle>

									<ContentText $isMobile={isMobile}>
										{introContent || `Công ty TIKILA`}
									</ContentText>

									<ActionButton onClick={() => router.push('/introduce')}>
										XEM THÊM
										<ArrowIcon>→</ArrowIcon>
									</ActionButton>
								</ContentWrapper>
							</Col>{' '}
							{/* Right Column - Image */}
							<Col lg={6} md={12}>
								<ImageWrapper $isMobile={isMobile}>
									<MainImage src={introImg || ''} alt='Công ty Tikila' />
								</ImageWrapper>
							</Col>
						</>
					)}
				</Row>
			</Container>
		</SectionWrapper>
	);
};

// Styled Components
const SectionWrapper = styled.section<{ $isMobile?: boolean }>`
	background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
	padding: ${props => (props.$isMobile ? '3rem 0.25em' : '4rem 10rem')};
	position: relative;
	overflow: hidden;
`;

const ContentWrapper = styled.div<{ $isMobile?: boolean }>`
	padding-right: ${props => (props.$isMobile ? '0' : '2rem')};
	text-align: ${props => (props.$isMobile ? 'center' : 'left')};

	@media (max-width: 991px) {
		padding-right: 0;
		text-align: center;
	}
`;

const BadgeWrapper = styled.div`
	display: inline-block;
	background: #0966c5;
	color: white;
	padding: 8px 16px;
	border-radius: 2px;
	font-size: 0.875rem;
	font-weight: 600;
	letter-spacing: 0.5px;
	margin-bottom: 1.5rem;
	text-transform: uppercase;
`;

const CompanyTitle = styled.h1<{ $isMobile?: boolean }>`
	font-size: ${props => (props.$isMobile ? '1.8rem' : '2.5rem')};
	font-weight: 700;
	color: #191c1f;
	margin-bottom: ${props => (props.$isMobile ? '1rem' : '2rem')};
	line-height: 1.2;

	@media (max-width: 768px) {
		font-size: 2.5rem;
	}

	@media (max-width: 576px) {
		font-size: 2rem;
	}
`;

const ContentText = styled.p<{ $isMobile?: boolean }>`
	font-size: 1.1rem;
	line-height: 1.8;
	color: #475156;
	margin-bottom: ${props => (props.$isMobile ? '1.5rem' : '2.5rem')};
	text-align: ${props => (props.$isMobile ? 'center' : 'justify')};

	@media (max-width: 991px) {
		text-align: left;
	}

	@media (max-width: 576px) {
		font-size: 1rem;
		line-height: 1.6;
	}
`;

const ActionButton = styled.button`
	background: #0966c5;
	color: white;
	border: none;
	padding: 12px 30px;
	border-radius: 3px;
	font-weight: 600;
	font-size: 1rem;
	display: inline-flex;
	align-items: center;
	gap: 16px;
	cursor: pointer;
	transition: all 0.3s ease;
	text-transform: uppercase;
	letter-spacing: 0.5px;

	&:hover {
		background: #1d4ed8;
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
	}

	&:active {
		transform: translateY(0);
	}
`;

const ArrowIcon = styled.span`
	font-size: 1.2rem;
	transition: transform 0.3s ease;

	${ActionButton}:hover & {
		transform: translateX(5px);
	}
`;

const ImageWrapper = styled.div<{ $isMobile?: boolean }>`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${props => (props.$isMobile ? '250px' : '500px')};
	margin-top: ${props => (props.$isMobile ? '1rem' : '0')};
	margin-bottom: ${props => (props.$isMobile ? '1rem' : '0')};
`;

const MainImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 15px;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	position: relative;
	z-index: 2;
`;

export default SectionIntro;
