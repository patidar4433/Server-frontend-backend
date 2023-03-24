import React from "react";
import {
  DashboardOutlined,
  InboxOutlined,
  AccountBookOutlined,
  ScheduleOutlined,
  SearchOutlined,
  BarChartOutlined,
  ProfileOutlined,
  SettingOutlined
} from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="side_div">
      <ul>
        <li>
          <DashboardOutlined /> Dashboard
        </li>
        <li>
          <InboxOutlined /> Inbox
        </li>
        <li>
          <AccountBookOutlined /> Accounts
        </li>
        <li>
          <ScheduleOutlined /> Schedule
        </li>
        <li>
          <SearchOutlined /> Search
        </li>
        <li>
          <BarChartOutlined /> Analysis
        </li>
        <li>
          <ProfileOutlined /> Files
        </li>
        <li>
          <SettingOutlined /> Setting
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
