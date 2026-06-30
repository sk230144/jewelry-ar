'use client';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1C1C1E',
            color: '#fff',
            border: '1px solid rgba(201,168,76,0.3)',
          },
        }}
      />
    </>
  );
}
