import { useState } from 'react';
import { Card, CardContent } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import { cn } from '@/core/utils';
import type { VehicleGalleryProps } from './types';

export const VehicleGallery = ({ photos }: VehicleGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const mainPhoto = photos[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setIsLightboxOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-sm bg-muted">
            <img
              src={mainPhoto.url}
              alt={mainPhoto.legenda || 'Foto do veículo'}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            />
            {photos.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={handlePrevious}
                  aria-label="Foto anterior"
                >
                  ←
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={handleNext}
                  aria-label="Próxima foto"
                >
                  →
                </Button>
              </>
            )}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-sm text-sm">
              {selectedIndex + 1} / {photos.length}
            </div>
          </div>

          {mainPhoto.legenda && (
            <div className="p-2 text-sm text-muted-foreground text-center">{mainPhoto.legenda}</div>
          )}

          {photos.length > 1 && (
            <div className="p-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    'aspect-video overflow-hidden rounded-sm border-2 transition-all',
                    selectedIndex === index
                      ? 'border-primary-500 ring-2 ring-primary-500'
                      : 'border-transparent hover:border-gray-300'
                  )}
                  aria-label={`Ver foto ${index + 1}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.legenda || `Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Fechar"
          >
            ×
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={mainPhoto.url}
              alt={mainPhoto.legenda || 'Foto do veículo'}
              className="w-full h-full object-contain"
            />

            {photos.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={handlePrevious}
                  aria-label="Foto anterior"
                >
                  ←
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={handleNext}
                  aria-label="Próxima foto"
                >
                  →
                </Button>
              </>
            )}

            {mainPhoto.legenda && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-sm">
                {mainPhoto.legenda}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
