// components/gallery/image-gallery.tsx
export default function ImageGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-lg bg-muted">
          {/* Image placeholder */}
        </div>
      ))}
    </div>
  );
}
