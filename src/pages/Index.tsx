const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      {/* Glow effect background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl bg-gradient-to-br from-primary to-accent animate-float" />
      </div>

      {/* Content */}
      <div className="text-center z-10 animate-fade-in px-4">
        <h1 className="text-7xl md:text-9xl font-bold gradient-text mb-6 tracking-tight">
          Hello World!
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 font-light tracking-wide">
          Bem-vindo ao seu primeiro projeto
        </p>
      </div>
    </div>
  );
};

export default Index;
