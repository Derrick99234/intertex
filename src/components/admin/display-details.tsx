import React from "react";

type DisplayDetailsProps = {
  data: {
    label: string;
    value: string | number;
    thirdValue?: string | number;
  }[];
};

const DisplayDetails = ({ data }: DisplayDetailsProps) => {
  return (
    <div className="max-w-3xl w-full rounded overflow-hidden border border-gray-300 divide-y divide-gray-300">
      {data.map(({ label, value, thirdValue }, index) => (
        <div
          key={index}
          className={`grid items-center px-4 py-4 ${
            thirdValue ? "grid-cols-3" : "grid-cols-2"
          } gap-4`}
        >
          <span className="text-sm">{label}</span>
          <span className="text-sm font-semibold">{value}</span>
          {thirdValue && (
            <span className="text-sm font-semibold">{thirdValue}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayDetails;
