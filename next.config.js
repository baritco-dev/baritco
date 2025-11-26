/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.baritco.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    const magazineSlugs = ['miningtrends2025', 'sustainablemining'];
    const newsSlugs = ['miningnews2025', 'tehranminingexpo'];
    const tenderSlugs = ['ironoretender', 'equipmentauction'];
    const adSlugs = ['ironore', 'coppermine', 'drillmachine', 'silicaselling'];
    const adCategorySlugs = [
      'metal-mines',
      'non-metal-mines',
      'metal-minerals',
      'non-metal-minerals',
      'decorative-stones',
      'gemstones',
      'construction-materials',
      'equipment',
      'machinery',
      'services-consulting',
      'investment',
      'jobs',
      'education',
      'others',
    ];

    return {
      beforeFiles: [
        {
          source: '/shop',
          destination: '/shop/products',
        },
        {
          source: '/shop/:category',
          destination: '/shop/:category',
        },
        {
          source: '/ads',
          destination: '/ads',
        },
        ...adSlugs.map((slug) => ({
          source: `/ads/${slug}`,
          destination: `/ads/details/${slug}`,
        })),
        {
          source: '/ads/:category',
          destination: '/ads/:category',
          has: [
            {
              type: 'query',
              key: 'category',
              value: adCategorySlugs.join('|'),
            },
          ],
        },
        {
          source: '/ads/:slug',
          destination: '/ads/details/:slug',
          has: [
            {
              type: 'query',
              key: 'slug',
              value: adSlugs.join('|'),
            },
          ],
        },
        {
          source: '/clinic',
          destination: '/clinic',
        },
        {
          source: '/clinic/specialists',
          destination: '/clinic/specialists',
        },
        {
          source: '/clinic/booking',
          destination: '/clinic/booking',
        },
        {
          source: '/organizations',
          destination: '/organizations',
        },
        {
          source: '/magazine',
          destination: '/magazine',
        },
        {
          source: '/news',
          destination: '/news',
        },
        {
          source: '/tenders',
          destination: '/tenders',
        },
      ],
      afterFiles: [
        ...magazineSlugs.map((slug) => ({
          source: `/${slug}`,
          destination: `/magazine/${slug}`,
        })),
        ...newsSlugs.map((slug) => ({
          source: `/${slug}`,
          destination: `/news/${slug}`,
        })),
        ...tenderSlugs.map((slug) => ({
          source: `/${slug}`,
          destination: `/tenders/${slug}`,
        })),
        {
          source: '/:slug',
          destination: '/shop/products/:slug',
        },
        {
          source: '/:slug',
          destination: '/clinic/specialists/:slug',
          has: [
            {
              type: 'query',
              key: 'slug',
              value: '(?!' + [...magazineSlugs, ...newsSlugs, ...tenderSlugs, ...adSlugs].join('|') + ').+',
            },
          ],
        },
      ],
    };
  },
};

module.exports = nextConfig;







// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     formats: ['image/webp'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'cdn.baritco.com',
//       },
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//     ];
//   },
//   async rewrites() {
//     const magazineSlugs = ['miningtrends2025', 'sustainablemining'];
//     const newsSlugs = ['miningnews2025', 'tehranminingexpo'];
//     const tenderSlugs = ['ironoretender', 'equipmentauction'];
//     const adSlugs = ['ironoreselling', 'copperoreselling', 'goldminingequipment', 'silicaselling'];
//     const adCategorySlugs = [
//       'metal-mines',
//       'non-metal-mines',
//       'metal-minerals',
//       'non-metal-minerals',
//       'decorative-stones',
//       'gemstones',
//       'construction-materials',
//       'equipment',
//       'machinery',
//       'services-consulting',
//       'investment',
//       'jobs',
//       'education',
//       'others',
//     ];

//     return {
//       beforeFiles: [
//         {
//           source: '/shop',
//           destination: '/shop/products',
//         },
//         {
//           source: '/shop/:category',
//           destination: '/shop/:category',
//         },
//         {
//           source: '/ads',
//           destination: '/ads',
//         },
//         ...adSlugs.map((slug) => ({
//           source: `/ads/${slug}`,
//           destination: `/ads/details/${slug}`,
//         })),
//         {
//           source: '/ads/:category',
//           destination: '/ads/:category',
//           has: [
//             {
//               type: 'query',
//               key: 'category',
//               value: adCategorySlugs.join('|'),
//             },
//           ],
//         },
//         {
//           source: '/ads/details/:slug',
//           destination: '/ads/details/:slug',
//         },
//         {
//           source: '/clinic',
//           destination: '/clinic',
//         },
//         {
//           source: '/clinic/specialists',
//           destination: '/clinic/specialists',
//         },
//         {
//           source: '/clinic/booking',
//           destination: '/clinic/booking',
//         },
//         {
//           source: '/organizations',
//           destination: '/organizations',
//         },
//         {
//           source: '/magazine',
//           destination: '/magazine',
//         },
//         {
//           source: '/news',
//           destination: '/news',
//         },
//         {
//           source: '/tenders',
//           destination: '/tenders',
//         },
//       ],
//       afterFiles: [
//         ...magazineSlugs.map((slug) => ({
//           source: `/${slug}`,
//           destination: `/magazine/${slug}`,
//         })),
//         ...newsSlugs.map((slug) => ({
//           source: `/${slug}`,
//           destination: `/news/${slug}`,
//         })),
//         ...tenderSlugs.map((slug) => ({
//           source: `/${slug}`,
//           destination: `/tenders/${slug}`,
//         })),
//         {
//           source: '/:slug',
//           destination: '/shop/products/:slug',
//         },
//         {
//           source: '/:slug',
//           destination: '/clinic/specialists/:slug',
//           has: [
//             {
//               type: 'query',
//               key: 'slug',
//               value: '(?!' + [...magazineSlugs, ...newsSlugs, ...tenderSlugs, ...adSlugs].join('|') + ').+',
//             },
//           ],
//         },
//       ],
//     };
//   },
// };

// module.exports = nextConfig;


