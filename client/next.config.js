// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true',
// })

module.exports = {
	webpack5: true,

	target: 'serverless',
	trailingSlash: true,
	poweredByHeader: false,
	reactStrictMode: true,
	webpack: (config) => {
		config.module.rules.push({
			test: /chess.js/,
			parser: {
				amd: false,
			},
		})

		return config
	},
}
