const fs = require('fs');
const child_process = require('child_process');
const util = require('util');
const pb = require('pretty-bytes');
var zlib = require('zlib');
const {performance} = require('perf_hooks');

const exec = util.promisify(child_process.exec);

const bar = (p) => {
	return Array(Math.floor(p * 25)).fill('▉').join('');
};

const compress = (fname) => {
	return new Promise((resolve, reject) => {
		const pipe = fs.createReadStream(fname).pipe(zlib.createGzip())
			.pipe(fs.createWriteStream(fname+'.gz'));
		pipe.on("finish", resolve);
		pipe.on("error", reject);
	});
}

async function timedExec(...args) {
  const start = performance.now();
  await exec(...args);
  const end = performance.now();
  return (end - start).toFixed(0);
}

async function main() {
	const sizes = {
		rollup: null,
		webpack: null,
		esbuild: null,
		fusebox: null,
		parcel: null
	};
	
	const rollupTime = await timedExec('npx rollup -c');
	sizes.rollup = fs.statSync('results/rollup.js').size;
	console.log(`rollup: ${pb(sizes.rollup)} in ${rollupTime}`);

	const webpackTime = await timedExec('npx webpack -c webpack.config.js');
	sizes.webpack = fs.statSync('results/webpack.js').size;
	console.log(`webpack: ${pb(sizes.webpack)} in ${webpackTime}`);

  const parcelTime = await timedExec('npx parcel build --dist-dir results index.js');
  await exec('mv results/index.js results/parcel.js');
  await exec('mv results/index.js.map results/parcel.js.map');
	sizes.parcel = fs.statSync('results/parcel.js').size;
	console.log(`parcel: ${pb(sizes.parcel)} in ${parcelTime}`);
  const parcelCachedTime = await timedExec('npx parcel build --dist-dir results index.js');

	const esbuildTime = await timedExec('npx esbuild index.js --bundle --outfile=results/esbuild.js --minify --format=cjs --platform=node');
	sizes.esbuild = fs.statSync('results/esbuild.js').size;
	console.log(`esbuild: ${pb(sizes.esbuild)} in ${esbuildTime}`);

	const fuseboxTime = await timedExec('node fusebox.js');
	sizes.fusebox = fs.statSync('results/fusebox.js').size;
	console.log(`fusebox: ${pb(sizes.fusebox)} in ${fuseboxTime}`);

	const max_size = Math.max(...Object.values(sizes));

	let compr = {};
	for (const k of Object.keys(sizes)) {
		const loc = `results/${k}.js`;
		await compress(loc);
		compr[k] = fs.statSync(`${loc}.gz`).size;
		console.log(`${k} gzipped: ${compr[k]}`);
	}


	const max_gzip = Math.max(...Object.values(compr));
  const max_time = Math.max(rollupTime, webpackTime, esbuildTime, fuseboxTime, parcelTime, parcelCachedTime);

	const results = `
|         | output size                                           |
|---------|-------------------------------------------------------|
| rollup  | ${bar(sizes.rollup / max_size)} ${pb(sizes.rollup)}   |
| esbuild | ${bar(sizes.esbuild / max_size)} ${pb(sizes.esbuild)} |
| webpack v5 | ${bar(sizes.webpack / max_size)} ${pb(sizes.webpack)} |
| fusebox | ${bar(sizes.fusebox / max_size)} ${pb(sizes.fusebox)} |
| parcel v2  | ${bar(sizes.parcel / max_size)} ${pb(sizes.parcel)}   |

|         | gzipped size                                          |
|---------|-------------------------------------------------------|
| rollup  | ${bar(compr.rollup / max_gzip)} ${pb(compr.rollup)}   |
| esbuild | ${bar(compr.esbuild / max_gzip)} ${pb(compr.esbuild)} |
| webpack v5 | ${bar(compr.webpack / max_gzip)} ${pb(compr.webpack)} |
| fusebox | ${bar(compr.fusebox / max_gzip)} ${pb(compr.fusebox)} |
| parcel v2  | ${bar(compr.parcel / max_gzip)} ${pb(compr.parcel)}   |

|         | times                                          |
|---------|-------------------------------------------------------|
| rollup  | ${bar(rollupTime / max_time)} ${rollupTime} ms |
| webpack v5 | ${bar(webpackTime / max_time)} ${webpackTime} ms |
| esbuild | ${bar(esbuildTime / max_time)} ${esbuildTime} ms |
| fusebox | ${bar(fuseboxTime / max_time)} ${fuseboxTime} ms |
| parcel v2  | ${bar(parcelTime / max_time)} ${parcelTime} ms |
| parcel v2 (cached)  | ${bar(parcelCachedTime / max_time)} ${parcelCachedTime} ms |
`.trim();

	const README = fs.readFileSync('README.md', 'utf-8').replace(/<!-- START -->[\s\S]+<!-- END -->/m, `<!-- START -->\n${results}\n<!-- END -->`);
	fs.writeFileSync('README.md', README);

	console.log(`wrote results to README.md`);
}

main();
