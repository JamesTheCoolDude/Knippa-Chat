var ask = prompt("What is your name?");
var command = false;
var canPing = true;
var messagebar = document.getElementsByClassName("message-bar");
var uploaded = document.getElementsByClassName("uploaded");
var messages;
var beginning = "";
var sensor = ["fuck", "shit", "ass"];
var sensorRep = ["****", "****", "***"];
var unread = 0;
var canTalk = true;
var commands = ["/random num", "/img", "/create", "/solve", "/doc"];
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;
function solves (eq, solve) {
	var equations = eq.split("=");
	var expr1 = algebra.parse(equations[0]); 
	var expr2 = algebra.parse(equations[1]); 
	var equation = new Equation(expr1, expr2);
	return equation.toString().solveFor(solve);
}
var channelCodes = ["8th-knippa-isd-general", "8th-knippa-isd-general-Studies"];
var pages = document.getElementById("pages");
function createChannel (name) {
	channelCodes.push("8th-knippa-isd-general-"+name);
	pages.innerHTML += `<option>${name}</option>`;
}
function nameLink (name) {
	return `<a href="javascript:input.value = @${name};">${name}</a>`;
}
var commandsOutput = [function (num) { return Math.round(Math.random() * (num || 100)); }, function (link) { return "<br><img src="+link+" class='uploaded'>"}, function (name) { createChannel(name); }, function (eq) { return eval(eq).toString(); }, function (text) { return `${text}, https://docs.google.com/document/d/1qraZmkAxjQS5s3YQopLqsDPDzy2RYdfjKFVWdj1KkgI/edit`; } ];
var commandIndex = 0;
changeName = () => {
  var promp = prompt("What is your new name?");
  ask = promp;
}
if (ask === "" || ask === null) {
  ask = "Guest";
}
function markasread () {
	unread = 0;
}
function previewFile() {
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.addEventListener("load", function () {
    beginning = "<img src="+reader.result+" class='uploaded'>";
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
setInterval(() => {
	document.title = "Chat App("+unread+")";
}, 1000)
function canSend (text) {
  var spaces = 0;
  for (var i = 0; i < text.length; i++) {
    if (text[i] == " ") {
      spaces++;
    }
  }
  if (spaces < text.length && ((text.includes("@") && canPing) || !text.includes("@"))) {
  	return true;
  }else {
  	return false;
  }
}
function showNotif (header, text) {
    const notif = new Notification(header, {
        body: text
    })
}

(function() {
        var pubnub = new PubNub({
            publishKey: 'demo',
            subscribeKey: 'demo'
        });
        function $(id) {
            return document.getElementById(id);
        }
        var pages = document.getElementById("pages");
        var name = "Guest";
        var box = $('box'),
            input = $('input'),
            channel = '8th-knippa-isd-general';
        setInterval(() => {
          channel = channelCodes[pages.selectedIndex];
        }, 1000)
        pubnub.addListener({
            message: function(obj) {
              obj.message = '' + "<div class='message-bar'>"+obj.message+"</div>";
              var today = new Date();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var datas = obj.message.replace("<div class='message-bar'><p><span style='text-transform:uppercase;'>", "").replace("</span>", "-");
              var data = datas.replace("</p></div>", "").replace(" ", "");
	      var lower = obj.message.toLowerCase();
	      var name = ask.toLowerCase();
	      if (lower.includes("@"+name) && !lower.includes("@everyone")) {
		setTimeout(() => {
			if (messagebar.length > 0) {
	      			messagebar[messagebar.length - 1].style.background = "orange";
			}else {
				messagebar[0].style.background = "orange";
			}
		}, 25)
           	if (Notification.permission == "granted") {
                    showNotif(`${data.split("-")[0]} Just Said -`, data.split("-")[2]);
                }else if (Notification.permission != 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission == "granted") {
                            showNotif(`${data.split("-")[0]} Just Said -`, data.split("-")[2]);
                        }
                    })
                }
	      }else if (lower.includes("@everyone")) {
	      	setTimeout(() => {
			if (messagebar.length > 0) {
	      			messagebar[messagebar.length - 1].style.background = "orange";
			}else {
				messagebar[0].style.background = "orange";
			}
		}, 25)
	      }
              if (data.split("-")[0].toLowerCase() != ask.toLowerCase() && data.split("-")[0].toLowerCase() != "guest" && data.split("-")[0].toLowerCase() != "chat-bot") {
	      	unread++;
              }
              box.innerHTML = box.innerHTML + obj.message;
              box.scrollTop = box.scrollHeight;
              document.getElementById("alert").style.display = "none";
            }
        });
        box.innerHTML = "<p style='text-align:center;color:red;font-size:30px;font-family:impact;'id='alert'>No chat content here!</p>"
        pubnub.subscribe({
            channels: [channel]
        });
        function cleanseText(text) {   
            text = text.replace(/(https:\/\/[^\s\n]+)/gi, "<a class='link' href = '$1' target = \"_blank\">$1</a>");
                
            text = text.replace(/\n/g, "<br>");
		
	    for (var i = 0; i < sensor.length; i++) {
		if (text.includes(sensor[i])) {
			text = `<p onclick='this.innerHTML = ${text}'>This message is hidden! Wana show it?</p>`;
		}
	    }

            return text;
        }
        function show () {
          if (canSend(input.value) && canTalk) {
            command = false;
            for (var i = 0; i < commands.length; i++) {
              if (input.value.includes(commands[i])) {
                command = true;
                commandIndex = i;
              }
            }
          var today = new Date();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              if (command == false) {
                messages = "<p><span style='text-transform:uppercase;'>"+nameLink(ask)+"</span> Posted on "+time+"- "+cleanseText(input.value)+"</p>";
              }else {
                messages = "<p><span style='text-transform:uppercase;'>CHAT-BOT</span> Posted on "+time+"- "+commandsOutput[commandIndex](input.value.replace(commands[commandIndex], ""))+"</p>";
              }
		  if (messages.includes("@")) {
		  	canPing = false;
			setTimeout(() => {
				canPing = true;
			}, 60000)
		  }
		messages = messages + beginning;
                pubnub.publish({
                    channel: channel,
                    message:  messages,
                    x: (input.value = '')
                });
		 beginning = "";
            canTalk = false;
            input.style.background = "red";
            setTimeout(() => {
              canTalk = true;
              input.style.background = "";
            }, 5000)
          }
        }
        input.addEventListener('keyup', function(e) {
            if ((e.keyCode || e.charCode) === 13) {
              show();
            }
        });
        var btn = document.getElementById("button");
        btn.onclick = function () {
          show();
        };
    })();
