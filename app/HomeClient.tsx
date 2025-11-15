'use client';

import { useMediaQuery } from '../src/hooks';
import { MOBILE_MAX_WIDTH } from '../src/contants/size';
import HomeDesktop from '../src/pages/home/HomeDesktop';
import HomeMobile from '../src/pages/home/HomeMobile';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import type { CompanyInfo } from '../src/interfaces/CompanyInfo';
import type { Product } from '../src/interfaces/Product';

interface HomeClientProps {
	companyInfo: CompanyInfo | null;
	products: Product[];
}

export default function HomeClient({ companyInfo, products }: HomeClientProps) {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	return (
		<>
			{isMobile ? (
				<HomeMobile
					companyInfo={companyInfo ?? undefined}
					products={products}
					loadingProducts={false}
				/>
			) : (
				<HomeDesktop
					companyInfo={companyInfo ?? undefined}
					products={products}
					loadingProducts={false}
				/>
			)}
		</>
	);
}
