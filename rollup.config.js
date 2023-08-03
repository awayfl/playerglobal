import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
	input: './dist/index.js',
	output: {
		name: 'AwayflPlayerglobal',
		globals: {
			'@awayfl/swf-loader': 'AwayflSwfLoader',
			'@awayfl/avm2': 'AwayflAvm2',
			'@awayjs/core': 'AwayjsCore',
			'@awayjs/stage': 'AwayjsStage',
			'@awayjs/view': 'AwayjsView',
			'@awayjs/renderer': 'AwayjsRenderer',
			'@awayjs/graphics': 'AwayjsGraphics',
			'@awayjs/materials': 'AwayjsMaterials'
		},
		sourcemap: true,
		format: 'umd',
		file: './bundle/awayfl-playerglobal.umd.js'
	},
	external: [
		'@awayfl/swf-loader',
		'@awayfl/avm2',
		'@awayjs/core',
		'@awayjs/stage',
		'@awayjs/view',
		'@awayjs/renderer',
		'@awayjs/graphics',
		'@awayjs/materials'
	],
	plugins: [
		nodeResolve(),
		commonjs(),
		terser(),
	]
};