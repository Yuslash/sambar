import { useState } from "react";

export default function SidePanel() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleCollapsed = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className={`h-full ${isCollapsed ? 'w-[100px]' : 'min-w-[310px]'} py-20 flex flex-col justify-start items-center bg-black/10 mr-6 max-xl:hidden`}>
            <div className="flex gap-2 items-center ">
                <img className={`cursor-pointer  shadow-lg transition-transform duration-600 ${isCollapsed ? 'rotate-360 bg-white rounded-lg p-1.5': ''}`} onClick={handleCollapsed} src="/side_panels/Kakrol.svg" />
                {!isCollapsed && <span className="sambar-text">Sambar</span>}
            </div>

            <div className={`panels-holder w-full ${isCollapsed ? 'flex flex-col gap-4 mt-20' : "grid grid-cols-2 gap-16 mt-48"} px-12`}>
                <div className="text-center flex flex-col items-center gap-2">
                    <div className={`${isCollapsed ? 'w-14 h-14' : 'w-20 h-20'} cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600`}>
                        <img className={`${isCollapsed ? 'size-5' : ''}`} src="/side_panels/Monitor.svg" />
                    </div>
                    {!isCollapsed && <span className="side-panel-text">Main Panel</span>}
                </div>

                <div className="text-center flex flex-col items-center gap-2">
                    <div className={`${isCollapsed ? 'w-14 h-14' : 'w-20 h-20'} cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600`}>
                        <img className={`${isCollapsed ? 'size-5' : ''}`} src="/side_panels/Chat.svg" />
                    </div>
                    {!isCollapsed && <span className="side-panel-text">Discussion</span>}
                </div>

                <div className="text-center flex flex-col items-center gap-2">
                    <div className={`${isCollapsed ? 'w-14 h-14' : 'w-20 h-20'} cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600`}>
                        <img className={`${isCollapsed ? 'size-5' : ''}`} src="/side_panels/Adjust.svg" />
                    </div>
                    {!isCollapsed && <span className="side-panel-text">Advance</span>}
                </div>

                <div className="text-center flex flex-col items-center gap-2">
                    <div className={`${isCollapsed ? 'w-14 h-14' : 'w-20 h-20'} cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600`}>
                        <img className={`${isCollapsed ? 'size-5' : ''}`} src="/side_panels/Crown.svg" />
                    </div>
                    {!isCollapsed && <span className="side-panel-text">Prime</span>}
                </div>

                <div className="text-center flex flex-col items-center gap-2">
                    <div className={`${isCollapsed ? 'w-14 h-14' : 'w-20 h-20'} cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600`}>
                        <img className={`${isCollapsed ? 'size-5' : ''}`} src="/side_panels/Email.svg" />
                    </div>
                    {!isCollapsed && <span className="side-panel-text">Inbox</span>}
                </div>

                <div className="text-center flex flex-col items-center gap-2">
                    <div className={`${isCollapsed ? 'w-14 h-14' : 'w-20 h-20'} cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600`}>
                        <img className={`${isCollapsed ? 'size-5' : ''}`} src="/side_panels/Upload.svg" />
                    </div>
                    {!isCollapsed && <span className="side-panel-text">Upload</span>}
                </div>
            </div>
        </div>
    );
}