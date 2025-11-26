
export function generateProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product?.title || 'محصول بدون نام',
    image: product?.image || '/images/default-product.jpg',
    description: product?.description || 'بدون توضیحات',
    offers: {
      '@type': 'Offer',
      price: product?.price || 0,
      priceCurrency: 'IRR',
      availability: product?.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };
}

export function generateAdSchema(ad) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: ad?.title || 'آگهی بدون نام',
    description: ad?.description || 'بدون توضیحات',
    image: ad?.image || '/images/default-ad.jpg',
    category: ad?.category || 'نامشخص',
    price: ad?.price || 0,
    priceCurrency: 'IRR',
    availability: 'https://schema.org/InStock',
    address: ad?.location && ad?.province ? {
      '@type': 'PostalAddress',
      addressLocality: ad.location,
      addressRegion: ad.province,
      addressCountry: 'IR',
    } : undefined,
    additionalProperty: [
      ad?.isGolden && { '@type': 'PropertyValue', name: 'isGolden', value: 'true' },
      ad?.mineralType && { '@type': 'PropertyValue', name: 'mineralType', value: ad.mineralType },
      ad?.purity && { '@type': 'PropertyValue', name: 'purity', value: ad.purity },
      ad?.reserves && { '@type': 'PropertyValue', name: 'reserves', value: `${ad.reserves} تن` },
      ad?.quantityAvailable && { '@type': 'PropertyValue', name: 'quantityAvailable', value: `${ad.quantityAvailable} تن` },
      ad?.area && { '@type': 'PropertyValue', name: 'area', value: `${ad.area} هکتار` },
      ad?.condition && { '@type': 'PropertyValue', name: 'condition', value: ad.condition },
      ad?.year && { '@type': 'PropertyValue', name: 'year', value: ad.year },
      ad?.jobType && { '@type': 'PropertyValue', name: 'jobType', value: ad.jobType },
      ad?.experienceRequired && { '@type': 'PropertyValue', name: 'experienceRequired', value: `${ad.experienceRequired} سال` },
      ad?.investmentAmount && { '@type': 'PropertyValue', name: 'investmentAmount', value: `${ad.investmentAmount} تومان` },
      ad?.partnershipType && { '@type': 'PropertyValue', name: 'partnershipType', value: ad.partnershipType },
      ad?.courseDuration && { '@type': 'PropertyValue', name: 'courseDuration', value: ad.courseDuration },
      ad?.details && Object.keys(ad.details).length > 0 && 
        Object.entries(ad.details).map(([key, value]) => ({
          '@type': 'PropertyValue',
          name: key,
          value: value,
        })),
    ].filter(Boolean),
  };
}

export function generateNewsSchema(news) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news?.title || 'خبر بدون عنوان',
    image: news?.image || '/images/default-news.jpg',
    description: news?.excerpt || news?.content?.slice(0, 200) || 'بدون توضیحات',
    articleBody: news?.content || 'بدون محتوا',
    datePublished: news?.date ? new Date(news.date).toISOString() : new Date().toISOString(),
  };
}

export function generateTenderSchema(tender) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: tender?.title || 'مناقصه/مزایده بدون عنوان',
    description: tender?.description || 'بدون توضیحات',
    image: tender?.image || '/images/default-tender.jpg',
    category: tender?.type || 'نامشخص',
  };
}

export function generateSpecialistSchema(specialist) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: specialist?.name || 'متخصص بدون نام',
    jobTitle: specialist?.specialty || 'نامشخص',
    description: specialist?.bio || 'بدون بیوگرافی',
    image: specialist?.image || '/images/default-specialist.jpg',
  };
}

export function generateOrganizationSchema(organization) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization?.name || 'سازمان بدون نام',
    description: organization?.description || 'بدون توضیحات',
    image: organization?.image || '/images/default-organization.jpg',
  };
}

export function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article?.title || 'مقاله بدون عنوان',
    image: article?.image || '/images/default-article.jpg',
    description: article?.excerpt || article?.content?.slice(0, 200) || 'بدون توضیحات',
    articleBody: article?.content || 'بدون محتوا',
    datePublished: article?.date ? new Date(article.date).toISOString() : new Date().toISOString(),
  };
}
