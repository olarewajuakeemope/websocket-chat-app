export const messageResponse = {
  data: {
    author: 'opeyemi',
    text: 'test message',
    color: 'white',
    time: (new Date()).getTime(),
  },
  type: 'message',
};

export const historyResponse = {
  data: [
    {
      author: 'opeyemi',
      text: 'test message',
      color: 'white',
      time: (new Date()).getTime(),
    },
    {
      author: 'taiwo',
      text: 'test message two',
      color: 'black',
      time: (new Date()).getTime(),
    },
  ],
  type: 'history',
};
