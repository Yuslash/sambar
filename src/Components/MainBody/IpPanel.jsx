import { useEffect, useState } from 'react'
const { ipcRenderer } = window.require("electron") // ✅ Import IPC Renderer


export default function IpPanel() {
  const [ipAddress, setIpAddress] = useState('Loading...')

  useEffect(() => {
    ipcRenderer.invoke('get-ip-address').then(setIpAddress)
  }, [])

  return (
    <div className="system-logs-panel min-w-[331px] min-h-[183px] max-h-[183px] flex flex-col justify-center rounded-lg p-8 gap-7">
      <div className="flex gap-3.5 items-center">
        <img className="w-8 h-8 object-cover" src="/placeholder-svgrepo-com.svg" />
        <span className="panel-title">IP Address</span>
      </div>
      <span className="ip-address-number text-center">{ipAddress}</span>
    </div>
  )
}
