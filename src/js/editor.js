import to_pinyin from 'chinese-to-pinyin';

function createChatEle(who, text, seq) {
    return $.parseHTML(`
        <div class="${who=='B'? 'me' : ''}">
            <div class="sender-info">
            <span class="fa-circle"> </span>
            <span class="name"> A </span> <span class="date" align="center"> ${seq} </span> </div> 
            <div class="message">
                <div class="text">
                    ${text}
                </div>
            </div>
        </div> `);
}

function updateConversation() {
    var container = $("#chat-body");
    for (var i = 1; i < 10; i++) {
        var who = Math.random() * 10 < 4 ? 'A' : 'B';
        container.append(createChatEle(who, '안녕하세요', i));
    }
}

function convert() {
    const chinese = document.getElementById('chinese').value;
    const pinyin = to_pinyin(chinese);
    document.getElementById('pinyin').value = pinyin;
    console.log(chinese + ' to ' + pinyin);
};

document.getElementById('chinese').onkeydown = convert;

document.getElementById('chinese').onpaste = convert;
var player = document.getElementById('player');
var blob;

let shouldStop = false;
let stopped = false;
const downloadLink = document.getElementById('download');
const stopButton = document.getElementById('stop');

stopButton.addEventListener('click', function () {
    console.log('stop');
    shouldStop = true;
});


var handleSuccess = function (stream) {
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = function (e) {
        console.log('avail');
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }

        if (shouldStop === true && stopped === false) {
            mediaRecorder.stop();
            stopped = true;
        }
    };
    mediaRecorder.addEventListener('stop', function () {
        blob = new Blob(recordedChunks);
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'acetest.wav';
        player.src = downloadLink.href;
    });

    console.log('mediaRecorder start');
    mediaRecorder.start(1000);
};



document.getElementById('start').onclick = () => {
    console.log('start');
    shouldStop = false;
    stopped = false;
    navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })
        .then(handleSuccess);
}

document.getElementById('player').onplay = function () {
    console.log('onPlay');
    // visualize(document.getElementById('player'));
}

document.getElementById('submit').onclick = () => {
    console.log('submit');
    firebase_util.uploadData();
}