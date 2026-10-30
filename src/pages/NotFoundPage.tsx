import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="404 — Страница не найдена" noindex />
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl font-black text-primary">404</h1>
          <p className="text-xl text-body mt-4 mb-8">
            Страница не найдена
          </p>
          <Link to="/" className="btn btn-primary">
            На главную
          </Link>
        </div>
      </section>
    </>
  );
}