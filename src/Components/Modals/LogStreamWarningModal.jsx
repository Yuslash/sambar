import { useState } from "react";
import { motion } from "framer-motion";

export default function LogStreamWarningModal({ isOpen, onClose, onConfirm }) {
    const [dontAskAgain, setDontAskAgain] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/40">
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-rose-700/30 p-6 rounded-2xl shadow-2xl max-w-md text-white border border-rose-700/30"
            >
                <h2 className="text-xl font-bold flex items-center">
                    ⚠️ <span className="ml-2">Start Log Streaming?</span>
                </h2>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                    Log streaming may impact performance. Do you want to proceed?
                </p>

                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="dontAsk"
                        checked={dontAskAgain}
                        onChange={(e) => setDontAskAgain(e.target.checked)}
                        className="mr-2 w-4 h-4 accent-indigo-500 cursor-pointer"
                    />
                    <label htmlFor="dontAsk" className="text-sm text-gray-300 cursor-pointer">
                        Don't ask again
                    </label>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 cursor-pointer rounded-lg bg-white text-black hover:bg-white-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(dontAskAgain)}
                        className="px-5 py-2 cursor-pointer rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition"
                    >
                        Proceed
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
