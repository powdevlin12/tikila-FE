import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import sendIcon from '../../../../assets/send.png';
import type { Product } from '../../../../interfaces/Product';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactCustomerService } from '../../../../services/contactCustomer';
import { useMediaQuery } from '../../../../hooks';
import { MOBILE_MAX_WIDTH } from '../../../../contants/size';
import type { ApiError } from '../../../../interfaces/ApiError';

// Định nghĩa interface cho API Error

type ContactSectionProps = {
	listProduct: Product[];
};

const ContactSection = ({ listProduct }: ContactSectionProps) => {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		service: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validation cơ bản
		if (
			!formData.fullName.trim() ||
			!formData.phone.trim() ||
			!formData.message.trim()
		) {
			toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
			return;
		}

		setIsSubmitting(true);

		try {
			// Chuẩn bị dữ liệu gửi lên API
			const contactData = {
				full_name: formData.fullName.trim(),
				phone_customer: formData.phone.trim(),
				message: formData.message.trim(),
				...(formData.service && { service_id: parseInt(formData.service) }),
			};

			// Gọi API
			const result = await contactCustomerService.saveCustomerContact(
				contactData,
			);

			// Thành công
			toast.success(result?.message ?? '');

			// Reset form
			setFormData({
				fullName: '',
				phone: '',
				service: '',
				message: '',
			});
		} catch (error) {
			// Xử lý lỗi
			const apiError = error as ApiError;
			toast.error(
				apiError?.response?.data?.message ??
					apiError?.message ??
					'Có lỗi xảy ra, thử lại sau',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SectionWrapper $isMobile={isMobile}>
			<Container fluid>
				<Row className='justify-content-center'>
					{/* Title */}
					<TitleWrapper $isMobile={isMobile}>
						<SectionTitle $isMobile={isMobile}>
							LIÊN HỆ VỚI CHÚNG TÔI
						</SectionTitle>
						<SectionSubtitle $isMobile={isMobile}>
							Vui lòng để lại thông tin phía dưới để chúng tôi giải đáp mọi thắc
							mắc của bạn
						</SectionSubtitle>
					</TitleWrapper>
					<ContactContainer $isMobile={isMobile}>
						{/* Contact Form */}
						<ContactForm $isMobile={isMobile} onSubmit={handleSubmit}>
							<Row className='mb-3'>
								<StyledFormControl
									$isMobile={isMobile}
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
									$isMobile={isMobile}
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
									$isMobile={isMobile}
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
									$isMobile={isMobile}
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
								<SubmitButton
									$isMobile={isMobile}
									type='submit'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'ĐANG GỬI...' : 'GỬI NGAY CHO CHÚNG TÔI'}
									{!isSubmitting && <ImgSend src={sendIcon} alt='send' />}
								</SubmitButton>
							</SubmitButtonWrapper>
						</ContactForm>
					</ContactContainer>
				</Row>
			</Container>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
				transition={Bounce}
			/>
		</SectionWrapper>
	);
};

// Styled Components
const SectionWrapper = styled.section<{ $isMobile?: boolean }>`
	background: linear-gradient(135deg, #0966c5 0%, #0d47a1 100%);
	padding: ${props => (props.$isMobile ? '2rem 0' : '4rem 0')};
	position: relative;
	min-height: ${props => (props.$isMobile ? 'auto' : '600px')};
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		padding: 2.5rem 1rem;
		min-height: auto;
	}

	@media (max-width: 576px) {
		padding: 2rem 0.5rem;
	}
`;

const ContactContainer = styled.div<{ $isMobile?: boolean }>`
	background: #ffffff;
	border-radius: ${props => (props.$isMobile ? '15px' : '20px')};
	padding: ${props => (props.$isMobile ? '1.5rem 1rem' : '2rem 1rem')};
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	position: relative;
	width: ${props => (props.$isMobile ? '95%' : '38%')};
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: ${props => (props.$isMobile ? '500px' : 'none')};
	margin: 0 auto;

	@media (max-width: 768px) {
		padding: 1.5rem 1.2rem;
		width: 90%;
		border-radius: 15px;
	}

	@media (max-width: 576px) {
		padding: 1.5rem 1rem;
		width: 95%;
		border-radius: 12px;
	}
`;

const TitleWrapper = styled.div<{ $isMobile?: boolean }>`
	text-align: center;
	margin-bottom: ${props => (props.$isMobile ? '1.5rem' : '2.5rem')};
	padding: ${props => (props.$isMobile ? '0 1rem' : '0')};

	@media (max-width: 768px) {
		margin-bottom: 2rem;
	}

	@media (max-width: 576px) {
		margin-bottom: 1.5rem;
		padding: 0 1rem;
	}
`;

const SectionTitle = styled.h2<{ $isMobile?: boolean }>`
	font-size: ${props => (props.$isMobile ? '1.6rem' : '2rem')};
	font-weight: 700;
	color: #ffffff;
	margin-bottom: ${props => (props.$isMobile ? '0.8rem' : '1rem')};
	letter-spacing: 0%;
	line-height: 1.3;

	@media (max-width: 768px) {
		font-size: 1.7rem;
	}

	@media (max-width: 576px) {
		font-size: 1.5rem;
		line-height: 1.2;
	}
`;

const SectionSubtitle = styled.p<{ $isMobile?: boolean }>`
	font-size: ${props => (props.$isMobile ? '1rem' : '1.2rem')};
	color: #ffffff;
	line-height: 1.6;
	margin: 0 auto;
	max-width: ${props => (props.$isMobile ? '90%' : '80%')};

	@media (max-width: 768px) {
		font-size: 1.1rem;
	}

	@media (max-width: 576px) {
		font-size: 0.95rem;
		line-height: 1.5;
		max-width: 95%;
	}
`;

const ContactForm = styled(Form)<{ $isMobile?: boolean }>`
	width: 100%;
	padding: ${props => (props.$isMobile ? '0 0.5rem' : '0 2rem')};

	@media (max-width: 768px) {
		padding: 0 1rem;
	}

	@media (max-width: 576px) {
		padding: 0 0.5rem;
	}
`;

const StyledFormControl = styled(Form.Control)<{ $isMobile?: boolean }>`
	padding: ${props => (props.$isMobile ? '0.8rem 1rem' : '1rem 1.2rem')};
	border: 1px solid #f5f5f5;
	border-radius: 2px;
	font-size: ${props => (props.$isMobile ? '0.95rem' : '1rem')};
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
		font-size: ${props => (props.$isMobile ? '0.9rem' : '1rem')};
	}

	@media (max-width: 576px) {
		padding: 0.8rem 1rem;
		font-size: 0.95rem;
	}
`;

const StyledFormSelect = styled(Form.Select)<{ $isMobile?: boolean }>`
	padding: ${props => (props.$isMobile ? '0.8rem 1rem' : '1rem 1.2rem')};
	border: 1px solid #f5f5f5;
	border-radius: 2px;
	font-size: ${props => (props.$isMobile ? '0.95rem' : '1rem')};
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
		font-size: ${props => (props.$isMobile ? '0.95rem' : '1rem')};
	}

	@media (max-width: 576px) {
		padding: 0.8rem 1rem;
		font-size: 0.95rem;
	}
`;

const StyledTextArea = styled(Form.Control)<{ $isMobile?: boolean }>`
	padding: ${props => (props.$isMobile ? '0.8rem 1rem' : '1rem 1.2rem')};
	border: 1px solid #f5f5f5;
	border-radius: 2px;
	font-size: ${props => (props.$isMobile ? '0.95rem' : '1rem')};
	transition: all 0.3s ease;
	background: #f5f5f5;
	resize: vertical;
	min-height: ${props => (props.$isMobile ? '100px' : '120px')};
	color: #333;

	&:focus {
		border-color: #0966c5;
		box-shadow: 0 0 0 0.2rem rgba(25, 118, 210, 0.1);
		background: white;
	}

	&::placeholder {
		color: #77878f;
		font-weight: 400;
		font-size: ${props => (props.$isMobile ? '0.9rem' : '1rem')};
	}

	@media (max-width: 576px) {
		padding: 0.8rem 1rem;
		font-size: 0.95rem;
		min-height: 100px;
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

const SubmitButton = styled(Button)<{ $isMobile?: boolean }>`
	background: #0966c5;
	border: none;
	padding: ${props => (props.$isMobile ? '0.9rem 2rem' : '1rem 2.5rem')};
	border-radius: 3px;
	font-weight: 600;
	font-size: ${props => (props.$isMobile ? '0.9rem' : '1rem')};
	letter-spacing: 0.5px;
	text-transform: uppercase;
	transition: all 0.3s ease;
	display: inline-flex;
	align-items: center;
	min-width: ${props => (props.$isMobile ? '100%' : '250px')};
	justify-content: center;

	&:hover:not(:disabled) {
		background: #1565c0;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(25, 118, 210, 0.3);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
	}

	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(25, 118, 210, 0.3);
	}

	&:disabled {
		background: #9e9e9e;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	@media (max-width: 768px) {
		min-width: 100%;
		padding: 0.9rem 1.8rem;
		font-size: 0.95rem;
	}

	@media (max-width: 576px) {
		min-width: 100%;
		padding: 0.9rem 1.5rem;
		font-size: 0.9rem;
	}
`;

export default ContactSection;
