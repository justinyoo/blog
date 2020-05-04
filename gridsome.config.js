module.exports = {
  siteName: 'Just in Chronicles',
  siteDescription: "Life as a Voyage",
  siteUrl: 'https://justinchronicles.net',
  titleTemplate: `%s | JustinChronicles`,
  icon: 'src/favicon.png',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        [ 'gridsome-plugin-remark-shiki', {
            theme: 'min-light'
          }
        ],
        [ '@noxify/gridsome-plugin-remark-embed', {
            'enabledProviders': [ 'Youtube', 'Twitter', 'Gist' ],
            'Twitter': {
              'hideMedia': false,
              'theme': 'light'
            }
          }
        ]
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
          author: {
            typeName: 'Author',
            create: true,
          },
        }
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-749520-6',
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      },
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Just in Chronicles',
          feed_url: 'https://justinchronicles.net/feed.xml',
          site_url: 'https://justinchronicles.net',
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://justinchronicles.net' + node.path,
          author: node.author,
          date: node.date,
        }),
        output: {
          dir: './static',
          name: 'feed.xml',
        },
      },
    },
  ],

  templates: {
    Post: '/ko/:year/:month/:day/:slug',
    Tag: '/tag/:id',
    Author: '/author/:id',
  },

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ])

        return options
      })
  },
}
