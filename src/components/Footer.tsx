import { contacts } from '../data/contacts';

const extra = contacts as typeof contacts & {
  phone1Href: string;
  phone2Href: string;
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-body">
      <div className="bg-dark py-12">
        <div className="container-site grid md:grid-cols-3 gap-10">
          <div>
            <h5 className="text-base font-bold mb-4 text-white">
              Связь с нами
            </h5>
            <ul className="space-y-3 text-sm font-bold">
              <li className="flex items-start gap-3">
                <span className="text-primary text-lg">📍</span>
                <span>{contacts.city}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-lg">📞</span>
                <a
                  href={`tel:${extra.phone1Href}`}
                  className="hover:text-white transition"
                >
                  {contacts.phone1}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-lg">📞</span>
                <a
                  href={`tel:${extra.phone2Href}`}
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
              className="inline-block mt-4 text-lg font-bold hover:text-white transition"
            >
              {contacts.email}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-darker py-4" style={{ backgroundColor: '#2e3844' }}>
        <div className="container-site text-sm text-gray-400">
          <p>
            © {year} Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
}