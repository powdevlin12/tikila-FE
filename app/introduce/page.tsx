import IntroduceClient from './IntroduceClient';

async function getIntroDetail() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/company/intro-detail`,
			{
				next: { revalidate: 3600 },
			},
		);
		if (!res.ok) return null;
		const data = await res.json();
		return data.data || data;
	} catch (error) {
		console.error('Failed to fetch intro detail:', error);
		return null;
	}
}

export default async function IntroducePage() {
	const introData = await getIntroDetail();
	return <IntroduceClient introData={introData} />;
}
