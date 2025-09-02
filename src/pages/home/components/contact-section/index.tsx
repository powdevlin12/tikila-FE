import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import sendIcon from '../../../../assets/send.png';
import type { Product } from '../../../../interfaces/Product';

type ContactSectionProps = {
	listProduct: Product[];
};

const ContactSection = ({ listProduct }: ContactSectionProps) => {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		service: '',
		message: '',
	});

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		// Handle form submission here
	};

	return (
		<SectionWrapper>
			<Container fluid>
				<Row className='justify-content-center'>
					{/* Title */}
					<TitleWrapper>
						<SectionTitle>LIÊN HỆ VỚI CHÚNG TÔI</SectionTitle>
						<SectionSubtitle>
							Vui lòng để lại thông tin phía dưới để chúng tôi giải đáp mọi thắc
							mắc của bạn
						</SectionSubtitle>
					</TitleWrapper>
					<ContactContainer>
						{/* Contact Form */}
						<ContactForm onSubmit={handleSubmit}>
							<Row className='mb-3'>
								<StyledFormControl
									type='text'
									placeholder='Họ và tên'
									name='fullName'
									value={formData.fullName}
									onChange={handleInputChange}
									required
								/>
							</Row>
							<Row className='mb-3'>
								<StyledFormControl
									type='tel'
									placeholder='Số điện thoại'
									name='phone'
									value={formData.phone}
									onChange={handleInputChange}
									required
								/>
							</Row>

							<Row className='mb-3'>
								<StyledFormSelect
									name='service'
									value={formData.service}
									onChange={handleInputChange}
									required
								>
									<option value=''>Chọn dịch vụ</option>
									{listProduct?.map(product => (
										<option key={product.id} value={product.id}>
											{product.title}
										</option>
									))}
								</StyledFormSelect>
							</Row>

							<Row className='mb-3'>
								<StyledTextArea
									as='textarea'
									rows={4}
									placeholder='Để lại tin nhắn của bạn cho chúng tôi...'
									name='message'
									value={formData.message}
									onChange={handleInputChange}
									required
								/>
							</Row>

							<SubmitButtonWrapper>
								<SubmitButton type='submit'>
									{/* <BsPaperAirplane className='me-2' /> */}
									GỬI NGAY CHO CHÚNG TÔI
									<ImgSend src={sendIcon} alt='send' />
								</SubmitButton>
							</SubmitButtonWrapper>
						</ContactForm>
					</ContactContainer>
				</Row>
			</Container>
		</SectionWrapper>
	);
};

// Styled Components
const SectionWrapper = styled.section`
	background: linear-gradient(135deg, #0966c5 0%, #0d47a1 100%);
	padding: 4rem 0;
	position: relative;
	min-height: 600px;
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		padding: 3rem 1rem;
	}
`;

const ContactContainer = styled.div`
	background: #ffffff;
	border-radius: 20px;
	padding: 2rem 1rem;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	position: relative;
	width: 38%;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 768px) {
		padding: 2rem 1.5rem;
	}

	@media (max-width: 576px) {
		padding: 2rem 1rem;
	}
`;

const TitleWrapper = styled.div`
	text-align: center;
	margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
	font-size: 2rem;
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 1rem;
	letter-spacing: 0%;

	@media (max-width: 768px) {
		font-size: 1.8rem;
	}

	@media (max-width: 576px) {
		font-size: 1.6rem;
	}
`;

const SectionSubtitle = styled.p`
	font-size: 1.2rem;
	color: #ffffff;
	line-height: 1.6;
	margin: 0 auto;

	@media (max-width: 576px) {
		font-size: 0.9rem;
	}
`;

const ContactForm = styled(Form)`
	width: 100%;
	padding: 0 2rem;
`;

const StyledFormControl = styled(Form.Control)`
	padding: 1rem 1.2rem;
	border: 1px solid #f5f5f5;
	border-radius: 2px;
	font-size: 1rem;
	transition: all 0.3s ease;
	background: #f5f5f5;

	&:focus {
		border-color: #0966c5;
		box-shadow: 0 0 0 0.2rem rgba(25, 118, 210, 0.1);
		background: white;
	}

	&::placeholder {
		color: #77878f;
		font-weight: 400;
	}
`;

const StyledFormSelect = styled(Form.Select)`
	padding: 1rem 1.2rem;
	border: 1px solid #f5f5f5;
	border-radius: 2px;
	font-size: 1rem;
	transition: all 0.3s ease;
	background: #f5f5f5;
	color: #77878f;

	&:focus {
		border-color: #0966c5;
		box-shadow: 0 0 0 0.2rem rgba(25, 118, 210, 0.1);
		background: white;
	}

	option {
		color: #333;
		padding: 0.5rem;
	}
`;

const StyledTextArea = styled(Form.Control)`
	padding: 1rem 1.2rem;
	border: 1px solid #f5f5f5;
	border-radius: 2px;
	font-size: 1rem;
	transition: all 0.3s ease;
	background: #f5f5f5;
	resize: vertical;
	min-height: 120px;

	&:focus {
		border-color: #0966c5;
		box-shadow: 0 0 0 0.2rem rgba(25, 118, 210, 0.1);
		background: white;
	}

	&::placeholder {
		color: #77878f;
		font-weight: 400;
	}
`;

const SubmitButtonWrapper = styled.div`
	text-align: center;
`;

const ImgSend = styled.img`
	width: 24px;
	height: 24px;
	margin-left: 8px;
`;

const SubmitButton = styled(Button)`
	background: #0966c5;
	border: none;
	padding: 1rem 2.5rem;
	border-radius: 3px;
	font-weight: 600;
	font-size: 1rem;
	letter-spacing: 0.5px;
	text-transform: uppercase;
	transition: all 0.3s ease;
	display: inline-flex;
	align-items: center;
	min-width: 250px;
	justify-content: center;

	&:hover {
		background: #1565c0;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(25, 118, 210, 0.3);
	}

	&:active {
		transform: translateY(0);
	}

	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(25, 118, 210, 0.3);
	}

	@media (max-width: 576px) {
		min-width: 100%;
		padding: 1rem 1.5rem;
	}
`;

export default ContactSection;
