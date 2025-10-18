import {Outlet} from 'react-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useState } from 'react';
import NavButton from '../NavButton';
import IntegrationCard from '../IntegrationCard';
import { TabButton,ActivityItem } from '../../pages/Dashboard';
import {
  Home,
  Settings,
  Mail,
  Slack,
  Database,
  Activity,
  ChevronRight,
} from "lucide-react";
import { HiViewGridAdd } from "react-icons/hi";
import DashboardNav from '../dashboardNav';

export default function DashboardLayout(){

  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("activity");

  const isDark = theme === "dark";

  return (
    <div className='w-full h-screen bg-red-500 flex flex-col'>
   <DashboardNav/>    
    <div
      className={` flex transition-colors duration-300 flex-grow  overflow-hidden ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* LEFT NAV */}
      <aside
        className={`hidden  md:flex flex-col justify-between p-4 border-r ${
          isDark ? "border-gray-700" : "border-gray-200"
        } w-fit`}
      >
        <div className="flex flex-col items-center gap-2">
          <NavButton icon={<Home className="h-5 w-5"/>} text={"Overview"} path={'/dashboard/overview'}/>
          <NavButton icon={<Mail className="h-5 w-5" />}  text={"Mails"} path={'/dashboard/mails'}/>
          <NavButton icon={<Slack className="h-5 w-5" />} text ={"Channels"} path={'/dashboard/channels'}/>
          <NavButton icon={<Database className="h-5 w-5" />} text={"Data"} path={'/dashboard/data'}/>
          <NavButton icon={<HiViewGridAdd className="h-5 w-5" />} text={"Integrations"} path={'/dashboard/integration'}/>
        </div>
        <NavButton icon={<Settings className="h-5 w-5" />} text={"Setting"} path={'/dashboard/setting'} />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 overflow-y-auto custom-scroll">
       <Outlet/>
      </main>

      {/* RIGHT SIDEBAR */}
      {/* <aside
        className={`hidden lg:flex flex-col p-4 border-l ${
          isDark ? "border-gray-700" : "border-gray-200"
        } w-80 transition-all duration-300`}
      >
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold">AI Panel</h3>
          <div className="flex gap-2">
            <TabButton
              label="Activity"
              active={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
            />
            <TabButton
              label="Logs"
              active={activeTab === "logs"}
              onClick={() => setActiveTab("logs")}
            />
          </div>
        </div>

        <div className="space-y-3 text-sm overflow-y-auto">
          {activeTab === "activity" ? (
            <>
              <ActivityItem action="Email Sent" tool="Gmail" />
              <ActivityItem action="Message Sent" tool="Slack" />
              <ActivityItem action="Note Updated" tool="Notion" />
            </>
          ) : (
            <>
              <LogItem message="Gmail API response received (200 OK)" />
              <LogItem message="Slack webhook triggered successfully" />
              <LogItem message="Notion connection pending authorization" />
            </>
          )}
        </div>
      </aside> */}
    </div>
    </div>
  );
    
}