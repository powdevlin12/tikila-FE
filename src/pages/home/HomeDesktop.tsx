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
        banner={companyInfo?.BANNER ?? ''}
        COUNT_CUSTOMER={companyInfo?.COUNT_CUSTOMER ?? 0}
        COUNT_CUSTOMER_SATISFY={companyInfo?.COUNT_CUSTOMER_SATISFY ?? 0}
        COUNT_QUANLITY={companyInfo?.COUNT_QUANLITY ?? 0}
      />
      <SectionIntro
        introContent={companyInfo?.intro_text ?? ''}
        introImg={companyInfo?.img_intro ?? ''}
      />
      <OutstandingProducts
        listProduct={products?.slice(0, 3) ?? []}
        title="Dịch vụ nổi bật"
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
