import { Book, Example } from "./type";
import '@babel/polyfill';
import * as AWS from "aws-sdk";
import * as AWSKey from "./key";

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
    dynamodb.createTable(params, function(err, data) {
      if (err) {
        reject(
          "Unable to create table. Error JSON:" + JSON.stringify(err, null, 2)
        );
      } else {
        resolve(data);
      }
    });
  });
}

function newBook(book: Book) {
  var params = {
    TableName: "Books",
    Item: book
  };
  return new Promise((resolve, reject) => {
    docClient.put(params, function(err, data) {
      if (err) {
        reject(
          "Unable to add movie" +
            book.title +
            ". Error JSON:" +
            JSON.stringify(err, null, 2)
        );
      } else {
        resolve(book);
      }
    });
  });
}

function getBook(title: string) {
  var params = {
    TableName: "Books",
    Key: {
      title: title
    }
  };

  return new Promise((resolve, reject) => {
    docClient.get(params, function(err, data) {
      if (err) {
        reject(
          "Unable to read item. Error JSON:" + JSON.stringify(err, null, 2)
        );
      } else {
        resolve(data);
      }
    });
  });
}

function getConversation(bookTitle: string, chapter: number, example: number) {
  const params = {
    TableName: "Books",
    Key: { title: bookTitle },
    ProjectionExpression: `chapter[${chapter}].example[${example}]`,
    KeyConditionExpression: "#title = :bookTitle",
    ExpressionAttributeNames: { "#title": "title" },
    ExpressionAttributeValues: { ":bookTitle": bookTitle }
  };

  return new Promise((resolve, reject) => {
    docClient.query(params, function(err, data) {
      if (err) {
        reject(
          "Unable to read item. Error JSON:" + JSON.stringify(err, null, 2)
        );
      } else {
        resolve(data);
      }
    });
  });
}

function appendMessage(
  bookTitle: string,
  chapter: number,
  example: number,
  msg: Example.Message
) {
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
    docClient.update(params, function(err, data) {
      if (err) {
        reject(
          "Unable to update item. Error JSON:" + JSON.stringify(err, null, 2)
        );
      } else {
        resolve(data);
      }
    });
  });
}

function updateMessage(
  bookTitle: string,
  chapter: number,
  example: number,
  index: number,
  msg: Example.Message
) {
  const params = {
    TableName: "Books",
    Key: { title: bookTitle },
    UpdateExpression: `set chapter[${chapter}].example[${example}].chat[${index}] = :chat`,
    ExpressionAttributeValues: { ":chat": msg, ":etype": "CONVERSE" },
    ConditionExpression: `chapter[${chapter}].example[${example}].etype = :etype`,
    ReturnValues: "UPDATED_NEW"
  };

  return new Promise((resolve, reject) => {
    docClient.update(params, function(err, data) {
      if (err) {
        reject(
          "Unable to update item. Error JSON:" + JSON.stringify(err, null, 2)
        );
      } else {
        resolve(data);
      }
    });
  });
}

function removeMessageAt(
  bookTitle: string,
  chapter: number,
  example: number,
  index: number
) {
  const params = {
    TableName: "Books",
    Key: { title: bookTitle },
    UpdateExpression: `remove chapter[${chapter}].example[${example}].chat[${index}]`,
    ExpressionAttributeValues: { ":etype": "CONVERSE" },
    ConditionExpression: `chapter[${chapter}].example[${example}].etype = :etype`,
    ReturnValues: "UPDATED_NEW"
  };

  return new Promise((resolve, reject) => {
    docClient.update(params, function(err, data) {
      if (err) {
        reject(
          "Unable to update item. Error JSON:" + JSON.stringify(err, null, 2)
        );
      } else {
        resolve(data);
      }
    });
  });
}

const myBook: Book = {
  title: "태근이의 중국어 꿀팁",
  chapter: [
    {
      number: 1,
      title: "제 1과",
      example: [
        {
          etype: Example.Type.CONVERSE,
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

export {
  createBookTable,
  newBook,
  getBook,
  getConversation,
  updateMessage,
  removeMessageAt,
  appendMessage
};
