import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { galleryItems } from '../data/gallery';

// Преобразуем данные в формат лайтбокса
const slides = galleryItems.map((item) => ({
  src: item.full,
  title: item.title,
  description: item.location,
}));

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container-site">
        <h2 className="text-3xl md:text-4xl font-black mb-10 flex items-center gap-3">
          <span className="text-primary text-5xl">🖼️</span>
          <span>
            Галерея <span className="font-light">наших работ</span>
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryItems.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setIndex(i)}
              className="group relative overflow-hidden rounded-card focus:outline-none text-left bg-gray-100"
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Описание видно по умолчанию, при наведении скрывается */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-0 opacity-100 transition-all duration-300 group-hover:translate-y-3 group-hover:opacity-0">
                <h6 className="font-bold text-base">{g.title}</h6>
                <div className="text-sm text-white/85">{g.location}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Сам лайтбокс */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </section>
  );
}
