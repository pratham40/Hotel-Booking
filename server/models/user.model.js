import mongoose , {Schema} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
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
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
   recentSerachCities:[
    {
        type: String,
        required: true
    }
   ]
},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;