// DashboardsLayout.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SideBar from "../components/navs/SideBar";
import BottomNav from "../components/navs/BottomNav";
import TopNav from "../components/navs/TopNav";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const sidebarVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const bottomNavVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const DashboardsLayout = ({
  children,
  pageName,
  pageInfo,
  pageUtility,
  sidebarMode = "full",
}) => {
  useEffect(() => {
    document.title = `FlowUnit - ${pageName}`;
  }, [pageName]);

  const [mode, setMode] = useState(sidebarMode);
  useEffect(() => setMode(sidebarMode), [sidebarMode]);

  const showSidebar = mode !== "hidden";
  const isCollapsed = mode === "collapsed";

  const sidebarWidth = useMemo(() => {
    if (!showSidebar) return "w-0";
    return isCollapsed ? "w-[84px]" : "w-[300px]";
  }, [showSidebar, isCollapsed]);

  const showExpandToggle = isCollapsed;
  const expandSidebar = () => setMode("full");

  return (
    <div className="flex w-full h-dvh overflow-hidden text-primary bg-slate-100/70">
      {showSidebar && (
        <motion.aside
          className={`hidden lg:flex ${sidebarWidth} flex-shrink-0 sticky top-0 h-full`}
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SideBar collapsed={isCollapsed} />
        </motion.aside>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={pageName}
          className="flex-1 overflow-y-auto no-scrollbar bg-slate-100/70"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <TopNav
            pageName={pageName}
            pageInfo={pageInfo || ""}
            pageUtility={pageUtility}
            showExpandToggle={showExpandToggle}
            onExpandSidebar={expandSidebar}
          />

          <div className="px-4 py-5 pb-21">{children}</div>
        </motion.main>
      </AnimatePresence>

      <motion.div
        className="lg:hidden fixed bottom-0 left-0 w-full z-50"
        variants={bottomNavVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <BottomNav />
      </motion.div>
    </div>
  );
};

export default DashboardsLayout;
