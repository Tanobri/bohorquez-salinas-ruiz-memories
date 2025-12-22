import { ImagePlus } from "lucide-react";

interface EmptyStateProps {
  onUploadClick: () => void;
}

const EmptyState = ({ onUploadClick }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <ImagePlus className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
        No hay recuerdos aún
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        ¡Comienza a crear tu galería familiar! Sube las fotos de tus momentos más especiales.
      </p>
      
      <button onClick={onUploadClick} className="christmas-button">
        <ImagePlus className="w-5 h-5" />
        Subir Primer Recuerdo
      </button>
      
      <div className="flex items-center gap-3 mt-8 text-3xl">
        <span className="animate-float">🎄</span>
        <span className="animate-float" style={{ animationDelay: "0.3s" }}>📸</span>
        <span className="animate-float" style={{ animationDelay: "0.6s" }}>🎄</span>
      </div>
    </div>
  );
};

export default EmptyState;
