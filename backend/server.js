const mongoose = require('mongoose');
const express = require("express");
const router = express.Router()
const cors = require('cors');
mongoose.set("strictQuery", false);
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://admin:admin@cluster0.iacj1wm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('connected'))
  .catch(e => console.log(e));
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    // required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    // required: true,
  },
  phno: {
    type: String,
    // required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true
  },
  followers:
  {
    type: [String],
    default: [],
  },
  following:
  {
    type: [String],
    default: [],
  },
  savedposts:
  {
    type: [{
      // Const Schema = mongoose.Schema
      type: mongoose.Schema.Types.ObjectID,
      ref: "Posts",
    }],
    default: [],
  },

});

const User = mongoose.model("User", userSchema);
const app = express();
app.use(express.json());
app.use(cors())

app.post("/api/add-credentials", async (req, res) => {
  console.log("yes");
  try {
    const { fname, lname, username, email, age, phno, password } = req.body;
    if (!username || !password) {
      res.status(500).send({ error: "An error occurred while adding credentials" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({ fname, lname, username, email, age, phno, password: hash });
    await newUser.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while adding credentials" });
  }
});

app.post("/api/check-credentials", async (req, res) => {
  console.log("yes");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ "username": username });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    console.log("yes");
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while adding credentials" });
  }
});

app.post("/api/edit-credentials", async (req, res) => {
  try {
    const { fname, lname, email, age, phno, username, oldusername } = req.body;
    // const user = req.params.abcd;
    if (username === oldusername) {
      const user = await User.findOne({ "username": username });
      if (fname) user.fname = fname;
      if (lname) user.lname = lname;
      if (age) user.age = age;
      if (phno) user.phno = phno;
      if (email) user.email = email;
      if (username) user.username = username;
      // await User.updateOne({ _id: user });
      //  const newUser = await Reportedposts.create(req.body)
      await user.save();
    }
    // else
    // {
    //   const user = await User.findOne({ "username": username });
    //   if(user)
    //   {
    //     res.status(500).send({error : "ilu"})
    //   }
    //   else
    //   {
    //     if (fname) user.fname = fname;
    //     if (lname) user.lname = lname;
    //     if (age) user.age = age;
    //     if (phno) user.phno = phno;
    //     if (email) user.email = email;
    //     if (username) user.username = username;
    //     await user.save();
    //   }

    // }
    // console.log(newUser)
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});

app.post("/api/add-posting", async (req, res) => {
  try {
    const { username, savedposts } = req.body;
    // console.log(req.body)
    const user = await User.findOne({ "username": username });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    if (user.savedposts.indexOf(savedposts) !== -1) {
      return res.status(401).send({ error: "You already added this post" });
    }
    user.savedposts.push(savedposts);
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/delete-posting", async (req, res) => {
  try {
    const { username, savedposts } = req.body;
    // console.log(req.body)
    const user = await User.findOne({ "username": username });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    user.savedposts.pop(savedposts);
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/following", async (req, res) => {
  try {
    const { username, following } = req.body;
    // console.log(req.body)
    const user = await User.findOne({ "username": username });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });

    }
    if (following === username) {
      console.log("msxn")
      return res.status(401).send({ error: "You cant follow yourself" });
    }
    if (user.following.indexOf(following) !== -1) {
      return res.status(401).send({ error: "You are already a follower" });
    }
    user.following.push(following);
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/unfollowing", async (req, res) => {
  try {
    const { username, following } = req.body;
    // console.log(req.body)
    const userb = await User.findOne({ "username": following });
    const user = await User.findOne({ "username": username });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    user.following.pop(following);
    userb.followers.pop(username)
    console.log(req.body)
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/follower", async (req, res) => {
  try {
    const { username, following } = req.body;
    console.log(req.body)
    const userb = await User.findOne({ "username": following });
    const user = await User.findOne({ "username": username });
    if (userb.followers.indexOf(username) !== -1) {
      console.log("hgfvnj")
      // user.following.pop(following);
      return res.status(401).send({ error: "You are already following" });
    }
    userb.followers.push(username)
    await userb.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/unfollower", async (req, res) => {
  try {
    const { username, follower } = req.body;
    // console.log(req.body)
    const userb = await User.findOne({ "username": username });
    const user = await User.findOne({ "username": follower });
    userb.followers.pop(follower)
    user.following.pop(username);
    await userb.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.get("/api/get-credentials/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ "username": username });
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    const { fname, lname, email, age, phno, followers, following } = user;
    res.status(200).send({ fname, lname, email, age, phno, followers, following });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while retrieving credentials" });
  }
});

app.get("/api/get-savedposts/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate("savedposts");
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    // console.log(username)
    const { savedposts } = user;
    res.status(200).send({ savedposts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while retrieving saved posts" });
  }
});




//////////////////////////////////////////////

const subgredditSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String,
  },
  tags: {
    type: String,
  },
  bannedwords: {
    type: String,
  },
  joinedusers:
  {
    type: [String],
    default: []
  },
  pendingusers:
  {
    type: [String],
    default: [],
  },
  blockedusers:
  {
    type: [String],
    default: [],
  },
  usercount: {
    type: [Number],
    default: [1]
  },
  leftusers: {
    type: [String],
    default: [],
  },
  time: {
    type: [Date],
    default: [Date.now()]
  }
}, { timestamps: true });
const Subgreddit = mongoose.model("Subgreddit", subgredditSchema);
app.post("/api/add-subgreddits", async (req, res) => {
  console.log("yes");
  try {
    const { username, name, description, tags, bannedwords, joinedusers, usercount, time } = req.body;
    if (!username) {
      res.status(500).send({ error: "An error occurred while adding credentials" });
    }
    const newUser = new Subgreddit({ username, name, description, tags, bannedwords, joinedusers });
    await newUser.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while adding credentials" });
  }
});

app.get("/api/get-subgreddits/:username", async (req, res) => {
  try {
    const username = req.params.username;
    // console.log(username);
    const user = await Subgreddit.find({ "username": username });
    // console.log(user);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while retrieving credentials" });
  }
});
app.post("/api/delete-credentials/:name", async (req, res) => {
  try {
    const name = req.params.name;
    await Posts.deleteMany({ "name": name })
    await Reportedposts.deleteMany({ "name": name })
    const user = await Subgreddit.findOne({ "name": name });
    if (!user) {
      return res.status(404).send({ error: "Data not found" });
    }
    await user.remove(); // Remove the user from the collection
    res.status(200).send({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while deleting data" });
  }
});
app.get("/api/get-allsubgreddits/", async (req, res) => {
  try {
    // const username = req.params.username;
    // console.log(username);
    const user = await Subgreddit.find();
    // console.log(user);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while retrieving credentials" });
  }
});
app.post("/api/join-req", async (req, res) => {
  try {
    const { name, username } = req.body;
    const user = await Subgreddit.findOne({ "name": name });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    if (user.pendingusers.indexOf(username) !== -1) {
      return res.status(401).send({ error: "Already sent request" });
    }
    if (user.leftusers.indexOf(username) !== -1) {
      return res.status(401).send({ error: "You cant join post you left" });
    }
    user.pendingusers.push(username);
    // console.log(pendingusers)
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/leave-req", async (req, res) => {
  try {
    const { name, username } = req.body;
    const user = await Subgreddit.findOne({ "name": name });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    user.leftusers.push(username)
    user.joinedusers.pop(username)
    // console.log(pendingusers)
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/accept-req", async (req, res) => {
  try {
    const { name, username } = req.body;
    const time = Date.now();
    const user = await Subgreddit.findOne({ "name": name });
    let num = user.joinedusers.length
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    if (user.joinedusers.indexOf(username) !== -1) {
      return res.status(401).send({ error: "You already are in the users" });
    }
    console.log(req.body)
    user.joinedusers.push(username);
    num = num + 1
    user.usercount.push(num);
    user.time.push(time);
    // await Subgreddit.findOneAndUpdate({ "name": name }, { $set: { 'updatingusers.$.usercount': (num) } })
    user.pendingusers.pop(username);
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/reject-req", async (req, res) => {
  try {
    const { name, username } = req.body;
    const user = await Subgreddit.findOne({ "name": name });
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    // user.blockedusers.push(username);
    user.pendingusers.pop(username);
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.get("/api/get-users/:name", async (req, res) => {
  try {
    const name = req.params.name;
    // console.log(username);
    const user = await Subgreddit.find({ "name": name });
    // console.log(user);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while retrieving credentials" });
  }
});
//////////////////////////

const postsSchema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true
  },
  text: {
    type: String,
  },
  postedby: {
    type: String,
    unique: false
    // index:false
  },
  postedin: {
    type: String,
  },
  upvotes: {
    type: Number,
  },
  downvotes: {
    type: Number,
  },
  comments: {
    type: [String],
    default: []
  },
  join: {
    type: Boolean
  },
  upvoteUsers: {
    type: [String],
    default: [],
  },
  downvoteUsers: {
    type: [String],
    default: [],
  }
});
const Posts = mongoose.model("Posts", postsSchema);
// app.post("/api/add-posts", async (req, res) => {
//   console.log("yes");
//   try {
//     const { name, text, postedby, postedin, upvotes, downvotes, comments, join } = req.body;
//     if (!name) {
//       res.status(500).send({ error: "An error occurred while adding credentials" });
//     }
//     const newUser = new Posts({ name, text, postedby, postedin, upvotes, downvotes, comments, join });
//     await newUser.save();
//     res.status(200).send(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "An error occurred while adding credentials" });
//   }
// });
app.post("/api/add-posts", async (req, res) => {
  console.log("yes");
  try {
    const { name, text, postedby, postedin, upvotes, downvotes, comments, join } = req.body;
    if (!name) {
      res.status(500).send({ error: "An error occurred while adding credentials" });
    }
    const subgreddiit = await Subgreddit.findOne({"name":postedin})

    const banned = subgreddiit.bannedwords.split(",")
    var repltext = text
    banned.forEach(value => {
      const regex = new RegExp('\\b' + value + '\\b','gi')
      repltext = repltext.replace(regex, '*'.repeat(value.length))
    })
    console.log("repltext")
    console.log(repltext)
    const newUser = new Posts({ name, text:repltext, postedby, postedin, upvotes, downvotes, comments, join });

    
    await newUser.save();
    res.status(200).send({newUser});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while adding credentials" });
  }
});
// app.get("/api/get-posts/:name", async (req, res) => {
//   try {
//     const name = req.params.name;
//     console.log(name);
//     const subgreddiit = await Subgreddit.findOne({ "name": name });
//     const user = await Posts.find({ "name": name });
//     const bw = subgreddiit.bannedwords;
//     let Text = user.text;
//     console.log(Text);
//     // for (let i = 0; i < bw.length; i++) {
//     //   Text = Text.replace(new RegExp(bw[i], "ig"), "*".repeat(bw[i].length));
//     // }
//     user.text = Text;
//     const x = []
//     if (!user) {
//       return res.status(401).send({ error: "User not found" });
//     }
//     for (let i = 0; i < user.length; i++) {
//       const post = user[i]
//       const y = post
//       if (subgreddiit.blockedusers.includes(post.postedby)) {
//         y.postedby = "blocked user"
//       }
//       x.push(y)
//     }
//     // console.log(user);
//     console.log(x)
//     res.status(200).send(x);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "An error occurred while retrieving credentials" });
//   }
// });
app.get("/api/get-posts/:name", async (req, res) => {
  try {
    const name = req.params.name;
    console.log(name);
    const subgreddiit = await Subgreddit.findOne({ "name": name });
    const user = await Posts.find({ "name": name });
    const x = []
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    for (let i = 0; i < user.length; i++) {
      const post = user[i]
      const y = post
      const banned = subgreddiit.bannedwords.split(",")
      banned.forEach(value => {
        const regex = new RegExp('\\b' + value + '\\b','gi');
        y.text = y.text.replace(regex, '*'.repeat(value.length))
      })
      if (subgreddiit.blockedusers.includes(post.postedby)) {
        y.postedby = "blocked user"
      }
      x.push(y)
    }
    // console.log(user);
    console.log(x)
    res.status(200).send(x);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while retrieving credentials" });
  }
});

app.post("/api/edit-posts", async (req, res) => {
  try {
    const { name, text, postedby, postedin, upvotes, downvotes, comments, join } = req.body;
    console.log(req.body)
    const user = await Posts.findOne({ "text": text });
    if (!user) {
      return res.status(401).send({ error: "Invd credentials" });
    }
    // console.log(fname,email)
    if (text) user.text = text;
    if (postedby) user.postedby = postedby;
    if (postedin) user.postedin = postedin;
    if (comments) user.comments = comments;
    if (upvotes) user.upvotes = upvotes;
    if (downvotes) user.downvotes = downvotes;
    if (join) user.join = join;
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/check-votes", async (req, res) => {
  try {
    const { id, upvoteUser } = req.body;
    console.log(req.body)
    const post = await Posts.findById(id);
    if (post.upvoteUsers.indexOf(upvoteUser) !== -1) {
      return res.status(401).send({ error: "Duplicate vote not allowed" });
    }
    post.upvoteUsers.push(upvoteUser);
    console.log("done")
    await post.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});

app.post("/api/check-downvotes", async (req, res) => {
  try {
    const { id, upvoteUser } = req.body;
    console.log(req.body)
    const post = await Posts.findById(id);
    // const duplicateUser = user.upvoteUsers.find(user => user === upvoteUser);
    if (post.downvoteUsers.indexOf(upvoteUser) !== -1) {
      console.log("msxn")
      return res.status(401).send({ error: "Duplicate vote not allowed" });
    }
    post.downvoteUsers.push(upvoteUser);
    await post.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});

//////////////////////////////////////////////////
const Schema = mongoose.Schema
const reportedpostsSchema = new Schema({
  myid: {
    type: String,
  },
  name: {
    type: String,
    // unique: true
  },
  reportedby: {
    type: String,
  },
  reportedon: {
    type: String,
    unique: false
    // index:false
  },
  concern: {
    type: String,
  },
  ignore: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
  },

});
const temp = new Schema({
  myid: {
    type: String,
  },
  name: {
    type: String,
    // unique: true
  },
  reportedby: {
    type: String,
  },
  reportedon: {
    type: String,
    unique: false
    // index:false
  },
  concern: {
    type: String,
  },
  ignore: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
  },

});
const Reportedposts = mongoose.model("Reportedposts", temp);
app.post("/api/add-report", async (req, res) => {
  try {
    const { name, reportedby, reportedon, concern, text, myid } = req.body;
    if (reportedby === reportedon) {
      return res.status(500).send({ error: "You cant report yourself" });
    }
    const existingReport = await Reportedposts.findOne({ myid, reportedby });
    if (existingReport) {
      return res.status(500).send({ error: "You already reported" });
    }
    const newUser = await Reportedposts.create(req.body)
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while adding credentials" });
  }
});
app.post("/api/ignore-req", async (req, res) => {
  try {
    const { reportedby, id } = req.body;
    const user = await Reportedposts.findById(id);
    console.log(req.body)
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    console.log("wnjs")
    // user.blockedusers.push(username);
    user.ignore = 1;
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.post("/api/block-req", async (req, res) => {
  try {
    const { reportedon,name } = req.body;
    const user = await Subgreddit.findOne({ "name": name });
    console.log(req.body)
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    console.log("wnjs")
    user.joinedusers.pop(reportedon);
    user.blockedusers.push(reportedon);
    await user.save();
    res.status(200).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while editing credentials" });
  }
});
app.get("/api/get-reports/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const user = await Reportedposts.find({ "name": name });
    // console.log(user);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }
    console.log(req.body);
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while retrieving credentials" });
  }
});
app.post("/api/delete-post/:myid", async (req, res) => {
  try {
    const id = req.params.myid;
    console.log("jk")
    console.log(id)
    const user = await Reportedposts.findById(id)
    console.log("jk")

    console.log(user)
    if (!user) {
      console.log("lol")
      return res.status(404).send({ error: "Data not found" });
    }
    // await user.remove(); // Remove the user from the collection
    await Reportedposts.deleteMany({ "myid": user.myid })
    await Posts.findByIdAndDelete(user.myid)
    // User.findByIdAndDelete(user._id)
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while deleting data" });
  }
});


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
module.exports = app;
