"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const AWS = require("aws-sdk");
const AWSKey = require("./key");
AWS.config.update(AWSKey.AWS_CONFIG);
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
function createBookTable() {
    var params = {
        TableName: "Books",
        KeySchema: [
            {
                AttributeName: "title",
                KeyType: "HASH"
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: "title",
                AttributeType: "S"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };
    return new Promise((resolve, reject) => {
        dynamodb.createTable(params, function (err, data) {
            if (err) {
                reject("Unable to create table. Error JSON:" + JSON.stringify(err, null, 2));
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.createBookTable = createBookTable;
function newBook(book) {
    var params = {
        TableName: "Books",
        Item: book
    };
    return new Promise((resolve, reject) => {
        docClient.put(params, function (err, data) {
            if (err) {
                reject("Unable to add movie" +
                    book.title +
                    ". Error JSON:" +
                    JSON.stringify(err, null, 2));
            }
            else {
                resolve(book);
            }
        });
    });
}
exports.newBook = newBook;
function getBook(title) {
    var params = {
        TableName: "Books",
        Key: {
            title: title
        }
    };
    return new Promise((resolve, reject) => {
        docClient.get(params, function (err, data) {
            if (err) {
                reject("Unable to read item. Error JSON:" + JSON.stringify(err, null, 2));
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.getBook = getBook;
function getConversation(bookTitle, chapter, example) {
    const params = {
        TableName: "Books",
        Key: { title: bookTitle },
        ProjectionExpression: `chapter[${chapter}].example[${example}]`,
        KeyConditionExpression: "#title = :bookTitle",
        ExpressionAttributeNames: { "#title": "title" },
        ExpressionAttributeValues: { ":bookTitle": bookTitle }
    };
    return new Promise((resolve, reject) => {
        docClient.query(params, function (err, data) {
            if (err) {
                reject("Unable to read item. Error JSON:" + JSON.stringify(err, null, 2));
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.getConversation = getConversation;
function appendMessage(bookTitle, chapter, example, msg) {
    const params = {
        TableName: "Books",
        Key: { title: bookTitle },
        UpdateExpression: `set chapter[${chapter}].example[${example}].chat = list_append(chapter[${chapter}].example[${example}].chat, :chat)`,
        ExpressionAttributeValues: { ":chat": [msg], ":etype": "CONVERSE" },
        ConditionExpression: `chapter[${chapter}].example[${example}].etype = :etype`,
        ReturnValues: "UPDATED_NEW"
    };
    console.log("Appending message...");
    return new Promise((resolve, reject) => {
        docClient.update(params, function (err, data) {
            if (err) {
                reject("Unable to update item. Error JSON:" + JSON.stringify(err, null, 2));
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.appendMessage = appendMessage;
function updateMessage(bookTitle, chapter, example, index, msg) {
    const params = {
        TableName: "Books",
        Key: { title: bookTitle },
        UpdateExpression: `set chapter[${chapter}].example[${example}].chat[${index}] = :chat`,
        ExpressionAttributeValues: { ":chat": msg, ":etype": "CONVERSE" },
        ConditionExpression: `chapter[${chapter}].example[${example}].etype = :etype`,
        ReturnValues: "UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {
        docClient.update(params, function (err, data) {
            if (err) {
                reject("Unable to update item. Error JSON:" + JSON.stringify(err, null, 2));
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.updateMessage = updateMessage;
function removeMessageAt(bookTitle, chapter, example, index) {
    const params = {
        TableName: "Books",
        Key: { title: bookTitle },
        UpdateExpression: `remove chapter[${chapter}].example[${example}].chat[${index}]`,
        ExpressionAttributeValues: { ":etype": "CONVERSE" },
        ConditionExpression: `chapter[${chapter}].example[${example}].etype = :etype`,
        ReturnValues: "UPDATED_NEW"
    };
    return new Promise((resolve, reject) => {
        docClient.update(params, function (err, data) {
            if (err) {
                reject("Unable to update item. Error JSON:" + JSON.stringify(err, null, 2));
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.removeMessageAt = removeMessageAt;
const myBook = {
    title: "태근이의 중국어 꿀팁",
    chapter: [
        {
            number: 1,
            title: "제 1과",
            example: [
                {
                    etype: type_1.Example.Type.CONVERSE,
                    chat: [
                        {
                            text: "헬로우, 월드!",
                            sender: "Alice"
                        }
                    ]
                }
            ]
        }
    ]
};
console.log("main.ts loaded");
