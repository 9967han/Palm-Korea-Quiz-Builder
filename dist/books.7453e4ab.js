parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"CsbH":[function(require,module,exports) {
function e(e){var t=document.createElement("div"),n=document.createElement("img"),d=document.createElement("h5");return t.classList.add("column"),n.classList.add("thumbnail"),n.src="https://placehold.it/550x550",d.innerText=e,t.appendChild(n),t.appendChild(d),t}function t(){var t=prompt("책 제목");if(t){var n=document.getElementById("book-container");n.insertBefore(e(t),n.childNodes[2])}}
},{}]},{},["CsbH"], null)
//# sourceMappingURL=/books.7453e4ab.map