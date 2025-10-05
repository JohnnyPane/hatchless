import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";

dayjs.extend(dayOfYear);

import useResources from "../../hooks/useResources.js";

const HatchChart = ({ riverId }) => {
  if (!riverId) {
    riverId = useParams().id;
  }

  const { data: hatchWindows, isLoading, isError, error } = useResources({ resourceName: "hatch_windows", perPage: 1000, scopes: [{ name: "by_river", args: [riverId]}]  });

  const data = hatchWindows.map((hw) => {
    const { id, attributes } = hw;
    const { start_day_of_year, end_day_of_year, insect } = attributes;

    return {
      id,
      insect_name: insect.common_name,
      start_day: start_day_of_year,
      duration: end_day_of_year - start_day_of_year + 1,
    };
  });

  return (
    <ResponsiveContainer width={800} height={400}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 20, left: 150, bottom: 20 }}
      >
        <XAxis
          type="number"
          domain={[0, 365]}
          ticks={[0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]}
          tickFormatter={(day) => dayjs().dayOfYear(day + 1).format("MMM")}
        />
        <YAxis type="category" dataKey="insect_name" width={150} />
        <Tooltip
          formatter={(value, name, props) => {
            if (name === "duration") {
              const start = props.payload.start_day + 1;
              const end = start + value - 1;
              const startDate = dayjs().dayOfYear(start).format("MMM D");
              const endDate = dayjs().dayOfYear(end).format("MMM D");
              return `${startDate} → ${endDate}`;
            }
            return value;
          }}
        />
        {/* Empty space before hatch */}
        <Bar dataKey="start_day" stackId="a" fill="transparent" />
        {/* Actual hatch duration */}
        <Bar dataKey="duration" stackId="a" fill="#38bdf8" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HatchChart;