import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ServerLogsPanel() {
    const [logs, setLogs] = useState([])
    const [isStreaming, setIsStreaming] = useState(false) // Track WebSocket state
    const latestLogRef = useRef(null)
    const wsRef = useRef(null)

    const timeAgo = (timestamp) => {
        const now = new Date()
        const past = new Date(timestamp)
        const diffInSeconds = Math.floor((now - past) / 1000)

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
        return `${Math.floor(diffInSeconds / 86400)} days ago`
    }

    const fetchLogs = async () => {
        const res = await fetch("http://localhost:5000/logs")
        const data = await res.json()

        setLogs(
            data.logs
                .filter(log => log.endpoint !== "/logs")
                .reverse()
                .map(log => ({
                    ...log,
                    relativeTime: timeAgo(log.time)
                }))
        )
    }

    useEffect(() => {
        fetchLogs()
    }, [])

    // WebSocket Connection Management
    const startStreaming = () => {

        fetchLogs()

        if (wsRef.current) return

        wsRef.current = new WebSocket("ws://localhost:8765")

        wsRef.current.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data)

            if (type === "RECENT_LOGS") {
                setLogs(
                    data
                        .filter(log => log.endpoint !== "/logs")
                        .reverse()
                        .map(log => ({
                            ...log,
                            relativeTime: timeAgo(log.time)
                        }))
                )
            } else if (type === "NEW_LOG") {
                if (data.endpoint !== "/logs") {
                    setLogs(prev => [...prev, { ...data, relativeTime: timeAgo(data.time) }])
                }
            }
        }

        wsRef.current.onclose = () => {
            console.log("WebSocket Disconnected")
            wsRef.current = null
            setIsStreaming(false)
        }

        setIsStreaming(true)
    }

    const stopStreaming = () => {

        fetchLogs()

        if (wsRef.current) {
            wsRef.current.close()
            wsRef.current = null
        }
        setIsStreaming(false)
    }

    // Periodically update relative times
    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prevLogs => prevLogs.map(log => ({
                ...log,
                relativeTime: timeAgo(log.time)
            })))
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (latestLogRef.current) {
            latestLogRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }
    }, [logs])

    return (
        <div className="server-log-main-panel pt-[25px] px-[55px] rounded-lg border border-[#293451]">
            <div className="logs-panels-buttons-wrapper mt-2 space-x-3 flex justify-end items-center text-white">
                <button onClick={fetchLogs} className="flex items-center justify-center space-x-2 bg-purple-600 font-[jost] shadow-lg hover:bg-purple-700 cursor-pointer px-4 py-2.5 rounded-lg">
                    <img className="w-5 h-5 object-cover" src="/refresh-cw-alt-1-svgrepo-com.svg" />
                    <span>Refresh</span>
                </button>
                <button
                    onClick={isStreaming ? stopStreaming : startStreaming}
                    className={`flex items-center justify-center object-cover font-[jost] space-x-2 shadow-lg cursor-pointer px-4 py-2.5 rounded-lg ${
                        isStreaming ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                    <img className="w-6 h-6 object-cover" src="/live-svgrepo-com.svg" />
                    <span>{isStreaming ? "Stop Log Streaming" : "Start Log Streaming"}</span>
                </button>
            </div>

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
                                        <td className="px-6 py-4">{log.relativeTime}</td>
                                        <td className="px-6 py-4">{log.method}</td>
                                        <td className="px-6 py-4">{log.endpoint}</td>
                                        <td className="px-6 py-4 text-nowrap overflow-hidden">{log.message}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-${log.statusColor}`}>{log.statusCode}</span>
                                        </td>
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
