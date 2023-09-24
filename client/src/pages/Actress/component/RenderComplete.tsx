import { Progress } from "@douyinfe/semi-ui";
const RenderComplete = ({ percent }: { percent: number }) => {
  const strokeArr = [
    { percent: 0, color: "red" },
    { percent: 20, color: "red" },
    { percent: 40, color: "orange-6" },
    { percent: 60, color: "var(--semi-color-warning)" },
    { percent: 80, color: "orange-6" },
  ];

  return (
    <Progress
      percent={percent}
      // stroke="var(--semi-color-warning)"
      stroke={strokeArr}
      showInfo={true}
      aria-label="disk usage"
    />
  );
};
export default RenderComplete;
