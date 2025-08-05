/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,njk,md}"],
  
    theme: {
      extend: {
        typography: ({ theme }) => ({
            DEFAULT: {
              css: {
                color: theme('colors.white'),
          
                // Override CSS variables used by Tailwind Typography
                '--tw-prose-body': theme('colors.white'),
                '--tw-prose-headings': theme('colors.red.100'),
                '--tw-prose-bold': theme('colors.white'),
                '--tw-prose-links': theme('colors.red.400'),
                '--tw-prose-links-hover': theme('colors.red.300'),
                '--tw-prose-code': theme('colors.red.100'),
                '--tw-prose-pre-bg': theme('colors.red.950'),
                '--tw-prose-pre-code': theme('colors.red.100'),
                '--tw-prose-quotes': theme('colors.red.400'),
                '--tw-prose-quote-borders': theme('colors.red.700'),
                '--tw-prose-hr': theme('colors.red.700'),
                '--tw-prose-th-borders': theme('colors.red.600'),
                '--tw-prose-td-borders': theme('colors.red.700'),
          
                h1: { color: theme('colors.red.100') },
                h2: { color: theme('colors.red.200') },
                h3: { color: theme('colors.red.300') },
                strong: { color: theme('colors.red.100'), fontWeight: '700' },
          
                a: {
                  color: theme('colors.red.400'),
                  textDecoration: 'underline',
                  '&:hover': {
                    color: theme('colors.red.300'),
                  },
                },
          
                code: {
                  backgroundColor: theme('colors.red.800'),
                  color: theme('colors.red.100'),
                  padding: '0.2rem 0.4rem',
                  borderRadius: '0.25rem',
                  fontWeight: '500',
                },
                pre: {
                  backgroundColor: theme('colors.red.950'),
                  color: theme('colors.red.100'),
                  padding: '1em',
                  borderRadius: '0.5rem',
                  overflowX: 'auto',
                },
          
                blockquote: {
                  borderLeftColor: theme('colors.red.700'),
                  color: theme('colors.red.300'),
                  fontStyle: 'italic',
                  paddingLeft: '1rem',
                },
          
                hr: { borderColor: theme('colors.red.700') },
          
                th: {
                  color: theme('colors.white'),
                  borderBottomColor: theme('colors.red.600'),
                },
                td: {
                  color: theme('colors.white'),
                  borderBottomColor: theme('colors.red.700'),
                },
          
                ol: { color: theme('colors.white') },
                ul: { color: theme('colors.white') },
                li: { color: theme('colors.white') },
                p: { color: theme('colors.white') },
              },
            },
          }),
          
            
      },
    },
    plugins: [require('@tailwindcss/typography')],
  };
  