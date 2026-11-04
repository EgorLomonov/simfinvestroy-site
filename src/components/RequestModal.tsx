import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import RequestForm from './RequestForm';

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RequestModal({ open, onClose }: RequestModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onEsc);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-5 bg-black/60 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-modal-title"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-lg bg-white rounded-card p-6 shadow-cardLg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-2xl leading-none text-body hover:text-dark transition"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </button>

        <div className="text-center mb-2">
          <img src="/images/sendico.png" alt="" className="w-12 h-12 mx-auto" />
        </div>

        <h3
          id="request-modal-title"
          className="text-center text-2xl font-bold text-dark mb-2"
        >
          Оставить заявку
        </h3>
        <p className="text-center text-body text-sm">
          Заполните форму, и мы свяжемся с вами
        </p>

        <RequestForm
          onSuccess={() => {
            setTimeout(() => onClose(), 3000);
          }}
        />
      </div>
    </div>,
    document.body
  );
}
