import { Fragment, PropsWithChildren } from "react";
import { FiX } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  children,
  isOpen,
  title,
  onCloseModal,
}: PropsWithChildren<{
  isOpen: boolean;
  title: string;
  onCloseModal: () => void;
}>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 text-white-50"
        onClose={onCloseModal}
      >
        <div className="min-h-screen px-4 text-center bg-black-900 bg-opacity-70 backdrop-blur-md">
          <Dialog.Overlay className="fixed inset-0" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform shadow-xl bg-black-900 border-[0.5px] border-black-500 rounded-lg">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-white-50 flex justify-between items-center"
              >
                {title}
                <FiX
                  size={24}
                  className="text-dark-900 cursor-pointer hover:opacity-70 text-2xl md:text-[28px] relative z-10"
                  onClick={onCloseModal}
                />
              </Dialog.Title>
              <div className="mt-4">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
