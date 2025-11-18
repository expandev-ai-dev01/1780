import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-4">
              <h2 className="text-2xl font-bold text-red-600">Algo deu errado</h2>
              <p className="text-muted-foreground">
                Ocorreu um erro inesperado. Por favor, tente novamente.
              </p>
              {this.state.error && (
                <details className="text-left text-sm bg-muted p-4 rounded-sm">
                  <summary className="cursor-pointer font-medium mb-2">Detalhes do erro</summary>
                  <pre className="whitespace-pre-wrap break-words">{this.state.error.message}</pre>
                </details>
              )}
              <Button onClick={() => this.setState({ hasError: false })}>Tentar novamente</Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
