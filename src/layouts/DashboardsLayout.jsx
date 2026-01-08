import React, { useEffect } from "react";
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
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

const bottomNavVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const DashboardsLayout = ({ children, pageName, pageInfo, pageUtility }) => {
  useEffect(() => {
    document.title = `FlowUnit - ${pageName}`;
  }, [pageName]);

  return (
    <div className="flex w-full h-dvh overflow-hidden relative bg-tetiary/30 text-primary">
      <motion.aside
        className="hidden lg:flex w-[23%] flex-shrink-0 sticky top-0 h-full z-40"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <SideBar />
      </motion.aside>

      <AnimatePresence mode="wait">
        <motion.main
          key={pageName}
          className={`flex-1 no-scrollbar pt-15 overflow-y-auto flex-col ${
            pageInfo ? "lg:pt-35 pt-15" : "pt-15"
          }`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <TopNav
            pageName={pageName}
            pageInfo={pageInfo || ""}
            pageUtility={pageUtility}
          />
          <div className="px-4 pt-5 pb-21">{children}</div>
        </motion.main>
      </AnimatePresence>

      <motion.div
        className="lg:hidden fixed bottom-0 left-0 w-full z-50"
        variants={bottomNavVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <BottomNav />
      </motion.div>
    </div>
  );
};

export default DashboardsLayout;
