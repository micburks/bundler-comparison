const fs = require('fs');

const fns = fs.readdirSync('lodash')
	.filter(file => !file.startsWith('.') && file.endsWith('.js'))

let index = fns.map(file => `import * as  ${file.slice(0, -3)} from './lodash/${file}';`).join('\n');
index += `\nconsole.log(${fns.map(f => f.slice(0, -3)).join(', ')});`;

fs.writeFileSync('index.js', index);
