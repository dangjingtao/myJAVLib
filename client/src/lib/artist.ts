import dayjs from "dayjs";
import type { Record } from "@/types/artist";
export const getComplete = (record: Record): number => {
  if (!record) return 0;
  const dict = {
    name: 1 / 17,
    debut: 0.05,
    avatar: 1 / 17,
    cover: 1 / 10,
    description: 0.1,
    birth: 0.05,
    tall: 0.05,
    breast: 0.03,
    waist: 0.03,
    hip: 0.03,
    cup: 0.04,
    birth_place: 0.01,
    images: 0.12,
    tags: 0.08,
    nameJP: 0.1,
    name_EN: 0.02,
    name_CN: 0.02,
    rate: 0.05,
    isRetired: 0.02,
  };
  let ret = 1;
  Object.entries(dict).forEach(([key, val]) => {
    if (record[key] === null || record[key] === "") {
      ret -= val;
    }
  });
  ret = Math.round(1000 * ret) / 10;
  return ret;
};

export const getStoreCount = (text: string | null) => {
  const cur = text?.replaceAll("\\", "").replaceAll('"', "");
  let count = 0;
  if (cur) {
    count = cur.split(",").length;
  }
  return count;
};

export const getAstro = (str = "") => {
  if (!str) {
    return {};
  }
  // eslint-disable-next-line no-unsafe-optional-chaining
  const [, m, d]: string[] = str?.split("-");
  if (!m || !d) {
    return {};
  }
  const DICT = [
    { name: "魔羯座", emoji: "♑️" },
    { name: "水瓶座", emoji: "♒️" },
    { name: "双鱼座", emoji: "♓️" },
    { name: "牡羊座", emoji: "♈️" },
    { name: "金牛座", emoji: "♉️" },
    { name: "双子座", emoji: "♊️" },
    { name: "巨蟹座", emoji: "♋️" },
    { name: "狮子座", emoji: "♌️" },
    { name: "处女座", emoji: "♍️" },
    { name: "天秤座", emoji: "♎" },
    { name: "天蝎座", emoji: "♏️" },
    { name: "射手座", emoji: "♐️" },
    { name: "魔羯座", emoji: "♑️" },
  ];
  const index: number =
    Number(m) -
    (Number(d) < Number("102223444433".charAt(Number(m) - 1)) - -19);
  return DICT[index];
  //输出0～12的数字，0表示摩羯，1表示水瓶，依此类推，...，11是射手，12是摩羯。
};

export const getAge = (birthday?: string): number => {
  if (birthday && birthday !== "0000-00-00") {
    // 设置出生日期
    const birthDate = dayjs(birthday);
    // 获取当前日期
    const currentDate = dayjs();
    // 计算年龄
    const age = currentDate.diff(birthDate, "year");
    return age;
  }
  return -1;
};
