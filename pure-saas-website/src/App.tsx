import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReferenceSearchModal } from './components/ReferenceSearchModal';
import { HomePage } from './pages/HomePage';
import { ShowcasePage } from './pages/ShowcasePage';
import { DocsPage } from './pages/DocsPage';
import { CommandsPage } from './pages/CommandsPage';
import { CliPage } from './pages/CliPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-text-primary">
      <ScrollToTop />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<DocsPage />} />
          <Route path="/get-started" element={<Navigate to="/docs?slug=getting-started-installation" replace />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/cli" element={<CliPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <ReferenceSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}

export default App;
