import { Helmet } from 'react-helmet-async';
import { contacts } from '../data/contacts';

const extra = contacts as typeof contacts & {
  phone1Href: string;
  phone2Href: string;
};

export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'СимфИнвестСтрой',
    image: '/images/og-image.jpg',
    url: 'https://simfinvestroy.ru/',
    telephone: extra.phone1Href,
    email: contacts.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: contacts.city,
      addressCountry: 'RU',
    },
    openingHours: 'Mo-Sa 09:00-18:00',
    priceRange: '₽₽',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}