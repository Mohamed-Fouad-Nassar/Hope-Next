"use client";

import {
  useState,
  useEffect,
  useContext,
  cloneElement,
  createContext,
} from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import useClickOutside from "@/hooks/useClickOutside";

// Modal context types
type ModalContextProps = {
  modalName: string;
  close: () => void;
  open: (id: string) => void;
};

// Props types for components
type WindowProps = {
  name: string;
  title?: string;
  children: React.ReactNode;
};

type OpenProps = { opens: string; children: React.ReactNode };

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

function Open({ opens, children }: OpenProps) {
  const { open } = useModalContext();
  return cloneElement(children as React.ReactElement, {
    onClick: () => open(opens),
  });
}

function Window({ name, title, children }: WindowProps) {
  const { modalName, close } = useModalContext();
  const modalRef = useClickOutside(close) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  if (modalName === name)
    return createPortal(
      <div className="fixed inset-0 z-[1000] bg-backdrop backdrop-blur-sm transition-all duration-500 ">
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg max-h-[85%] min-w-[320px] overflow-y-auto transition-all duration-500 scrollbar-thin dark:text-gray-300 dark:bg-gray-900"
          ref={modalRef}
        >
          <div className="sticky top-0 px-3 py-2 rounded flex items-center bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
            <h2 className="flex-1 text-center font-semibold">
              {title ? title : modalName.split("-").join(" ")}
            </h2>
            <button
              className="p-1 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={close}
            >
              <XMarkIcon className="size-5 text-gray-500" />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>,
      document.body
    );
  return null;
}

function Modal({ children }: { children: React.ReactNode }) {
  const [modalName, setModalName] = useState<string>("");

  const close = () => setModalName("");
  const open = setModalName;

  return (
    <ModalContext.Provider value={{ modalName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
