require("./connectDB");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//Config JSON response
app.use(express.json());

app.use(cors());

app.listen(port, () => {
  console.log(`App rodando! Acesse: http://localhost:${port}`);
});

//Models

const User = require("./models/User");
const Schedule = require("./models/Schedule");

//Public Route
app.get("/", async (req, res) => {
  res.status(200).json({
    msg: "Bem vindo a API",
  });
});

//List users schedules with valid token
app.get("/schedule/read/:userId", checkToken, async (req, res) => {
  const userId = req.params.userId;
  const isoDate = new Date();

  const pastSchedules = await Schedule.find({
    userId,
    date: { $lte: isoDate },
  });

  const presentSchedules = await Schedule.find({
    userId,
    date: { $gte: isoDate },
  });

  res.status(200).json({ pastSchedules, presentSchedules });
});

//Cancel (delete) schedule by id
app.delete("/schedule/delete/:id", checkToken, async (req, res) => {
  const _id = req.params.id;

  const deletedSchedule = await Schedule.findByIdAndDelete(_id);

  res.status(200).json({ deletedSchedule });
});

// Update schedule by ID
app.put("/schedule/update/:id", async (req, res) => {
  const _id = req.params.id;
  const { service, date } = req.body;

  const isoDate = new Date(date).toISOString();

  const result = await Schedule.updateOne(
    {
      _id,
    },
    {
      $set: {
        date: isoDate,
        service: service,
      },
    }
  );

  if (result.modifiedCount) {
    res.status(200).json({
      msg: "Horário alterado com sucesso",
    });
  }
  if (!result.modifiedCount) {
    res.status(200).json({
      msg: "Nenhuma modificação feita",
    });
  }
});

//Create schedule only if date is available
app.post("/schedule/create/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { userName, date, service } = req.body;

  const isoDate = new Date(date).toISOString();

  const dateSelected = await Schedule.findOne({ date: isoDate });

  if (dateSelected) {
    return res.status(422).json({
      msg: "Outro serviço registrado na mesma data",
    });
  }

  // create schedule
  const schedule = new Schedule({
    date,
    userName,
    service,
    userId,
  });

  try {
    await schedule.save();

    res.status(201).json({
      msg: "Horário agendado com sucesso",
    });
  } catch (err) {
    console.log(err);
  }
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

//Register User
app.post("/user/register", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  //validation
  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória" });
  }
  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não são iguais" });
  }

  //check if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({
      msg: "E-mail já cadastrado",
    });
  }

  //create password
  const salt = await bcrypt.genSalt(12);

  const passwordHash = await bcrypt.hash(password, salt);

  //create user
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();

    res.status(201).json({
      msg: "Usuário criado com sucesso",
    });
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ msg: "Aconteceu um erro no servidor, tente novamente" });
  }
});

//Login User
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O e-mail é obrigatório mané" });
  }
  if (!password) {
    return res.status(422).json({ msg: "O password é obrigatório mané" });
  }
  //check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "usuário não encontrado" });
  }

  //check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({
      msg: "Autenticação realizada com sucesso",
      token,
      user,
    });
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ msg: "Aconteceu um erro no servidor, tente novamente" });
  }
});
