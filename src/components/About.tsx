import { useInView } from '../hooks/useInView';

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="bg-light/80 py-16 md:py-24">
      <div className="container-site grid md:grid-cols-2 gap-12 items-center">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-black mb-6">О нас</h2>
          <p className="text-lg text-dark leading-relaxed">
            Наша компания специализируется на ремонте под ключ, предлагая широкий
            спектр услуг для создания комфортного и функционального пространства.
            Мы понимаем, что каждый проект уникален, поэтому индивидуально
            подходим к каждому клиенту, учитывая его пожелания и потребности.
            Наша команда профессионалов гарантирует высокое качество выполнения
            работ, использование современных материалов и технологий, а также
            соблюдение всех сроков. Доверьте нам свои мечты об идеальном доме, и
            мы осуществим их с точностью и заботой!
          </p>
        </div>
        <div
          className={`rounded-card overflow-hidden shadow-cardLg transition-all duration-700 ${
            inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <img
            src="/images/index-874x534.webp"
            alt="О нас"
            width={874}
            height={534}
            loading="lazy"
            decoding="async"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}