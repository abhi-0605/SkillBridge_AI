import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    //is user with this email already exists?
                    user = await User.findOne({ email });

                    if (user) {
                        user.googleId = profile.id;
                        user.authProvider = 'google';
                        user.avatar = user.avatar || profile.photos?.[0]?.value;
                        await user.save();
                    } else {
                        user = await User.create({
                            name: profile.displayName,
                            email,
                            googleId: profile.id,
                            authProvider: "google",
                            avatar: profile.photos?.[0]?.value || null,
                            isVerified: true,
                        })
                    }

                }

                return done(null, user);

            } catch (error) {
                return done(error, null);
            }
        }
    )
);


//required for session support, even if not using sessions

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    }catch(error){
        done(error, null);
    }   
});

export default passport;