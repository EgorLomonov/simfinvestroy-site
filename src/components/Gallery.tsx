import { useLightgallery } from '../hooks/useLightgallery';
import { galleryItems } from '../data/gallery';

const sizeClasses: Record<string, string> = {
  small: 'md:col-span-1 row-span-1',
  tall: 'md:col-span-1 row-span-2',
  wide: 'md:col-span-2 row-span-1',
  big: 'md:col-span-2 row-span-2',
};

export default function Gallery() {
  const ref = useLightgallery();

  return (
    <section className="py-16 bg-white">
      <div
        ref={ref}
        className="container-site grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3"
      >
        {galleryItems.map((g) => (
          <a
            key={g.id}
            href={g.full}
            data-lightgallery="item"
            className={`group relative overflow-hidden rounded-card ${sizeClasses[g.size]}`}
          >
            <img
              src={g.src}
              alt={g.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
              <h6 className="font-bold text-base">{g.title}</h6>
              <div className="text-sm text-white/85">{g.location}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}