import React from 'react';
import { Link } from 'react-router-dom';

const Introduce = () => {
	return (
		<div style={{ padding: '20px' }}>
			<h1>Trang Giới Thiệu</h1>
			<p>Đây là trang giới thiệu về website Tikila.</p>

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

export default Introduce;
