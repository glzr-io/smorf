import { defineConfig, type UserConfig } from 'tsdown';
import solid from 'unplugin-solid/rolldown';

/**
 * Builds the library twice:
 *  - Without the JSX preserved for the `import` condition.
 *  - With the JSX preserved for the `solid` condition. Consumers compile
 *    JSX with their own Solid version.
 */
function createConfig(preserveJsx: boolean): UserConfig {
  return {
    entry: ['src/index.tsx'],
    outDir: 'dist',
    format: ['esm'],
    platform: 'browser',
    target: 'esnext',
    clean: true,
    treeshake: true,
    dts: !preserveJsx,
    outExtensions: () => (preserveJsx ? { js: '.jsx' } : {}),
    inputOptions: preserveJsx
      ? { transform: { jsx: 'preserve' } }
      : undefined,
    plugins: preserveJsx
      ? []
      : [
          solid({
            solid: { generate: 'dom', moduleName: '@solidjs/web' },
          }),
        ],
  };
}

export default defineConfig([createConfig(false), createConfig(true)]);
