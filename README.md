# bundler-comparison

A quick test to see how various bundlers compare when bundling the Lodash source code.

```
git clone git@github.com:Rich-Harris/bundler-comparison.git
git submodule update --init --recursive
npm i
npm run build
```

## Results

<!-- START -->
|         | output size                                           |
|---------|-------------------------------------------------------|
| rollup  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 62.4 kB   |
| esbuild | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 63 kB |
| webpack v5 | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 62.2 kB |
| parcel v2  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 81.8 kB   |

|         | gzipped size                                          |
|---------|-------------------------------------------------------|
| rollup  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 17.8 kB   |
| esbuild | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 22.4 kB |
| webpack v5 | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 19.9 kB |
| parcel v2  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 20.3 kB   |

|         | times                                          |
|---------|-------------------------------------------------------|
| rollup  | ▉▉▉▉▉ 1950 ms |
| webpack v5 | ▉▉▉▉▉▉▉▉▉ 3436 ms |
| webpack v5 (cached) | ▉▉ 1001 ms |
| esbuild |  102 ms |
| parcel v2  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 8621 ms |
| parcel v2 (cached)  | ▉▉▉▉ 1501 ms |
<!-- END -->

Note: Parcel gets a dramatically better outcome with the `--experimental-scope-hoisting` option (smaller than webpack, almost as small as Rollup). Parcel 2 enables this option automatically, but I couldn't get it to create a non-empty bundle.