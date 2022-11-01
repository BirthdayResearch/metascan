import { useNetwork } from "@contexts/NetworkContext";
import { getEnvironment } from "@contexts/Environment";
import { Menu, Transition } from "@headlessui/react";
import { CgChevronDown } from "react-icons/cg";
import { MdCheckCircle } from "react-icons/md";
import React, { Fragment, useState } from "react";
import { NetworkIcon } from "@components/icons/NetworkIcon";
import clsx from "clsx";

export function HeaderNetworkMenu(): JSX.Element {
  const {connection} = useNetwork();
  const { networks } = getEnvironment();

  return (
    <div className="flex">
      <Menu as="div" className="w-full flex relative">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center w-full justify-between">
            <div className="flex items-center mr-3.5">
              <NetworkIcon className="fill-[#00AD1D]" />
              <div className="text-xl ml-2 leading-none text-white-50">
                {connection}
              </div>
            </div>
            <CgChevronDown className={clsx("h-6 w-6 text-white-700 transition-[transform]", { "rotate-180": open })} />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-center top-10 w-40 left-2.5 absolute black-gradient-1 p-5 rounded-[15px] border-[0.5px] backdrop-blur-[6px] white-gradient-1-shadow" 
            >
              {networks.map((item) => (
                <Menu.Item key={item}>
                  <a
                    className='flex items-center cursor-pointer py-1.5 mb-1 justify-between'
                    href={`/?network=${item}`}
                  >
                    <div className="text-xl text-white-50">
                      {item}
                    </div>
                    {connection === item && <MdCheckCircle className="h-6 w-6 ml-3 text-green-800"/>}
                  </a>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
        )}
      </Menu>
    </div>
  );
}

export function HeaderNetworkMenuMobile(): JSX.Element {
  const {connection} = useNetwork();
  const { networks } = getEnvironment();
  const [open, setOpen] = useState(false)

  return  (
    <div className="absolute bottom-10 left-0 pl-8 pr-4 w-full">
      <button
        className="py-5 flex w-full items-center justify-between transition"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center">
            <NetworkIcon className="fill-[#00AD1D]" />
            <div className="text-xl ml-2 leading-none text-white-50">
              {connection}
            </div>
          </div>
          <CgChevronDown className={clsx("h-6 w-6 text-white-700 transition-[transform]", { "rotate-180": open })} />
        </div>
      </button>
      <div
        className={clsx(
          "absolute left-0 transition-[max-height] duration-300 overflow-hidden pl-12 pr-5 mr-0.5 w-full",
          { "max-h-0": !open, "max-h-screen": open }
        )}
      >
        {networks.map((item, index) => (
          <a
            key={item}
            className={clsx(
              'flex items-center justify-between cursor-pointer py-3 justify-between flex-1', 
              { 'mb-16': index === networks.length-1 }
            )}
            href={`/?network=${item}`}
          >
            <div className="text-xl text-white-50">
              {item}
            </div>
            {connection === item && <MdCheckCircle className="h-6 w-6 text-green-800"/>}
          </a>
        ))}
      </div>
    </div>
  )
}

