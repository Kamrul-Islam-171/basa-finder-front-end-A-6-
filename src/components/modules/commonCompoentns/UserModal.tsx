"use client";

import * as Dialog from "@radix-ui/react-dialog"; // ShadCN uses Radix UI for dialogs

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-full max-w-lg p-6 z-50"
        >
          <Dialog.Close
            className="absolute top-2 right-2 text-gray-600"
            aria-label="Close"
          >
            X
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { Modal };
