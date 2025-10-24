import { ArrowRight, Radio, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      {/* Glow effect background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl bg-gradient-to-br from-primary to-accent animate-float" />
      </div>

      {/* Content */}
      <div className="text-center z-10 animate-fade-in px-4 max-w-2xl">
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow animate-float">
          <Radio className="w-12 h-12 text-primary-foreground" />
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold gradient-text mb-6 tracking-tight">
          Hello World!
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/80 font-light tracking-wide mb-8">
          Bem-vindo ao seu primeiro projeto
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/player")}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 shadow-glow"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Radio className="w-5 h-5" />
              Acessar Player
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Com melhorias surpreendentes!</span>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            ✨ Toast Notifications
          </span>
          <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
            🎵 Audio Visualizer
          </span>
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            ⌨️ Keyboard Shortcuts
          </span>
          <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
            🔍 Searchable Selects
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
