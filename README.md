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
| rollup  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 62.4 kB   |
| esbuild | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 65.7 kB |
| webpack | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 62.2 kB |
| fusebox | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 89.9 kB |
| parcel  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 81.9 kB   |

|         | gzipped size                                          |
|---------|-------------------------------------------------------|
| rollup  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 17.8 kB   |
| webpack | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 19.9 kB |
| esbuild | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 22.8 kB |
| fusebox | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 20.9 kB |
| parcel  | ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 20.6 kB   |

|         | times                                          |
|---------|-------------------------------------------------------|
| rollup  | 2960.17                                         |
| webpack | 4878.80                                        |
| esbuild | 130.94                                        |
| fusebox | 3837.23                                        |
| parcel  | 1911.62                                         |
<!-- END -->

Note: Parcel gets a dramatically better outcome with the `--experimental-scope-hoisting` option (smaller than webpack, almost as small as Rollup). Parcel 2 enables this option automatically, but I couldn't get it to create a non-empty bundle.