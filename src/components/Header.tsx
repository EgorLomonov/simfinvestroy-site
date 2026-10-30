import { useState, useEffect } from 'react';
import { contacts } from '../data/contacts';

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#about', label: 'О нас' },
    { href: '#mision', label: 'Наша миссия' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* 1. Верхняя панель (Видна на всех устройствах, адаптирована под мобилки) */}
      <div className="bg-dark/95 text-white/90 backdrop-blur-md border-b border-white/10">
        <div className="container-site flex items-center justify-between py-2 text-sm">
          
          {/* Телефоны: на десктопе показываем оба, на мобилке — только иконки */}
          <div className="flex items-center gap-4">
            <a href={`tel:${contacts.phone1}`} className="flex items-center gap-2 hover:text-white transition">
              <span className="text-lg">📞</span>
              <span className="hidden sm:inline font-bold">{contacts.phone1}</span>
              <span className="sm:hidden font-bold">Позвонить</span>
            </a>
            <a href={`tel:${contacts.phone2}`} className="hidden md:flex items-center gap-2 hover:text-white transition">
              <span className="text-lg">📞</span>
              <span className="font-bold">{contacts.phone2}</span>
            </a>
          </div>

          {/* График работы и кнопка заявки */}
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">{contacts.hours}</span>
            <button
              onClick={onOpenModal}
              className="bg-accent hover:bg-accent/80 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold transition-colors"
            >
              Заявка
            </button>
          </div>
        </div>
      </div>

      {/* 2. Основная панель с логотипом */}
      <div className={`transition-all duration-300 ${
        scrolled ? 'bg-dark/90 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="container-site flex items-center justify-between py-3">
          <a href="#" className="flex-shrink-0">
            <img
              src="/images/logo-inverse-310x44.png"
              alt="СимфИнвестСтрой"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white border-b border-transparent hover:border-white pb-1 font-bold transition"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={onOpenModal}
              className="btn btn-secondary-outline text-base py-2 px-5"
            >
              Оставить заявку
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white text-3xl p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Меню"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-xl absolute top-full left-0 right-0">
          <nav className="container-site flex flex-col py-4 gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-light text-primary font-bold"
              >
                {l.label}
              </a>
            ))}
            
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenModal();
              }}
              className="btn btn-primary mt-3"
            >
              Оставить заявку
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}