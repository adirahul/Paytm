const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models/user.model");
const {Account} = require("../db/models/account.model")
const { hashPassword, comparePassword } = require("../utils/userUtils");




const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
});

async function createUser(req, res) {
  try {
    const paramsValidation = signupBody.safeParse(req.body);
    if (!paramsValidation.success) {
      res.status(422).json({
        success: false,
        message: "Unknown inputs, please check and retry!",
      });
      return;
    }
    const { username, firstName, lastName, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const checkExistingUser = await User.findOne({username})
    if(checkExistingUser){
      res.status(422).json({
        success: false,
        message: "User exists, please login!",
      });
      return;
    }
    const savedUser = await User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });
    const userId = savedUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })


    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in creating user!",
      error,
    });
  }
}







// ---------------------------------------------------------------------------//









const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

async function loginUser(req, res) {
  try {
    const paramsValidation = signinBody.safeParse(req.body);
    if (!paramsValidation.success) {
      res.status(422).json({
        success: false,
        message: "Unknown inputs, please check and try again!",
      });
      return;
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User doesn't exist, please signup!",
      });
      return;
    }
    const f = await comparePassword(password, user.password);
    if (!f) {
      res.json({
        success: false,
        message: "Password didn't match, please try again!",
      });
      return;
    }
    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "User login successfull!",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in logging",
      error,
    });
  }
}









// --------------------------------------------------------------//









const updateBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
});

async function updateUser(req, res) {
  try {
    const paramsValidation = updateBody.safeParse(req.body);
    if (!paramsValidation.success) {
      res.status(422).json({
        success: false,
        message: "Invalid input, please try again!",
      });
      return;
    }

    const { firstName, lastName, password } = req.body;
    
    const hashedPassword = await hashPassword(password);
    console.log(req.user)
    const updUser = await User.findByIdAndUpdate(req.user.userId, {
        firstName,
        lastName,
        password: hashedPassword,
      })
    
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: updUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updating user!",
      error,
    });
  }
}











// --------------------------------------------------------------------//










async function getUsers(req, res) {
  try {
    const filter = req.query.filter || "";
    const users = await User.find({
      $or: [
        {
          firstName: { $regex: filter, $options: "i" },
        },
        {
          lastName: { $regex: filter, $options: "i" },
        },
      ],
    });
    const usersData = users.map((user) => {
        return {
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    })
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: usersData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting users!",
      error,
    });
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getUsers,
};
