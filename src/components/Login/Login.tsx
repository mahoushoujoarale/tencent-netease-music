import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import "./index.less";
import { getQrKey, getQrCode, checkQrState } from "@/apis/login";

const Login = (props: { handleCancel: any }) => {
  const { handleCancel } = props;
  const [qrKey, setQrKey] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [shouldUpdateKey, setShouldUpdateKey] = useState(false);
  const [qrState, setQrState] = useState(0);

  useEffect(() => {
    async function getData() {
      const {
        data: { unikey },
      } = await getQrKey();

      setQrKey(unikey);
    }
    getData();
  }, [shouldUpdateKey]);

  useEffect(() => {
    async function getData() {
      const {
        data: { qrimg },
      } = await getQrCode({
        key: qrKey,
      });

      setQrUrl(qrimg);
    }
    getData();
  }, [qrKey]);

  useEffect(() => {
    const timeId = setInterval(async () => {
      const { code } = await checkQrState({
        key: qrKey,
      });

      setQrState(code);

      if (code === 800) {
        console.log("过期了");
        clearInterval(timeId);
      } else if (code === 802) {
        console.log("等待确认");
      } else if (code === 803) {
        clearInterval(timeId);
        window.location.reload();
      } else if (code === 801) {
        // console.log(code);
      }
    }, 3000);

    return () => clearInterval(timeId);
  }, [qrKey]);

  return (
    <Modal
      className="login"
      visible={true}
      title="登录"
      onCancel={handleCancel}
      destroyOnClose
      mask={false}
      footer={null}
    >
      <div className="qr-guide">
        <div className="top">
          <TopBox
            qrState={qrState}
            qrUrl={qrUrl}
            getNewKey={() => {
              setShouldUpdateKey(!shouldUpdateKey);
            }}
          />
        </div>
        <div className="other-login-mode">选择其他登录模式</div>
      </div>
    </Modal>
  );
};

const TopBox = (props: {
  qrState: number;
  qrUrl: string;
  getNewKey: () => void;
}) => {
  const { qrState, qrUrl, getNewKey } = props;

  if (qrState !== 800 && qrState === 802) {
    return (
      <div className="confirm">
        <div className="confirm-img"></div>
        <div className="suc-text">扫描成功</div>
        <div className="confirm-flag">请在手机上确认登录</div>
      </div>
    );
  } else {
    return (
      <>
        <div className="phones"></div>
        <div className="right">
          <div className="login-title">扫码登录</div>
          <div className="qr-image">
            {qrState === 800 ? (
              <div className="qr-expired">
                <div className="expired-tip">二维码已失效</div>
                <div className="update-button" onClick={getNewKey}>
                  点击刷新
                </div>
              </div>
            ) : (
              <></>
            )}
            <img src={qrUrl} alt="二维码" />
          </div>

          <div className="tips">
            使用
            <a
              href="https://music.163.com/#/download"
              target="_blank"
              rel="noreferrer"
              className="link-to-download"
            >
              网易云音乐APP
            </a>
            扫码登录
          </div>
        </div>
      </>
    );
  }
};

export default Login;
