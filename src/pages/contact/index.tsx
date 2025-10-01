import { Link } from 'react-router-dom';
import { usePageTitle } from '../../hooks';

const ContactPage = () => {
	usePageTitle('Liên hệ');

	return (
		<div style={{ padding: '20px' }}>
			<h1>Trang Liên Hệ</h1>
			<p>Đây là trang liên hệ của website.</p>

			<div style={{ marginTop: '20px' }}>
				<Link
					to='/'
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
	);
};

export default ContactPage;
