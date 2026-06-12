function GlobalLoader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
    </div>
  );
}

export default GlobalLoader;