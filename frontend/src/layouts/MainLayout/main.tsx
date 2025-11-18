import { Outlet } from 'react-router-dom';
import type { MainLayoutProps } from './types';

export const MainLayout = ({}: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary-600">Catálogo de Carros</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-muted">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Catálogo de Carros. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
