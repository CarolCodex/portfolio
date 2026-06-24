module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      typography: {
        slate: {
          css: {
            '--tw-prose-body': '#40516b',
            '--tw-prose-headings': '#092b66',
            '--tw-prose-links': '#0d6efd',
            '--tw-prose-bold': '#092b66',
            '--tw-prose-counters': '#5a718d',
            '--tw-prose-bullets': '#8aa7ca',
            '--tw-prose-hr': 'rgba(13, 110, 253, 0.16)',
            '--tw-prose-quotes': '#092b66',
            '--tw-prose-quote-borders': '#65c7ff',
            '--tw-prose-captions': '#5a718d',
            '--tw-prose-code': '#0b4bb3',
            '--tw-prose-pre-code': '#dbeafe',
            '--tw-prose-pre-bg': '#0f172a',
            '--tw-prose-th-borders': 'rgba(13, 110, 253, 0.18)',
            '--tw-prose-td-borders': 'rgba(13, 110, 253, 0.1)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
