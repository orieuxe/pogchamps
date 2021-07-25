// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true',
// })

module.exports = {
	webpack5: true,

	target: 'serverless',
	trailingSlash: true,
	poweredByHeader: false,
	reactStrictMode: true,
}
