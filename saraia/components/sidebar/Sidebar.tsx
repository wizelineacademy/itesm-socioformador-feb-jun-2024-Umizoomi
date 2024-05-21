"use client";
import classNames from "classnames";
import React, { useState} from "react";
import Image from "next/image";
import { FaHome, FaAngleDoubleLeft, FaUsers } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { LuLogOut } from "react-icons/lu";
import NavigationButton from "../navigationButton";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClasses = classNames(
    "h-screen pt-5 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-40"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  const handleLogout = () => {
    signOut();

  }
  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <Image src="/LogoSara.svg" width={30} height={30} className="sidebar_logo" alt="Logo" />
            <span
              className={classNames("mt-2 text-xl font-bold text-text", {
                hidden: toggleCollapse
              })}>
              SaraIA
            </span>
          </div>
          <div className="flex items-start justify-between relative">
            {isCollapsible && (
              <button
                className={collapseIconClasses}
                onClick={handleSidebarToggle}
              >
                <FaAngleDoubleLeft/>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">

        <NavigationButton
        icon={FaHome}
        route="/dashboard"
        showPlaceholder={!toggleCollapse}
        placeholderText="Home"
        />
        
        <NavigationButton
        icon={FaUsers}
        route="/teams"
        showPlaceholder={!toggleCollapse}
        placeholderText="Teams"
        />
        
        <NavigationButton
        icon={VscFeedback}
        route="/feedback"
        showPlaceholder={!toggleCollapse}
        placeholderText="Feedback"
        />
      </div>

      <div className="flex items-center justify-between relative">
        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200">
          <LuLogOut size={20}/>
          {!toggleCollapse && <span>{"Logout"}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;