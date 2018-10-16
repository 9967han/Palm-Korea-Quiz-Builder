var db = firebase.firestore();
var docRef = db.collection('conversation')
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            console.log('doc id : ' + doc.data());
            db.collection('conversation').doc(doc.id).collection('sentence')
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((sentence)=>{
                        console.log(sentence.data());
                    })
                })
        });
    });