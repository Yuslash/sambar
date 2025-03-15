import MainPanel from "./MainBody/MainPanel";
import SidePanel from "./SidePanel/SidePanel";
import DiscussionPanel from "./MainPanels/Discussion.jsx";
import AdvancePanel from "./MainPanels/Advance.jsx";
import PrimePanel from "./MainPanels/Prime.jsx";
import InboxPanel from "./MainPanels/Inbox.jsx";
import UploadPanel from "./MainPanels/Upload.jsx";

import { useState } from "react";

export default function Experience() {

    const [activePanel, setActivePanel] = useState("main")

    const handlePanelChange = (panel) => {
        setActivePanel(panel)
    }

    return (
        <div className="w-full h-full flex">
            <SidePanel onPanelChange={handlePanelChange}  />
                {activePanel === 'main' && <MainPanel />}
                {activePanel === 'discussion' && <DiscussionPanel />}
                {activePanel === 'advance' && <AdvancePanel />}
                {activePanel === 'prime' && <PrimePanel />}
                {activePanel === 'inbox' && <InboxPanel />}
                {activePanel === 'upload' && <UploadPanel />}
        </div>
    )

}