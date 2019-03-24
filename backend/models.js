const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  console.log('called');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresql',
    loggin: true,
    operatorsAliases: false,
    define: {
      underscored: true,
    },
  });
} else {
  sequelize = new Sequelize({
    database: `p3_music_db`,
    dialect: `postgresql`,
    operatorsAliases: false,
    define: {
      underscored: true
    }
  });
};

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_digest: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Artist = sequelize.define('artists', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

const Event = sequelize.define('events', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

const Venue = sequelize.define('venues', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

const ArtistReview = sequelize.define('artistReviews', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});
const VenueReview = sequelize.define('venueReviews', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

User.hasMany(ArtistReview, VenueReview, {
  onDelete: 'cascade',
});

ArtistReview.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});
VenueReview.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});

User.hasMany(Artist, {
  onDelete: 'cascade',
});

module.exports = {
  sequelize,
  User,
  Artist,
  Event,
  Venue,
  ArtistReview,
  VenueReview,
};
