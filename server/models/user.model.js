import mongoose , {Schema} from 'mongoose';

const userSchema = new Schema({
    clerkId:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },
    avatar:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 100
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