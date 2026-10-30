import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

interface CounterProps {
  end: number;
  label: string;
}

function Counter({ end, label }: CounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1000;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-5xl md:text-6xl font-bold text-gray-300">
        {value}
      </div>
      <p className="text-base font-bold mt-2 text-dark">{label}</p>
    </div>
  );
}

export default function Mission() {
  return (
    <section id="mision" className="bg-light/80 py-16">
      <div className="container-site grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-black mb-6 flex items-center gap-3">
            <span className="text-primary text-5xl">🎯</span>
            Наша миссия
          </h2>
          <p className="text-lg text-dark mb-6">
            Мы занимаемся комплексным ремонтом под ключ, включая планирование,
            дизайн, выполнение строительных и отделочных работ, а также
            последующее обслуживание. Наша команда экспертов охватывает все
            этапы — от создания уникального проекта до его реализации, чтобы
            гарантировать вам качественный результат. Мы также предлагаем
            консультации по выбору материалов и мебели, помогая вам создать
            пространство, идеально соответствующее вашему стилю и потребностям.
            Наша цель — сделать ремонт простым и приятным процессом для каждого
            клиента.
          </p>
          <ul className="space-y-4 text-lg text-dark">
            {[
              'Цена известна заранее. Мы составляем план и смету в день приезда замерщика.',
              'Гарантия на ремонт. На все ремонтные работы мы даем официальную гарантию пять лет.',
              'Качественные материалы. Закупку и доставку на нас. Мы работаем с материалами компаний KNAUF, ABB, BIOFA.',
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="text-accent flex-shrink-0">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 content-center">
          <Counter end={17} label="Довольных клиентов" />
          <Counter end={20} label="Человек в команде" />
          <Counter end={17} label="Завершенных проектов" />
        </div>
      </div>
    </section>
  );
}