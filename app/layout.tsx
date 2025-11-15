import StyledComponentsRegistry from './registry';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='vi'>
			<body style={{ margin: 0, padding: 0 }}>
				<StyledComponentsRegistry>
					{children}
					<ToastContainer />
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
