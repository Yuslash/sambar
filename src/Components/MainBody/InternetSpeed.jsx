import { useState, useEffect } from "react"

export default function InternetSpeed() {
    const [speed, setSpeed] = useState(null)
    const [status, setStatus] = useState("Checking...")

    useEffect(() => {
        const interval = setInterval(measureSpeed, 3000) // Update every 3 seconds
        return () => clearInterval(interval)
    }, [])

    const measureSpeed = async () => {
        const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" // ~1MB file
        const fileSizeInBits = 1 * 8 * 1024 * 1024 // 1MB in bits

        const startTime = performance.now()
        await fetch(imageUrl, { cache: "no-cache" })
        const endTime = performance.now()

        const duration = (endTime - startTime) / 1000 // Convert to seconds
        const speedMbps = (fileSizeInBits / duration) / (1024 * 1024) // Convert to Mbps
        setSpeed(speedMbps.toFixed(2))

        if (speedMbps > 50) setStatus("Excellent")
        else if (speedMbps > 20) setStatus("Good")
        else if (speedMbps > 5) setStatus("Average")
        else setStatus("Slow")
    }

    return (
        <div className="system-logs-panel min-w-[331px] max-w-[331px] min-h-[183px] max-h-[183px] flex flex-col justify-center rounded-lg p-8 gap-7">
            <div className="flex gap-3.5 items-center ">
                <img className="w-8 h-8 object-cover" src="/high-speed-train-svgrepo-com.svg" />
                <span className="panel-title">Internet Speed</span>
            </div>
            <div className="flex gap-3.5 justify-center items-center">
                <span className="net-speed text-center text-nowrap">{speed ? `${speed} Mbps` : "Checking..."}</span>
                    <div className={`border px-3 py-1 rounded-full text-sm ${
                        status === "Excellent" ? "border-blue-500 bg-blue-500/20 text-blue-500" :
                    status === "Good" ? "border-green-500 bg-green-500/20 text-green-500" :
                    status === "Average" ? "border-yellow-500 bg-yellow-500/20 text-yellow-500" :
                    "border-red-500 bg-red-500/20 text-red-500"
                }`}>{status}</div>
            </div>
        </div>
    )
}