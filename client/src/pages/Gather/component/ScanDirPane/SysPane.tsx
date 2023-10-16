import { Row, Col } from "@douyinfe/semi-ui";

import { IconArrowUp } from "@douyinfe/semi-icons";

import LineChart from "@/components/LineChart";

const SysPane = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_props, _ref) => {
    const data = [
      { key: "CPU usage", value: "1,480,000" },
      {
        key: "memory usage",
        value: (
          <span>
            98%
            <IconArrowUp
              size="small"
              style={{ color: "red", marginLeft: "4px" }}
            />
          </span>
        ),
      },
      // { key: "安全等级", value: "3级" },
    ];

    return (
      <div>
        <div style={{ padding: 10 }}>
          <Row gutter={[0, 30]}>
            {data.map((x) => {
              return (
                <Col span={24}>
                  <div style={{ fontSize: 14, color: "#898989" }}>{x.key}</div>
                  <div
                    style={{ fontSize: 20, color: "#222", padding: "10px 0" }}
                  >
                    {x.value}
                  </div>
                  <LineChart />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
);

export default SysPane;
