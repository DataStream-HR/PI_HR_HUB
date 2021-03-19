const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const dbe = "mongodb://localhost:27017/HR_HUB/hr";

const Jobs = require("../models/jobs");
const hr = require("../models/hr");

mongoose.connect(dbe, (err) => {
  if (err) {
    console.error("Error!" + err);
  } else {
    console.log("Connected to mongodb");
  }
});

router.post("/add_job/:id", function (req, res) {
  console.log("post a job");

  let user = req.params;
  let id = user.id;

  var newJob = new Jobs();

  newJob.description = req.body.description;

  newJob.salary = req.body.salary;

  newJob.requirement = req.body.requirement;
  newJob.save(function (err, insertedJob) {
    if (err) {
      console.log("Error saving  job");
    } else {
      res.json(insertedJob);
      console.log(insertedJob);
    }
  });
  const userById = hr.findById(id);

  userById.jobs.push(newJob);
  userById.save();
  res.send(userById);
});

router.get("/jobs", function (req, res) {
  console.log("Get request for all jobs");
  Jobs.find({}).exec(function (err, jobs) {
    if (err) {
      console.log("error jobs");
    } else {
      res.json(jobs);
    }
  });
});

router.post("/add_HR", function (req, res) {
  console.log("postHR");
  var newHR = new hr();

  newHR.fullName = req.body.fullName;
  newHR.user = req.body.user;

  newHR.save(function (err, insertedHR) {
    if (err) {
      console.log("Error saving  hr");
    } else {
      res.json(insertedHR);
      console.log(insertedHR);
    }
  });
});

router.get("/hr", function (req, res) {
  console.log("Get request for all hr");
  hr.find({}).exec(function (err, hr) {
    if (err) {
      console.log("error jobs");
    } else {
      res.json(hr);
    }
  });
});

router.get("/jobs/:id", function (req, res) {
  console.log("Get request  jobs by hr");
  hr.findById(req.params.id)
    .populate("job")
    .exec(function (err, jobs) {
      if (err) {
        console.log("error jobs");
      } else {
        res.json(jobs);
      }
    });
});

router.post("/add/:id", async (req, res) => {
  console.log(req.params);
  let user = req.params;
  let id = user.id;
  const { description, salary, requirement } = req.body;
  const job = await Jobs.create({
    description,
    salary,
    requirement,
  });
  await job.save();

  const userById = await hr.findById(id);

  userById.jobs.push(job);
  await userById.save();

  return res.send(userById);
});
