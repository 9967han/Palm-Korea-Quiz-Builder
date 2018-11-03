'use strict';

var db = firebase.firestore();
var chinese_sentence = [];
//데이터 불러오기
(function loadData() {
  var docRef = db.collection('conversation').get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      //console.log('doc id : ' + doc.data());
      db.collection('conversation').doc(doc.id).collection('sentence').orderBy('timestamp', 'desc').onSnapshot(function (querySnapshot) {
        chinese_sentence = [];
        querySnapshot.forEach(function (sentence) {
          chinese_sentence.push(objToChinese(sentence.data()));
        });
        loadLeftFragment();
      });
    });
  });
})();

//데이터 보내기
function uploadData() {
  var rightbody = document.getElementById("right");
  var chinese = document.getElementById("chinese").value;
  var korean = document.getElementById("korean").value;
  var pinyin = document.getElementById("pinyin").value;
  db.collection('conversation').doc('2ECYwxhjTSL86FQ1f4J7').collection('sentence').add({
    'korean': korean,
    'chinese': chinese,
    'pinyin': pinyin,
    'audio': 'random',
    'seq': 2,
    'timestamp': new Date()
  }).then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  }).catch(function (error) {
    console.error("Error adding document: ", error);
  });
}

function removeAllChilds(cell) {
  while (cell.hasChildNodes()) {
    cell.removeChild(cell.firstChild);
  }
}

function loadLeftFragment() {
  var leftBody = document.getElementById("left");
  removeAllChilds(leftBody);
  for (var i = 0; i < chinese_sentence.length; i++) {
    var paragraph = document.createElement('p');
    paragraph.className += ' sentence';
    paragraph.textContent = chinese_sentence[i];
    leftBody.appendChild(paragraph);
  }
}

function objToString(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str += p + '::' + obj[p] + '\n';
    }
  }
  return str;
}

function objToChinese(obj) {
  var str = '';
  for (var p in obj) {
    if (obj.hasOwnProperty(p) && (p == "chinese" || p == "korean" || p == "pinyin")) {
      str += p + ' : ';
      str += obj[p] + ' , ';
    }
  }
  return str;
}

export {
  uploadData
};