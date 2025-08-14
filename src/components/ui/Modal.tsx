import React, {
  ReactNode,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  title: string;
  children: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
    disabled?: boolean;
  };
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  onClose?: () => void;
}

export interface ModalRef {
  showModal: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(
  (
    {
      title,
      children,
      actionButton,
      showCloseButton = true,
      size = "md",
      onClose,
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      showModal: () => {
        dialogRef.current?.showModal();
      },
      close: () => {
        dialogRef.current?.close();
      },
    }));

    const sizeClasses = {
      sm: "w-[95vw] max-w-[600px] min-h-[400px]",
      md: "w-[95vw] max-w-[800px] min-h-[400px]",
      lg: "w-[95vw] max-w-[1000px] min-h-[400px]",
      xl: "w-[95vw] max-w-[1200px] min-h-[400px]",
    };

    const handleClose = () => {
      onClose?.();
      dialogRef.current?.close();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    };

    return (
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/60 backdrop:bg-opacity-50 p-0 border-0 bg-transparent max-w-none max-h-none w-auto h-auto"
        onClose={onClose}
      >
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div
            className={`bg-white flex flex-col rounded-lg shadow-xl ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 truncate pr-2">
                {title}
              </h2>
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 flex-shrink-0 cursor-pointer"
                >
                  <IoClose size={24} />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 p-6 overflow-y-auto">{children}</div>

            {/* Footer with Action Button */}
            {actionButton && (
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 mt-auto">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={actionButton.onClick}
                  disabled={actionButton.disabled}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    actionButton.variant === "secondary"
                      ? "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                      : "text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {actionButton.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
