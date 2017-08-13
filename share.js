;(function (window, document, undefined) {

  var templates = {
    qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}',
    qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}',
    tencent: 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
    weibo: 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
    wechat: 'javascript:',
    douban: 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
    diandian: 'http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link',
    linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
    facebook: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}',
    twitter: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}',
    google: 'https://plus.google.com/share?url={{URL}}'
  };

  window.socialUrl = function (site, data) {
    return makeUrl(site, data);
  };
  window.wechatQrcode = function (site, data) {
    return makeUrl(site, data);
  };

  /**
   * Create the wechat icon and QRCode.
   *
   * @param {Element} elem
   * @param {Object} data
   */
  function createWechat(elem, data) {
    var wechat = getElementsByClassName(elem, 'icon-wechat', 'a');

    if (wechat.length === 0) {
      return false;
    }

    var elems = createElementByString('<div class="wechat-qrcode"><h4>' + data.wechatQrcodeTitle + '</h4><div class="qrcode"></div><div class="help">' + data.wechatQrcodeHelper + '</div></div>');
    var qrcode = getElementsByClassName(elems[0], 'qrcode', 'div');

    wechat[0].appendChild(elems[0]);
    new QRCode(qrcode[0], {text: data.url, width: data.wechatQrcodeSize, height: data.wechatQrcodeSize});
  }

  /**
   * Build the url of icon.
   *
   * @param {String} name
   * @param {Object} data
   *
   * @returns {String}
   */
  function makeUrl(name, data) {
    data['summary'] = data['description'];

    return templates[name].replace(/\{\{(\w)(\w*)\}\}/g, function (m, fix, key) {
      var nameKey = name + fix + key.toLowerCase();
      key = (fix + key).toLowerCase();

      return encodeURIComponent((data[nameKey] === undefined ? data[key] : data[nameKey]) || '');
    });
  }


})(window, document);