const TaskTableSkeleton = ({ rows = 5 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr
          key={idx}
          className={`${
            idx + 1 !== rows && "border-b border-tetiary/30"
          } animate-pulse`}
        >
          <td className="px-6 py-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-48 bg-gray-200 rounded-md" />
              <div className="h-3 w-24 bg-gray-200 rounded-md" />
            </div>
          </td>

          <td className="hidden md:table-cell px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="h-4 w-32 bg-gray-200 rounded-md" />
            </div>
          </td>

          <td className="hidden lg:table-cell px-6 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
          </td>

          <td className="px-6 py-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </td>

          <td className="hidden lg:table-cell px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="h-4 w-20 bg-gray-200 rounded-md" />
            </div>
          </td>

          <td className="px-6 py-4 text-right">
            <div className="h-5 w-5 bg-gray-200 rounded-full ml-auto" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TaskTableSkeleton;
