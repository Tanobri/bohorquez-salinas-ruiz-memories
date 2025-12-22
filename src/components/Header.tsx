import { Upload, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onUploadClick: () => void;
}

const Header = ({ onUploadClick }: HeaderProps) => {
  const { signOut } = useAuth();

  return (
    <header className="relative py-12 md:py-20 px-4 text-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-4xl md:text-6xl animate-float opacity-80">🎄</div>
      <div className="absolute top-4 right-4 text-4xl md:text-6xl animate-float" style={{ animationDelay: "0.5s" }}>🎄</div>
      <div className="absolute top-1/2 left-8 text-2xl md:text-3xl animate-float hidden md:block" style={{ animationDelay: "1s" }}>⭐</div>
      <div className="absolute top-1/2 right-8 text-2xl md:text-3xl animate-float hidden md:block" style={{ animationDelay: "1.5s" }}>⭐</div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-3xl md:text-4xl">🎁</span>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
          <span className="text-2xl md:text-3xl">❄️</span>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
          <span className="text-3xl md:text-4xl">🎁</span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
          Familia{" "}
          <span className="text-primary">Bohorquez Salinas</span>
          <br />
          <span className="text-secondary">Ruiz</span>{" "}
          <span className="gold-accent">Recuerdos</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl mb-8 font-body">
          Un espacio para guardar nuestros momentos más preciados ✨
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onUploadClick}
            className="christmas-button text-lg"
          >
            <Upload className="w-5 h-5" />
            Subir Recuerdo
          </button>

          <button
            onClick={signOut}
            className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-all font-medium text-lg border border-border"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5" />
            Salir
          </button>
        </div>

        {/* Bottom decorations */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="text-xl">🔔</span>
          <span className="text-lg">🎀</span>
          <span className="text-xl">🔔</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

