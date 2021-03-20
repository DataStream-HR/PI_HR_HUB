const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamsSchema = new Schema({
  teamName: String,
  description: String,
  participantNumber: Number,
  hr: {
    type: Schema.Types.ObjectId,
    ref: "HR",
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
  },
});
module.exports = mongoose.model("teams", teamsSchema, "teams");
