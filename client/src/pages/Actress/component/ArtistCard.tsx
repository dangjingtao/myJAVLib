import {
  Modal,
  Descriptions,
  TextArea,
  Typography,
  Row,
  Col,
  Card,
  Carousel,
  Image,
  ImagePreview,
} from "@douyinfe/semi-ui";
import { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
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
  console.log(currentRow);
  const [note, setNote] = useState(currentRow?.note || "");
  useEffect(() => {
    if (visible) {
      setNote(currentRow?.note || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const title = currentRow?.name || "";

  const baseData = [{ key: "识别码111", value: currentRow?.code }];
  const images = currentRow ? JSON.parse(JSON.parse(currentRow.images)) : [];

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={async (e) => {
        const id = currentRow?.id || "";
        const result = await handleOk({
          id: id,
          note,
        });
        if (result) {
          await afterOk(result);
          onCancel(e);
        }
      }}
      onCancel={(e) => {
        setNote("");
        onCancel(e);
      }}
      closeOnEsc={true}
      style={{ width: 900, height: 700 }}
      bodyStyle={{ margin: 0, padding: 20, overflow: "auto" }}
      zIndex={96}
      centered
      {...restProps}
    >
      <Row>
        <Col span={18}>{/* <Descriptions data={subData} /> */}</Col>
        <Col span={6}>
          <ImagePreview>
            {images.map((src, index) => {
              return (
                <Image
                  key={index}
                  src={`https://wiki-img.airav.wiki/storage/sections${src}`}
                  width={200}
                  alt={`lamp${index + 1}`}
                  style={{ marginRight: 5 }}
                />
              );
            })}
          </ImagePreview>

          {/* <Carousel style={{ height: 400 }} theme="dark">
            {images?.map((src, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(https://wiki-img.airav.wiki/storage/sections${src})`,
                  }}
                >
                </div>
              );
            })}
          </Carousel> */}
        </Col>
      </Row>
      {/* <Row style={{ marginBottom: 20 }}>
        <Title heading={5}>已入库</Title>
        <br />
        <Paragraph spacing="extended">
          <Text link>JUFD-448</Text>
        </Paragraph>
        <br />
        <Title heading={5}>想看影片</Title>
        <br />
        <Paragraph spacing="extended">
          <Text link>JUFD-448</Text>
        </Paragraph>
      </Row> */}
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
