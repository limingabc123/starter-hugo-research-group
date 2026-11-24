---
title: Seminar | UNIC Group
type: landing

sections:
  - block: markdown
    content:
      title: 组会分享
      subtitle: ''
      text: <style>@import "./style.css"</style><div id=mask><div id=mask-container><form id=form-container onsubmit=submitPwd()><div id=password-div><div><label id=password-label><span>密码</span><input type=password id=pwdBox name=pwdBox class="filter-search form-control form-control-sm"><input type=button id=pwd-confirm value=确认 onclick=submitPwd()></label><label id=show-password-label><input type=checkbox id=showPassword onclick=togglePasswordVisibility()>显示密码</label></div></div></form></div></div><div id=content></div><script type=text/javascript src=./sha256.js></script><script type=text/javascript src=./read.js?v=20261124></script><script type=text/javascript>window.onload=function(){document.getElementById("pwdBox").style.width="calc(100%-4rem)"};function togglePasswordVisibility(){var e=document.getElementById("pwdBox"),t=document.getElementById("showPassword");t.checked?e.type="text":e.type="password"}async function submitPwd(){if(SHA256(document.getElementById("pwdBox").value.toUpperCase())=="ef271b641bd639249d33fad6401aa5f4ddad6c99bf0ae4ac8f40facae58dc9c0"){console.log("Welcome!"),document.getElementById("mask").remove();var e=await read();document.getElementById("content").innerHTML=e}}</script>

    design:
      columns: '1'
---
