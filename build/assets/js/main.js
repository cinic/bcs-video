var aggressive, btnStart, fadeSpeed, onYouTubeIframeAPIReady, player, playerBox, playerWidth, selfTrade, setPlayerWidth, videos;

btnStart = '#btn-start';

onYouTubeIframeAPIReady = function() {
  return $(btnStart).removeAttr('disabled').removeClass('disabled');
};

fadeSpeed = 400;

playerBox = $('<div class="player-box"></div>');

player = false;

selfTrade = 0;

aggressive = 0;

playerWidth = false;

videos = {
  1: [],
  2: ['0mdoyu8AFt0', 'kVsv9dj-Cl0', 'xiPTMhCwSis'],
  3: ['S6DxCrNBK8U', 'UkiRAF1LpsU', 'eMklyUDsPT8'],
  4: [['h_XfxYRI90I', '2Dp88_5Go00'], ['c4dnb_e4rt0', 'fmXfoLGxcqg']],
  5: ['zCEcZjzKVn4', 'pfcKHXAzZps', 'vGveKGwXSlw', '16AL5ElxDTY'],
  6: [[['ZyX55eDKr90', 'dk_mEC-cpkw', '1UZw358I6ro', 'kpjn1qfdng8', 'z1Fi9AwRKg8'], ['ZyX55eDKr90', 'iciDnQPX9qQ', 'lLwYAjd_fWM', 'lLwYAjd_fWM', 'z1Fi9AwRKg8']], [['ZyX55eDKr90', 'ud-q_cJlciE', 'fFNM0Yj9fS4', 'MOgszmn-pDk', 'z1Fi9AwRKg8'], ['ZyX55eDKr90', 'ud-q_cJlciE', 'lLwYAjd_fWM', 'lLwYAjd_fWM', 'z1Fi9AwRKg8']]],
  7: ['jaKF0W1Wxuw']
};

setPlayerWidth = function(width) {
  switch (width) {
    case 320:
      return playerWidth = [300, 169];
    case 760:
      return playerWidth = [740, 416];
    case 980:
      return playerWidth = [960, 540];
    default:
      return playerWidth = [300, 169];
  }
};

$(function() {
  var _containerWidth;
  _containerWidth = $('.container').width();
  setPlayerWidth(_containerWidth);
  $(window).on('resize', function() {
    return setPlayerWidth(_containerWidth);
  });
  return $(btnStart).on('click', function() {
    $('#first, #shadow').fadeOut(fadeSpeed, function() {
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
          return $(_question).fadeIn(fadeSpeed, function() {
            return $('body').removeClass('active-video');
          });
        });
      } else {
        return $('.question', _screen).fadeOut(fadeSpeed, function() {
          $('.player', _screen).html('').append(playerBox.attr('id', _playerId));
          player = new YT.Player(_playerId, {
            height: playerWidth[1],
            width: playerWidth[0],
            playerVars: {
              'autoplay': 1,
              'controls': 1,
              'rel': 0,
              'showinfo': 0
            },
            videoId: _videoId
          });
          return $('.video', _screen).fadeIn(fadeSpeed, function() {
            $('body').addClass('active-video');
            if (void 0 !== _specialBtn) {
              return _this.parent().remove();
            }
          });
        });
      }
    });
  });
});
