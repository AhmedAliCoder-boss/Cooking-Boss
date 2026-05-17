import React from 'react'
import { Toaster, toast } from 'sonner'

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          },
        }}
      />
    </>
  )
}

export { toast }
export default ToastProvider

