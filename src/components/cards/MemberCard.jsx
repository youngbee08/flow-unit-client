import React from "react";

const MemberCard = ({ member }) => {
  const { profile, name, userName } = member;
  return (
    <div className="flex cursor-pointer rounded-md px-2 items-center gap-6">
      <div className="flex w-10 h-10 border border-tetiary rounded-full overflow-hidden">
        <img
          src={profile}
          alt={`${name}ProfilePic`}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-0">
        <h3 className="text-sm lg:text-lg font-semibold">{name}</h3>
        <p className="text-xs lg:text-sm font-medium text-tetiary">
          @{userName}
        </p>
      </div>
    </div>
  );
};

export default MemberCard;
