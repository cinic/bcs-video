var aggressive, btnStart, fadeSpeed, onYouTubeIframeAPIReady, player, playerBox, selfTrade, videos;

btnStart = '#btn-start';

onYouTubeIframeAPIReady = function() {
  return $(btnStart).removeAttr('disabled').removeClass('disabled');
};

fadeSpeed = 400;

playerBox = $('<div class="player-box"></div>');

player = false;

selfTrade = 0;

aggressive = 0;

videos = {
  1: [],
  2: ['ekK7peRxKGc', 'uf8OKOt591E', 'sc0mi0Ei1CQ'],
  3: ['ekK7peRxKGc', 'uf8OKOt591E', 'sc0mi0Ei1CQ'],
  4: [['LVoElgX2irI', 'Xgm-iOW-uBY'], ['J7UwSVsiwzI', 'vP8RbfSgZtw']],
  5: ['0gknoM7tglY', 'uf8OKOt591E', 'sc0mi0Ei1CQ', 'vP8RbfSgZtw'],
  6: [[['1Kl4rNUTWCA', '9uvlxf94FMI', 'QZfkRsRxxgA', 'XtQkboxauOo', 'Y_TF9N2XlAs'], ['1Kl4rNUTWCA', 'k6lbKLx6axg', 'ny5vGbTfB8c', 'ny5vGbTfB8c', 'hzv0Jyr5FWE']], [['1Kl4rNUTWCA', 'DpN8UskODLE', 'qVFHLBUkGAQ', 's_Q954MTENQ', 'hzv0Jyr5FWE'], ['1Kl4rNUTWCA', 'DpN8UskODLE', 'ny5vGbTfB8c', 'ny5vGbTfB8c', 'hzv0Jyr5FWE']]],
  7: ['6-DRAV6JSO0']
};

$(function() {
  return $(btnStart).on('click', function() {
    $('#first').fadeOut(fadeSpeed, function() {
      return $('#q02').fadeIn(fadeSpeed);
    });
    return $('.btn-answer').on('click', function() {
      var _amount, _goto, _playerId, _question, _screen, _set, _specialBtn, _this, _video, _videoId;
      _this = $(this);
      _video = $(this).data('video-id');
      _question = $(this).data('next-question');
      _screen = $(this).data('screen');
      _set = parseInt(_screen.substr(2));
      _playerId = _screen.substr(1) + 'player';
      _specialBtn = $(this).data('special');
      _goto = $(this).data('goto');
      _amount = $('#investments-amount').val();
      if (_set === 3 && _video === 0) {
        selfTrade = 1;
      }
      switch (_set) {
        case 4:
          _videoId = videos[_set][selfTrade][_video];
          break;
        default:
          _videoId = videos[_set][_video];
      }
      if (_set === 4 && _video === 1) {
        aggressive = 1;
      }
      if (_set === 5 && $('.answers li', _screen).length < 3) {
        $('.answers li:last', _screen).removeClass('hidden');
      }
      if (_set === 6 && _amount !== void 0) {
        console.log(_amount);
        if (_amount <= 300000 && _amount > 50000) {
          _videoId = videos[_set][aggressive][selfTrade][1];
        } else if (_amount <= 1000000 && _amount > 300000) {
          _videoId = videos[_set][aggressive][selfTrade][2];
        } else if (_amount <= 3000000 && _amount > 1000000) {
          _videoId = videos[_set][aggressive][selfTrade][3];
        } else if (_amount > 3000000) {
          _videoId = videos[_set][aggressive][selfTrade][4];
        } else {
          _videoId = videos[_set][aggressive][selfTrade][0];
        }
      }
      if (void 0 !== _specialBtn) {
        $('.video .btn-answer', _screen).data('next-question', _specialBtn);
      } else {
        $('.video .btn-answer', _screen).data('next-question', _goto);
      }
      if (void 0 === _video) {
        if (player && typeof player.pauseVideo === 'function') {
          player.pauseVideo();
        }
        return $(_screen).fadeOut(100, function() {
          $('.video', _question).css('display', 'none');
          $('.question', _question).css('display', 'block');
          return $(_question).fadeIn(fadeSpeed);
        });
      } else {
        return $('.question', _screen).fadeOut(fadeSpeed, function() {
          $('.player', _screen).html('').append(playerBox.attr('id', _playerId));
          player = new YT.Player(_playerId, {
            height: '540',
            width: '960',
            playerVars: {
              'autoplay': 1,
              'controls': 1,
              'rel': 0,
              'showinfo': 0
            },
            videoId: _videoId
          });
          return $('.video', _screen).fadeIn(fadeSpeed, function() {
            if (void 0 !== _specialBtn) {
              return _this.parent().remove();
            }
          });
        });
      }
    });
  });
});
