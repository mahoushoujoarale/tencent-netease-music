import "./index.less";
import { links, copys } from "./data";
import police from "@/assets/images/police.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="left">
          <ul className="links">
            {links.map((item) => {
              return (
                <li key={item.name}>
                  <a href={item.href} className="link">
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div>
            <div>网易公司版权所有©1997-2021</div>
            <div>杭州乐读科技有限公司运营：</div>
            <a href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png">
              浙网文[2021] 1186-054号
            </a>
          </div>
          <div>
            <div>违法和不良信息举报电话：0571-89853516</div>
            <div>举报邮箱:&nbsp;</div>
            <a href="/#">ncm5990@163.com</a>
          </div>
          <div>
            <a href="https://beian.miit.gov.cn/#/Integrated/index">
              粤B2-20090191-18 工业和信息化部备案管理系统网站
            </a>
            <span>
              <img src={police} alt="police" className="police" />
            </span>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564">
              浙公网安备 33010902002564号
            </a>
          </div>
        </div>
        <div className="right">
          <ul className="icons">
            {copys.map((item) => {
              return (
                <li className={`icon icon-${item.name}`} key={item.name}>
                  <a href={item.href}>{item.name}</a>
                  <span></span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
