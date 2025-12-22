import { useState, useCallback } from "react";
import Snowfall from "@/components/Snowfall";
import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import ImageCard from "@/components/ImageCard";
import ImageModal from "@/components/ImageModal";
import UploadModal from "@/components/UploadModal";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getMemories } from "@/services/memories";

const Index = () => {
  const { data: memories = [], isLoading } = useQuery({
    queryKey: ["memories"],
    queryFn: getMemories,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Helper to map Supabase structure to UI structure if needed, 
  // though currently they align well enough for display.
  // We handle the numeric ID to string conversion implicitly in key or explicitly if needed.
  const images = memories.map(m => ({
    id: String(m.id),
    src: m.image_url,
    alt: m.name
  }));

  // handleUpload is now managed inside UploadModal via mutation, 
  // but we might need to refresh queries. However, UploadModal will handle the mutation 
  // and invalidation, so we just need to keep the modal open state here.
  // We can remove the old handleUpload that updated local state.

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
        {isLoading ? (
          <div className="flex justify-center py-20">
            <p className="text-muted-foreground animate-pulse">Cargando recuerdos...</p>
          </div>
        ) : images.length === 0 ? (
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
