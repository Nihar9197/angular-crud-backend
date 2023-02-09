const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const cors = require("cors");
const port = 7000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize("nihardb", "nihar", "nihar@123", {
  dialect: "mysql",
});

const crud_table = sequelize.define(
  "crud_table",
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    emailId: Sequelize.TEXT,
    firstName: Sequelize.STRING,
    mobileNo: Sequelize.TEXT,
    salary: Sequelize.TEXT,
  },
  { tableName: "crud_table" }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connection made successfully");
  })
  .catch((err) => {
    console.log(err, "it has error");
  });

crud_table.sync();

app.post("/", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailId;
  const mobileNo = req.body.mobileNo;
  const salary = req.body.salary;

  const saveBlog = crud_table.build({
    firstName,
    lastName,
    emailId,
    mobileNo,
    salary,
  });
  await saveBlog.save();
  res.send(true);
});

app.get("/users", async (req, res) => {
  const allData = await crud_table.findAll();
  res.json(allData);
});

app.put("/:id", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailId;
  const mobileNo = req.body.mobileNo;
  const salary = req.body.salary;

  crud_table.update(
    {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      mobileNo: mobileNo,
      salary: salary,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.send(true);
});

app.delete("/:id", async (req, res) => {
  crud_table.destroy({
    where: {
      id: req.params.id,
    },
  });
  // res.redirect('/users')
});

app.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});
