import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="h-dvh flex flex-col items-center justify-center gap-4 px-6 text-center bg-white">
          <p className="text-4xl">⚠️</p>
          <h1 className="text-xl font-bold text-[#0A0A0A]">Une erreur est survenue</h1>
          <p className="text-sm text-[#888888] max-w-xs">
            {this.state.error?.message ?? 'Erreur inconnue'}
          </p>
          <button
            className="mt-2 px-6 py-2 bg-[#E53935] text-white font-semibold rounded-xl"
            onClick={() => window.location.reload()}
          >
            Recharger la page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
