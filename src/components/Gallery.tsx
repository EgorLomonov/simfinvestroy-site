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
    <section className="py-16 bg-white">
      {/* 
        grid-cols-2 на телефоне, md:grid-cols-4 на десктопе.
        gap-4 задает отступы.
      */}
      <div className="container-site grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
        {galleryItems.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setIndex(i)}
            className="group relative overflow-hidden rounded-card focus:outline-none text-left bg-gray-100"
          >
            <img
              src={g.src}
              alt={g.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Затемнение и текст при наведении */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
              <h6 className="font-bold text-base">{g.title}</h6>
              <div className="text-sm text-white/85">{g.location}</div>
            </div>
          </button>
        ))}
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