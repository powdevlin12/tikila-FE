import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DetailProduct = () => {
	const { id } = useParams();

	return (
		<div style={{ padding: '20px' }}>
			<h1>Chi Tiết Sản Phẩm</h1>
			<p>Đây là trang chi tiết sản phẩm có ID: {id}</p>

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

export default DetailProduct;
