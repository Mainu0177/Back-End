import User from "../model/User";
import bcrypt from 'bcryptjs'

// All user
 export const getAllUser = async(req, res, next) =>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err)
    }
    if(!users) {
        return res.status(404).json({message: "No users found"})
    }
    return res.status(200).json({ users })
};

// user signup
export const signup = async (req, res, next) =>{
    const {name, email, password} = req.body; // the request will go to the front end
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err)
    }
    if(existingUser) {
        return res.status(400).json({message: "User Already Exists! Login Instead"})
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({  //add the new user
        name,
        email,
        password: hashedPassword,
        blog:[]
    });
    try {
        await user.save();
    } catch (err) {
       return console.log(err)
    }
    return res.status(201).json({user})
}

// user login
export const login = async (req, res, next) =>{
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err)
    }
    if(!existingUser) {
        return res.status(404).json({message: "Could not find User by Email"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incurrect Password"})
    }
    return res.status(200).json({message: "Login Successfull"})
}