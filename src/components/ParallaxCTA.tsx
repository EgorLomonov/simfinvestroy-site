interface ParallaxCTAProps {
  onOpenModal: () => void;
}

export default function ParallaxCTA({ onOpenModal }: ParallaxCTAProps) {
  return (
    <section
      className="relative py-24 text-center text-white bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/parallax-1-1920x1026.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="container-site relative">
        <h2 className="text-3xl md:text-5xl font-black mb-4">
          Оставьте <span className="font-light">заявку</span>
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          С вами свяжется наш замерщик и приедет в удобное время. Мы составим
          расчет в течение 24 часов и свяжемся с вами
        </p>
        <button onClick={onOpenModal} className="btn btn-primary mt-8">
          Оставить заявку
        </button>
      </div>
    </section>
  );
}