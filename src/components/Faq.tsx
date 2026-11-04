import { useInView } from '../hooks/useInView';
import { faqItems } from '../data/faq';

function FaqRow({ item }: { item: (typeof faqItems)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const isRight = item.align === 'right';

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row gap-6 mb-10 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isRight ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="md:w-1/2 rounded-card overflow-hidden shadow-card">
        <img
          src={item.image}
          alt={item.question}
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center">
        <h4 className="text-2xl md:text-3xl font-normal text-primary mb-3">
          {item.question}
        </h4>
        <p className="text-lg text-dark leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="bg-light/80 py-16">
      <div className="container-site">
        <h2 className="text-3xl md:text-4xl font-black mb-10 flex items-center gap-3">
          <span className="text-primary text-5xl">📰</span>
          <span>
            Самые важные вопросы{' '}
            <span className="font-light">и ответы на них</span>
          </span>
        </h2>
        {faqItems.map((item) => (
          <FaqRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
