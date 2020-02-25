var includePaths = require('rollup-plugin-includepaths');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
	input: './dist/index.js',
	output: {
		name: 'AwayflPlayerglobal',
		sourcemap: true,
		format: 'umd',
		file: './bundle/awayfl-playerglobal.umd.js',
		globals: {
			'@awayfl/avm2': 'AwayflAvm2',
			'@awayjs/core': 'AwayjsCore',
			'@awayjs/graphics': 'AwayjsGraphics',
			'@awayjs/materials': 'AwayjsMaterials',
			'@awayjs/scene': 'AwayjsScene',
			'@awayjs/stage': 'AwayjsStage',
			'@awayjs/swf-viewer': 'AwayjsSwfViewer',
			'@awayjs/view': 'AwayjsView',
		},
	},
	external: [
		'@awayfl/avm2',
		'@awayjs/core',
		'@awayjs/graphics',
		'@awayjs/materials',
		'@awayjs/scene',
		'@awayjs/stage',
		'@awayjs/swf-viewer',
		'@awayjs/view',
	],
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true,
			module: true
		}) ]
};