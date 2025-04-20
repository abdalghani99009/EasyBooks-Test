// StudentsGridSkeleton.tsx

const ROWS = 5;
const COLUMN_WIDTHS = [
  "min-w-[110px]", // First Name
  "min-w-[110px]", // Last Name
  "min-w-[140px]", // Date of Birth
  "min-w-[100px]", // Grade
  "min-w-[90px]", // Gender
  "min-w-[100px]", // Country
  "min-w-[100px]", // City
  "min-w-[120px]", // Mobile
  "min-w-[100px]", // Notes
];

export default function StudentsGridSkeleton() {
  return (
    <div className="max-w-full w-full animate-pulse">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-medium">Filter By:</span>
          <div className="h-8 w-40 sm:w-64 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-3 max-sm:hidden items-center">
          <div className="bg-gray-200 rounded-full size-8"></div>
          <div className="bg-gray-200 rounded-full size-8"></div>
          <div className="bg-gray-200 rounded-full size-8"></div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div className="flex border-b border-gray-200 pb-2 mb-2">
          {[
            "First Name",
            "Last Name",
            "Date of Birth",
            "Grade",
            "Gender",
            "Country",
            "City",
            "Mobile",
            "Notes",
          ].map((header, index) => (
            <div
              key={index}
              className={`${COLUMN_WIDTHS[index]} text-center font-medium text-gray-500`}
            >
              {header}
            </div>
          ))}
        </div>

        {/* Table Rows */}
        <div className="flex flex-col gap-3">
          {[...Array(ROWS)].map((_, rowIndex) => (
            <div className="flex items-center py-2" key={rowIndex}>
              {COLUMN_WIDTHS.map((width, colIndex) => (
                <div
                  key={colIndex}
                  className={`${width} h-6 bg-gray-200 rounded mr-4 last:mr-0`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <div className="h-6 w-28 sm:w-36 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
