import { pricingPlans } from '../data/pricing';
import { useInView } from '../hooks/useInView';

const iconMap: Record<string, string> = {
  calc: '🧮',
  chart: '📊',
  sand: '⏳',
};

export default function Pricing() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="bg-dark/95 text-white py-16">
      <div ref={ref} className="container-site grid md:grid-cols-3 gap-10">
        {pricingPlans.map((plan, i) => (
          <div
            key={plan.id}
            className={`transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{iconMap[plan.icon]}</div>
              <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
              <p className="text-xl text-accent font-bold mt-2">{plan.price}</p>
              <ul className="mt-6 text-left text-sm space-y-2 text-white/85">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-accent flex-shrink-0">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}