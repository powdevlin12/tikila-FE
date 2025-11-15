import HomeClient from './HomeClient';

// Server-side data fetching
async function getCompanyInfo() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/company/info`,
			{
				next: { revalidate: 3600 }, // Revalidate every hour
			},
		);
		if (!res.ok) return null;
		const data = await res.json();
		return data.data || data;
	} catch (error) {
		console.error('Failed to fetch company info:', error);
		return null;
	}
}

async function getProducts() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
			{
				next: { revalidate: 1800 }, // Revalidate every 30 minutes
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

export default async function HomePage() {
	// Fetch data in parallel
	const [companyInfo, products] = await Promise.all([
		getCompanyInfo(),
		getProducts(),
	]);

	return <HomeClient companyInfo={companyInfo} products={products} />;
}
