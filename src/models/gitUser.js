const  mongoose  = require('../database/index');

const GitUserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        require: true,
    },

    repos:{
        type: mongoose.Schema.Types.Array,
        ref: 'Repos'
    },

    image:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Image'
    },

});


const GitUser = mongoose.model('GitUser', GitUserSchema);

module.exports = GitUser;