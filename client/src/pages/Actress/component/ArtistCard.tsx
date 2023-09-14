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
  Divider,
  Select,
  DatePicker,
  Input,
  InputGroup,
  Tooltip,
  Rating,
} from "@douyinfe/semi-ui";
import { IconUploadError, IconLikeHeart } from "@douyinfe/semi-icons";
import { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import type { Row as MyRow } from "../types";
import { getAstro } from "@/lib/calcDate";
import getCups from "@/lib/getCups";
import _ from "lodash";
import { IMAGE_SET_PREFIX } from "../constants";
import { AnimationCloud } from "@/components/TagCloud";
interface EditModalProps extends ModalReactProps {
  currentRow: MyRow | null;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleOk: Function;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterOk: (arg: any) => void;
}

const { Title, Paragraph, Text } = Typography;

async function getImgWidthHeight(src, maxWaitLoad = 2500) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    if (img.complete) {
      const { width, height } = img;
      resolve({
        width,
        height,
      });
    } else {
      let timeOut = setTimeout(() => {
        reject("图片加载失败！");
      }, maxWaitLoad);
      img.onload = function () {
        const { width, height } = img;
        window.clearTimeout(timeOut);
        resolve({
          width,
          height,
        });
      };
    }
  });
}

const EditModal = ({
  visible,
  handleOk = () => false,
  onCancel = () => {},
  afterOk = () => {},
  currentRow,
  ...restProps
}: EditModalProps) => {
  const [form, setForm] = useState({});
  const [coverObj, setCoverObj] = useState({ width: 340, height: 530 });
  // const [note, setNote] = useState(currentRow?.note || "");
  useEffect(() => {
    if (visible) {
      // setNote(currentRow?.note || "");
      const row = _.cloneDeep(currentRow);
      delete row.images;
      delete row.tags;
      setForm(row);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const setField = (field, value) => {
    const _form = _.cloneDeep(form);
    _form[field] = value;
    setForm(_form);
  };

  const bindVal = (field) => {
    const isDate = field === "debut" || field === "birth";
    return {
      value: form[field] || null,
      onChange: isDate
        ? (e, val) => setField(field, val)
        : (val) => {
            // console.log(val, rest, isDate);
            setField(field, val);
          },
    };
  };

  const images = currentRow?.images ? JSON.parse(currentRow.images) : [];
  const tags = currentRow?.tags ? JSON.parse(currentRow.tags) : [];
  const tagsCloudData = tags.map((x) => ({
    name: x.tag_name_zh_TW,
    value: x.total_tags,
  }));

  const cups = getCups();
  const astro = getAstro(form?.birth);

  return (
    <Modal
      title={<div style={{ height: 10 }}></div>}
      visible={visible}
      onOk={async (e) => {
        const id = currentRow?.id || "";
        const result = await handleOk({
          id: id,
          ...form,
        });

        if (result) {
          await afterOk(result);
          onCancel(e);
        }
      }}
      onCancel={(e) => {
        setForm({});
        onCancel(e);
      }}
      closeOnEsc={true}
      style={{ width: 1200, height: 900, overflow: "auto" }}
      bodyStyle={{
        margin: 0,
        padding: 10,
        overflow: "auto",
      }}
      zIndex={96}
      centered
      {...restProps}
    >
      <div id="modal" style={{ position: "relative" }}>
        <Row>
          <Col span={8}>
            <div style={{ height: 530, width: "340px", overflow: "hidden" }}>
              <Image
                width={coverObj.width}
                height={coverObj.height}
                src={form?.cover}
                onLoad={(e) => {
                  const { width, height } = e.target;

                  setCoverObj({
                    width: width / height > 34 / 53 ? undefined : 340,
                    height: width / height > 34 / 53 ? 530 : undefined,
                  });
                }}
                placeholder={
                  <>
                    <img src="/loading.gif" alt="loading" />
                  </>
                }
                fallback={<IconUploadError style={{ fontSize: 50 }} />}
              ></Image>
            </div>
            {/* <AnimationCloud data={tagsCloudData} /> */}
          </Col>
          <Col span={16}>
            <Title heading={5}>
              {form?.name}&nbsp;
              <Tooltip position="right" content={astro?.name}>
                {astro?.emoji}
              </Tooltip>
              &nbsp;&nbsp;
              <span style={{ display: "inline-block" }}>
                <Rating
                  count={10}
                  allowHalf
                  size={16}
                  style={{ color: "rgb(200, 0, 164)" }}
                  character={<IconLikeHeart size={18} />}
                  {...bindVal("rate")}
                />
              </span>
            </Title>
            {/* <Divider margin={10} />
            <AnimationCloud data={tagsCloudData} /> */}
            <Divider layout="horizontal" margin="12px" />

            <Row>
              <Col span={8}>
                <Descriptions
                  data={[
                    {
                      key: "日文名",
                      value: (
                        <Input
                          size="small"
                          style={{ width: 150 }}
                          {...bindVal("name_JP")}
                        />
                      ),
                    },
                    {
                      key: "中文名",
                      value: (
                        <Input
                          size="small"
                          style={{ width: 150 }}
                          {...bindVal("name_CN")}
                        />
                      ),
                    },
                    {
                      key: "英文名",
                      value: (
                        <Input
                          size="small"
                          style={{ width: 150 }}
                          {...bindVal("name_EN")}
                        />
                      ),
                    },
                  ]}
                />
              </Col>
              <Col span={8}>
                <Descriptions
                  data={[
                    {
                      key: "出道日期",
                      value: (
                        <DatePicker
                          {...bindVal("debut")}
                          style={{ width: 140 }}
                          size={"small"}
                          onChange={(date, dateString) =>
                            setField("debut", dateString)
                          }
                        />
                      ),
                    },
                    {
                      key: "是否退役",
                      value: (
                        <Select
                          {...bindVal("isRetired")}
                          value={form.isRetired}
                          size="small"
                          style={{ width: 140 }}
                        >
                          <Select.Option value={0}>否</Select.Option>
                          <Select.Option value={1}>是</Select.Option>
                        </Select>
                      ),
                    },
                    {
                      key: "出生日期",
                      value: (
                        <DatePicker
                          {...bindVal("birth")}
                          style={{ width: 140 }}
                          size={"small"}
                        />
                      ),
                    },

                    // { key: "三围", value: "是" },
                  ]}
                />
              </Col>
              <Col span={8}>
                <Descriptions
                  data={[
                    {
                      key: "身高",
                      value: (
                        <Input
                          style={{ width: 180 }}
                          {...bindVal("tall")}
                          type="number"
                          size="small"
                          addonAfter="cm"
                        />
                      ),
                    },
                    // { key: "是否退役", value: "是" },
                    {
                      key: "三围",
                      value: (
                        <InputGroup size="small">
                          <Input
                            type="number"
                            {...bindVal("breast")}
                            size="small"
                            placeholder="胸"
                            style={{ width: 60 }}
                          />
                          <Input
                            type="number"
                            {...bindVal("waist")}
                            size="small"
                            placeholder="腰"
                            style={{ width: 60 }}
                          />
                          <Input
                            type="number"
                            {...bindVal("hip")}
                            size="small"
                            placeholder="臀"
                            style={{ width: 60 }}
                          />
                        </InputGroup>
                      ),
                    },
                    {
                      key: "罩杯",
                      value: (
                        <Select
                          style={{ width: 180 }}
                          {...bindVal("cup")}
                          size="small"
                        >
                          {cups.map((x) => (
                            <Select.Option key={x} value={x}>
                              {x}
                            </Select.Option>
                          ))}
                        </Select>
                      ),
                    },
                  ]}
                />
              </Col>
            </Row>

            <Divider dashed margin={10} />

            <Row>
              <TextArea
                // autosize
                rows={15}
                placeholder="为你的爱豆来一段精彩的印象吧"
                {...bindVal("description")}
                // value={note}
                // onChange={setNote}
                maxCount={2000}
                showClear
              />
            </Row>
          </Col>
        </Row>
        <br />
        <Title heading={5}>词云</Title>
        <br />
        <AnimationCloud data={tagsCloudData} />

        <br />
        <Title heading={5}>剧照</Title>
        <br />
        <ImagePreview>
          {images?.map((src, index) => {
            return (
              <Image
                getpopupcontainer={() => document.querySelector("#modal")}
                key={index}
                src={`${IMAGE_SET_PREFIX}${src}`}
                placeholder={
                  <Image
                    src="/loading.gif"
                    width={104}
                    height={65}
                    preview={false}
                  />
                }
                width={104}
                height={65}
                alt={`lamp${index + 1}`}
                style={{ marginRight: 5 }}
                fallback={<IconUploadError style={{ fontSize: 50 }} />}
              />
            );
          })}
        </ImagePreview>
      </div>

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
    </Modal>
  );
};

export default EditModal;
