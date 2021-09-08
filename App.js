var ask = prompt("What is your name?");
var command = false;
var canTalk = true;
var commands = ["/random num"];
var commandsOutput = [function () { return Math.round(Math.random() * 100); }];
var commandIndex = 0;
changeName = () => {
  var promp = prompt("What is your new name?");
  ask = promp;
};
var channelCodes = ["8th-knippa-isd-general"];
if (ask === "" || ask === null) {
  ask = "Guest";
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
              var data = obj.message.replace("<div class='message-bar'><p><span style='text-transform:uppercase;'>").split("</span>").replace("-", "=").split("=");
              if (name != ask && name != "Guest" && name != "CHAT-BOT") {
                if (Notification.permission == "granted") {
                    showNotif(`${data[0]} Just Said -`, data[2]);
                }else if (Notification.permission != 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission == "granted") {
                            showNotif(`${data[0]} Just Said -`, data[2]);
                        }
                    })
                }
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
                
            text = text.replace(/\_([^\_]+)\_/g, "<em>$1</em>");
                
            text = text.replace(/\*([^\*]+)\*/g, "<strong>$1</strong>");
                
            text = text.replace(/```([^`]+)```/g, "<code>$1</code>");
                
            text = text.replace(/\`([^\`]+)\`/g, "<code style = \"display : inline;\">$1</code>");

            return text;
        }
        function show () {
          if (input.value !== "" && canTalk) {
            command = false;
            for (var i = 0; i < commands.length; i++) {
              if (input.value.includes(commands[i])) {
                command = true;
                commandIndex = i;
              }
            }
          var today = new Date();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var messages;
              if (command == false) {
                messages = cleanseText("<p><span style='text-transform:uppercase;'>"+ask+"</span> Posted on "+time+"- "+input.value+"</p>");
              }else {
                messages = cleanseText("<p><span style='text-transform:uppercase;'>CHAT-BOT</span> Posted on "+time+"- "+commandsOutput[commandIndex]()+"</p>");
              }
                pubnub.publish({
                    channel: channel,
                    message:  messages,
                    x: (input.value = '')
                });
            canTalk = false;
            setTimeout(() => {
              canTalk = true;
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
