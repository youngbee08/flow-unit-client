const TeamPageSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 animate-pulse">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6 h-40 flex flex-col gap-4">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>

        <div className="bg-white h-[350px] rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-6 bg-gray-200 rounded" />
          </div>

          <div className="flex flex-col gap-5 overflow-hidden">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white h-[340px] rounded-xl shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="h-5 w-32 bg-gray-200 rounded mb-6" />

            <div className="flex flex-col gap-3">
              {[1, 2].map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-gray-100 flex items-center justify-between"
                >
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="h-10 w-full bg-gray-200 rounded-3xl mt-6" />
        </div>
      </div>
    </div>
  );
};

export default TeamPageSkeleton;
