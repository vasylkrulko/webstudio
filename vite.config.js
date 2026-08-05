import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

function resolveBase(mode) {
  if (mode === 'relative') {
    return './';
  }

  if (mode !== 'github') {
    return '/';
  }

  const repositoryName =
    process.env.GITHUB_REPOSITORY?.split('/').at(-1) ??
    process.env.npm_package_name?.split('/').at(-1);

  if (!repositoryName || repositoryName.endsWith('.github.io')) {
    return '/';
  }

  return `/${repositoryName}/`;
}

export default defineConfig(({ mode }) => {
  return {
    base: resolveBase(mode),
    root: 'src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('./src/*.html', {
          absolute: true,
        }),
      },
    },
    css: {
      postcss: {
        plugins: [
          SortCss({
            sort: 'mobile-first',
          }),
        ],
      },
    },
    plugins: [injectHTML(), FullReload(['src/**/*.html'])],
  };
});
