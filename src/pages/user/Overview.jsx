import React from "react";
import OverviewCard from "../../components/cards/OverviewCard";

const Overview = () => {
  const overviewItems = [
    {
      title: "Total Projects",
      value: 5,
      pageName: "All Projects",
      pageUrl: "/dashboard/projects",
    },
    {
      title: "Pending Tasks",
      value: 15,
      pageName: "Assigned Tasks",
      pageUrl: "/dashboard/tasks",
    },
    {
      title: "Completed",
      value: 20,
      pageName: "All Projects",
      pageUrl: "/dashboard/projects",
    },
  ];
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-3 lg:overflow-hidden overflow-x-scroll no-scrollbar justify-between">
        {overviewItems.map((item, idx) => (
          <OverviewCard item={item} key={idx} />
        ))}
      </div>
      <div className=""></div>
    </div>
  );
};

export default Overview;
