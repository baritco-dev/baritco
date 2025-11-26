export async function generateMetadata({ params }) {
  const { category } = await params;
  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: `آگهی‌ها - ${category} - باریتکو`,
    description: `لیست آگهی‌ها در دسته‌بندی ${category} در پلتفرم باریتکو`,
    openGraph: {
      title: `آگهی‌ها - ${category} - باریتکو`,
      description: `لیست آگهی‌ها در دسته‌بندی ${category} در پلتفرم باریتکو`,
      url: `/ads/${category}`,
    },
  };
}

export const revalidate = 3600; // ISR with 1-hour revalidation


