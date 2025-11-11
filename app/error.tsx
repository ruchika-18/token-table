'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200">
      <p className="font-semibold">Something went wrong.</p>
      <p className="text-sm opacity-80 mt-1">{error.message}</p>
      <button onClick={reset} className="mt-4 bg-red-600 text-white rounded px-3 py-2">
        Try again
      </button>
    </div>
  );
}
