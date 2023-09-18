/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  Descriptions,
  TextArea,
  Typography,
  Row,
  Col,
  Card,
  Image,
  ImagePreview,
  Divider,
  Select,
  DatePicker,
  Input,
  InputGroup,
  Tooltip,
  Rating,
  Spin,
  Tabs,
  TabPane,
  List,
  Empty,
} from "@douyinfe/semi-ui";
import { IconUploadError, IconLikeHeart } from "@douyinfe/semi-icons";
import { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import type { Row as MyRow } from "../types";
import { getAstro } from "@/lib/calcDate";
import getCups from "@/lib/getCups";
import _, { divide } from "lodash";
import { IMAGE_SET_PREFIX } from "../constants";
import { AnimationCloud } from "@/components/TagCloud";
import {
  IllustrationNoContent,
  IllustrationNoContentDark,
} from "@douyinfe/semi-illustrations";
interface EditModalProps extends ModalReactProps {
  visible: boolean;
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

const arrayFormatter = (str: string | null) => {
  str = str ? str + "" : str;
  if (!str) {
    return [];
  } else {
    const arr = str.replaceAll("\\", "").replaceAll('"', "").split(",");
    return arr;
  }
};

const EditModal = ({
  visible,
  handleOk = () => false,
  onCancel = () => {},
  afterOk = () => {},
  currentRow,
  ...restProps
}: EditModalProps) => {
  const [form, setForm] = useState<any>({});
  const [coverObj, setCoverObj] = useState({ width: 364, height: 530 });
  const [showTag, setShowTag] = useState([]);
  const [loading, setLoading] = useState(false);
  const cups = getCups();
  const astro = getAstro(form?.birth);
  const store_data = arrayFormatter(currentRow?.store);

  const init = async ({ visible }: { visible: boolean }) => {
    if (visible) {
      setLoading(true);
      const row = _.cloneDeep(currentRow);
      delete row.images;
      delete row.tags;
      setForm(row);
      const tag_codes_string = currentRow?.tags.replaceAll('"', "");
      const tag_codes_arr = tag_codes_string
        ? (tag_codes_string + "").split(",")
        : [];

      if (tag_codes_arr.length) {
        const arr: any[] = [];
        window.app
          .getBaseDataByTableName({
            tableName: "tag",
            params: {
              classType: "censored",
              code: Array.from(new Set(tag_codes_arr)),
            },
          })
          .then((res) => {
            if (res.data.length) {
              tag_codes_arr.forEach((tagCode) => {
                const curName = res.data.find((x) => x.code === tagCode)?.zh_tw;
                const curItem = arr.find((x) => x.name === curName);
                if (!curItem && curName) {
                  arr.push({ name: curName, value: 1 });
                } else if (curName) {
                  curItem.value += 1;
                }
              });
            }
            console.log(arr);
            setShowTag(arr);
            setLoading(false);
          });
      } else {
        const a_tags = currentRow?.airav_tags
          ? JSON.parse(currentRow?.airav_tags)
          : [];
        console.log(currentRow?.airav_tags);
        const tagsCloudData = a_tags.map((x) => ({
          name: x.tag_name_zh_TW,
          value: x.total_tags,
        }));
        setShowTag(tagsCloudData);
        // console.log(tagsCloudData);
        setLoading(false);
      }
    } else {
      setForm({});
      setShowTag([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    init({ visible });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const setField = (field: string, value: any) => {
    const _form = _.cloneDeep(form);
    _form[field] = value;
    setForm(_form);
  };

  const bindVal = (field: any) => {
    const isDate = field === "debut" || field === "birth";
    return {
      value: form[field] || null,
      onChange: isDate
        ? (e: any, val: any) => setField(field, val)
        : (val: any) => {
            setField(field, val);
          },
    };
  };

  const images = currentRow?.images ? JSON.parse(currentRow.images) : [];

  return (
    <Modal
      title={<div style={{ height: 10 }}></div>}
      visible={visible}
      onOk={async (e) => {
        setLoading(true);
        const id = currentRow?.id || "";
        const result = await handleOk({
          id: id,
          ...form,
        });

        if (result) {
          await afterOk(result);
          setLoading(false);
          onCancel(e);
        }
      }}
      onCancel={(e) => {
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
      <Spin spinning={loading}>
        <div id="modal" style={{ position: "relative" }}>
          <Row gutter={[10]}>
            <Col span={8}>
              <div style={{ height: 530, width: "364px", overflow: "hidden" }}>
                <Image
                  width={coverObj.width}
                  height={coverObj.height}
                  src={form?.cover}
                  onLoad={(e) => {
                    const { width, height } = e.target;
                    setCoverObj({
                      width: width / height > 36.4 / 53 ? undefined : 364,
                      height: width / height > 36.4 / 53 ? 530 : undefined,
                    });
                  }}
                  placeholder={
                    <Spin spinning={true}>
                      <div
                        style={{
                          background: "#fcfcfc",
                          width: 364,
                          height: 530,
                        }}
                      />
                    </Spin>
                  }
                  fallback={<IconUploadError style={{ fontSize: 50 }} />}
                ></Image>
              </div>
              <br />
              <Card
                title={<Title heading={5}>词云</Title>}
                cover={<AnimationCloud data={showTag} />}
                bodyStyle={{ display: "none" }}
              />
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
                  rows={15}
                  placeholder="为你的爱豆来一段精彩的印象吧"
                  {...bindVal("description")}
                  maxCount={2000}
                  showClear
                />
              </Row>
              <br />
              <Card
                // cover={<AnimationCloud data={showTag} />}
                // bodyStyle={{ display: "none" }}
                bodyStyle={{
                  height: 414,
                  overflow: "hidden",
                  margin: 0,
                  padding: "10px 0px 0 10px",
                }}
              >
                <Tabs
                  size="large"
                  type="card"
                  tabList={[
                    { tab: "本地片单", itemKey: "1" },
                    { tab: "库内片单", itemKey: "2" },
                  ]}
                >
                  <TabPane itemKey="1">
                    <List
                      emptyContent={
                        <Empty
                          image={
                            <IllustrationNoContent
                              style={{ width: 150, height: 150, marginTop: 60 }}
                            />
                          }
                          darkModeImage={
                            <IllustrationNoContentDark
                              style={{ width: 150, height: 150, marginTop: 60 }}
                            />
                          }
                          title="空空如也"
                          description={`快去搜索创建关于爱豆的作品集！`}
                        ></Empty>
                      }
                      dataSource={store_data}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                      style={{ overflow: "auto", height: 360 }}
                    />
                  </TabPane>
                  <TabPane itemKey="2">
                    <List
                      size="small"
                      emptyContent={
                        <Empty
                          image={
                            <IllustrationNoContent
                              style={{ width: 150, height: 150, marginTop: 60 }}
                            />
                          }
                          darkModeImage={
                            <IllustrationNoContentDark
                              style={{ width: 150, height: 150 }}
                            />
                          }
                          title="空状态标题"
                          description="开始创建你的第一个仪表盘吧！"
                        ></Empty>
                      }
                      dataSource={[]}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>

          <br />
          <Title heading={5}>剧照</Title>
          <br />
          <ImagePreview>
            {images?.map((src: string, index: number) => {
              return (
                <Image
                  // getpopupcontainer={() => document.querySelector("#modal")}
                  key={index}
                  src={`${IMAGE_SET_PREFIX}${src}`}
                  placeholder={
                    <Spin spinning={true}>
                      <div
                        style={{
                          background: "#fcfcfc",
                          width: 104,
                          height: 65,
                        }}
                      />
                    </Spin>
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
      </Spin>
    </Modal>
  );
};

export default EditModal;
