import { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-white transition-opacity duration-500 ${
        hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={hidden}
    >
      <div className="text-center">
        <div className="grid grid-cols-3 gap-1 w-24 h-24 mx-auto">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="bg-primary animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <p className="mt-6 text-body text-sm">
          Загрузка, вы в минуте до дома вашей мечты...
        </p>
      </div>
    </div>
  );
}