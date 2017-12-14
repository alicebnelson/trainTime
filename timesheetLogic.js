

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCD6pON4j7eYTz1KYJeIYipTvX4BYHGAfw",
  authDomain: "traintime-8a881.firebaseapp.com",
  databaseURL: "https://traintime-8a881.firebaseio.com",
  projectId: "traintime-8a881",
  storageBucket: "",
  messagingSenderId: "273884319481"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#train-input").val().trim();
  //var freq = moment($("#freq-input").val().trim(), "mm").format("X");
  var freq = $("#freq-input").val().trim();
  var time = $("#time-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    role: trainDest,
    freq: freq,
    time: time,
    //timeAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console


  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#train-input").val("");
  $("#freq-input").val("");
  $("#rate-input").val("");
});

// Created Firebase event for adding train to the database and a row in the html when a user adds an entry
//database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  database.ref().on('child_added', function (childSnapshot) {
    
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var trainFreq = Number(childSnapshot.val().freq);
  var trainTime = childSnapshot.val().time;
  var timeConverted = moment(trainTime, "HH:mm");

  // train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFreq);
  console.log(trainTime);


  var currentTime = moment();
  var timeDifference = moment().diff(moment(timeConverted), 'minutes');
  var timeRemainder = timeDifference % trainFreq;
  var minutesAway = trainFreq - timeRemainder;
  var nextTrain = moment().add(minutesAway, 'minutes');
  

  //var dateConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
 // var trainTime = moment(dateConverted).format('HH:mm');
  //var timeConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
 


  // Add each train's data into the table
  //$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  //moment(freq, "X").format("mm") + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + moment(minutesAway).format("mm") + "</td><td>");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + minutesAway + "</td><td>");
  

  
});


$("#submit").submit(function (e) {
  e.preventDefault();
});