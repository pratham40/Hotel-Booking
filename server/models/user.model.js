import mongoose , {Schema} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        maxlength: 100
    },
    avatar:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 100
    },
    password: {
        type: String,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
   recentSerachCities:[
    {
        type: String
    }
   ]
},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;