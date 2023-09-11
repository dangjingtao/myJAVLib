/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Col,
  Row,
  Card,
  Typography,
  Image,
  ImagePreview,
  Descriptions,
  Tag,
  Space,
  Rating,
  Popover,
  Modal,
  Table,
} from "@douyinfe/semi-ui";

import { DICT } from "./constants";
import { fileSchemaUrl, videoSchemaUrl } from "@/lib";

import Player from "@/components/Player";

const { Text } = Typography;

const json: any = {
  localThumb:
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/thumb/4o12.jpg",
  localCover:
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/cover/4o12_b.jpg",
  localPreviews: [
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-1.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-2.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-3.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-4.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-5.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-6.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-7.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-8.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-9.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-10.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-11.jpg",
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/previews/jufd00448jp-12.jpg",
  ],
  localActress: [
    "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/actress/西條瑠璃.jpg",
  ],
  localLogs: "/Users/tao/Desktop/eletron_app/server/tmp//JUFD-448/info.log",
  outfit: "JUFD-448",
  title: "JUFD-448 上からまたがり男を犯す 爆乳騎乗位ボンデージ 西條るり",
  gid: "26795163349",
  actress: [
    {
      code: "2ni",
      name: "西條瑠璃",
      avatar: "https://www.javbus.com/pics/actress/2ni_a.jpg",
      name_cn: "西条瑠璃",
      name_jp: "西條るり",
      name_en: "Ruri Saijo",
      id: "8559",
    },
  ],
  cover: "https://www.javbus.com/pics/cover/4o12_b.jpg",
  thumb: "https://www.javbus.com/pics/thumb/4o12.jpg",
  previews: [
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-1.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-2.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-3.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-4.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-5.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-6.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-7.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-8.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-9.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-10.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-11.jpg",
    "https://pics.dmm.co.jp/digital/video/jufd00448/jufd00448jp-12.jpg",
  ],
  tags: [
    { name: "緊縛", href: "https://www.javbus.com/genre/d", code: "d" },
    { name: "巨乳", href: "https://www.javbus.com/genre/e", code: "e" },
    { name: "單體作品", href: "https://www.javbus.com/genre/f", code: "f" },
    { name: "DMM獨家", href: "https://www.javbus.com/genre/g", code: "g" },
    { name: "蕩婦", href: "https://www.javbus.com/genre/10", code: "10" },
    { name: "淫語", href: "https://www.javbus.com/genre/24", code: "24" },
    { name: "數位馬賽克", href: "https://www.javbus.com/genre/31", code: "31" },
    { name: "女上位", href: "https://www.javbus.com/genre/42", code: "42" },
    { name: "高畫質", href: "https://www.javbus.com/genre/4o", code: "4o" },
  ],
  director: {
    name: "導演",
    href: "https://www.javbus.com/director/vm",
    text: "豆沢豆太郎",
    code: "vm",
  },
  premiered: { name: "發行日期", href: "", text: "2015-02-28", code: null },
  runtime: { name: "長度", href: "", text: "160分鐘", code: null },
  studio: {
    name: "製作商",
    href: "https://www.javbus.com/studio/dk",
    text: "Fitch",
    code: "dk",
  },
  label: {
    name: "發行商",
    href: "https://www.javbus.com/label/tg",
    text: "Fitch",
    code: "tg",
  },
  magnets: [
    {
      name: "JUFD-448.mp4",
      size: "1.58GB",
      date: "2018-01-11",
      link: "magnet:?xt=urn:btih:113759DE8FEB79CF4EB6F25196A9F80686C8493C&dn=JUFD-448.mp4",
    },
    {
      name: "JUFD-448",
      size: "1.58GB",
      date: "2015-10-19",
      link: "magnet:?xt=urn:btih:399E5EA88F9DDECBFC2125F2AA743EB44D0C991B&dn=JUFD-448",
    },
    {
      name: "0223-jufd-448",
      size: "1.18GB",
      date: "2015-10-19",
      link: "magnet:?xt=urn:btih:959825CAD6905CBFC970A60ACBCE90807BA75609&dn=0223-jufd-448",
    },
    {
      name: "【ses-23】JUFD-448.1080p HD",
      size: "4.36GB",
      date: "2015-07-26",
      link: "magnet:?xt=urn:btih:58DB78E3E17F3890293126501FEE814D2FA94684&dn=%E3%80%90ses-23.com%E3%80%91JUFD-448.1080p",
    },
    {
      name: "第一會所新片@SIS001@(Fitch)(JUFD-448)上からまたがり男を犯す_爆乳騎乗位ボンデージ_西條るり HD",
      size: "4.36GB",
      date: "2015-07-26",
      link: "magnet:?xt=urn:btih:A2EDD5A45BDE96584E76AFCF4034BBBF244D4F55&dn=%E7%AC%AC%E4%B8%80%E6%9C%83%E6%89%80%E6%96%B0%E7%89%87%40SIS001%40%28Fitch%29%28JUFD-448%29%E4%B8%8A%E3%81%8B%E3%82%89%E3%81%BE%E3%81%9F%E3%81%8C%E3%82%8A%E7%94%B7%E3%82%92%E7%8A%AF%E3%81%99_%E7%88%86%E4%B9%B3%E9%A8%8E%E4%B9%97%E4%BD%8D%E3%83%9C%E3%83%B3%E3%83%87%E3%83%BC%E3%82%B8_%E8%A5%BF%E6%A2%9D%E3%82%8B%E3%82%8A",
    },
    {
      name: "JUFD-448-AVI",
      size: "1.9GB",
      date: "2015-07-08",
      link: "magnet:?xt=urn:btih:81405C47C1BCBBF51A6B5E5012FFB687E0460FDE&dn=JUFD-448-AVI",
    },
    {
      name: "JUFD-448 .mkv HD",
      size: "4.36GB",
      date: "2015-03-07",
      link: "magnet:?xt=urn:btih:4569510F989AF90ACB466D0077E3A5A10CAF1134&dn=JUFD-448+.mkv",
    },
    {
      name: "JUFD-448 HD",
      size: "4.36GB",
      date: "2015-02-27",
      link: "magnet:?xt=urn:btih:F047DA07123F75DD09A8A923BCC450B3125C4F6F&dn=JUFD-448",
    },
  ],
  titleCN: "上方騎乘侵犯男性 爆乳騎乘位緊身衣 西條瑠璃",
  description_CN:
    "穿著緊身服的癡女主動跨坐男人身上，由上往下看著男人還同時以淫語刺激，再以騎乘位愛撫的全新系列展開!第一彈由爆乳女優西條瑠璃因體內慾望淫亂扭腰!穿上黑色皮衣跨坐男人身上以美臀壓迫!!還有緊身衣女醫跨坐到最愛的肉棒上性愛健診!淫亂家教老師穿著緊身套裝顏騎打手槍!爆乳癡女被激烈強暴性交!等等大量緊身衣癡女跨坐在男人身上作愛的畫面保証讓你爽翻天!",
  airav: {
    id: 60102,
    vid: "198661",
    slug: "zDJ4Xj",
    barcode: "JUFD-448",
    actors_name: "西條瑠璃",
    name: "上方騎乘侵犯男性 爆乳騎乘位緊身衣 西條瑠璃",
    img_url: "https://wiki-img.airav.wiki/storage/big_pic/198661.jpg",
    other_images: [],
    photo: null,
    publish_date: "2015-03-01",
    description:
      "穿著緊身服的癡女主動跨坐男人身上，由上往下看著男人還同時以淫語刺激，再以騎乘位愛撫的全新系列展開!第一彈由爆乳女優西條瑠璃因體內慾望淫亂扭腰!穿上黑色皮衣跨坐男人身上以美臀壓迫!!還有緊身衣女醫跨坐到最愛的肉棒上性愛健診!淫亂家教老師穿著緊身套裝顏騎打手槍!爆乳癡女被激烈強暴性交!等等大量緊身衣癡女跨坐在男人身上作愛的畫面保証讓你爽翻天!",
    actors: [
      {
        name: "西條瑠璃",
        name_cn: "西条瑠璃",
        name_jp: "西條るり",
        name_en: "Ruri Saijo",
        id: "8559",
      },
    ],
    images: [
      "https://wiki-img.airav.wiki/storage/sections/198661_001.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_002.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_003.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_004.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_005.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_006.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_007.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_008.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_009.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_010.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_011.jpg",
      "https://wiki-img.airav.wiki/storage/sections/198661_012.jpg",
    ],
    tags: [
      { name: "癡女" },
      { name: "巨乳" },
      { name: "騎乘位" },
      { name: "淫語" },
      { name: "AV女優片" },
      { name: "緊身皮衣" },
    ],
    factories: [{ name: "Fitch" }],
    maybe_like_videos: [
      {
        vid: "140532",
        slug: "EJ0yNZ",
        name: "過期6熟女嘗來別有風味！ 3",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/140532.jpg",
        barcode: "UD-845R",
      },
      {
        vid: "146769",
        slug: "H2gss9",
        name: "縱四方固騎乘位抽插不插拔3連續中出！！",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/146769.jpg",
        barcode: "GDHH-162",
      },
      {
        vid: "146775",
        slug: "K2Ya5M",
        name: "『難不成&hellip;是在引誘嗎？』在超商打工少妻的緊身巨臀實在太色了！！",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/146775.jpg",
        barcode: "HUNTA-634",
      },
      {
        vid: "150030",
        slug: "9Ixk2K",
        name: "禁慾30天爆發早洩妹絕頂幹砲 竹內乃愛",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/150030.jpg",
        barcode: "MIAE-180",
      },
      {
        vid: "150123",
        slug: "CeGmdY",
        name: "對5位禁插傳播妹忍不住塗精油幹翻內射 ERIKA 月本愛 今宮泉 天野美優 淺田結梨",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/150123.jpg",
        barcode: "OVG-074",
      },
      {
        vid: "150159",
        slug: "9vfolB",
        name: "型男朋友把妹回我家喝醉肏到爽",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/150159.jpg",
        barcode: "OYC-163",
      },
      {
        vid: "150516",
        slug: "QOz2OO",
        name: "最愛哥哥肉棒的巨尻妹 3",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/150516.jpg",
        barcode: "VRTM-338",
      },
      {
        vid: "150648",
        slug: "EFK286",
        name: "AV女優VS頂級真人娃娃 到底哪邊比較爽！ 夏目愛莉",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/150648.jpg",
        barcode: "DDK-171",
      },
      {
        vid: "150664",
        slug: "EYnn16",
        name: "想要零用錢妹妹幫素股！結果爽到自行插入肏到爽！",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/150664.jpg",
        barcode: "HUNTA-426",
      },
      {
        vid: "150676",
        slug: "lneyvV",
        name: "好友女友喝掛睡我家！換了衣服忍不住揉胸開肏！",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/150676.jpg",
        barcode: "OYC-169",
      },
      {
        vid: "150677",
        slug: "UdIuEn",
        name: "繼妹跟朋友找我在家練習聯誼來開肏！",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/150677.jpg",
        barcode: "OYC-171",
      },
      {
        vid: "151062",
        slug: "gpd69A",
        name: "三重換妻來開幹！灌醉女友來亂交",
        url: "",
        img_url: "https://wiki-img.airav.wiki/storage/big_pic/151062.jpg",
        barcode: "OYC-172",
      },
    ],
    qc_url:
      "http://iqqtv.net/player.php?cat=1&utm_source=wiki&fromsite=all.airwiki&jid=JUFD-448",
    view: 455,
    other_desc: null,
    video_url: {
      url_cdn:
        "https://freemsall.msjmpica.cc/mp4vod_path/rbhDXBB9DLosimL3vfmvwQ/1694361873/0/3600/183896/normal.mp4",
      url_hls_cdn:
        "https://cdn-freemsall.msjmpica.cc/hlsredirect/R9DBijcTeMojqF9MUtHBfw/1696712399/hls/183896/normal.3gp/index.m3u8",
    },
  },
  maybe_like_videos: [
    {
      vid: "140532",
      slug: "EJ0yNZ",
      name: "過期6熟女嘗來別有風味！ 3",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/140532.jpg",
      barcode: "UD-845R",
    },
    {
      vid: "146769",
      slug: "H2gss9",
      name: "縱四方固騎乘位抽插不插拔3連續中出！！",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/146769.jpg",
      barcode: "GDHH-162",
    },
    {
      vid: "146775",
      slug: "K2Ya5M",
      name: "『難不成&hellip;是在引誘嗎？』在超商打工少妻的緊身巨臀實在太色了！！",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/146775.jpg",
      barcode: "HUNTA-634",
    },
    {
      vid: "150030",
      slug: "9Ixk2K",
      name: "禁慾30天爆發早洩妹絕頂幹砲 竹內乃愛",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/150030.jpg",
      barcode: "MIAE-180",
    },
    {
      vid: "150123",
      slug: "CeGmdY",
      name: "對5位禁插傳播妹忍不住塗精油幹翻內射 ERIKA 月本愛 今宮泉 天野美優 淺田結梨",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/150123.jpg",
      barcode: "OVG-074",
    },
    {
      vid: "150159",
      slug: "9vfolB",
      name: "型男朋友把妹回我家喝醉肏到爽",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/150159.jpg",
      barcode: "OYC-163",
    },
    {
      vid: "150516",
      slug: "QOz2OO",
      name: "最愛哥哥肉棒的巨尻妹 3",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/150516.jpg",
      barcode: "VRTM-338",
    },
    {
      vid: "150648",
      slug: "EFK286",
      name: "AV女優VS頂級真人娃娃 到底哪邊比較爽！ 夏目愛莉",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/150648.jpg",
      barcode: "DDK-171",
    },
    {
      vid: "150664",
      slug: "EYnn16",
      name: "想要零用錢妹妹幫素股！結果爽到自行插入肏到爽！",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/150664.jpg",
      barcode: "HUNTA-426",
    },
    {
      vid: "150676",
      slug: "lneyvV",
      name: "好友女友喝掛睡我家！換了衣服忍不住揉胸開肏！",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/150676.jpg",
      barcode: "OYC-169",
    },
    {
      vid: "150677",
      slug: "UdIuEn",
      name: "繼妹跟朋友找我在家練習聯誼來開肏！",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/150677.jpg",
      barcode: "OYC-171",
    },
    {
      vid: "151062",
      slug: "gpd69A",
      name: "三重換妻來開幹！灌醉女友來亂交",
      url: "",
      img_url: "https://wiki-img.airav.wiki/storage/big_pic/151062.jpg",
      barcode: "OYC-172",
    },
  ],
};

const Detail = () => {
  const [visible, setVisible] = useState(false);
  const onClose = () => setVisible(false);
  const onOpen = (url: string) => {
    if (url?.endsWith("avi")) {
      window?.app?.invokeShell("openPath", url);
    } else {
      setVisible(true);
    }
  };

  const data = DICT.map((x) => {
    const key = <span style={{ fontSize: 16 }}>{x.name}</span>;
    if (x.code === "tags") {
      const ts = json[x.code] || [];
      console.log(ts);
      return {
        key,
        value: (
          <Space wrap>
            {ts.map((t: any) => {
              return (
                <Tag size="large" key={t.code}>
                  {t.name}
                </Tag>
              );
            })}
          </Space>
        ),
      };
    }
    if (x.code === "actress") {
      const actress = json[x.code] || [];
      return {
        key,
        value: (
          <Space wrap>
            {actress.map((t: any, i: number) => {
              return (
                <Popover
                  key={t.href}
                  content={
                    <Card
                      style={{ maxWidth: 180, cursor: "pointer" }}
                      cover={
                        <img src={fileSchemaUrl(json.localActress[i])}></img>
                      }
                    >
                      {actress[i].name_jp}
                    </Card>
                  }
                >
                  <Text underline key={t.code}>
                    <span style={{ fontSize: 16, color: "rgb(28, 31, 35)" }}>
                      {t.name}
                    </span>
                  </Text>
                </Popover>
              );
            })}
          </Space>
        ),
      };
    }
    if (x.code === "rating") {
      return {
        key,
        value: <Rating size="small" allowClear={true} defaultValue={4.1} />,
      };
    }

    if (x.code === "localSoursce") {
      return {
        key,
        value: (
          <>
            {json[x.code] ? (
              <Text link underline onClick={() => onOpen(json[x.code])}>
                <span style={{ fontSize: 16 }}>{json[x.code]}</span>
              </Text>
            ) : (
              "你还未获得该片"
            )}
          </>
        ),
      };
    }

    console.log(x.code, json[x.code]);
    return {
      key: <span style={{ fontSize: 16 }}>{x.name}</span>,
      value: json[x.code].text,
    };
  });

  return (
    <div>
      <Row gutter={[4, 16]}>
        <h2>{json?.outfit + "  " + json.titleCN || json.title} </h2>
      </Row>
      <Row gutter={[4, 16]}>
        <Col span={16}>
          <Card
            cover={
              <img alt="example" src={fileSchemaUrl(`${json.localCover}`)} />
            }
            title={json.name}
            bordered={false}
            bodyStyle={{ display: "none" }}
          />
        </Col>
        <Col span={7}>
          <Card bodyStyle={{ paddingTop: 0 }} bordered={false}>
            <p style={{ padding: "0 16px" }}>{json.description_CN}</p>
            <Descriptions data={data} />
            {/* <video controls width={300} height={200}>
              <source
                src={
                  "video:///Users/tao/Desktop/jav_spider/source/achj-012.mp4"
                  video:///Users/tao/Desktop/jav_spider/source/JUFD-448.avi
                }
              ></source>
            </video> */}
          </Card>
        </Col>
      </Row>
      <h3>样品图像</h3>
      <Row>
        <ImagePreview>
          {json.localPreviews.map((src: string, index: number) => {
            return (
              <Image
                key={index}
                src={fileSchemaUrl(src)}
                width={180}
                alt={`preview${index + 1}`}
                style={{ marginRight: 5 }}
              />
            );
          })}
        </ImagePreview>
      </Row>
      <h3>磁力链</h3>
      <Table
        bordered
        size="small"
        sticky={{ top: 60 }}
        scroll={{ y: 350 }}
        columns={[
          {
            title: "磁力链",
            dataIndex: "name",
            width: 450,
          },
          {
            title: "大小",
            dataIndex: "size",
            width: 120,
            // fixed: true,
          },

          {
            title: "更新日期",
            dataIndex: "date",
            width: 140,
            // fixed: true,
          },
          {
            title: "链接",
            dataIndex: "link",
            render: (text) => (
              <a
                href={text}
                style={{
                  display: "block",
                  width: "90%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {text}
              </a>
            ),
            // width: 140,
            // fixed: true,
          },
        ]}
        dataSource={json?.magnets}
        pagination={false}
      />
      {json?.airav?.maybe_like_videos ? <h3>也许还喜欢</h3> : null}
      <Row gutter={[10, 16]}>
        {json?.airav?.maybe_like_videos?.map((x) => {
          return (
            <Col key={x.barcode} span={6}>
              <Card
                bodyStyle={{
                  height: 60,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
                cover={<img src={x.img_url} />}
                title={x.barcode}
              >
                {x.name}
              </Card>
            </Col>
          );
        })}
      </Row>
      <div
        id="vedioModal"
        // style={{ position: "relative" }}
        className="semi-always-dark"
      >
        <Modal
          getPopupContainer={() =>
            document.querySelector("#vedioModal") || document.body
          }
          title={json.title}
          footer={null}
          fullScreen
          visible={visible}
          onOk={onClose}
          onCancel={onClose}
          bodyStyle={{ padding: 0 }}
        >
          <Player
            poster={fileSchemaUrl(json.localCover)}
            src={videoSchemaUrl(json.localSoursce)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Detail;
