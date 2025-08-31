// Ví dụ cách sử dụng các hooks và functions

import React, { useState } from 'react';
import {
	useApi,
	useApiWithPagination,
	useApiWithQuery,
	useApiConditional,
	apiPost,
	apiPut,
	apiDelete,
} from '../services';

// Interface cho data type
interface User {
	id: number;
	name: string;
	email: string;
}

interface Product {
	id: number;
	title: string;
	price: number;
}

const ExampleComponent = () => {
	const [userId, setUserId] = useState<number | null>(null);
	const [page, setPage] = useState(1);

	// 1. GET data đơn giản - chỉ cần truyền URL
	const {
		data: users,
		loading: usersLoading,
		error: usersError,
	} = useApi<User[]>('/users');

	// 2. GET data với pagination
	const {
		data: products,
		loading: productsLoading,
		error: productsError,
	} = useApiWithPagination<Product[]>('/products', page, 10);

	// 3. GET data với query parameters
	const { data: searchResults, loading: searchLoading } = useApiWithQuery<
		Product[]
	>('/products/search', {
		keyword: 'laptop',
		category: 'electronics',
		minPrice: 100,
	});

	// 4. GET data có điều kiện (chỉ fetch khi có userId)
	const { data: userDetail, loading: userDetailLoading } =
		useApiConditional<User>(`/users/${userId}`, !!userId);

	// 5. POST data
	const handleCreateUser = async () => {
		try {
			const newUser = await apiPost<User>(
				'/users',
				{
					name: 'John Doe',
					email: 'john@example.com',
				},
				{
					onSuccess: data => {
						console.log('User created:', data);
					},
					onError: error => {
						console.error('Error creating user:', error);
					},
					revalidateKeys: ['/users'], // Refresh danh sách users
				},
			);

			console.log('New user:', newUser);
		} catch (error) {
			console.error('Failed to create user:', error);
		}
	};

	// 6. PUT data (update)
	const handleUpdateUser = async (id: number) => {
		try {
			await apiPut(
				`/users/${id}`,
				{
					name: 'Updated Name',
				},
				{
					revalidateKeys: ['/users', `/users/${id}`],
				},
			);
		} catch (error) {
			console.error('Failed to update user:', error);
		}
	};

	// 7. DELETE data
	const handleDeleteUser = async (id: number) => {
		try {
			await apiDelete(`/users/${id}`, {
				revalidateKeys: ['/users'],
			});
		} catch (error) {
			console.error('Failed to delete user:', error);
		}
	};

	return (
		<div>
			<h1>API Service Examples</h1>

			{/* Hiển thị users */}
			<section>
				<h2>Users</h2>
				{usersLoading && <p>Loading users...</p>}
				{usersError && <p>Error: {usersError.message}</p>}
				{users && (
					<ul>
						{users.map(user => (
							<li key={user.id}>
								{user.name} - {user.email}
								<button onClick={() => setUserId(user.id)}>View Detail</button>
								<button onClick={() => handleUpdateUser(user.id)}>
									Update
								</button>
								<button onClick={() => handleDeleteUser(user.id)}>
									Delete
								</button>
							</li>
						))}
					</ul>
				)}
				<button onClick={handleCreateUser}>Create New User</button>
			</section>

			{/* Hiển thị products với pagination */}
			<section>
				<h2>Products (Page {page})</h2>
				{productsLoading && <p>Loading products...</p>}
				{products && (
					<div>
						<ul>
							{products.map(product => (
								<li key={product.id}>
									{product.title} - ${product.price}
								</li>
							))}
						</ul>
						<button onClick={() => setPage(page - 1)} disabled={page <= 1}>
							Previous
						</button>
						<button onClick={() => setPage(page + 1)}>Next</button>
					</div>
				)}
			</section>

			{/* Hiển thị search results */}
			<section>
				<h2>Search Results</h2>
				{searchLoading && <p>Searching...</p>}
				{searchResults && (
					<ul>
						{searchResults.map(product => (
							<li key={product.id}>
								{product.title} - ${product.price}
							</li>
						))}
					</ul>
				)}
			</section>

			{/* Hiển thị user detail */}
			{userId && (
				<section>
					<h2>User Detail</h2>
					{userDetailLoading && <p>Loading user detail...</p>}
					{userDetail && (
						<div>
							<p>Name: {userDetail.name}</p>
							<p>Email: {userDetail.email}</p>
						</div>
					)}
				</section>
			)}
		</div>
	);
};

export default ExampleComponent;
