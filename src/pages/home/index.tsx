import type { CompanyInfo } from '../../interfaces/CompanyInfo';
import type { Product } from '../../interfaces/Product';
import { useApiWithQuery } from '../../services';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const MOBILE_MAX_WIDTH = 479; // <480px

const Home = () => {
	const { data: dataCompanyInfo } = useApiWithQuery<CompanyInfo>(
		'/company/info',
		{},
	);

	const { data: dataProduct, loading: loadingGetProduct } = useApiWithQuery<
		Product[]
	>('/products', {});

	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	if (isMobile) {
		return (
			<HomeMobile
				companyInfo={dataCompanyInfo}
				products={dataProduct}
				loadingProducts={loadingGetProduct}
			/>
		);
	}

	return (
		<HomeDesktop
			companyInfo={dataCompanyInfo}
			products={dataProduct}
			loadingProducts={loadingGetProduct}
		/>
	);
};

export default Home;
