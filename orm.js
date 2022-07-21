const db = require('./models');

const { Award } = db;

Award.create({
  name: '鮮蔬寶堡',
  content: '好吃A漢堡',
  url: 'https://taiwan.sharelife.tw/tw-feat-store-img/59175/f424280621563310.jpg',
  rate: 5,
}).then(() => {
  console.log('Done!');
});
