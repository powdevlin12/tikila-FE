import styled from 'styled-components';
import { useApiWithQuery } from '../../services';
import type { CompanyInfo } from '../../interfaces/CompanyInfo';
import type { CompanyContact } from '../../interfaces/CompanyContact';
import type { Product } from '../../interfaces/Product';
import { Container } from 'react-bootstrap';
import { RotateLoader } from 'react-spinners';
import { COLORS } from '../../contants/colors';
import Topbar from '../../components/topbar';
import OutstandingProducts from '../../components/outstanding-products';
import CustomNavbar from '../../components/navbar';

const Products = () => {
	const { data: dataCompanyInfo, loading: loadingGetCompanyInfo } =
		useApiWithQuery<CompanyInfo>('/company/info', {});

	const { data: dataCompanyContact, loading: loadingGetCompanyContact } =
		useApiWithQuery<CompanyContact>('/company/contact', {});

	const { data: dataProduct, loading: loadingGetProduct } = useApiWithQuery<
		Product[]
	>('/products', {});

	if (loadingGetCompanyInfo || loadingGetCompanyContact || loadingGetProduct) {
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
			<CustomNavbar
				phone={dataCompanyContact?.phone ?? ''}
				logo={dataCompanyInfo?.logo_url ?? ''}
			/>
			<OutstandingProducts
				listProduct={dataProduct ?? []}
				title='Tất cả dịch vụ'
				isHiddenViewAll
				isFromProductPage={true}
			/>
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

export default Products;
