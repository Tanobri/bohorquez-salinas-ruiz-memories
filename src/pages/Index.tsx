import { useState, useCallback } from "react";
import Snowfall from "@/components/Snowfall";
import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import ImageCard from "@/components/ImageCard";
import ImageModal from "@/components/ImageModal";
import UploadModal from "@/components/UploadModal";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";

interface ImageItem {
  id: string;
  src: string;
  alt: string;
}

const Index = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUpload = useCallback((files: File[]) => {
    const newImages: ImageItem[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      src: URL.createObjectURL(file),
      alt: file.name,
    }));
    
    setImages(prev => [...newImages, ...prev]);
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Snowfall />
      
      <Header onUploadClick={() => setIsUploadModalOpen(true)} />
      
      <main className="pb-8">
        {images.length === 0 ? (
          <EmptyState onUploadClick={() => setIsUploadModalOpen(true)} />
        ) : (
          <MasonryGrid>
            {images.map((image, index) => (
              <ImageCard
                key={image.id}
                src={image.src}
                alt={image.alt}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </MasonryGrid>
        )}
      </main>
      
      <Footer />
      
      {/* Modals */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
      
      {selectedImageIndex !== null && (
        <ImageModal
          src={images[selectedImageIndex].src}
          alt={images[selectedImageIndex].alt}
          isOpen={true}
          onClose={handleCloseModal}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          hasPrev={selectedImageIndex > 0}
          hasNext={selectedImageIndex < images.length - 1}
        />
      )}
    </div>
  );
};

export default Index;
