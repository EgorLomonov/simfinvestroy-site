import { useOutletContext } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import Pricing from '../components/Pricing';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Mission from '../components/Mission';
import ParallaxCTA from '../components/ParallaxCTA';
import Faq from '../components/Faq';

import JsonLd from '../components/JsonLd';
import Seo from '../components/Seo';
// ...
<JsonLd />
interface RootContext {
  openModal: () => void;
}

export default function HomePage() {
  const { openModal } = useOutletContext<RootContext>();

  return (
    <>
      <Seo
        title="СимфИнвестСтрой — Ремонт квартир под ключ в Симферополе"
        description="Комплексный ремонт квартир и коммерческих помещений под ключ. Бесплатный вызов замерщика, гарантия 5 лет, качественные материалы."
        canonical="https://simfinvestroy.ru/"
      />
      <HeroSlider onOpenModal={openModal} />
      <Pricing />
      <About />
      <Gallery />
      <Mission />
      <ParallaxCTA onOpenModal={openModal} />
      <Faq />
    </>
  );
}