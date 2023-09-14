export const getAstro = (str = "") => {
  if (!str) {
    return {};
  }
  // eslint-disable-next-line no-unsafe-optional-chaining
  const [, m, d] = str?.split("-");
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
  const index = m - (d < "102223444433".charAt(m - 1) - -19);
  return DICT[index];
  //输出0～12的数字，0表示摩羯，1表示水瓶，依此类推，...，11是射手，12是摩羯。
};

export const getAge = (birthday) => {
  if (birthday) {
    // var str = birthday;
    birthday = birthday.split("-");
    // 新建日期对象
    let date = new Date();
    // 今天日期，数组，同 birthday
    let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    // 分别计算年月日差值
    let age = today.map((val, index) => {
      return val - birthday[index];
    });
    // 当天数为负数时，月减 1，天数加本月总天数
    if (age[2] < 0) {
      // 获取当月总天数的方法
      let curMonth = new Date(today[0], today[1], 0);
      age[1]--;
      age[2] += curMonth.getDate();
    }
    // 当月数为负数时，年减 1，月数加上 12
    if (age[1] < 0) {
      age[0]--;
      age[1] += 12;
    }
    // console.log("出生日期：" + str + "  岁数：" + age[0] + "岁");
    return age[0];
  }
};
