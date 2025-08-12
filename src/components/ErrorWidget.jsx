export function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full w-full opacity-40">
      <i className="fas fa-exclamation-circle text-6xl"></i>
      <p className="text-center">{message}</p>
    </div>
  );
}

export function OfflineMessage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full w-full opacity-40">
      <i className="fas fa-exclamation-circle text-6xl"></i>
      <p className="text-center">
        <h3>No internet connection</h3>
        <p className="text-sm font-light">
          - Check your network cables and routers
        </p>
        <p className="text-sm font-light">- Op-out of airplane mode</p>
      </p>
    </div>
  );
}