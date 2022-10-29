import ReactModal from "react-modal";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  onRequestClose,
  ...props
}: ModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "relative mx-auto max-w-[640px] overflow-hidden rounded-2xl bg-white outline-none"
      }
      overlayClassName={{
        base: "fixed inset-0 z-[1300] overflow-y-auto bg-black/50 p-6 opacity-0 transition-opacity duration-150 ease-in-out sm:p-12 md:p-16 lg:p-24",
        afterOpen: "opacity-100",
        beforeClose: "opacity-[0]",
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      closeTimeoutMS={150}
      ariaHideApp={false}
      {...props}
    >
      {children}
    </ReactModal>
  );
}
