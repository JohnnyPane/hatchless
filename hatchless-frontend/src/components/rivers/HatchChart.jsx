import { Tooltip, Card } from "@mantine/core";
import { ResponsiveBar } from "@nivo/bar";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
dayjs.extend(dayOfYear);

const todayDayOfYear = dayjs().dayOfYear();

const truncate = (text, maxLength = 18) => text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;

const HatchChart = ({ hatchWindows }) => {
  const activeColor = "#f28c28";

  const hatchData = hatchWindows.map((hatchWindow, i) => {
    const { id, attributes } = hatchWindow;
    const { start_day_of_year, end_day_of_year, insect, flies } = attributes;

    const isActive = todayDayOfYear >= start_day_of_year && todayDayOfYear <= end_day_of_year;

    return {
      id,
      insect_name: insect.common_name,
      scientific_name: insect.scientific_name,
      min_size: insect.min_size,
      max_size: insect.max_size,
      colors: insect.colors,
      index_name: `${insect.common_name}-${insect.scientific_name}`,
      start_day: start_day_of_year,
      end_day: end_day_of_year,
      flies: insect.fly_patterns.map((fly) => fly.name),
      color: isActive ? activeColor : "gray",
      isActive,
    };
  });

  const hatchDataForNivo = hatchData.map((d) => ({
    id: d.id,
    insect_name: d.insect_name,
    scientific_name: d.scientific_name,
    index_name: `${d.insect_name}-${d.scientific_name}`,
    dummy: d.end_day,
  }));

  const margin = { top: 30, right: 80, bottom: 80, left: 120 };
  const monthStartDays = [
    0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365,
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
  ];

  const HatchLayer = ({ xScale, yScale }) => (
    <g>
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="rgba(0,0,0,0.3)"
          />
        </filter>

        {hatchData.map((hatch) => (
          <linearGradient
            key={hatch.id}
            id={`grad-${hatch.id}`}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor={hatch.color} stopOpacity={0.7} />
            <stop offset="100%" stopColor={hatch.color} stopOpacity={1} />
          </linearGradient>
        ))}
      </defs>

      {hatchData.map((hatch) => {
        const FIXED_BAR_HEIGHT = 22;
        const start = xScale(hatch.start_day);
        const end = xScale(hatch.end_day);
        const width = Math.max(end - start, 1);

        const barHeight = FIXED_BAR_HEIGHT;
        const yCenter = yScale(hatch.index_name) + yScale.bandwidth() / 2;
        const y = yCenter - FIXED_BAR_HEIGHT / 2;

        const startDate = dayjs().dayOfYear(hatch.start_day).format("MMM D");
        const endDate = dayjs().dayOfYear(hatch.end_day).format("MMM D");

        return (
          <Tooltip
            key={hatch.id}
            label={
              <div>
                <strong>{hatch.insect_name}</strong>{" "}
                <em>({hatch.scientific_name})</em>
                <div>
                  Hatch: Day {startDate} - {endDate}
                </div>
                <div>
                  Size: {hatch.min_size} - {hatch.max_size}
                </div>
                <div>
                  Colors: {hatch.colors.join(", ")}
                </div>
                {hatch.flies.length > 0 && (
                  <div style={{ maxWidth: "300px", marginTop: "4px" }}>
                    Related flies: {hatch.flies.join(", ")}
                  </div>
                )}
              </div>
            }
            withArrow
            position="top"
            transition="pop"
            multiline
          >
            <rect
              x={start}
              y={y}
              width={width}
              height={barHeight}
              rx={6}
              fill={`url(#grad-${hatch.id})`}
              style={{ transition: "all 0.2s ease", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.currentTarget.setAttribute("filter", "url(#shadow)");
                e.currentTarget.setAttribute("height", barHeight * 1.1);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.removeAttribute("filter");
                e.currentTarget.setAttribute("height", barHeight);
              }}
            />
          </Tooltip>
        );
      })}
    </g>
  );

  const MIN_CHART_HEIGHT_FOR_SINGLE_ITEM = 140;

  return (
    <div className="flex center full-width">
      <Card
        shadow="sm"
        className="card"
        style={{
          height: Math.max(
            hatchData.length * 40 + margin.top + margin.bottom,
            MIN_CHART_HEIGHT_FOR_SINGLE_ITEM + margin.top + margin.bottom
          ),
          width: "min(90vw, 1000px)",
          margin: "0 auto",
          marginBottom: "40px",
          // background: "#E8EBE3",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <ResponsiveBar
          data={hatchDataForNivo}
          keys={["dummy"]}
          indexBy="index_name"
          layout="horizontal"
          margin={margin}
          minValue={0}
          maxValue={365}
          xScale={{ type: "linear", min: 0, max: 365, stacked: false }}
          enableGridY={false}
          enableGridX={true}
          gridXValues={monthStartDays}
          axisLeft={{
            tickValues: hatchDataForNivo.map((h) => h.index_name),
            format: (index) => {
              const match = hatchDataForNivo.find((h) => h.index_name === index);
              return match ? truncate(match.insect_name) : "";
            },
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            // legend: "Species",
            legendOffset: -100,
            legendPosition: "middle",
          }}
          axisBottom={{
            tickValues: monthStartDays,
            tickPadding: 10,
            tickRotation: -30,
            legend: "Hatch Window by Month",
            legendOffset: 50,
            format: (v) => {
              const index = monthStartDays.indexOf(v);
              return index !== -1 ? monthNames[index] : "";
            },
          }}
          layers={["grid", HatchLayer, "axes"]}
          theme={{
            textColor: "#2e3d2c",
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
          }}
          motionConfig="gentle"
        />
      </Card>
    </div>
  );
};

export default HatchChart;