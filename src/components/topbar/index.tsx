import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import facebookIcon from '../../assets/facebook.png';
import zaloIcon from '../../assets/zalo.webp';
import { useMediaQuery } from '../../hooks';
import { MOBILE_MAX_WIDTH } from '../../contants/size';

type TopbarProps = {
	content: string;
	fbLink: string;
	tiktokLink: string;
	zaloLink: string;
};

const Topbar = ({ content, fbLink, tiktokLink, zaloLink }: TopbarProps) => {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	return (
		<Wrapper $isMobile={isMobile}>
			<Container fluid>
				<Row className='align-items-center'>
					<Col xs={6} className='text-start'>
						<p style={{ color: 'white', fontSize: 14 }}>{content}</p>
					</Col>
					<Col xs={6} className='text-end'>
						<div className='social-icons'>
							{!!fbLink && (
								<img
									src={facebookIcon}
									alt='Facebook'
									className='social-icon-img'
									onClick={() => window.open(fbLink, '_blank')}
								/>
							)}

							{!!zaloLink && (
								<img
									src={zaloIcon}
									alt='Zalo'
									className='social-icon-img-yt'
									onClick={() => window.open(zaloLink, '_blank')}
								/>
							)}
							{!!tiktokLink && (
								<SocialIcon
									url={tiktokLink}
									style={{ width: 24, height: 24 }}
								/>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.section<{ $isMobile?: boolean }>`
	padding: ${props => (props.$isMobile ? '1rem 2rem' : '1em 10em')};
	background: #0966c5;
	width: 100%;
	box-sizing: border-box;
	margin: 0;

	.text-start {
		text-align: left !important;
	}

	.text-end {
		text-align: right !important;
	}

	.social-icons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1.2rem;
	}

	.social-icon-img {
		width: 20px;
		height: 20px;
		cursor: pointer;
		transition: opacity 0.3s ease;

		&:hover {
			opacity: 0.8;
		}
	}

	.social-icon-img-yt {
		width: 24px;
		height: 24px;
		cursor: pointer;
		transition: opacity 0.3s ease;
		object-fit: cover;

		&:hover {
			opacity: 0.8;
		}
	}
`;

export default Topbar;
