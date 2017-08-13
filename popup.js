// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function click(e) {
  chrome.tabs.getSelected(null, function (tab) {
    console.log(tab);
    var curUrl = tab.url;
    var target = e.target.id;
    if (target === "wechat") {
      createWechat(curUrl, 100, 100)
    } else {
      var data = {
        url: curUrl,
        title: tab.title,
        description: "description"
      };
      var url = socialUrl(e.target.id, data);
      console.log(url);
      var popupWidth = 600;
      var popupHeight = 500;
      createWindow(url, popupWidth, popupHeight)
    }
  });
}

function createWindow(url, width, height) {
  chrome.windows.create({
    url: url,
    type: "popup",
    width: width,
    height: height,
    // left: left,
    // top: top,
    focused: true
  }, function (window) {

  });
}

function createWechat(url, width, height) {
  var wechatQrcode = document.getElementById("wechatQrcode");
  new QRCode(wechatQrcode, {text: url, width: width, height: height});
  wechatQrcode.style.display = "block";
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
