export default function ServerLogsPanel() {
    const logs = [
        {
            ip: "192.168.195.219",
            time: "2 Minutes Ago",
            method: "POST",
            endpoint: "/auth/login",
            message: "Login Successfully...",
            statusCode: 200,
            status: "Success",
            statusColor: "green-500"
        },
        {
            ip: "192.168.195.220",
            time: "5 Minutes Ago",
            method: "POST",
            endpoint: "/auth/login",
            message: "Login Failed: Invalid credentials",
            statusCode: 500,
            status: "Failed",
            statusColor: "yellow-500"
        },
        {
            ip: "192.168.195.221",
            time: "10 Minutes Ago",
            method: "GET",
            endpoint: "/user/profile",
            message: "Internal Server Error",
            statusCode: 500,
            status: "Error",
            statusColor: "red-500"
        },{
            ip: "192.168.195.221",
            time: "10 Minutes Ago",
            method: "GET",
            endpoint: "/user/profile",
            message: "Internal Server Error",
            statusCode: 500,
            status: "Error",
            statusColor: "red-500"
        },{
            ip: "192.168.195.221",
            time: "10 Minutes Ago",
            method: "GET",
            endpoint: "/user/profile",
            message: "Internal Server Error",
            statusCode: 500,
            status: "Error",
            statusColor: "red-500"
        },{
            ip: "192.168.195.221",
            time: "10 Minutes Ago",
            method: "GET",
            endpoint: "/user/profile",
            message: "Internal Server Error",
            statusCode: 500,
            status: "Error",
            statusColor: "red-500"
        },
        {
            ip: "192.168.195.221",
            time: "10 Minutes Ago",
            method: "GET",
            endpoint: "/user/profile",
            message: "Internal Server Error",
            statusCode: 500,
            status: "Error",
            statusColor: "red-500"
        },
    ];

    return (
        <div className="server-log-main-panel pt-[65px] px-[55px] rounded-lg border border-[#293451]">
            <h1 className="recent-log pb-5  text-[20px] text-[#8C8BA4] font-[500] font-[Jost]">
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
                        {logs.map((log, index) => (
                            <tr key={index} className="border-b border-[#293451] text-[#FFF] text-[14px] font-[500] font-[Jost]">
                                <td className="px-6 py-4">{log.ip}</td>
                                <td className="px-6 py-4">{log.time}</td>
                                <td className="px-6 py-4">{log.method}</td>
                                <td className="px-6 py-4">{log.endpoint}</td>
                                <td className="px-6 py-4 text-nowrap overflow-hidden">{log.message}</td>
                                <td className={`px-6 py-4 text-center text-${log.statusColor}`}>{log.statusCode}</td>
                                <td className="px-6 py-4">
                                    <div className={`border py-1 rounded-full text-center text-sm border-${log.statusColor} bg-${log.statusColor}/20 text-${log.statusColor}`}>
                                        {log.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
