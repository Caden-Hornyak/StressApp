let friend_code_box = $('.friend-code');
let friend_code_box_focus = false;

let chat_message_input = $('.curr-chat-msg');
let chat_message_input_focus = false;

let body = $('body');
let message_list = $('.friend-list');
let user_chats_in;
let user_chats_store;

const chats = new Map();
let curr_chat_select;
let curr_chat_select_messages;

// Add Friend -- START
function send_friend_code() {
    let friend_username = friend_code_box[0].value;
    friend_code_box[0].value = "";

    $.ajax({
        type: 'POST',
        url: '/homepage/send_friend_request/',
        data: {
            'to_user': friend_username,
            csrfmiddlewaretoken: window.CSRF_TOKEN,
        },
        dataType: 'json',
        success: function (data) {
            console.log(data['response']);
        },
        error: function (error) {
            console.error('Error:', error);
        },
    });
}
// Add Friend -- END


// Get chats -- START
$('.create-chat').onclick = function() {
    $.ajax({
        type: 'POST',
        url: '/homepage/create_chat/',
        data: {
            'to_user': friend_username,
            csrfmiddlewaretoken: window.CSRF_TOKEN,
        },
        dataType: 'json',
        success: function (data) {
            console.log(data['response']);
        },
        error: function (error) {
            console.error('Error:', error);
        },
    });
}


// Get/Display user chats -- START
$.ajax({
    type: 'POST',
    url: '/homepage/get_chats/',
    data: {
        'to_user': 'hello',
        csrfmiddlewaretoken: window.CSRF_TOKEN,
    },
    dataType: 'json',
    success: function (data) {
        user_chats_in = data['chats'];
        display_chats();
    },
    error: function (error) {
        console.error('Error:', error);
    },
});

function display_chats() {
    if (user_chats_in.length > 0) {
        for (var i = 0; i < user_chats_in.length; i++) {

            var outer_div = document.createElement('div');
            outer_div.id = "friend-list-div-"+ i.toString();
            outer_div.className = 'friend-list-div';
        
            var chat_name = document.createElement('li');
            chat_name.className = 'chat-name';
            chat_name.textContent = user_chats_in[i][1];

            var chat_image = document.createElement('img');
            chat_image.className = 'chat-image';
            chat_image.src = "../../static/" + user_chats_in[i][2];
        
            var chat_date = document.createElement('li');
            chat_date.className = 'chat-date';
            chat_date.textContent = user_chats_in[i][3];
        
            outer_div.appendChild(chat_date);
            outer_div.appendChild(chat_image);
            outer_div.appendChild(chat_name);
            
            message_list[0].appendChild(outer_div);
            chats.set(outer_div.id, user_chats_in[i][0]);

            outer_div.onclick = function() {
                curr_chat_select = this.id;
                get_message();
                
            }
        }
    } else {
        var no_friends = document.createElement('li');
        no_friends.textContent = "You have no chats";
        message_list[0].appendChild(no_friends);
    }
    
}
// Get/Display user chats -- END

// Get/Create/Destroy chat messages -- START
function create_destroy_message(action, text="") {

    $.ajax({
        type: 'POST',
        url: '/homepage/message_action/',
        data: {
            'action': action,
            'chat_id': chats.get(curr_chat_select),
            'text': text,
            csrfmiddlewaretoken: window.CSRF_TOKEN,
        },
        dataType: 'json',
        success: function (data) {
            get_message(curr_chat_select);
        },
        error: function (error) {
            console.error('Error:', error);
        },
    });
}

function get_message() {

    $.ajax({
        type: 'POST',
        url: '/homepage/message_action/',
        data: {
            'action': 'get',
            'chat_id': chats.get(curr_chat_select),
            csrfmiddlewaretoken: window.CSRF_TOKEN,
        },
        dataType: 'json',
        success: function (data) {
            curr_chat_select_messages = data['messages'];
            display_message(curr_chat_select_messages);
        },
        error: function (error) {
            console.error('Error:', error);
        },
    });
}

function display_message(curr_chat_select_messages) {


    var ul = $('.message-list');
    ul.empty();
    // Append new messages to the ul
    curr_chat_select_messages.forEach(function(message_pair) {
        var div = document.createElement('div');
        if (message_pair[1]) {
            div.className = 'my-message';
        } else  {
            div.className = 'not-my-message'
        }
    
        var message = document.createElement('li');
        message.textContent = message_pair[0];

        div.appendChild(message);
            
        div.appendChild(message);
        ul[0].append(div);
    });

    // Scroll to the bottom of the ul
    ul.scrollTop(ul[0].scrollHeight);
}

chat_message_input[0].addEventListener("focus", (event) => {
    event.target.style.background = "pink";
    chat_message_input_focus = true;
  });

  chat_message_input[0].addEventListener("blur", (event) => {
    event.target.style.background = "white";
    chat_message_input_focus = false;
  });

body[0].addEventListener('keydown', function(event) {

    if (event.key === 'Enter') {
        if (friend_code_box_focus) {
            send_friend_code();
            friend_code_box[0].value = "";
        }

        if (chat_message_input_focus) {
            let message = chat_message_input[0].value;
            chat_message_input[0].value = ""
            create_destroy_message('create', message);
        }

    }
});
