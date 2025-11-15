import { Metadata } from 'next';
import DetailProductClient from './DetailProductClient';

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
			{ next: { revalidate: 3600 } },
		);
		if (!res.ok) {
			return {
				title: 'Chi tiết sản phẩm - TIKILA',
			};
		}
		const data = await res.json();
		const product = data.data || data;

		return {
			title: `${product.title || 'Chi tiết sản phẩm'} - TIKILA`,
			description: product.description || 'Thông tin chi tiết sản phẩm',
		};
	} catch {
		return {
			title: 'Chi tiết sản phẩm - TIKILA',
		};
	}
}

async function getProduct(id: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
			{ next: { revalidate: 3600 } },
		);
		if (!res.ok) return null;
		const data = await res.json();
		return data.data || data;
	} catch (error) {
		console.error('Failed to fetch product:', error);
		return null;
	}
}

export default async function ProductDetailPage({ params }: Props) {
	const { id } = await params;
	const product = await getProduct(id);

	return <DetailProductClient product={product} productId={id} />;
}
