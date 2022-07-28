var namespace = '/chat';
var socket = io.connect(service_host + namespace);

var user_id = '';
var username = sessionStorage.getItem('current_user');
if (!username || username === 'null' || username === 'undefined') {
  username = '';
}
var all_msg_data = {};

var randomNicknames = [
  'hopeful_bardeen',
  'determined_mestorf',
  'wizardly_archimedes',
  'hungry_jennings',
  'calm_uncle',
  'warm_salad',
  'clever_raman',
  'happy_einstein',
  'silly_bose',
  'kickass_mayer',
];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function send_msg(response) {
  var msg = { message: response, username: username };
  console.log('Enviado mensaje: ');
  console.log(msg);
  socket.emit('send_msg', msg);
}

function putMsgHtml() {
  console.log({ all_msg_data });
  var userRow = '';
  var username_sender = '';
  var msgs = '';

  Object.values(all_msg_data).forEach((d) => {
    if (d.user_id === user_id || d.username === username) {
      userRow = 'user-row';
      username_sender = '';
    } else {
      userRow = '';
      username_sender = d.username;
    }

    msgs =
      msgs +
      `
      <div class="msg-row ${userRow}" >
        <div class="sender-name ${
          userRow ? 'display-none' : ''
        }">${username_sender}</div>
        <div class="msg-info ${userRow ? 'msg-info-right' : ''}">
          ${d.message}
        </div>
      </div>
      `;
  });

  $('#msgs').html(msgs);
  $('main').scrollTop($('main')[0].scrollHeight);
}

$(document).ready(function () {
  $('#username').text(username);

  // $('#msg').text('Hola dchsxnkad!!');
  // $('#modal1').modal('open');
  // $('#start-off').css('display', 'none');
  // $('#start-on').css('display', 'block');
  // putMsgHtml();

  socket.on('connect', function () {
    console.log('connected');
    $('#start-off').css('display', 'none');
    $('#start-on').css('display', 'block');

    var current_user = sessionStorage.getItem('current_user');
    if (
      !current_user ||
      current_user === 'null' ||
      current_user === 'undefined'
    ) {
      var randomNick = randomNicknames[randomInteger(0, 9)];
      username = prompt('Enter your nickname:', randomNick);
      if (!username || username === 'null' || username === 'undefined') {
        username = randomNick;
      }
    } else {
      username = current_user;
    }

    console.log({ current_user, username });
    $('#username').text(username);
    socket.emit('log-in', { username: username });
    sessionStorage.setItem('current_user', username);
  });

  socket.on('users_connected', function (lenUsers) {
    $('#user-cnt').text(lenUsers);
    console.log('users connected: ' + lenUsers);
  });

  socket.on('msgs', function (data) {
    all_msg_data[data.id] = data;
    putMsgHtml();
  });

  $('#send_msg').submit(function (e) {
    e.preventDefault();
    send_msg($('#msg_input').val());
  });

  socket.on('message', function (data) {
    console.log('Message recived');
    console.log(data);
    if (data.welcome) {
      var first_welcome = sessionStorage.getItem('first_welcome');
      if (!first_welcome) {
        $('#msg').text(data.welcome + '!!');
        $('#modal1').modal('open');
      }
      sessionStorage.setItem('first_welcome', 'true');
    } else {
      $('#msg').text(data.message);
      $('#modal1').modal('open');
    }
    if (data.user_id) {
      user_id = data.user_id;
    }
  });
});
