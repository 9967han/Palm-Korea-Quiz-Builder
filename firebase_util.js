

var db = firebase.firestore();

//데이터 불러오기
(function loadData () {
  var docRef = db.collection('conversation')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('doc id : ' + doc.data());
        db.collection('conversation').doc(doc.id).collection('sentence')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((sentence) => {
              console.log(sentence.data());
              // document.write(objToString(sentence.data()));
            })
          })
      });
    });}
  )();

function uploadData () {
  db.collection('conversation')
    .doc('2ECYwxhjTSL86FQ1f4J7')
    .collection('sentence')
    .add({
      'korean' : '내일 밥먹자',
      'chinese': '我明天要吃午饭。',
      'pinyin': 'Wǒ míngtiān yào chī wǔfàn.',
      'audio': 'aisfhsao',
      'seq': 2
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
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