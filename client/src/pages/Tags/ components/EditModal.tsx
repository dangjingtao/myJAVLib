import {
  Modal,
  Descriptions,
  Switch,
  TextArea,
  Typography,
  Space,
  Row,
  Col,
} from "@douyinfe/semi-ui";
import { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import ColorPicker from "@/components/ColorPicker";
import { dict } from "../constants";
import type { Row as MyRow } from "../types";

interface EditModalProps extends ModalReactProps {
  currentRow: MyRow | null;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleOk: Function;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterOk: (arg: any) => void;
}

const { Title, Paragraph, Text } = Typography;

const EditModal = ({
  visible,
  handleOk = () => false,
  onCancel = () => {},
  afterOk = () => {},
  currentRow,
  ...restProps
}: EditModalProps) => {
  const [toolColor, setToolColor] = useState(currentRow?.color || "#FFFFFF");
  const [note, setNote] = useState(currentRow?.note || "");
  const [no_active, setNo_ctive] = useState(!!currentRow?.no_active);
  useEffect(() => {
    if (visible) {
      setToolColor(currentRow?.color || "#FFFFFF");
      setNote(currentRow?.note || "");
      setNo_ctive(!!currentRow?.no_active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const title = currentRow?.zh_tw || "";

  const baseData = [
    { key: "识别码", value: currentRow?.code },
    { key: "日文", value: currentRow?.jp },
    { key: "中文", value: currentRow?.zh_tw },
    { key: "英文", value: currentRow?.en },
  ];

  const subData = [
    {
      key: "所属大类",
      value: currentRow?.classType ? dict[currentRow?.classType] : "",
    },
    { key: "类别", value: currentRow?.class },
    {
      key: "情感颜色",
      value: <ColorPicker toolColor={toolColor} setToolColor={setToolColor} />,
    },
    {
      key: "激活状态",
      value: (
        <Switch
          checked={!no_active}
          onChange={(val) => setNo_ctive(!val)}
        ></Switch>
      ),
    },
  ];

  return (
    <Modal
      title={`标签管理  "${title}"`}
      visible={visible}
      onOk={async (e) => {
        const id = currentRow?.id || "";
        const result = await handleOk({
          id: id,
          no_active,
          color: toolColor,
          note,
        });
        if (result) {
          await afterOk(result);
          onCancel(e);
        }
      }}
      onCancel={(e) => {
        setToolColor("#FFFFFF");
        setNote("");
        onCancel(e);
        setNo_ctive(false);
      }}
      closeOnEsc={true}
      style={{ width: 800, height: note.length > 300 ? 800 : 650 }}
      bodyStyle={{ margin: 0, padding: 20, overflow: "auto" }}
      zIndex={96}
      centered
      {...restProps}
    >
      <Row>
        <Col span={12}>
          <Descriptions data={baseData} />
        </Col>
        <Col span={12}>
          <Descriptions data={subData} />
        </Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Title heading={5}>入库影片</Title>
        <br />
        <Paragraph spacing="extended">
          <Space>
            <Text link>JUFD-465</Text> <Text link>JUFD-465</Text>
          </Space>
        </Paragraph>
        <br />
        <Title heading={5}>想看影片</Title>
        <br />
        <Paragraph spacing="extended">
          <Text link>JUFD-448</Text>
        </Paragraph>
      </Row>
      <Row>
        <TextArea
          autosize
          value={note}
          onChange={setNote}
          maxCount={500}
          showClear
        />
      </Row>
    </Modal>
  );
};

export default EditModal;
