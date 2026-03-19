import React, { Component, ErrorInfo, ReactNode } from 'react';

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
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      let errorMessage = "Si è verificato un errore imprevisto.";
      
      const errorMsg = this.state.error?.message;
      if (errorMsg) {
        try {
          // Check if it's a Firestore error JSON
          const firestoreError = JSON.parse(errorMsg);
          if (firestoreError && typeof firestoreError === 'object' && firestoreError.error) {
            errorMessage = `Errore Database: ${firestoreError.error}`;
            if (firestoreError.error.includes("insufficient permissions")) {
              errorMessage = "Non hai i permessi necessari per eseguire questa operazione. Assicurati di aver effettuato l'accesso come amministratore.";
            }
          } else {
            errorMessage = errorMsg;
          }
        } catch (e) {
          // Not a JSON error, use the raw message
          errorMessage = errorMsg;
        }
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Ops! Qualcosa è andato storto</h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#1e3a8a] text-white py-3 rounded-xl font-bold hover:bg-[#1e40af] transition-all shadow-lg"
            >
              Ricarica la pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
