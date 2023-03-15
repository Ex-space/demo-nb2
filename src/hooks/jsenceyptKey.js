import JsEncrypt from 'jsencrypt'

export default (app) => {
  app.config.globalProperties.$encruption = function(obj) {
    const encrypt = new JsEncrypt()
    encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
                MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+3KLwjM7fmh5loWVzJO+V3VRF
                qorVcooli5/VQY0T1YsL8gAH3F0WCDlW2XyPo9u6aQ7gFOQzmAIPL3smEv6CygmZ
                bGegAtw1P41A+JfltiZuWCZLzUflERa8GghQo0TCBahOITvjF0QMeBuEfUYNdCzI
                iz3UGV4FNnf75VZCyQIDAQAB
                -----END PUBLIC KEY-----`)
    return encrypt.encrypt(obj)
  }
}