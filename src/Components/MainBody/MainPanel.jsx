import CpuUsage from "./CpuUsage";
import GpuUsage from "./GpuUsage";
import InternetSpeed from "./InternetSpeed";
import IpPanel from "./IpPanel";
import ServerLogsPanel from "./ServerLogsPanel";
import { motion } from "framer-motion";

export default function MainPanel() {

    return (
        <>
            <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
        >
            <div className="all-main-panel flex-grow h-full flex flex-col gap-10 pl-2 pt-20 pr-[70px] overflow-auto max-xl:p-4">
                
                <div className="system-logs-text">System Logs</div>

                <div className="main-top-panel flex flex-wrap gap-10 transition-all duration-500 ease-in-out">
                    <CpuUsage />
                    <GpuUsage />
                    <IpPanel />
                    <InternetSpeed />
                </div>

                <span className="server-log-text">Server Logs</span>
                <ServerLogsPanel />
            </div>
        </motion.div>
        </>
    )

}