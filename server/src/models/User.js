import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            // Not required because Google OAuth users won't have a password
            minlength: 6,
            select: false, // Exclude password from query results by default
        },
        googleId: {
            type: String,
            default: null,
        },
        avatar: {
            type: String,
            default: null,
        },
        authProvider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },


        //future subscription plan

        subscription: {
            plan: {
                type: String,
                enum: ['free', 'premium', 'enterprise'],
                default: 'free',
            },
            status: {
                type: String,
                enum: ['active', 'inactive', 'cancelled'],
                default: 'active',
            },
            expiresAt: {
                type: Date,
                default: null,
            },
        },
        isVerified: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }

);
//password hashing 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
};

const User = mongoose.model('User', userSchema);

export default User;