#!/usr/bin/env node

const pkg = require('../package.json')

function run(argv) {
  console.log(argv);
  argv = argv.slice(2)
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

run(process.argv)