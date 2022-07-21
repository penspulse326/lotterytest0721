const db = require('./models');

const { User } = db;

User.create({
  username: 'test',
  password: '0000',
}).then(() => {
  console.log('Done!');
});
