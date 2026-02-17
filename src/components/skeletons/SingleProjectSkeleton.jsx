const SingleProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-9 lg:gap-5 animate-pulse">
      {/* Project Card */}
      <div className="px-4 py-4.5 bg-white rounded-xl w-full flex flex-col gap-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center gap-4 border-b border-tetiary/20 lg:pb-5 pb-3">
          <div className="flex flex-col gap-2 w-[65%]">
            <div className="h-5 lg:h-7 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
          </div>
          <div className="w-[35%] flex justify-end">
            <div className="h-9 w-24 bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* Progress + Timeline */}
        <div className="flex gap-13 justify-between w-full lg:flex-row flex-col">
          {/* Progress */}
          <div className="flex flex-col gap-3 lg:w-1/2">
            <div className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-6 w-12 bg-gray-200 rounded" />
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full" />
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-2 w-1/2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-36 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="flex flex-col gap-3 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-10 bg-gray-200 rounded" />
          </div>
          <div className="h-9 w-28 bg-gray-200 rounded-xl" />
        </div>

        {/* Table */}
        <div className="bg-white w-[98%] mx-auto rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-tetiary/30">
              <tr>
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[...Array(4)].map((_, idx) => (
                <tr key={idx} className="border-b border-tetiary/20">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                    </div>
                  </td>

                  <td className="hidden lg:table-cell px-6 py-4">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  </td>

                  <td className="hidden lg:table-cell px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gray-200 rounded-full" />
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="h-5 w-5 bg-gray-200 rounded-full ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectSkeleton;
