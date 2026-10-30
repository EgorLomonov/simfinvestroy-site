import { useState } from 'react';
import { contacts } from '../data/contacts';

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '#about', label: 'О нас' },
    { href: '#mision', label: 'Наша миссия' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      {/* Верхняя полоса с телефонами (desktop) */}
      <div className="hidden lg:block bg-dark/90 text-white/80">
        <div className="container-site flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${contacts.phone1}`} className="hover:text-white">
              <span className="mr-2">📞</span>{contacts.phone1}
            </a>
            <a href={`tel:${contacts.phone2}`} className="hover:text-white">
              <span className="mr-2">📞</span>{contacts.phone2}
            </a>
          </div>
          <div>{contacts.hours}</div>
        </div>
      </div>

      {/* Основной навбар */}
      <div className="bg-dark/30 backdrop-blur-sm">
        <div className="container-site flex items-center justify-between py-4">
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
        <div className="lg:hidden bg-white shadow-lg">
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
            <a href={`tel:${contacts.phone1}`} className="text-primary py-2">
              {contacts.phone1}
            </a>
            <a href={`tel:${contacts.phone2}`} className="text-primary py-2">
              {contacts.phone2}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}