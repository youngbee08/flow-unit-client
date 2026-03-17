import Modal from "./Modal";

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Yes, Confirm",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onCancel}>
      <div className="p-5 text-center">
        <h4 className="text-lg sm:text-xl font-semibold mb-3 text-slate-900">
          {title}
        </h4>
        <p className="text-tetiary text-sm sm:text-base mb-6">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={onCancel}
            className="w-full sm:w-1/2 h-[46px] rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-sm font-medium"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-1/2 h-[46px] bg-primary text-white rounded-xl hover:bg-primary/90 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-sm font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
