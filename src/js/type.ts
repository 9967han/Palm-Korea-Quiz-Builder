export interface Example {
  etype: Example.Type;
  word?: Example.Word;
  phrase?: Example.Phrase;
  chat?: Example.Message[];
}

export interface Chapter {
  number: number;
  title: string;
  example: Example[];
}

export interface Book {
  title: string;
  chapter: Chapter[];
}

export namespace Example {
  export interface Message {
    text: string;
    sender: string;
  }

  export interface Word {}

  export interface Phrase {}

  export enum Type {
    WORD = "WORD",
    PHRASE = "PHRASE",
    CONVERSE = "CONVERSE"
  }
}
