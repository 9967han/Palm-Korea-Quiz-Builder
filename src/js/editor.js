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