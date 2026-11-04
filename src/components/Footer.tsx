import { contacts } from '../data/contacts';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-body">
      <div className="bg-dark py-12">
        <div className="container-site grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-base font-bold mb-4 text-white">Связь с нами</h2>
            <ul className="space-y-3 text-sm font-bold">
              <li className="flex items-start gap-3">
                <span className="text-primary text-lg">📍</span>
                <span>{contacts.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-lg">📞</span>
                <a
                  href={`tel:${contacts.phone1Href}`}
                  className="hover:text-white transition"
                >
                  {contacts.phone1}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-lg">📞</span>
                <a
                  href={`tel:${contacts.phone2Href}`}
                  className="hover:text-white transition"
                >
                  {contacts.phone2}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-lg">🕐</span>
                <span>{contacts.hours}</span>
              </li>
            </ul>
            <a
              href={`mailto:${contacts.email}`}
              className="inline-block mt-4 text-base font-bold hover:text-white transition"
            >
              {contacts.email}
            </a>
          </div>

          <div>
            <h2 className="text-base font-bold mb-4 text-white">Разделы</h2>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <a href="/#about" className="hover:text-white transition">
                  О нас
                </a>
              </li>
              <li>
                <a href="/#mision" className="hover:text-white transition">
                  Наша миссия
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition">
                  Вопросы и ответы
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold mb-4 text-white">О компании</h2>
            <p className="text-sm leading-relaxed">
              Комплексный ремонт квартир и коммерческих помещений под ключ в
              Симферополе и Симферопольском районе. Бесплатный выезд замерщика,
              гарантия 5 лет.
            </p>
            <a
              href="/#about"
              className="inline-block mt-4 text-sm font-bold text-white hover:text-primary transition"
            >
              Подробнее о нас →
            </a>
            <p className="mt-6 text-sm font-bold text-white">{contacts.owner}</p>
            <p className="text-xs text-gray-400">ИНН {contacts.inn}</p>
          </div>
        </div>
      </div>

      <div className="bg-darker py-4">
        <div className="container-site flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} СимфИнвестСтрой. Все права защищены.</p>
          <a href="/privacy" className="hover:text-white transition">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
