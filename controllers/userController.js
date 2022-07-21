const db = require('../models');

const { User, Award } = db;

const userController = {
  home: (req, res) => {
    Award.findAll().then((awards) => {
      res.render('index', { awards });
    });
  },

  result: (req, res) => {
    Award.findAll().then((awards) => {
      let sum = 0;
      let result = {};
      const drewResult = Math.floor(Math.random() * 100);
      console.log(drewResult);
      awards.forEach((award) => {
        console.log(sum);
        if (sum + Number(award.rate) >= drewResult) {
          result = award;
          sum = -999;
        } else {
          sum += Number(award.rate);
        }
      });

      if (sum < 0) {
        res.render('result', { result });
      } else {
        result = {
          name: '哭哭沒中',
          content: '幫你哭哭',
          url: 'https://pyxis.nymag.com/v1/imgs/d67/377/dc02b103fe29d8f6a3f9fb287b75bdb552-19-inside-out-cry.2x.rhorizontal.w710.jpg',
        };
        res.render('result', { result });
      }
    });
  },

  dashboard: (req, res) => {
    if (!req.session.username) {
      res.redirect('login');
    } else {
      Award.findAll({
        order: [['createdAt', 'DESC']],
      }).then((awards) => {
        let totalRate = 0;
        awards.forEach((award) => {
          totalRate += award.rate;
        });
        res.render('dashboard', { awards, totalRate });
      });
    }
  },

  login: (req, res) => {
    res.render('login');
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash('errorMessage', '有未填欄位！');
      res.redirect('dashboard');
      next();
    }

    User.findOne({
      where: {
        username,
      },
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '帳號不存在或密碼錯誤！');
        res.redirect('dashboard');
        next();
      }

      if (user.password !== password) {
        req.flash('errorMessage', '帳號不存在或密碼錯誤！');
        res.redirect('dashboard');
        next();
      }
      req.session.username = username;
      res.redirect('dashboard');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      next();
    });
  },

  handleLogout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },
};

module.exports = userController;
