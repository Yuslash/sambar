import { useState } from "react";

export default function SidePanel({ onPanelChange }) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [activePanel, setActivePanel] = useState("main");

    const handleCollapsed = () => {
        setIsCollapsed((prev) => !prev);
    };

    const handlePanelClick = (panelName) => {
        setActivePanel(panelName);
        onPanelChange(panelName);
    };

    return (
        <div className={`h-full transition-all duration-300 ${isCollapsed ? 'w-[100px]' : 'w-[310px]'} py-20 flex flex-col flex-shrink-0 justify-start items-center bg-black/10 mr-6 ${isCollapsed ? 'max-sm:hidden': 'max-xl:hidden'}`}>
            <div className="flex gap-2 items-center">
                <img className={`cursor-pointer shadow-lg transition-transform duration-600 ${isCollapsed ? 'rotate-360 bg-white rounded-lg p-1.5' : ''}`} onClick={handleCollapsed} src="/side_panels/Kakrol.svg" />
                {!isCollapsed && <span className="sambar-text">Sambar</span>}
            </div>

            <div className={`panels-holder w-full ${isCollapsed ? 'flex flex-col gap-4 mt-20' : "grid grid-cols-2 gap-16 mt-48"} px-12`}>
                {/* Pass activePanel and handlePanelClick to highlight the active panel */}
                <PanelButton isCollapsed={isCollapsed} icon="/side_panels/Monitor.svg" label="Main Panel" isActive={activePanel === "main"} onClick={() => handlePanelClick("main")} />
                <PanelButton isCollapsed={isCollapsed} icon="/side_panels/Chat.svg" label="Discussion" isActive={activePanel === "discussion"} onClick={() => handlePanelClick("discussion")} />
                <PanelButton isCollapsed={isCollapsed} icon="/side_panels/Adjust.svg" label="Advance" isActive={activePanel === "advance"} onClick={() => handlePanelClick("advance")} />
                <PanelButton isCollapsed={isCollapsed} icon="/side_panels/Crown.svg" label="Prime" isActive={activePanel === "prime"} onClick={() => handlePanelClick("prime")} />
                <PanelButton isCollapsed={isCollapsed} icon="/side_panels/Email.svg" label="Inbox" isActive={activePanel === "inbox"} onClick={() => handlePanelClick("inbox")} />
                <PanelButton isCollapsed={isCollapsed} icon="/side_panels/Upload.svg" label="Upload" isActive={activePanel === "upload"} onClick={() => handlePanelClick("upload")} />
            </div>
        </div>
    );
}

function PanelButton({ isCollapsed, icon, label, isActive, onClick }) {
    return (
        <div className="text-center flex flex-col items-center gap-2">
            <div 
                className={`${isCollapsed ? 'w-14 h-14' : 'w-20 h-20'} cursor-pointer 
                ${isActive ? 'bg-[#5C82FF] shadow-lg' : 'bg-[#040813B8] hover:bg-[#5C82FFB8]'} 
                rounded-md flex justify-center items-center transition-all duration-200`} 
                onClick={onClick}
            >
                <img className={`${isCollapsed ? 'size-5' : ''}`} src={icon} />
            </div>
            {!isCollapsed && <span className="side-panel-text">{label}</span>}
        </div>
    );
}
