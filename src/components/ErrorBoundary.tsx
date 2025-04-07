import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Ops! Algo deu errado</h1>
            <p className="text-xl mb-4">Desculpe, ocorreu um erro inesperado.</p>
            {this.state.error && (
              <div className="bg-gray-800 p-4 rounded-lg mb-4 text-left overflow-auto max-h-40">
                <p className="text-red-400 font-bold">Detalhes do erro:</p>
                <p className="text-sm">{this.state.error.message}</p>
                <p className="text-xs text-gray-400 mt-2">{this.state.error.stack}</p>
              </div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 