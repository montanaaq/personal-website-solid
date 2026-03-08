import type { Component } from 'solid-js'

const LoadingFallback: Component = () => (
  <div
    style={{
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      height: '100vh',
      color: 'var(--text-color)'
    }}
  >
    <div style={{ 'text-align': 'center' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--secondary)',
          'border-top-color': 'transparent',
          'border-radius': '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 10px'
        }}
      />
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

export default LoadingFallback
