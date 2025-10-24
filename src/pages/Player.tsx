import { useEffect } from "react";
import { ExternalLink, Radio, Settings } from "lucide-react";

const Player = () => {
  useEffect(() => {
    document.title = "Rádio Mix FM - Player";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with branding */}
      <header className="bg-gradient-to-r from-primary via-accent to-primary/80 p-6 shadow-glow">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Radio className="w-8 h-8 text-foreground" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Rádio Mix FM</h1>
                <p className="text-sm text-foreground/80">Sistema de Stream Player</p>
              </div>
            </div>
            <a
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-foreground/10 hover:bg-foreground/20 rounded-lg transition-all duration-300 text-foreground hover:scale-105"
            >
              <span className="hidden sm:inline">Voltar</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Quick Info Banner */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Atalhos: <kbd className="ml-1 px-2 py-0.5 bg-muted rounded text-xs">Space</kbd> Play/Pause</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground"><kbd className="px-2 py-0.5 bg-muted rounded text-xs">M</kbd> Menu</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground"><kbd className="px-2 py-0.5 bg-muted rounded text-xs">ESC</kbd> Fechar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iFrame Container */}
      <div className="flex-1 relative">
        <iframe
          src="/src/mock-player/index.html"
          title="Rádio Mix FM Player"
          className="w-full h-full absolute inset-0 border-0"
          style={{ minHeight: 'calc(100vh - 180px)' }}
        />
      </div>

      {/* Features Footer */}
      <footer className="bg-secondary/50 border-t border-border py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">✨</div>
              <div className="text-xs text-muted-foreground">Toast Notifications</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">🎵</div>
              <div className="text-xs text-muted-foreground">Audio Visualizer</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">⌨️</div>
              <div className="text-xs text-muted-foreground">Keyboard Shortcuts</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">🔍</div>
              <div className="text-xs text-muted-foreground">Searchable Selects</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Player;
