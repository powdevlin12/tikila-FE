'use client';

import { Container } from 'react-bootstrap';
import { RotateLoader } from 'react-spinners';
import styled from 'styled-components';
import { COLORS } from '../../contants/colors';

const LoadingView = () => {
	return (
		<Wrapper>
			<Container
				fluid
				className='d-flex justify-content-center align-items-center'
				style={{ height: '100vh' }}
			>
				<RotateLoader color={COLORS.primary} />
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	background: #ffffff;
	width: 100vw;
	min-height: 100vh;
	box-sizing: border-box;
	margin: 0;
`;

export default LoadingView;
