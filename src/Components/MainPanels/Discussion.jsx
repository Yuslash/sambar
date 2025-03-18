import { motion } from "framer-motion";

export default function DiscussionPanel() {
    return (
            <div 
            className="p-6 w-full text-white "
            >
            <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h1 className="text-2xl font-bold">Discussion Panel</h1>
            <p>Gonna add some reveal animation here.</p>
        </motion.div>
            </div>
    
    );
}