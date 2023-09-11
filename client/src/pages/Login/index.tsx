/* ts-ignore */
import { Form, Col, Row, Button, Toast } from "@douyinfe/semi-ui";
import { IconGithubLogo, IconClose } from "@douyinfe/semi-icons";
import classNames from "classnames";
import styles from "./styles.module.less";
import { useNavigate } from "react-router-dom";
import Titilebar from "@/components/Titlebar";

const Login = () => {
  // const { Option } = Form.Select;
  const [formVal, setFormVal] = useState({});
  const navigate = useNavigate();
  const ref = useRef();
  const login = async () => {
    const { formApi } = ref.current;
    await formApi.validate();

    // eslint-disable-next-line no-unsafe-optional-chaining
    const res = (await window.app?.login(formVal)) || {};
    const { success } = res;
    // // console.log(success);
    if (success) {
      localStorage.setItem("login", "true");
      navigate("/home");
    } else {
      Toast.error(res.message || "未知错误");
    }
  };

  return (
    <div className={styles.canDrag}>
      <Titilebar type={"login"} />
      <Row className={styles.contentBox}>
        <Col span={20} offset={2}>
          <div style={{ width: 200, margin: "30px auto 20px" }}>
            <div style={{ width: "200px", margin: "auto" }}>
              <img style={{ width: "100%" }} src="/logo.png" alt="" />
              {/* <IconGithubLogo style={{ fontSize: 100 }} /> */}
            </div>
            {/* <h1 className={styles.brand}>MYJAVLIB</h1> */}
          </div>
          <Form ref={ref} className={styles.noDrag} onValueChange={setFormVal}>
            {/* <Form.Select
              noLabel
              field="Role"
              placeholder="角色"
              style={{ width: "100%" }}
            >
              <Option value="admin">管理员</Option>
              <Option value="user">普通用户</Option>
              <Option value="guest">访客</Option>
            </Form.Select> */}
            <Form.Input
              required
              noLabel
              field="username"
              placeholder="账号"
              rules={[{ required: true, message: "请输入帐号" }]}
            />
            <Form.Input
              required
              type="password"
              noLabel
              field="password"
              placeholder="密码"
              rules={[{ required: true, message: "请输入密码" }]}
            />
            <div className={classNames(styles.loginBtn, styles.noDrag)}>
              <Button onClick={login} theme="solid" type="primary" block>
                登录
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
