module.exports = async function (e, info) {
  const { username, password } = info;
  const { response, win, sequelize } = this;
  const {
    models: { user },
  } = sequelize;
  const user_result = await user.findAll({
    where: {
      username,
      password,
    },
  });

  if (user_result.length > 0) {
    win.setSize(1200, 900);
    win.setResizable(true);
    return response.success(user_result[0]);
  } else {
    console.log(response.error);
    return response.error({ code: 401, message: "账号密码不匹配" });
  }
};
