"use client";
import classNames from "classnames";
import React, { useState} from "react";
import Image from "next/image";
import { FaHome, FaAngleDoubleLeft, FaUsers } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { LuLogOut } from "react-icons/lu";
import NavigationButton from "../navigationButton";

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const wrapperClasses = classNames(
    "h-screen px-3 pt-5 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-60"]: !toggleCollapse,
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

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center">
            <Image src="/UmizoomiN.png" width={100} height={100} className="sidebar_logo" alt="Logo" />
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
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
        route="/"
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
        <NavigationButton
        icon={LuLogOut}
        route="#"
        showPlaceholder={!toggleCollapse}
        placeholderText="Log Out"
        />
      </div>
    </div>
  );
};

export default Sidebar;