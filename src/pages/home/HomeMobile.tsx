import styled, { css } from 'styled-components';
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

/* Mobile specific layout adjustments (<480px)
   We can simplify spacing and possibly reduce number of products shown */
const HomeMobile = ({ companyInfo, products, loadingProducts }: Props) => {
	return (
		<Wrapper>
			<HeaderBar>
				<Header loading={loadingProducts} />
			</HeaderBar>
			<SectionFull bleed>
				<BannerSection
					banner={companyInfo?.BANNER ?? ''}
					COUNT_CUSTOMER={companyInfo?.COUNT_CUSTOMER ?? 0}
					COUNT_CUSTOMER_SATISFY={companyInfo?.COUNT_CUSTOMER_SATISFY ?? 0}
					COUNT_QUANLITY={companyInfo?.COUNT_QUANLITY ?? 0}
				/>
			</SectionFull>
			<Section>
				<SectionIntro
					introContent={companyInfo?.intro_text ?? ''}
					introImg={companyInfo?.img_intro ?? ''}
				/>
			</Section>
			<SectionCompact>
				<OutstandingProducts
					listProduct={products?.slice(0, 2) ?? []}
					title='Dịch vụ nổi bật'
				/>
			</SectionCompact>
			<Section>
				<StartCustomerSection />
			</Section>
			<Section>
				<ContactSection listProduct={products ?? []} />
			</Section>
			<FooterSection>
				<Footer />
			</FooterSection>
		</Wrapper>
	);
};

// Spacing scale (mobile-first)
const space = {
	xs: '4px',
	sm: '8px',
	md: '12px',
	lg: '16px',
	xl: '20px',
};

const contentMaxWidth = '640px';

const commonSection = css`
	width: 100%;
	margin: 0 auto;
	max-width: ${contentMaxWidth};
	padding-left: ${space.sm};
	padding-right: ${space.sm};
`;

const Wrapper = styled.section`
	background: #ffffff;
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
	margin: 0;
	padding-bottom: ${space.xl};
	overflow-x: hidden;
	/* iOS safe area */
	padding-left: max(${space.sm}, env(safe-area-inset-left));
	padding-right: max(${space.sm}, env(safe-area-inset-right));

	& h1 {
		font-size: 1.35rem;
		line-height: 1.25;
		margin: ${space.lg} 0 ${space.md};
	}
	& h2 {
		font-size: 1.18rem;
		line-height: 1.3;
		margin: ${space.lg} 0 ${space.sm};
	}
	& h3 {
		font-size: 1.05rem;
		line-height: 1.3;
		margin: ${space.md} 0 ${space.xs};
	}

	img {
		max-width: 100%;
		height: auto;
		display: block;
	}
`;

const HeaderBar = styled.div`
	position: sticky;
	top: 0;
	background: #ffffffcc;
	backdrop-filter: blur(6px);
	z-index: 10;
	padding: ${space.xs} 0;
`;

// Normal content section
const Section = styled.div`
	${commonSection};
	padding-top: ${space.lg};
	padding-bottom: ${space.lg};
	&:not(:first-of-type) {
		margin-top: ${space.sm};
	}
`;

// More compact vertical spacing
const SectionCompact = styled(Section)`
	padding-top: ${space.md};
	padding-bottom: ${space.lg};
`;

// Full-bleed (for banner / hero) while respecting safe areas horizontally
const SectionFull = styled.div<{ bleed?: boolean }>`
	width: 100%;
	margin: 0;
	padding: 0;
	${(p) =>
		p.bleed &&
		css`
			/* Allow internal component manage its own spacing. */
			& > * {
				margin: 0;
			}
		`}
`;

const FooterSection = styled.footer`
	${commonSection};
	padding-top: ${space.lg};
	padding-bottom: calc(${space.xl} + env(safe-area-inset-bottom));
	margin-top: ${space.lg};
	border-top: 1px solid #ececec;
`;

export default HomeMobile;
