import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import facebookIcon from '../../assets/facebook.png';
import youtubeIcon from '../../assets/youtube.png';

type TopbarProps = {
	content: string;
	fbLink: string;
	ytLink: string;
	tiktokLink: string;
};

const Topbar = ({ content, fbLink, ytLink, tiktokLink }: TopbarProps) => {
	return (
		<Wrapper>
			<Container fluid>
				<Row className='align-items-center'>
					<Col xs={6} className='text-start'>
						<p style={{ color: 'white', fontSize: 14 }}>{content}</p>
					</Col>
					<Col xs={6} className='text-end'>
						<div className='social-icons'>
							<img
								src={facebookIcon}
								alt='Facebook'
								className='social-icon-img'
								onClick={() => window.open(fbLink, '_blank')}
							/>
							<img
								src={youtubeIcon}
								alt='YouTube'
								className='social-icon-img-yt'
								onClick={() => window.open(ytLink, '_blank')}
							/>
							<SocialIcon url={tiktokLink} style={{ width: 24, height: 24 }} />
						</div>
					</Col>
				</Row>
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	padding: 1em 10em;
	background: #0966c5;
	width: 100vw;
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
		width: 20px;
		height: 14px;
		cursor: pointer;
		transition: opacity 0.3s ease;
		object-fit: contain;

		&:hover {
			opacity: 0.8;
		}
	}
`;

export default Topbar;
