import ProductsClient from './ProductsClient';

async function getProducts() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
			{
				next: { revalidate: 1800 },
			},
		);
		if (!res.ok) return [];
		const data = await res.json();
		return data.data || data;
	} catch (error) {
		console.error('Failed to fetch products:', error);
		return [];
	}
}

export default async function ProductsPage() {
	const products = await getProducts();
	return <ProductsClient products={products} />;
}
