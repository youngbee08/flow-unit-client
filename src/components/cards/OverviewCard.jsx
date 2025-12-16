import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const OverviewCard = ({ item }) => {
  const { title, value, pageName, pageUrl } = item;
  return (
    <div className="min-w-full sm:min-w-[60%] lg:min-w-fit w-full bg-white rounded-2xl px-5 py-4 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold">{title}</h2>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="flex items-center gap-0 hover:underline">
        <Link to={pageUrl} className="text-xs">
          {pageName}
        </Link>
        <ArrowUpRight size={14} />
      </div>
    </div>
  );
};

export default OverviewCard;
