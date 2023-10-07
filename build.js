/*
 * @Author       : fallen_zero
 * @Date         : 2023-10-07 14:21:45
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-10-07 15:07:06
 * @FilePath     : /zero-use/build.js
 * @FileName     :
 */
const { build, context } = require('esbuild');

async function bundle(format) {
  const ext = format === 'esm' ? '.mjs' : '.js';
  const outfile = `dist/index.${format}${ext}`;
  const finish = () => console.log('Build finished:', outfile);

  const options = {
    format,
    bundle: true,
    target: ['chrome53'],
    outfile,
    charset: 'utf8',
    external: ['vue', 'dayjs'],
    entryPoints: ['./src/index.ts'],
  };

  if (process.argv.includes('-w')) {
    const loggerPlugin = {
      name: 'loggerPlugin',
      setup(build) {
        build.onEnd(finish);
      },
    };

    const ctx = await context({ ...options, plugins: [loggerPlugin] });

    await ctx.watch();
  } else {
    await build(options);
    finish();
  }
}

bundle('esm');
bundle('cjs');
