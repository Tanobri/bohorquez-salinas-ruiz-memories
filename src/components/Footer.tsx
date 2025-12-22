const Footer = () => {
  return (
    <footer className="py-12 px-4 text-center mt-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-2xl">🎄</span>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
        <span className="text-xl">❤️</span>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
        <span className="text-2xl">🎄</span>
      </div>
      
      <p className="font-display text-lg text-foreground mb-2">
        Familia Bohorquez Salinas Ruiz
      </p>
      <p className="text-muted-foreground text-sm">
        Con amor, guardamos nuestros recuerdos más preciados ✨
      </p>
      
      <div className="flex items-center justify-center gap-2 mt-6 text-2xl">
        <span className="animate-float">🎁</span>
        <span className="animate-float" style={{ animationDelay: "0.2s" }}>🔔</span>
        <span className="animate-float" style={{ animationDelay: "0.4s" }}>🎀</span>
        <span className="animate-float" style={{ animationDelay: "0.6s" }}>🔔</span>
        <span className="animate-float" style={{ animationDelay: "0.8s" }}>🎁</span>
      </div>
    </footer>
  );
};

export default Footer;
