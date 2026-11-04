import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RequestModal from '../components/RequestModal';
import Preloader from '../components/Preloader';
import MobileCallBar from '../components/MobileCallBar';

export default function RootLayout() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Preloader />
      <Header onOpenModal={() => setModalOpen(true)} />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Загрузка…
            </div>
          }
        >
          <Outlet context={{ openModal: () => setModalOpen(true) }} />
        </Suspense>
      </main>
      <Footer />
      <MobileCallBar />
      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
