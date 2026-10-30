import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  image?: string;
  type?: 'website' | 'article';
}

export default function Seo({
  title,
  description = 'Комплексный ремонт квартир и коммерческих помещений под ключ в Симферополе',
  canonical,
  noindex,
  image = '/images/og-image.jpg',
  type = 'website',
}: SeoProps) {
  const siteName = 'СимфИнвестСтрой';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}