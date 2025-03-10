export default function SidePanel() {

    return (
        <>
            <div className=" h-full min-w-[310px] py-20 flex flex-col justify-start items-center bg-black/10 mr-6 max-xl:hidden">
                
                <div className="flex items-center">
                    <img src="/side_panels/Kakrol.svg" />
                    <span className="sambar-text">Sambar</span>
                </div>

                <div className="panels-holder w-full grid grid-cols-2 gap-16 mt-48 px-12">
                        <div className="text-center flex flex-col items-center gap-2">
                            <div className="w-20 h-20 cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600">
                            <img src="/side_panels/Monitor.svg" />
                            </div>
                            <span className="side-panel-text">Main Panel</span>
                        </div>

                        <div className="text-center flex flex-col items-center gap-2">
                            <div className="w-20 h-20 cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600">
                            <img src="/side_panels/Chat.svg" />
                            </div>
                            <span className="side-panel-text">Discussion</span>
                        </div>

                        <div className="text-center flex flex-col items-center gap-2">
                            <div className="w-20 h-20 cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600">
                            <img src="/side_panels/Adjust.svg" />
                            </div>
                            <span className="side-panel-text">Advance</span>
                        </div>

                        <div className="text-center flex flex-col items-center gap-2">
                            <div className="w-20 h-20 cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600">
                            <img src="/side_panels/Crown.svg" />
                            </div>
                            <span className="side-panel-text">Prime</span>
                        </div>

                        <div className="text-center flex flex-col items-center gap-2">
                            <div className="w-20 h-20 cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600">
                            <img src="/side_panels/Email.svg" />
                            </div>
                            <span className="side-panel-text">Inbox</span>
                        </div>

                        <div className="text-center flex flex-col items-center gap-2">
                            <div className="w-20 h-20 cursor-pointer hover:bg-[#5C82FFB8] bg-[#040813B8] rounded-md flex justify-center items-center transition-all duration-600">
                            <img src="/side_panels/Upload.svg" />
                            </div>
                            <span className="side-panel-text">Upload</span>
                        </div>
                    </div>


            </div>
        </>
    )
}