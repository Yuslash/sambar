import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ServerLogsPanel() {
    const [logs, setLogs] = useState([])
    const latestLogRef = useRef(null)

    useEffect(() => {
        fetch("http://localhost:5000/logs")
            .then((res) => res.json())
            .then((data) => {
                // Reverse initial logs to show oldest first
                setLogs(data.logs.reverse())
            })

        const ws = new WebSocket("ws://localhost:8765")

        ws.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data)
        
            if (type === "RECENT_LOGS") {
                // Reverse initial batch to maintain chronological order
                setLogs(data.reverse())
            } else if (type === "NEW_LOG") {
                // Add new logs to the end of the array
                setLogs((prev) => [...prev, data])
            }
        }

        return () => ws.close()
    }, [])

    useEffect(() => {
        if (latestLogRef.current) {
            latestLogRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }
    }, [logs])

    return (
        <div className="server-log-main-panel pt-[65px] px-[55px] rounded-lg border border-[#293451]">
            <h1 className="recent-log pb-5 text-[20px] text-[#8C8BA4] font-[500] font-[Jost]">
                Recent Logs
            </h1>
            <div className="custom-scrollbar relative max-h-[440px] overflow-auto">
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-[#1E2535] z-10">
                        <tr className="border-[#293451] text-[#8C8BA4] text-[16px] font-[500] font-[Jost] rounded-t-lg">
                            <th className="px-6 py-3 text-left rounded-tl-lg">IP</th>
                            <th className="px-6 py-3 text-left">Time</th>
                            <th className="px-6 py-3 text-left">Method</th>
                            <th className="px-6 py-3 text-left">Endpoint</th>
                            <th className="px-6 py-3 text-left">Message</th>
                            <th className="px-6 py-3 text-center">Status Code</th>
                            <th className="px-6 py-3 text-center rounded-tr-lg">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[rgba(0,0,0,0.14)]">
                        <AnimatePresence initial={false}>
                            {logs.map((log, index) => {
                                const isNewest = index === logs.length - 1
                                return (
                                    <motion.tr
                                        key={log.id || index}
                                        ref={isNewest ? latestLogRef : null}
                                        initial={isNewest ? { opacity: 0, x: -1000 } : {}}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 550 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="border-b border-[#293451] text-[#FFF] text-[14px] font-[500] font-[Jost]"
                                    >
                                        <td className="px-6 py-4">{log.ip}</td>
                                        <td className="px-6 py-4">{log.time}</td>
                                        <td className="px-6 py-4">{log.method}</td>
                                        <td className="px-6 py-4">{log.endpoint}</td>
                                        <td className="px-6 py-4 text-nowrap overflow-hidden">{log.message}</td>
                                        <td className={`px-6 py-4 text-center text-${log.statusColor}`}>{log.statusCode}</td>
                                        <td className="py-4 flex items-center justify-center">
                                            <div className={`border py-2 px-4 rounded-full text-center text-sm border-${log.statusColor} bg-${log.statusColor}/20 text-${log.statusColor}`}>
                                                {log.status}
                                            </div>
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    )
}