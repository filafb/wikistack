const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack'
, {logging: false}
);

// module.exports = {
//   db
// }

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
}, { hooks: {
    beforeValidate: (page) => {
      page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
}})

// Page.sync()

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // it's not in the original solution
    validate: {
      isEmal: true
    }
  }
})

// User.sync()

module.exports = {db, Page, User}
