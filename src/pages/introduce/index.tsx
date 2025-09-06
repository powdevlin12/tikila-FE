import styled from 'styled-components';
import Header from '../../components/header';
import ReactQuill from 'react-quill-new';
import { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import HTMLReactParser from 'html-react-parser/lib/index';

const Introduce = () => {
	const [value, setValue] = useState('');

	console.log({ value });

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }], // Heading
			['bold', 'italic', 'underline', 'strike'], // Text styles
			[{ color: [] }, { background: [] }], // Text color & highlight
			[{ script: 'sub' }, { script: 'super' }], // Subscript / Superscript
			[{ list: 'ordered' }, { list: 'bullet' }], // Lists
			[{ indent: '-1' }, { indent: '+1' }], // Indent
			[{ align: [] }], // Alignment
			['blockquote', 'code-block'], // Blockquote & Code
			['link', 'image', 'video'], // Media
			['clean'], // Remove formatting
		],
	};

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'color',
		'background',
		'script',
		'list',
		'bullet',
		'indent',
		'align',
		'blockquote',
		'code-block',
		'link',
		'image',
		'video',
	];

	return (
		<Wrapper>
			<Header />
			<ReactQuill
				theme='snow'
				value={value}
				onChange={setValue}
				modules={modules}
				formats={formats}
			/>
			<div className='ql-editor'>{HTMLReactParser(value)}</div>
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

export default Introduce;
