import { Fragment, PropsWithChildren } from "react";
import { FiInfo } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function BottomModal({
  isOpen,
  onClose,
  children,
  title,
}: PropsWithChildren<Props>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="transform transition-all fixed inset-0 bg-black-900 bg-opacity-50 backdrop-blur-[10px]">
            <Dialog.Overlay className="fixed inset-0" />
            <div className="absolute bottom-0 w-full rounded-t-md min-h-[232px] bg-white-50 px-6 py-4 text-black-900">
              <Dialog.Title
                as="div"
                className="flex items-center gap-2 text-lg font-medium leading-6"
              >
                <FiInfo size={24} />
                <h3 className="text-xl font-semibold">{title}</h3>
              </Dialog.Title>
              {children}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
