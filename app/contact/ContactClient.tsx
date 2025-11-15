'use client';

import Link from 'next/link';
import Header from '../../src/components/header';
import Footer from '../../src/components/footer';

export default function ContactClient() {
	return (
		<>
			<Header />
			<div style={{ padding: '20px' }}>
				<h1>Trang Liên Hệ</h1>
				<p>Đây là trang liên hệ của website.</p>

				<div style={{ marginTop: '20px' }}>
					<Link
						href='/'
						style={{
							padding: '10px 20px',
							backgroundColor: '#6c757d',
							color: 'white',
							textDecoration: 'none',
							borderRadius: '5px',
						}}
					>
						← Về trang chủ
					</Link>
				</div>
			</div>
			<Footer />
		</>
	);
}
