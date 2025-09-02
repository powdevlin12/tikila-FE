import styled from 'styled-components';
import Topbar from '../../components/topbar';
import type { CompanyInfo } from '../../interfaces/CompanyInfo';
import { useApiWithQuery } from '../../services';
import './home.styles.css';
import { RotateLoader } from 'react-spinners';
import { COLORS } from '../../contants/colors';
import { Container } from 'react-bootstrap';
import type { CompanyContact } from '../../interfaces/CompanyContact';
import Navbar from '../../components/navbar';

const Home = () => {
	const { data: dataCompanyInfo, loading: loadingGetCompanyInfo } =
		useApiWithQuery<CompanyInfo>('/company/info', {});

	const { data: dataCompanyContact, loading: loadingGetCompanyContact } =
		useApiWithQuery<CompanyContact>('/company/contact', {});

	if (loadingGetCompanyInfo || loadingGetCompanyContact) {
		return (
			<Wrapper>
				<Container
					fluid
					className='d-flex justify-content-center align-items-center'
					style={{ height: '100vh' }}
				>
					<RotateLoader color={COLORS.primary} />
				</Container>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Topbar
				content={dataCompanyInfo?.welcome_content ?? ''}
				fbLink={dataCompanyContact?.facebook_link ?? ''}
				ytLink={dataCompanyContact?.zalo_link ?? ''}
				tiktokLink={dataCompanyContact?.tiktok_link ?? ''}
			/>
			<Navbar />
		</Wrapper>
	);
};

const Wrapper = styled.section`
	background: #ffffff;
	width: 100vw;
	height: 100vh;
	min-height: 100vh;
	box-sizing: border-box;
	margin: 0;
`;

export default Home;
