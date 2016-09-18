$(document).ready(function() {
  $('.avatar').tooltip();
  $("#tweet-controls").hide();

//Increase the tweet compose box size on click
  $('.tweet-compose').on('click', function() {
    $(this).css('height', '5em');
    $('#tweet-controls', $('#tweet-content')).show();
  });

//Return the text box size to original height when clicking a separate element on a new tweet
  $('.tweet-compose').on('blur', function() {
    if(!$(this).val()) {
      $(this).css('height', '');
      $('#tweet-controls').hide();
    }
  });

//Increase the reply compose box size on click
  $('.tweet-reply').on('click', function() {
    $(this).css('height', '5em');
  });

  //Return the text box size to original height when clicking a separate element on a reply
  $('.tweet-reply').on('blur', function() {
    if(!$(this).val()) {
      $(this).css('height', '');
    }
  });

//Declaring global variables
  var avatar = '<img class="avatar" src="img/jason.jpg" />';
  var username = '@jasonS';
  var name = 'Jason Sanders';

//Function to reset the text compose box after tweet was pushed
  function resetTextCompose() {
    $('.tweet-compose').val('');
    $('.tweet-compose').css('height', '2.5em');
    $('#tweet-controls').hide();
  }

//Hide stats on all currently posted tweets
  $('.stats').hide();

//Reveal specific tweet stats on click
  var toggleStats = function() {
    $(document).on('click', '.tweet', function() {
      $('.stats', this).slideToggle('slow');
    });
  }();

//Function that edits the character count in box
  $('.tweet-compose').on('keyup', function() {
    var textLength = $(this).val().length;
    var displayLength = 140 - textLength;
    $('#char-count').text(displayLength);
    if(displayLength <= 10) {
      $('#char-count').css('color', 'red');
    }
    if(displayLength > 10) {
      $('#char-count').css('color', '');
    }
    if(displayLength <= 0) {
      $('#tweet-submit').prop('disabled', true);
    }
    if(displayLength >= 0) {
      $('#tweet-submit').prop('disabled', false);
    }
  });

//The code that pushes the new content to a new tweet in line (ES6)
  $('#tweet-submit').on('click', function() {
    $('#stream').prepend(
      `<div class="tweet"><div class="content">
        ${avatar}
        <strong class="fullname">${name}</strong>
        <span class="username">${username}</span>
        <p class="tweet-text">${$('.tweet-compose').val()}</p>
        <div class="tweet-actions">
          <ul>
            <li><span class="icon action-reply"></span> Reply</li>
            <li><span class="icon action-retweet"></span> + Retweet</li>
            <li><span class="icon action-favorite"></span> + Favorite</li>
            <li><span class="icon action-more"></span> More</li>
          </ul>
        </div>
        <div class="stats">
          <div class="retweets">
            <p class="num-retweets">0</p>
            <p>RETWEETS</p>
          </div>
          <div class="favorites">
            <p class="num-favorites">0</p>
            <p>FAVORITES</p>
          </div>
          <div class="users-interact">
            <div>
            </div>
          </div>
          <div class="time">
            ${moment().fromNow()}
          </div>
        </div>
        <div class="reply">
          <img class="avatar" src="img/jason.jpg" title="${name}" />
          <textarea class="tweet-reply" placeholder="Reply to ${username}"/></textarea>
        </div>
      </div>
    </div>'`);
    resetTextCompose();
    $('.stats').hide();
    $('.avatar').tooltip();
  });

//Calculate the time since posting
  window.setInterval(myTimer(), 1000);

  function myTimer() {
    $('.time').each(function(){
      var time = $(this).text();
      $(this).text(moment(time).fromNow());
    });
  }



});
