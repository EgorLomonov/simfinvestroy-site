import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RequestModal from '../components/RequestModal';
import Preloader from '../components/Preloader';

export default function RootLayout() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Preloader />
      <Header onOpenModal={() => setModalOpen(true)} />
      <main className="flex-1">
        <Outlet context={{ openModal: () => setModalOpen(true) }} />
      </main>
      <Footer />
      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}