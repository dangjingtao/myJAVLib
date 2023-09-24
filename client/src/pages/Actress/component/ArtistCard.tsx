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
  Button,
} from "@douyinfe/semi-ui";
import { IconUploadError, IconLikeHeart } from "@douyinfe/semi-icons";
import { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import type { Record, ShowTag, Cover } from "../types";
import { getAstro } from "@/lib/calcDate";
import getCups from "@/lib/getCups";
import _ from "lodash";
import { IMAGE_SET_PREFIX } from "../constants";
import { AnimationCloud } from "@/components/TagCloud";
import StorePane from "./StorePane";
interface EditModalProps extends ModalReactProps {
  visible: boolean;
  currentRow: Record;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleOk: Function;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterOk: (arg: any) => void;
}

const { Title } = Typography;

const EditModal = ({
  visible,
  handleOk = () => false,
  onCancel = () => {},
  afterOk = () => {},
  currentRow,
  ...restProps
}: EditModalProps) => {
  const [form, setForm] = useState<Record>({ id: -1 });
  const [coverObj, setCoverObj] = useState<Cover>({ width: 364, height: 530 });
  const [showTag, setShowTag] = useState<ShowTag[]>([]);
  const [loading, setLoading] = useState(false);
  const cups = getCups();
  const astro = getAstro(form?.birth);

  const init = async ({ visible }: { visible: boolean }) => {
    if (visible) {
      const row = _.cloneDeep(currentRow);
      if (row) {
        setLoading(true);
        delete row?.images;
        delete row?.tags;
        setForm(row);
        const tag_codes_string = currentRow?.tags || "";
        const tag_codes_arr = tag_codes_string
          ? (tag_codes_string + "").split(",")
          : [];
        if (tag_codes_arr.length) {
          const arr: any[] = [];
          window.app
            .getBaseDataByTableName({
              tableName: "tag",
              params: {
                classType: "censored", //todo
                code: Array.from(new Set(tag_codes_arr)),
              },
            })
            .then((res: any) => {
              if (res.data.length) {
                tag_codes_arr.forEach((tagCode: string) => {
                  const curName = res.data.find(
                    (x: any) => x.code === tagCode
                  )?.zh_tw;
                  const curItem = arr.find((x) => x.name === curName);
                  if (!curItem && curName) {
                    arr.push({ name: curName, value: 1 });
                  } else if (curName) {
                    curItem.value += 1;
                  }
                });
              }

              setShowTag(arr);
              setLoading(false);
            });
        } else {
          const a_tags: any[] = currentRow?.airav_tags || [];
          const tagsCloudData: ShowTag[] = a_tags.map((x) => ({
            name: x.tag_name_zh_TW,
            value: x.total_tags,
          }));
          setShowTag(tagsCloudData);
          setLoading(false);
        }
      }
    } else {
      setForm({});
      setShowTag([]);
      setLoading(false);
    }
  };

  const setField = (field: string, value: any) => {
    const _form: Record = _.cloneDeep(form);
    _form[field] = value;
    setForm(_form);
  };

  const bindVal = (field: string) => {
    const isDate = field === "debut" || field === "birth";
    const values: any = {
      default: form[field] || null,
      cup: [form[field] || null],
      isRetired: [form[field] ? 1 : 0],
    };

    const onChangeMap = {
      default: (val: any) => {
        setField(field, val);
      },
      date: (_e: any, val: any): void => setField(field, val),
    };

    return {
      value: values[field] || values.default,
      onChange: isDate ? onChangeMap.date : onChangeMap.default,
    };
  };

  const onOk = async (e: React.MouseEvent) => {
    setLoading(true);
    const id = currentRow?.id;
    if (id) {
      const result = await handleOk({
        id,
        ...form,
      });
      if (result) {
        await afterOk(result);
        setLoading(false);
        onCancel(e);
      }
    }
  };

  const onCoverload = (e: Event) => {
    const target: any = e.target!;
    const { width, height } = target;
    setCoverObj({
      width: width / height > 36.4 / 53 ? undefined : 364,
      height: width / height > 36.4 / 53 ? 530 : undefined,
    });
  };

  const getWiki = async () => {
    setLoading(true);
    const res = await window.app?.wiki({
      keyword: form?.name,
      lang: "zh",
    });
    setLoading(false);
    if (res.success) {
      const { links = "", content = "" } = res.data;
      console.log(res.data);
      setForm({
        ...form,
        description: content,
      });
    }
  };

  const images = currentRow?.images || [];

  useEffect(() => {
    init({ visible });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal
      title={<div style={{ height: 10 }}></div>}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
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
          <Row gutter={[10, 0]}>
            <Col span={8}>
              <div style={{ height: 530, width: 364, overflow: "hidden" }}>
                <Image
                  width={coverObj.width}
                  height={coverObj.height}
                  src={form?.cover}
                  onLoad={onCoverload}
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
                />
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
                <span style={{ display: "inline-block", float: "right" }}>
                  <Button onClick={getWiki} size="small" type="secondary">
                    wiki
                  </Button>
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
                  maxCount={8000}
                  showClear
                />
              </Row>
              <br />
              <StorePane store={currentRow?.store} />
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
