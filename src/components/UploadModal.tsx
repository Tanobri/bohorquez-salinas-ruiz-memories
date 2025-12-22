import { X, Upload, ImagePlus } from "lucide-react";
import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMemory } from "@/services/memories";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mutation for uploading images
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const promises = files.map(file => uploadMemory(file));
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
      toast({
        title: "¡Recuerdos agregados! 🎄",
        description: `${selectedFiles.length} imagen(es) agregada(s) a la galería`,
      });
      setSelectedFiles([]);
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error al subir",
        description: "Hubo un problema al guardar tus recuerdos. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona solo archivos de imagen",
        variant: "destructive",
      });
      return;
    }

    setSelectedFiles(prev => [...prev, ...files]);
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Sin imágenes",
        description: "Por favor, selecciona al menos una imagen",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate(selectedFiles);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎄</span>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Subir Recuerdos
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Drop zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImagePlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-foreground font-medium mb-2">
            Arrastra tus imágenes aquí
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            o haz clic para seleccionar
          </p>
          <label className="christmas-button cursor-pointer inline-flex">
            <Upload className="w-4 h-4" />
            Seleccionar Imágenes
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        {/* Selected files preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">
              {selectedFiles.length} imagen(es) seleccionada(s)
            </p>
            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-16 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-full border border-border hover:bg-muted transition-colors font-medium"
            disabled={uploadMutation.isPending}
          >
            Cancelar
          </button>
          <button
            onClick={handleUploadClick}
            className="flex-1 christmas-button disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedFiles.length === 0 || uploadMutation.isPending}
          >
            {uploadMutation.isPending ? "Subiendo..." : `Subir ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}`}
          </button>
        </div>

        {/* Footer decoration */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-lg">⭐</span>
          <span className="text-sm text-muted-foreground">
            Los recuerdos hacen la vida más dulce
          </span>
          <span className="text-lg">⭐</span>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
