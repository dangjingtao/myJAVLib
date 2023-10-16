import {
  List,
  Checkbox,
  CheckboxGroup,
  Progress,
  Space,
  Button,
  Modal,
  Switch,
  Input,
  SideSheet,
} from "@douyinfe/semi-ui";

import { IconBytedanceLogo } from "@douyinfe/semi-icons";
import {
  IconSetting,
  IconTreeTriangleRight,
  IconSearch,
} from "@douyinfe/semi-icons";
import { Log } from "../../types";
import EmptyContent from "@/components/EmptyContent";
import SysPane from "./SysPane";

const ScanDirPane = ({
  scanInfo,
  height,
}: {
  scanInfo: Log[];
  height?: number;
}) => {
  const [visible, setVisible] = useState(false);
  const [sysVisible, setSysVisible] = useState(false);
  const handleCancel = () => setVisible(false);

  const succInfo: Log[] =
    scanInfo
      .map((x) => {
        const { message } = x;
        if (message.indexOf("success") > -1) {
          const regex = /(?:[^[\]]+)/g;
          const matches = message.match(regex) || [];
          return { ...x, message: matches[2] || "" };
        }
        return null;
      })
      .filter((x) => !!x) || [];
  const [selectItems, setSelectItems] = useState<string[]>([]);
  const allKeys = succInfo.map((x) => x.message);
  const isCheckAll = !!(
    allKeys.length && allKeys.length === selectItems.length
  );
  const isIndeterminate = !!(
    selectItems.length && selectItems.length < allKeys.length
  );

  const isCheckDisabled = allKeys.length === 0;
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          // position: "absolute",
          height: 40,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 24,
          background: "#fafafa",
          display: "flex",
        }}
      >
        <Space>
          <Checkbox
            checked={isCheckAll}
            indeterminate={isIndeterminate}
            disabled={isCheckDisabled}
            onChange={(e) => {
              const { checked } = e.target;
              if (checked) {
                const allKeys = succInfo.map((x) => x.message);
                setSelectItems(allKeys);
              } else {
                setSelectItems([]);
              }
            }}
          >
            全选
          </Checkbox>
          <div>
            <Input
              size="small"
              style={{ width: 200 }}
              prefix={<IconSearch />}
              showClear
              placeholder={"Search outfit"}
            />
          </div>
          <div style={{ fontSize: 14 }}>
            <Space>
              <Switch
                size="small"
                onChange={(v, e) => console.log(v)}
                aria-label="a switch for demo"
              />
              <div>只看未成功</div>
            </Space>
          </div>
        </Space>
        <div style={{ marginLeft: "auto", display: "flex", paddingRight: 10 }}>
          <Button
            style={{ marginTop: 4, height: 36, lineHeight: 36 }}
            theme="borderless"
            onClick={() => {
              setVisible(true);
            }}
          >
            <IconSetting />
          </Button>
          <Button
            style={{ marginTop: 4, height: 36, lineHeight: 36 }}
            theme="borderless"
            onClick={() => {
              setVisible(true);
            }}
          >
            <IconTreeTriangleRight />
          </Button>
          <Button
            style={{ marginTop: 4, height: 36, lineHeight: 36 }}
            theme="borderless"
            onClick={() => {
              setSysVisible(true);
            }}
          >
            <IconBytedanceLogo />
          </Button>
        </div>
      </div>
      <div
        style={{
          height: (height || 0) - 80,
          overflow: "auto",
        }}
      >
        <CheckboxGroup
          value={selectItems}
          onChange={(value) => {
            setSelectItems(value);
          }}
        >
          <List
            dataSource={succInfo}
            className="component-list-demo-booklist"
            split
            style={{
              marginTop: 10,
              flexBasis: "100%",
              flexShrink: 0,
            }}
            renderItem={(item) => (
              <List.Item className="list-item">
                <Space>
                  <div style={{ width: 120 }}>
                    <Checkbox value={item.message}>{item.message}</Checkbox>
                  </div>
                  <div style={{ width: 200 }}>
                    <Progress
                      percent={10}
                      stroke="var(--semi-color-warning)"
                      showInfo={true}
                      aria-label="disk usage"
                    />
                  </div>
                </Space>
              </List.Item>
            )}
            emptyContent={<EmptyContent style={{ margin: 50 }} />}
          />
        </CheckboxGroup>
      </div>
      <div style={{ background: "#fafafa", height: 30 }}>
        <Space>
          <div style={{ fontSize: 14, lineHeight: "30px", paddingLeft: 20 }}>
            共 {succInfo.length} 条
          </div>
          <div style={{ fontSize: 14, lineHeight: "30px" }}>
            已选中 {selectItems.length} 条
          </div>
        </Space>
      </div>
      <Modal
        title="转换配置"
        visible={visible}
        size="large"
        style={{ top: 100 }}
        // onOk={handleOk}
        // afterClose={handleAfterClose} //>=1.16.0
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        This is the content of a basic modal.
        <br />
        More content...
      </Modal>

      <SideSheet
        title="System Status"
        visible={sysVisible}
        onCancel={() => {
          setSysVisible(false);
        }}
      >
        <SysPane />
      </SideSheet>
    </div>
  );
};

export default ScanDirPane;
