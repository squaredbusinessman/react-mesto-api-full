const mongoose = require('mongoose');
const validator = require('validator');
const { avatarUrlRegex } = require('../middlewares/validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => avatarUrlRegex.test(v),
      message: 'Ссылка на аватар - невалидна',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле email необходимо заполнить'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введённый email невалиден',
    },
  },
  password: {
    type: String,
    required: [true, 'Необходимо указать пароль'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
