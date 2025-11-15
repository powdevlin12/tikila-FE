'use client';

import styled from 'styled-components';
import Header from '../../src/components/header';
import Footer from '../../src/components/footer';
import OutstandingProducts from '../../src/components/outstanding-products';
import type { Product } from '../../src/interfaces/Product';

interface ProductsClientProps {
	products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
	return (
		<Wrapper>
			<Header />
			<OutstandingProducts
				listProduct={products ?? []}
				title='Tất cả dịch vụ'
				isHiddenViewAll
				isFromProductPage={true}
			/>
			<Footer />
		</Wrapper>
	);
}

const Wrapper = styled.section`
	background: #ffffff;
	width: 100vw;
	min-height: 100vh;
	box-sizing: border-box;
	margin: 0;
`;
