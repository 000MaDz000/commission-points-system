import { HTMLAttributes, PropsWithChildren } from "react";

export default function Modal(props: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & { onClose: () => void }) {
    return (
        <div {...props} className={`fixed  z-10 inset-0 overflow-y-auto ${props.className}`} dir={document.dir} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-start min-h-screen pt-4 px-4 pb-20 sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start text-start">
                            {props.children}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}