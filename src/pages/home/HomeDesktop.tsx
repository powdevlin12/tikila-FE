'use client';

import styled from 'styled-components';
import Header from '../../components/header';
import BannerSection from './components/banner-section';
import SectionIntro from './components/section-intro';
import OutstandingProducts from '../../components/outstanding-products';
import StartCustomerSection from './components/start-customer-section';
import ContactSection from './components/contact-section';
import Footer from '../../components/footer';
import type { CompanyInfo } from '../../interfaces/CompanyInfo';
import type { Product } from '../../interfaces/Product';

interface Props {
	companyInfo?: CompanyInfo;
	products?: Product[];
	loadingProducts: boolean;
}

const HomeDesktop = ({ companyInfo, products, loadingProducts }: Props) => {
	return (
		<Wrapper>
			<Header loading={loadingProducts} />
			<BannerSection
				banner={companyInfo?.banner ?? ''}
				COUNT_CUSTOMER={companyInfo?.countCustomer ?? 0}
				COUNT_CUSTOMER_SATISFY={companyInfo?.countCustomerSatisfy ?? 0}
				COUNT_QUANLITY={companyInfo?.countQuality ?? 0}
			/>
			<SectionIntro
				introContent={companyInfo?.introText ?? ''}
				introImg={companyInfo?.imgIntro ?? ''}
			/>
			<OutstandingProducts
				listProduct={products?.slice(0, 3) ?? []}
				title='Dịch vụ nổi bật'
			/>
			<StartCustomerSection />
			<ContactSection listProduct={products ?? []} />
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

export default HomeDesktop;
