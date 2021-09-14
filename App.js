var ask = prompt("What is your name?");
var command = false;
var canPing = true;
var loaded = 0;
var imgs = document.getElementsByTagName("img");
var iframe = document.getElementsByTagName("iframe");
var input = document.getElementById("input");
var messagebar = document.getElementsByClassName("message-bar");
var uploaded = document.getElementsByClassName("uploaded");
var messages;
function memeIt (text) {
	var randMeme = memes[Math.floor(Math.random() * memes.length)];
	return text+"<br>"+`<img src="${randomMeme}" class='uploaded'>`;
}
var beginning = [];
var yt = "";
var sensor = ["fuck", "shit", "ass"];
var unread = 0;
var canTalk = true;
var commands = ["/random num", "/img", "/create", "/solve", "/doc", "/audio", "/rps"];
var commandsAfter = ["[num]", "[link]", "[channel name]", "[expression]", "", "[audio link]", "[rock, paper, or scissors]"];
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;
var channelCodes = ["8th-knippa-isd-general", "8th-knippa-isd-general-Studies"];
var pages = document.getElementById("pages");
function createChannel (name) {
	channelCodes.push("8th-knippa-isd-general-"+name);
	pages.innerHTML += `<option>${name}</option>`;
}
for (var i = 0; i < commands.length; i++) {
	var href = `javascript:input.value = '/${commands[i]} ';`;
	document.getElementById("myDropdown").innerHTML += `<a href="${href}">${commands[i]} ${commandsAfter[i]}</a>`;
}
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
function rps (chosen) {
	var types = ["Rock", "Paper", "Scissors"];
	var computer = types[Math.round(Math.random() * types.length)].toLowerCase();
	var c = chosen.toLowerCase();
	if (c == computer) {
		return "tie!";
	}else {
		if ((c == "rock" && computer == "paper") || (c == "paper" && computer == "scissors") || (c == "scissors" && computer == "rock")) {
			return "computer wins!"
		}else {
			return "you win!";
		}
	}
}
var commandsOutput = [function (num) { return Math.round(Math.random() * (num || 100)); }, function (link) { return "<br><img src="+link+" class='uploaded'>"}, function (name) { createChannel(name); }, function (eq) { return eval(eq).toString(); }, function (text) { return `${text}, <img src="https://docs.google.com/document/d/1qraZmkAxjQS5s3YQopLqsDPDzy2RYdfjKFVWdj1KkgI/edit" target="_blank">`; }, function (link) {  return `<audio controls><source src="${link}" type="audio/*">Your browser does not support the audio tag.</audio>`; }, function (type) { return rps(type); }, function (text) { return memeIt(text); } ];
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
  var fileImp = document.querySelector('input[type=file]').files;
for (var i = 0; i < fileImp.length; i++) {
  var reader = new FileReader();

  reader.addEventListener("load", function () {
    beginning.push("<img src="+reader.result+" class='uploaded'>");
  }, false);

  if (file) {
    reader.readAsDataURL(document.querySelector('input[type=file]').files[i]);
  }
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
function textFile () {
	var fr = new FileReader();
        fr.onload = function(){
        	input.value = fr.result;
        }
        fr.readAsText(this.files[0]);
}
function youtube () {
	var video = prompt("Enter youtube video url!");
	var videosrc = video.split("=");
	yt = `<iframe src="https://www.youtube.com/embed/${videosrc[1]}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
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
	var total = imgs.length + iframe.length;
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
	      setTimeout(() => {
              	box.innerHTML = box.innerHTML + obj.message;
              	box.scrollTop = box.scrollHeight;
	      }, 500)
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
                messages = "<p><span style='text-transform:uppercase;'>"+ask+"</span> Posted on "+time+"- "+cleanseText(input.value)+"</p>";
              }else {
                messages = "<p><span style='text-transform:uppercase;'>CHAT-BOT</span> Posted on "+time+"- "+commandsOutput[commandIndex](input.value.replace(commands[commandIndex], ""))+"</p>";
              }
		  if (messages.includes("@")) {
		  	canPing = false;
			setTimeout(() => {
				canPing = true;
			}, 60000)
		  }
		beginning = beginning.join("<br>") + yt;
		messages = messages + beginning;
                pubnub.publish({
                    channel: channel,
                    message:  messages,
                    x: (input.value = '')
                });
		 beginning = [];
		 yt = "";
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
