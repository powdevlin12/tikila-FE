import styled from 'styled-components';
import Footer from '../../components/footer';
import Header from '../../components/header';
import OutstandingProducts from '../../components/outstanding-products';
import type { CompanyInfo } from '../../interfaces/CompanyInfo';
import type { Product } from '../../interfaces/Product';
import { useApiWithQuery } from '../../services';
import BannerSection from './components/banner-section';
import ContactSection from './components/contact-section';
import SectionIntro from './components/section-intro';
import './home.styles.css';

const Home = () => {
	const { data: dataCompanyInfo } = useApiWithQuery<CompanyInfo>(
		'/company/info',
		{},
	);

	const { data: dataProduct, loading: loadingGetProduct } = useApiWithQuery<
		Product[]
	>('/products', {});

	return (
		<Wrapper>
			<Header loading={loadingGetProduct} />
			<BannerSection
				banner={dataCompanyInfo?.BANNER ?? ''}
				COUNT_CUSTOMER={dataCompanyInfo?.COUNT_CUSTOMER ?? 0}
				COUNT_CUSTOMER_SATISFY={dataCompanyInfo?.COUNT_CUSTOMER_SATISFY ?? 0}
				COUNT_QUANLITY={dataCompanyInfo?.COUNT_QUANLITY ?? 0}
			/>
			<SectionIntro
				introContent={dataCompanyInfo?.intro_text ?? ''}
				introImg={dataCompanyInfo?.img_intro ?? ''}
			/>
			<OutstandingProducts
				listProduct={dataProduct?.slice(0, 3) ?? []}
				title='Dịch vụ nổi bật'
			/>
			<ContactSection listProduct={dataProduct} />
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

export default Home;
