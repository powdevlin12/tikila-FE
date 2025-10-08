import { Container } from 'react-bootstrap';
import type { CompanyContact } from '../../interfaces/CompanyContact';
import type { CompanyInfo } from '../../interfaces/CompanyInfo';
import { useApiWithQuery } from '../../services';
import LoadingView from '../loading-view';
import CustomNavbar from '../navbar';
import Topbar from '../topbar';

type HeaderProps = {
	loading?: boolean;
};

const Header = ({ loading = false }: HeaderProps) => {
	const { data: dataCompanyInfo, loading: loadingGetCompanyInfo } =
		useApiWithQuery<CompanyInfo>('/company/info', {});

	const { data: dataCompanyContact, loading: loadingGetCompanyContact } =
		useApiWithQuery<CompanyContact>('/company/contact', {});

	if (loadingGetCompanyInfo || loadingGetCompanyContact || loading) {
		return <LoadingView />;
	}

	return (
		<Container style={{ margin: 0, padding: 0 }} fluid>
			<Topbar
				content={dataCompanyInfo?.welcomeContent ?? ''}
				fbLink={dataCompanyContact?.facebook_link ?? ''}
				ytLink={dataCompanyContact?.zalo_link ?? ''}
				tiktokLink={dataCompanyContact?.tiktok_link ?? ''}
			/>
			<CustomNavbar
				phone={dataCompanyContact?.phone ?? ''}
				logo={dataCompanyInfo?.logoUrl ?? ''}
			/>
		</Container>
	);
};

export default Header;
