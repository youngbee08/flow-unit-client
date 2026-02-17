const ProjectDashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="bg-white px-4 py-4.5 shadow-lg flex justify-between items-center rounded-xl">
        <div className="w-full lg:w-[40%] flex flex-col gap-3">
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
        </div>

        <div className="lg:flex items-center gap-4 hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-10 bg-gray-200 rounded" />
                <div className="h-4 w-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-xl bg-gray-200" />
              <div className="h-6 w-16 rounded-full bg-gray-200" />
            </div>

            <div className="h-5 w-3/4 bg-gray-200 rounded" />

            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-gray-300 rounded-full" />
            </div>

            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />

            <div className="flex items-center gap-5 mt-1">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-11 w-full bg-gray-200 rounded-xl mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDashboardSkeleton;
