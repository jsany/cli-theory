# cli-theory

## 原理

- **命令行参数**：[process.argv](https://devdocs.io/node/process#process_process_argv)
- **脚本解释程序**：#!/usr/bin/env
  - 放在脚本语言的第一行，目的是指出，你想要你的这个文件中的代码用什么可执行程序去运行它
  - 脚本用 env 启动的原因，是因为脚本解释器在 linux 中可能被安装于不同的目录，env 可以在系统的 PATH 目录中查找
- **可执行文件的软链**：package.json: bin 字段

### demo

```bash
.
├── bin
│   └── index.js
├── index.js
└── package.json
```

bin/index.js

```javascript
const pkg = require('../package.json');

function run(argv) {
  console.log(argv);
  argv = argv.slice(2);
  if (!argv.length) {
    // 对于退出操作，用 process.exit(code) 代替 return，成功的话 code 为 0，失败为 1
    process.exit(1);
  }
  if (argv[0] === '-v' || argv[0] === '--version') {
    console.log(`  version is ${pkg.version}`);
  } else if (argv[0] === '-h' || argv[0] === '--help') {
    console.log('  usage:\n');
    console.log('  -v --version [show version]');
  }
}

run(process.argv);
```

运行

```bash
$ node bin/index.js -v
$ [ '/Users/jiangzhiguo/.nvm/versions/node/v10.15.3/bin/node',
  '/Users/jiangzhiguo/Workspace/jsany/cli-theory/bin/index.js',
  '-v' ]
  version is 1.0.0
```

通过脚本解释程序以及 package.json 的 bin 字段对上面进行简化

bin/index.js

```diff
+ #!/usr/bin/env node
const pkg = require('../package.json')
```

package.json

```json
{
  "name": "cli-theory",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "cli-theory": "bin/index.js"
  },
  "author": "",
  "license": "ISC"
}
```

### 测试

用过 link 符号链接，模拟发包后进行安装使用这个命令

在这个包的根目录执行：

`yarn link`

查看验证 cli-theory 软链：

```bash
$ cat /usr/local/bin/cli-theory
$ #!/usr/bin/env node

const pkg = require('../package.json')

function run(argv) {
  console.log(argv);
  argv = argv.slice(2)
  if(!argv.length){
    // 对于退出操作，用 process.exit(code) 代替 return，成功的话 code 为 0，失败为 1
    process.exit(1)
  }
  if (argv[0] === '-v' || argv[0] === '--version') {
    console.log(`  version is ${pkg.version}`);
  } else if (argv[0] === '-h' || argv[0] === '--help') {
    console.log('  usage:\n');
    console.log('  -v --version [show version]');
  }
}

run(process.argv)%
```

执行脚手架命令：

```bash
$ cli-theory -v
$ [ '/Users/jiangzhiguo/.nvm/versions/node/v10.15.3/bin/node',
  '/usr/local/bin/cli-theory',
  '-v' ]
  version is 1.0.0
```

可以看到 cli-theory === node bin/index.js，简化了命令

## 完整的脚手架

源码：<https://github.com/jsany/cli-kit>
