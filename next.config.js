/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	transpilePackages: ['react-icons'],
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '1236',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'powdevlin68.info',
				pathname: '/**',
			},
		],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
