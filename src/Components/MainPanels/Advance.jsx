import { motion } from "framer-motion";

export default function AdvancePanel() {
    return (
        <div className="p-6 w-full text-white">
            <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            >
            
            <h1 className="text-2xl font-bold">Advance Panel</h1>
            <p>Here you can chat and discuss topics.</p>
            </motion.div>
        </div>
    )
}
