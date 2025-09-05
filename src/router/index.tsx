import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/home';
import ContactPage from '../pages/contact';
import DetailProduct from '../pages/detail-product';
import Introduce from '../pages/introduce';
import Products from '../pages/products';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/contact',
		element: <ContactPage />,
	},
	{
		path: '/products',
		element: <Products />,
	},
	{
		path: '/product/:id',
		element: <DetailProduct />,
	},
	{
		path: '/introduce',
		element: <Introduce />,
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
