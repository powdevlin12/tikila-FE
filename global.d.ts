declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

type StaticImageData = {
	src: string;
	height: number;
	width: number;
	blurDataURL?: string;
};

declare module '*.png' {
	const value: StaticImageData;
	export default value;
}

declare module '*.jpg' {
	const value: StaticImageData;
	export default value;
}

declare module '*.jpeg' {
	const value: StaticImageData;
	export default value;
}

declare module '*.gif' {
	const value: StaticImageData;
	export default value;
}

declare module '*.svg' {
	const value: StaticImageData;
	export default value;
}
