export async function generateMetadata({ params }) {
  const { category } = await params;
  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: `محصولات - ${category} - باریتکو`,
    description: `لیست محصولات در دسته‌بندی ${category} در پلتفرم باریتکو`,
    openGraph: {
      title: `محصولات - ${category} - باریتکو`,
      description: `لیست محصولات در دسته‌بندی ${category} در پلتفرم باریتکو`,
      url: `/shop/${category}`,
    },
  };
}

export const revalidate = 3600; // ISR with 1-hour revalidation



