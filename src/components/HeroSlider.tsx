import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { slides } from '../data/slider';

interface HeroSliderProps {
  onOpenModal: () => void;
}

const headingClass =
  'text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-lg';

export default function HeroSlider({ onOpenModal }: HeroSliderProps) {
  return (
    <section className="relative w-full h-[70vh] bg-gray-900 pt-28 md:pt-32">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
        }}
        navigation={{
          nextEl: '.custom-swiper-next',
          prevEl: '.custom-swiper-prev',
        }}
        className="w-full h-full"
      >
        {slides.map((s, index) => {
          const content = (
            <>
              <span className="block text-white">{s.title}</span>
              {s.subtitle && (
                <span className="block font-light text-white/95 mt-2 drop-shadow-md">
                  {s.subtitle}
                </span>
              )}
            </>
          );

          return (
            <SwiperSlide key={s.id}>
              <div
                className="relative w-full h-full flex items-center bg-cover bg-center"
                style={{ backgroundImage: `url(${s.bg})` }}
              >
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white pt-20">
                  {index === 0 ? (
                    <h1 className={headingClass}>{content}</h1>
                  ) : (
                    <h2 className={headingClass}>{content}</h2>
                  )}

                  <p className="text-lg md:text-2xl font-bold mt-6 max-w-2xl text-white/95 drop-shadow-md">
                    {s.text}
                  </p>
                  <button
                    onClick={onOpenModal}
                    className="btn btn-secondary mt-8 shadow-lg"
                  >
                    Оставить заявку
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Кастомные стрелки (Swiper управляет ими) */}
      <div className="custom-swiper-prev absolute top-1/2 left-4 z-20 -translate-y-1/2 text-white cursor-pointer hover:opacity-70 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div className="custom-swiper-next absolute top-1/2 right-4 z-20 -translate-y-1/2 text-white cursor-pointer hover:opacity-70 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      {/* Кастомная пагинация по центру */}
      <div className="custom-swiper-pagination absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2"></div>
    </section>
  );
}
