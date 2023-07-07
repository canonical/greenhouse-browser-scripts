// ==UserScript==
// @name         Greenhouse Application Review Helper
// @namespace    https://canonical.com/
// @version      0.1.12
// @description  Add's hints to application custom question answers
// @author       Anthony Dillon
// @icon         https://icons.duckduckgo.com/ip3/greenhouse.io.ico
// @updateURL    https://raw.githubusercontent.com/anthonydillon/greenhouse-app-review-script/main/application-review-helper.user.js
// @downloadURL  https://raw.githubusercontent.com/anthonydillon/greenhouse-app-review-script/main/application-review-helper.user.js
// @grant        none
// @match        https://canonical.greenhouse.io/applications/review/*
// ==/UserScript==

(function () {
    "use strict";

    var divNode = document.createElement("div");
    divNode.innerHTML = `
  <style>
  [data-provides^="question-"] {
      background-repeat: no-repeat;
      padding-left: 35px;
      background-position-y: 7px;
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQwcHgiIHZpZXdCb3g9IjAgMCA0MCA0MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7IiB4PSIwcHgiIHk9IjBweCI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwogICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc3BpbiB7CiAgICAgICAgICAgICAgZnJvbSB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTM1OWRlZykKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgQGtleWZyYW1lcyBzcGluIHsKICAgICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNTlkZWcpCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7CiAgICAgICAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjVzIGxpbmVhciBpbmZpbml0ZTsKICAgICAgICAgICAgICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuOwogICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBzcGluIDEuNXMgbGluZWFyIGluZmluaXRlOwogICAgICAgICAgICB9CiAgICAgICAgXV0+PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJvdXRlciI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwwQzIyLjIwNTgsMCAyMy45OTM5LDEuNzg4MTMgMjMuOTkzOSwzLjk5MzlDMjMuOTkzOSw2LjE5OTY4IDIyLjIwNTgsNy45ODc4MSAyMCw3Ljk4NzgxQzE3Ljc5NDIsNy45ODc4MSAxNi4wMDYxLDYuMTk5NjggMTYuMDA2MSwzLjk5MzlDMTYuMDA2MSwxLjc4ODEzIDE3Ljc5NDIsMCAyMCwwWiIgc3R5bGU9ImZpbGw6YmxhY2s7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNNS44NTc4Niw1Ljg1Nzg2QzcuNDE3NTgsNC4yOTgxNSA5Ljk0NjM4LDQuMjk4MTUgMTEuNTA2MSw1Ljg1Nzg2QzEzLjA2NTgsNy40MTc1OCAxMy4wNjU4LDkuOTQ2MzggMTEuNTA2MSwxMS41MDYxQzkuOTQ2MzgsMTMuMDY1OCA3LjQxNzU4LDEzLjA2NTggNS44NTc4NiwxMS41MDYxQzQuMjk4MTUsOS45NDYzOCA0LjI5ODE1LDcuNDE3NTggNS44NTc4Niw1Ljg1Nzg2WiIgc3R5bGU9ImZpbGw6cmdiKDIxMCwyMTAsMjEwKTsiLz4KICAgICAgICA8L2c+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwzMi4wMTIyQzIyLjIwNTgsMzIuMDEyMiAyMy45OTM5LDMzLjgwMDMgMjMuOTkzOSwzNi4wMDYxQzIzLjk5MzksMzguMjExOSAyMi4yMDU4LDQwIDIwLDQwQzE3Ljc5NDIsNDAgMTYuMDA2MSwzOC4yMTE5IDE2LjAwNjEsMzYuMDA2MUMxNi4wMDYxLDMzLjgwMDMgMTcuNzk0MiwzMi4wMTIyIDIwLDMyLjAxMjJaIiBzdHlsZT0iZmlsbDpyZ2IoMTMwLDEzMCwxMzApOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksMjguNDkzOUMzMC4wNTM2LDI2LjkzNDIgMzIuNTgyNCwyNi45MzQyIDM0LjE0MjEsMjguNDkzOUMzNS43MDE5LDMwLjA1MzYgMzUuNzAxOSwzMi41ODI0IDM0LjE0MjEsMzQuMTQyMUMzMi41ODI0LDM1LjcwMTkgMzAuMDUzNiwzNS43MDE5IDI4LjQ5MzksMzQuMTQyMUMyNi45MzQyLDMyLjU4MjQgMjYuOTM0MiwzMC4wNTM2IDI4LjQ5MzksMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxMDEsMTAxLDEwMSk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMy45OTM5LDE2LjAwNjFDNi4xOTk2OCwxNi4wMDYxIDcuOTg3ODEsMTcuNzk0MiA3Ljk4NzgxLDIwQzcuOTg3ODEsMjIuMjA1OCA2LjE5OTY4LDIzLjk5MzkgMy45OTM5LDIzLjk5MzlDMS43ODgxMywyMy45OTM5IDAsMjIuMjA1OCAwLDIwQzAsMTcuNzk0MiAxLjc4ODEzLDE2LjAwNjEgMy45OTM5LDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoMTg3LDE4NywxODcpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTUuODU3ODYsMjguNDkzOUM3LjQxNzU4LDI2LjkzNDIgOS45NDYzOCwyNi45MzQyIDExLjUwNjEsMjguNDkzOUMxMy4wNjU4LDMwLjA1MzYgMTMuMDY1OCwzMi41ODI0IDExLjUwNjEsMzQuMTQyMUM5Ljk0NjM4LDM1LjcwMTkgNy40MTc1OCwzNS43MDE5IDUuODU3ODYsMzQuMTQyMUM0LjI5ODE1LDMyLjU4MjQgNC4yOTgxNSwzMC4wNTM2IDUuODU3ODYsMjguNDkzOVoiIHN0eWxlPSJmaWxsOnJnYigxNjQsMTY0LDE2NCk7Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxnPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYuMDA2MSwxNi4wMDYxQzM4LjIxMTksMTYuMDA2MSA0MCwxNy43OTQyIDQwLDIwQzQwLDIyLjIwNTggMzguMjExOSwyMy45OTM5IDM2LjAwNjEsMjMuOTkzOUMzMy44MDAzLDIzLjk5MzkgMzIuMDEyMiwyMi4yMDU4IDMyLjAxMjIsMjBDMzIuMDEyMiwxNy43OTQyIDMzLjgwMDMsMTYuMDA2MSAzNi4wMDYxLDE2LjAwNjFaIiBzdHlsZT0iZmlsbDpyZ2IoNzQsNzQsNzQpOyIvPgogICAgICAgIDwvZz4KICAgICAgICA8Zz4KICAgICAgICAgICAgPHBhdGggZD0iTTI4LjQ5MzksNS44NTc4NkMzMC4wNTM2LDQuMjk4MTUgMzIuNTgyNCw0LjI5ODE1IDM0LjE0MjEsNS44NTc4NkMzNS43MDE5LDcuNDE3NTggMzUuNzAxOSw5Ljk0NjM4IDM0LjE0MjEsMTEuNTA2MUMzMi41ODI0LDEzLjA2NTggMzAuMDUzNiwxMy4wNjU4IDI4LjQ5MzksMTEuNTA2MUMyNi45MzQyLDkuOTQ2MzggMjYuOTM0Miw3LjQxNzU4IDI4LjQ5MzksNS44NTc4NloiIHN0eWxlPSJmaWxsOnJnYig1MCw1MCw1MCk7Ii8+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
      background-size: 24px 24px;
  }

  [data-provides^="question-"] + [data-provides^="question-"] {
      padding-top: 0;
      margin-top: 14px;
  }

  .pebble {
      animation: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true' alt='Strong Yes' aria-label='Strong Yes' class='sc-gsnTZi bgHjIp strong_yes' style=' document.querySelector(&quot;%23stages %3E tbody %3E tr: nth-child(7) %3E td.details %3E div %3E div %3E span %3E svg&quot;);%0A'%3E%3Ctitle%3EStrong Yes%3C/title%3E%3Cpath d='M5.65195 22.2841C5.36395 22.2841 5.07595 22.1881 4.82395 22.0081C4.31995 21.6361 4.12795 21.0001 4.33195 20.4121L6.65995 13.8841L2.36395 10.6441C1.87195 10.2721 1.67995 9.66009 1.87195 9.08409C2.06395 8.50809 2.59195 8.12409 3.20395 8.12409H8.72395L10.68 2.65209C10.884 2.08809 11.4 1.72809 12 1.72809C12.6 1.72809 13.116 2.08809 13.32 2.65209L15.276 8.12409H20.808C21.42 8.12409 21.936 8.49609 22.14 9.08409C22.332 9.66009 22.14 10.2841 21.648 10.6441L17.34 13.8721L19.668 20.4001C19.872 20.9881 19.68 21.6241 19.176 21.9961C18.672 22.3681 18 22.3681 17.508 21.9841L12 17.8681L6.49195 21.9961C6.25195 22.1881 5.95195 22.2841 5.65195 22.2841Z' fill='%2373C2B0'%3E%3C/path%3E%3Cpath d='M5.65201 22.2841C5.36401 22.2841 5.07601 22.1881 4.82401 22.0081C4.32001 21.6361 4.12801 21.0001 4.33201 20.4121L6.66001 13.8841L2.36401 10.6441C1.87201 10.2721 1.68001 9.66006 1.87201 9.08406C2.06401 8.50806 2.59201 8.12406 3.20401 8.12406H8.72401L10.68 2.65206C10.884 2.08806 11.4 1.72806 12 1.72806C12.6 1.72806 13.116 2.08806 13.32 2.65206L15.276 8.12406H20.808C21.42 8.12406 21.936 8.49606 22.14 9.08406C22.332 9.66006 22.14 10.2841 21.648 10.6441L17.34 13.8721L19.668 20.4001C19.872 20.9881 19.68 21.6241 19.176 21.9961C18.672 22.3681 18 22.3681 17.508 21.9841L12 17.8681L6.49201 21.9961C6.25201 22.1881 5.95201 22.2841 5.65201 22.2841ZM3.21601 9.52806L7.80001 12.9601C8.12401 13.2001 8.25601 13.6201 8.11201 14.0041L5.66401 20.8561L11.436 16.5241C11.76 16.2841 12.216 16.2841 12.54 16.5241L18.312 20.8561L15.864 14.0041C15.732 13.6201 15.852 13.2001 16.176 12.9601L20.76 9.52806H14.916C14.532 9.52806 14.172 9.27606 14.052 8.91606L12 3.14406L9.93601 8.91606C9.80401 9.28806 9.45601 9.52806 9.07201 9.52806H3.21601V9.52806Z' fill='%2315372C'%3E%3C/path%3E%3C/svg%3E");
  }
  .ninja {
      animation: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true' alt='Yes' aria-label='Yes' class='sc-gsnTZi bgHjIp yes'%3E%3Ctitle%3EYes%3C/title%3E%3Cpath d='M7 10L7.5 11.5L9.5 10.5L11.5 9L12.5 3.5H15V8.5H21V20.5H13L11 19H8L7 20.5H2.5V10H7Z' fill='%23ADE1D4'%3E%3C/path%3E%3Cpath d='M22.1639 12.8881C22.1639 12.3841 21.9959 11.9041 21.6839 11.4961C21.6119 11.4001 21.6119 11.2561 21.6839 11.1601C21.9959 10.7641 22.1639 10.2841 22.1639 9.76811C22.1639 8.52011 21.1559 7.51211 19.9079 7.51211H17.6759H15.7559C15.7199 7.51211 15.6839 7.47611 15.6839 7.44011V4.88411C15.6839 3.63611 14.6759 2.62811 13.4279 2.62811C12.1799 2.62811 11.1719 3.63611 11.1719 4.88411V6.66011C11.1599 8.60411 9.74394 10.2241 7.89594 10.5601V10.5481C7.89594 9.73211 7.23594 9.07211 6.41994 9.07211H3.31194C2.49594 9.07211 1.83594 9.73211 1.83594 10.5481V19.8841C1.83594 20.7001 2.49594 21.3601 3.31194 21.3601H6.40794C7.22394 21.3601 7.88394 20.7001 7.88394 19.8841V19.8121H10.2959C10.4999 19.8121 10.9079 20.1241 11.2319 20.3761C11.8439 20.8441 12.5399 21.3721 13.4159 21.3721H17.6759H19.9079C21.1559 21.3721 22.1639 20.3641 22.1639 19.1161C22.1639 18.6121 21.9959 18.1321 21.6839 17.7241C21.6119 17.6281 21.6119 17.4841 21.6839 17.3881C21.9959 16.9921 22.1639 16.5121 22.1639 15.9961C22.1639 15.4921 21.9959 15.0121 21.6839 14.6041C21.6119 14.5081 21.6119 14.3641 21.6839 14.2681C22.0079 13.8721 22.1639 13.3921 22.1639 12.8881ZM6.49194 19.7401C6.49194 19.8601 6.39594 19.9561 6.27594 19.9561H3.45594C3.33594 19.9561 3.23994 19.8601 3.23994 19.7401V10.6921C3.23994 10.5721 3.33594 10.4761 3.45594 10.4761H6.26394C6.38394 10.4761 6.47994 10.5721 6.47994 10.6921V19.7401H6.49194ZM20.5799 12.3601C20.6999 12.5161 20.7599 12.6961 20.7599 12.8881C20.7599 13.0801 20.6999 13.2601 20.5799 13.4161C20.1119 14.0281 20.1119 14.8681 20.5799 15.4801C20.6999 15.6361 20.7599 15.8161 20.7599 16.0081C20.7599 16.2001 20.6999 16.3801 20.5799 16.5361C20.1119 17.1481 20.1119 17.9881 20.5799 18.6001C20.6999 18.7561 20.7599 18.9361 20.7599 19.1281C20.7599 19.5961 20.3759 19.9801 19.9079 19.9801H17.6759H13.4159C13.0199 19.9801 12.5519 19.6201 12.0959 19.2721C11.5439 18.8521 10.9799 18.4201 10.3079 18.4201H8.11194C7.99194 18.4201 7.89594 18.3241 7.89594 18.2041V12.1921C7.89594 12.0841 7.96794 11.9881 8.07594 11.9761C10.6199 11.5561 12.5639 9.33611 12.5639 6.67211V4.90811C12.5639 4.46411 12.8879 4.08011 13.3319 4.03211C13.8359 3.98411 14.2679 4.38011 14.2679 4.88411V7.44011C14.2679 8.25611 14.9279 8.91611 15.7439 8.91611H17.6639H19.8959C20.3639 8.91611 20.7479 9.30011 20.7479 9.76811C20.7479 9.96011 20.6879 10.1401 20.5679 10.2961C20.1119 10.9081 20.1119 11.7481 20.5799 12.3601Z' fill='%2315372C'%3E%3C/path%3E%3C/svg%3E");
  }
  .mamba {
      animation: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true' alt='No' aria-label='No' class='sc-gsnTZi bgHjIp no'%3E%3Ctitle%3ENo%3C/title%3E%3Cpath d='M7 14L7.5 12.5L9.5 13.5L11.5 15L12.5 20.5H15V15.5H21V3.5H13L11 5H8L7 3.5H2.5V14H7Z' fill='%23F9C9C5'%3E%3C/path%3E%3Cpath d='M21.696 9.72C21.624 9.624 21.624 9.48 21.696 9.384C22.008 8.988 22.176 8.508 22.176 7.992C22.176 7.488 22.008 7.008 21.696 6.6C21.624 6.504 21.624 6.36 21.696 6.264C22.008 5.868 22.176 5.388 22.176 4.872C22.176 3.624 21.168 2.616 19.92 2.616H17.688H13.428C12.552 2.616 11.856 3.144 11.244 3.612C10.92 3.864 10.512 4.176 10.308 4.176H7.896V4.104C7.896 3.288 7.236 2.628 6.42 2.628H3.312C2.496 2.628 1.836 3.288 1.836 4.104V13.44C1.836 14.256 2.496 14.916 3.312 14.916H6.408C7.224 14.916 7.884 14.256 7.884 13.44C9.732 13.776 11.148 15.396 11.148 17.34V19.116C11.148 20.364 12.156 21.372 13.404 21.372C14.652 21.372 15.66 20.364 15.66 19.116V16.56C15.66 16.524 15.696 16.488 15.732 16.488H17.652H19.884C21.132 16.488 22.14 15.48 22.14 14.232C22.14 13.728 21.972 13.248 21.66 12.84C21.588 12.744 21.588 12.6 21.66 12.504C21.972 12.108 22.14 11.628 22.14 11.112C22.14 10.596 22.008 10.128 21.696 9.72ZM6.492 13.308C6.492 13.428 6.396 13.524 6.276 13.524H3.456C3.336 13.524 3.24 13.428 3.24 13.308V4.26C3.24 4.14 3.336 4.044 3.456 4.044H6.264C6.384 4.044 6.48 4.14 6.48 4.26V13.308H6.492ZM20.58 13.704C20.7 13.86 20.76 14.04 20.76 14.232C20.76 14.7 20.376 15.084 19.908 15.084H17.676H15.756C14.94 15.084 14.28 15.744 14.28 16.56V19.116C14.28 19.608 13.848 20.016 13.344 19.968C12.9 19.932 12.576 19.536 12.576 19.092V17.34C12.576 14.676 10.632 12.468 8.088 12.036C7.98 12.024 7.908 11.928 7.908 11.82V5.808C7.908 5.688 8.004 5.592 8.124 5.592H10.308C10.98 5.592 11.544 5.16 12.096 4.74C12.552 4.392 13.02 4.032 13.416 4.032H17.676H19.908C20.376 4.032 20.76 4.416 20.76 4.884C20.76 5.076 20.7 5.256 20.58 5.412C20.112 6.024 20.112 6.864 20.58 7.476C20.7 7.632 20.76 7.812 20.76 8.004C20.76 8.196 20.7 8.376 20.58 8.532C20.112 9.144 20.112 9.984 20.58 10.596C20.7 10.752 20.76 10.932 20.76 11.124C20.76 11.316 20.7 11.496 20.58 11.652C20.112 12.252 20.112 13.092 20.58 13.704Z' fill='%2315372C'%3E%3C/path%3E%3C/svg%3E");
  }
  .pecise {
      animation: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true' alt='Definitely Not' aria-label='Definitely Not' class='sc-gsnTZi bgHjIp strong_no'%3E%3Ctitle%3EDefinitely Not%3C/title%3E%3Cpath d='M12.0001 22.776C6.06012 22.776 1.22412 17.94 1.22412 12C1.22412 6.06 6.06012 1.224 12.0001 1.224C17.9401 1.224 22.7761 6.06 22.7761 12C22.7761 17.94 17.9401 22.776 12.0001 22.776Z' fill='%23EE9089'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.224 12C1.224 17.94 6.06 22.776 12 22.776C17.94 22.776 22.776 17.94 22.776 12C22.776 6.06 17.94 1.224 12 1.224C6.06 1.224 1.224 6.06 1.224 12ZM2.628 12C2.628 6.828 6.828 2.628 12 2.628C17.172 2.628 21.372 6.828 21.372 12C21.372 17.172 17.172 21.372 12 21.372C6.828 21.372 2.628 17.172 2.628 12ZM14.616 8.38805C14.88 8.12405 15.312 8.08805 15.588 8.34005C15.9 8.61605 15.912 9.08405 15.624 9.36005L13.128 11.8321C13.044 11.9161 13.044 12.0601 13.128 12.1441L15.6 14.6161C15.876 14.8921 15.876 15.3361 15.6 15.6121C15.468 15.7441 15.288 15.8161 15.108 15.8161C14.928 15.8161 14.748 15.7441 14.616 15.6121L12.144 13.1401C12.06 13.0561 11.916 13.0561 11.832 13.1401L9.36 15.6121C9.228 15.7441 9.048 15.8161 8.868 15.8161C8.688 15.8161 8.508 15.7441 8.376 15.6121C8.1 15.3361 8.1 14.8921 8.376 14.6161L10.848 12.1441C10.932 12.0601 10.932 11.9161 10.848 11.8321L8.376 9.36005C8.088 9.07205 8.1 8.60405 8.412 8.34005C8.688 8.08805 9.12 8.12405 9.384 8.38805L11.844 10.8481C11.928 10.9321 12.072 10.9321 12.156 10.8481L14.616 8.38805Z' fill='%2315372C'%3E%3C/path%3E%3C/svg%3E");
  }
  .elephant {
      animation: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' aria-hidden='true' alt='No Decision' aria-label='No Decision' class='sc-gsnTZi bgHjIp no-decision'%3E%3Ctitle%3ENo Decision%3C/title%3E%3Cpath d='M2.62805 12C2.62805 17.172 6.82805 21.372 12.0001 21.372C17.1721 21.372 21.3721 17.172 21.3721 12C21.3721 6.82799 17.1721 2.62799 12.0001 2.62799C6.82805 2.62799 2.62805 6.82799 2.62805 12Z' fill='%23E0E5E3'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.224C6.06 1.224 1.224 6.06 1.224 12C1.224 17.94 6.06 22.776 12 22.776C17.94 22.776 22.776 17.94 22.776 12C22.776 6.06 17.94 1.224 12 1.224ZM12 21.372C6.828 21.372 2.628 17.172 2.628 12C2.628 6.828 6.828 2.628 12 2.628C17.172 2.628 21.372 6.828 21.372 12C21.372 17.172 17.172 21.372 12 21.372ZM12 18.2041C12.5104 18.2041 12.924 17.7905 12.924 17.2801C12.924 16.7698 12.5104 16.3561 12 16.3561C11.4897 16.3561 11.076 16.7698 11.076 17.2801C11.076 17.7905 11.4897 18.2041 12 18.2041ZM8.29196 8.04009C8.71196 6.26409 10.368 4.96809 12.3 5.11209C14.172 5.25609 15.684 6.79209 15.792 8.66409C15.9 10.5601 14.616 12.1801 12.864 12.5881C12.768 12.6121 12.696 12.7081 12.696 12.8041V14.4001C12.696 14.7841 12.384 15.0961 12 15.0961H11.988C11.604 15.0961 11.292 14.7841 11.292 14.4001V11.9401C11.292 11.5801 11.58 11.2921 11.94 11.2921C13.236 11.2921 14.364 10.2481 14.388 8.95209C14.412 7.59609 13.332 6.49209 11.988 6.49209C10.848 6.49209 9.88796 7.28409 9.64796 8.35209C9.57596 8.67609 9.28796 8.89209 8.96396 8.89209C8.51996 8.89209 8.19596 8.47209 8.29196 8.04009Z' fill='%2315372C'%3E%3C/path%3E%3C/svg%3E");
  }
  </style>`;
    document.body.appendChild(divNode);

    const reviewContainer = document.querySelector(
        'div[data-provides="app-review"]'
    );

    function run() {
        if (reviewContainer) {
            const questions = reviewContainer.querySelectorAll(
                'div[data-provides^="question-"'
            );
            questions.forEach(function (question) {
                const questionText = question.querySelector("strong").innerText;
                const answer = question.querySelector("p").innerText;
                clearClass(question);
                if (questionText.startsWith("Describe")) {
                    question.classList.add(textReview(answer));
                } else {
                    switch (true) {
                        case /Are you due to graduate soon, or have you graduated from university in the past two years\?/.test(questionText):
                            question.classList.add("elephant");
                            break;
                        case /What time zone are you in\?/.test(questionText):
                            question.classList.add("elephant");
                            break;
                        case /What is your degree result\?/.test(questionText):
                            question.classList.add(degreeReview(answer));
                            break;
                        case /How did you do in maths, physics or computer science at high school\?/.test(questionText):
                            question.classList.add(doReview(answer));
                            break;
                        case /How did you do in your native language at high school\?/.test(questionText):
                            question.classList.add(doReview(answer));
                            break;
                        case /We expect all colleagues to meet in person twice a year.* Are you willing and able to commit to this\?/.test(questionText):
                            question.classList.add(yesReview(answer));
                            break;
                        default:
                            question.classList.add("elephant");
                    }
                }
            });
        }
    }

    function textReview(answer) {
        if (answer.length < 10) {
            return "pecise";
        }
        if (answer.length < 50) {
            return "mamba";
        }
        return "elephant";
    }

    function degreeReview(answer) {
        var prohibited = ["drop", "none", "didnt", "cannot", "second", "n/a"];
        for (var i = 0; i < prohibited.length; i++) {
            if (answer.toLowerCase().indexOf(prohibited[i]) !== -1) {
                return "pecise";
            }
        }
        if (answer.trim() === "0") {
            return "pecise";
        }
        if (!isNaN(answer) && answer.startsWith("3")) {
            var result = GPACheck(answer);
            if (result) {
                return result;
            }
            return "pecise";
        }
        if (answer.includes("GPA")) {
            var removeColon = answer.replace(":", "");
            var splitBySpace = removeColon.split(" ");
            var index = splitBySpace.indexOf("GPA");
            var score = splitBySpace[index + 1];
            var GPACheckResult = GPACheck(score);
            if (GPACheckResult) {
                return GPACheckResult;
            }
        }
        if (answer.includes("/")) {
            const result = checkFractional(answer);
            if (result) {
                return result;
            }
        }
        if (answer === "-" || answer === "--") {
            return "pecise";
        }
        if (answer === "2:1") {
            return "mamba";
        }
        if (answer === "2:2") {
            return "pecise";
        }
        if (answer.endsWith("%")) {
            return percentToResult(answer.split("%")[0]);
        }
        if (
            answer === "3.8" ||
            answer === "3.9" ||
            answer === "4.0" ||
            answer === "90%" ||
            answer === "0" ||
            answer === "100%" ||
            answer.toLowerCase() === "first" ||
            answer.toLowerCase() === "first class"
        ) {
            return "pebble";
        }

        return "elephant";
    }

    function GPACheck(answer) {
        if (!isNaN(answer) && answer.startsWith("3.")) {
            const point = parseInt(answer.replace("3.", "")[0]);
            if (point >= 8 || answer === "4.0") {
                return "pebble";
            }
            if (point >= 7) {
                return "ninja";
            }
            if (point >= 6) {
                return "mamba";
            }
        }

        if (
            !isNaN(answer) &&
            (answer.startsWith("2.") || answer.startsWith("3."))
        ) {
            return "pecise";
        }
        return false;
    }

    function checkFractional(answer) {
        const splitBySpace = answer.split(" ");
        const fraction = splitBySpace.find((part) => part.includes("/"));
        const split = fraction.split("/");
        if (split.length === 2) {
            if (!isNaN(split[0]) && !isNaN(split[1])) {
                let percent = (split[0] / split[1]) * 100;
                return percentToResult(percent);
            }
        }
    }

    function percentToResult(percent) {
        if (parseInt(percent) > 90) {
            return "pebble";
        }
        if (parseInt(percent) > 80) {
            return "ninja";
        }
        if (parseInt(percent) > 65) {
            return "mamba";
        }
        return "pecise";
    }

    function doReview(answer) {
        if (answer === "Top student") {
            return "pebble";
        }
        if (answer === "Top 5%" || answer === "Top 10%") {
            return "ninja";
        }
        if (answer === "Top 20%" || answer === "Top 50%") {
            return "mamba";
        }
        if (answer === "Cannot recall" || answer === "Not a strength") {
            return "pecise";
        }
        return "elephant";
    }

    function yesReview(answer) {
        if (answer === "Yes") {
            return "ninja";
        } else {
            return "pecise";
        }
    }

    function clearClass(element) {
        element.classList.remove("pecise");
        element.classList.remove("mamba");
        element.classList.remove("elephant");
        element.classList.remove("ninja");
        element.classList.remove("pebble");
    }

    reviewContainer.addEventListener("DOMSubtreeModified", function () {
        setTimeout(run, 0);
    });

    run();
})();
