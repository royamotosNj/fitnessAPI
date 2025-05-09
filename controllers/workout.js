const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");

module.exports.addWorkout = (req, res) => {
  let newWorkout = new Workout({
    userId: req.user.id,
    name: req.body.name,
    duration: req.body.duration,
  });

  return newWorkout
    .save()
    .then((result) => res.status(201).send(result))
    .catch((err) => errorHandler(err, req, res));
};

module.exports.getMyWorkouts = (req, res) => {
  return Workout.find()
    .then((result) => res.status(200).send({ workouts: result }))
    .catch((err) => errorHandler(err, req, res));
};

module.exports.updateWorkout = (req, res) => {
  let updatedWorkout = {
    userId: req.user.id,
    name: req.body.name,
    duration: req.body.duration,
  };

  return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout)
    .then((result) => {
      if (result) {
        res.status(200).send({
          message: "Workout updated successfully",
          updatedWorkout: result,
        });
      } else {
        res.status(404).send({ message: "Workout not found" });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.deleteWorkout = (req, res) => {
  return Workout.findByIdAndDelete(req.params.workoutId)
    .then((result) => {
      if (result) {
        res.status(200).send({ message: "Workout deleted successfully" });
      } else {
        res.status(404).send({ message: "Workout not found" });
      }
    })
    .catch((err) => errorHandler(err, req, res));
};

module.exports.completeWorkoutStatus = (req, res) => {
  let newStatus = {
    status: "completed",
  };
  return Workout.findByIdAndUpdate(req.params.workoutId, newStatus)
    .then((result) => {
      if (result) {
        res.status(200).send({
          message: "Wourkout status updated successfully",
          updatedWorkout: result,
        });
      } else {
        res.status(404).send({ message: "Workout not found" });
      }
    })
    .catch((error) => errorHandler(error, req, res));
};
