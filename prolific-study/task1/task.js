var initTask = function() {
  Simulator[Simulator.instance].station['STATIONA'] = new Station(document.getElementById("simulatordiv"), -100, -120, 'Station A');
  Simulator[Simulator.instance].station['STATIONB'] = new Station(document.getElementById("simulatordiv"), 100, -120, 'Station B');
  Simulator[Simulator.instance].station['STATIONC'] = new MachineStation(document.getElementById("simulatordiv"), -100, 120, 'Station C');
  Simulator[Simulator.instance].station['STATIOND'] = new BinStation(document.getElementById("simulatordiv"), 100, 120, 'Station D');

  Simulator[Simulator.instance].station['STATIONA'].addItem("blue", "center");
  Simulator[Simulator.instance].station['STATIONB'].addItem("orange", "center");
}

var testing = false;

var testTask = function(instance) {
  document.getElementById('trigger-button1').disabled = true;
  document.getElementById('trigger-button2').disabled = true;
  document.getElementById('execution-button').disabled = true;
  document.getElementById('reset-button').disabled = true;
  document.getElementById('test-button').disabled = true;
  document.getElementById('test-stop-button').style.display = 'inline';
  testing = true;
  new Promise(r => setTimeout(r, 2000)).then(function() {
    if (testing) {
      reportError(instance, "Test user has clicked Button 1.", true);
      document.getElementById('trigger-button1').onclick();
    }
    }).then(new Promise(r => setTimeout(r, 5000)).then(function() {
      if (testing)
        reportError(instance, "Test user has clicked Button 2.", true);
        document.getElementById('trigger-button2').onclick();
    }));
  document.getElementById('test-stop-button').onclick = function() {
    document.getElementById('trigger-button1').disabled = false;
    document.getElementById('trigger-button2').disabled = false;
    document.getElementById('test-button').disabled = false;
    document.getElementById('execution-button').disabled = false;
    document.getElementById('reset-button').disabled = false;
    document.getElementById('test-stop-button').style.display = 'none';
    testing = false;
  }
}

var checkTask = function(instance) {
  if (Date.now() - startTime > maxTime) {
    setTimeout(function(){ 
      submitLog("finish", "0");
      submitLog('events', JSON.stringify(eventLog));
      alert("You have exceeded the maximum time for this task. We have saved your last attempt and will now redirect you to the next task.");
      if (getCookie("ugroup") == 1)
        window.location.href = "../task2/twocanvas.html";
      else
        window.location.href = "../task2/onecanvas.html";
    }, 1000);
  }
  var bin1 = Simulator[Simulator.instance].station['STATIOND'].centerItems[0];
  var bin2 = Simulator[Simulator.instance].station['STATIOND'].centerItems[1];
  return bin1 && bin2 && bin1.processed && bin2.processed;
}

setTimeout(function(){ submitLog("start", "0") }, 1000);

var pathPrefix = "../";
var imagePathPrefix = "../../media";
var taskId = "task1";
var startTime = Date.now();
var maxTime = 1000 * 60 * 10;

var taskStations = [[
      "Station A",
      "STATIONA"
  ],
  [
      "Station B",
      "STATIONB"
  ],
  [
      "Station C",
      "STATIONC"
  ],
  [
      "Station D",
      "STATIOND"
  ]];