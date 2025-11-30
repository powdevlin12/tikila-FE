import styled from 'styled-components';
import Header from '../../components/header';
import HTMLReactParser from 'html-react-parser';
import { useApiWithQuery } from '../../services';
import LoadingView from '../../components/loading-view';
import { useScrollToTop, useMediaQuery, usePageTitle } from '../../hooks';
import { MOBILE_MAX_WIDTH } from '../../contants/size';
import Footer from '../../components/footer';

interface IntroDetail {
	intro_text_detail: string;
}

const Introduce = () => {
	usePageTitle('Giới thiệu');

	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	const {
		data: introData,
		loading,
		error,
	} = useApiWithQuery<IntroDetail>('/company/intro-detail', {});

	useScrollToTop('');

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
				<ContentContainer $isMobile={isMobile}>
					<ErrorMessage>Có lỗi xảy ra khi tải nội dung giới thiệu</ErrorMessage>
				</ContentContainer>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Header />
			<ContentContainer $isMobile={isMobile}>
				<IntroContent $isMobile={isMobile}>
					{introData?.intro_text_detail ? (
						HTMLReactParser(introData.intro_text_detail)
					) : (
						<p>Chưa có nội dung giới thiệu</p>
					)}
				</IntroContent>
			</ContentContainer>
			<Footer />
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

const ContentContainer = styled.div<{ $isMobile?: boolean }>`
	max-width: 100%;
	padding: ${props => (props.$isMobile ? '1.5rem 1rem' : '2rem 10rem')};
	margin: 0 auto;

	@media (max-width: 768px) {
		padding: 1.5rem 1.2rem;
	}

	@media (max-width: 576px) {
		padding: 1rem 0.8rem;
	}
`;

const IntroContent = styled.div<{ $isMobile?: boolean }>`
	line-height: 1.8;
	font-size: ${props => (props.$isMobile ? '15px' : '16px')};
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
		margin: ${props => (props.$isMobile ? '25px 0 15px 0' : '40px 0 20px 0')};
		font-weight: bold;
		line-height: 1.3;

		&:first-child {
			margin-top: 0;
		}
	}

	h1 {
		font-size: ${props => (props.$isMobile ? '1.8rem' : '2.5rem')};
		color: #2c3e50;
		margin-bottom: ${props => (props.$isMobile ? '20px' : '30px')};

		@media (max-width: 768px) {
			font-size: 2rem;
		}

		@media (max-width: 576px) {
			font-size: 1.6rem;
		}
	}

	h2 {
		font-size: ${props => (props.$isMobile ? '1.4rem' : '2rem')};
		color: #34495e;

		@media (max-width: 768px) {
			font-size: 1.5rem;
		}

		@media (max-width: 576px) {
			font-size: 1.3rem;
		}
	}

	h3 {
		font-size: ${props => (props.$isMobile ? '1.2rem' : '1.5rem')};
		color: #34495e;

		@media (max-width: 576px) {
			font-size: 1.1rem;
		}
	}

	p {
		margin-bottom: ${props => (props.$isMobile ? '15px' : '20px')};
		text-indent: ${props => (props.$isMobile ? '1.5em' : '2em')};
		line-height: ${props => (props.$isMobile ? '1.6' : '1.8')};

		&:first-of-type {
			text-indent: 0;
		}

		@media (max-width: 576px) {
			margin-bottom: 12px;
			text-indent: 1em;
			line-height: 1.5;
		}
	}

	img {
		/* Responsive image sizing */
		max-width: ${props => (props.$isMobile ? '100%' : '70%')};
		max-height: ${props => (props.$isMobile ? '400px' : '600px')};
		height: auto;
		width: auto;

		/* Layout */
		border-radius: ${props => (props.$isMobile ? '8px' : '12px')};
		margin: ${props => (props.$isMobile ? '15px auto 20px' : '30px auto')};
		display: block;

		/* Background */
		background: #f8f9fa;

		@media (max-width: 768px) {
			max-height: 350px;
			margin: 15px auto;
			border-radius: 8px;
		}
	}

	blockquote {
		border-left: 4px solid #007bff;
		background: #f8f9fa;
		padding: ${props => (props.$isMobile ? '15px' : '20px')};
		margin: ${props => (props.$isMobile ? '20px 0' : '30px 0')};
		font-style: italic;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		p {
			margin-bottom: 0;
			text-indent: 0;
		}

		@media (max-width: 576px) {
			padding: 12px;
			margin: 15px 0;
		}
	}

	ul,
	ol {
		margin: ${props => (props.$isMobile ? '15px 0' : '20px 0')};
		padding-left: ${props => (props.$isMobile ? '25px' : '30px')};

		@media (max-width: 576px) {
			margin: 12px 0;
			padding-left: 20px;
		}
	}

	li {
		margin-bottom: ${props => (props.$isMobile ? '8px' : '10px')};

		@media (max-width: 576px) {
			margin-bottom: 6px;
		}
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

export default Introduce;
