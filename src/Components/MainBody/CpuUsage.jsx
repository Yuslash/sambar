import { useState, useEffect } from "react"
const { ipcRenderer } = window.require("electron")

export default function CpuUsage() {
    const [cpuLoad, setCpuLoad] = useState(0)

    useEffect(() => {
        const fetchCpuUsage = async () => {
            const load = await ipcRenderer.invoke("get-cpu-usage")
            setCpuLoad(load)
        }

        fetchCpuUsage()
        const interval = setInterval(fetchCpuUsage, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div 
            className="system-logs-panel min-w-[331px] min-h-[183px] max-h-[183px] flex flex-col justify-center rounded-lg p-8
            transition-all duration-500 ease-in-out">

            <div className="flex gap-3.5 items-center">
                <img className="w-8 h-8 object-cover" src="/cpu-svgrepo-com.svg" />
                <span className="panel-title">CPU Usage</span>
            </div>

            <div className="flex items-center justify-center w-full gap-2.5 mt-2">
                <div className="flex items-end transition-all duration-500 ease-in-out">
                    <span className="cpu-percentage">{cpuLoad}</span>
                    <p className="cpu-symbol-percentage">%</p>
                </div>

                <div className={`text-sm rounded-full border-1 px-3 py-1 
                    transition-all duration-500 ease-in-out 
                    ${cpuLoad < 50 ? "border-green-500 text-green-500 bg-green-500/20" : 
                    cpuLoad < 80 ? "border-yellow-500 text-yellow-500 bg-yellow-500/20" : 
                    "border-red-500 text-red-500 bg-red-500/20"}`}>
                    {cpuLoad < 50 ? "Good" : cpuLoad < 80 ? "Moderate" : "High"}
                </div>
            </div>
        </div>
    )
}
