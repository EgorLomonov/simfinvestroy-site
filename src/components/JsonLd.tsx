import { Helmet } from 'react-helmet-async';




export default function JsonLd() {
 const data = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "СимфИнвестСтрой",
  "image": "https://simf-invest-stroy.ru/images/og-image.jpg",
  "telephone": "+79785414164",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Симферополь",
    "addressCountry": "RU"
  },
  "openingHours": "Mo-Sa 09:00-18:00",
  "url": "https://simf-invest-stroy.ru/"
};

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}