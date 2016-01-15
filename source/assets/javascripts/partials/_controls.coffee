fadeSpeed = 400
playerBox = $( '<div class="player-box"></div>' )
player = false
selfTrade = 0
aggressive = 0
playerWidth = false
minAmount = 0

videos = {
  1: [],
  2: ['0mdoyu8AFt0', 'kVsv9dj-Cl0', 'xiPTMhCwSis'],
  3: ['S6DxCrNBK8U', 'UkiRAF1LpsU', 'eMklyUDsPT8'],
  4: [['fmXfoLGxcqg', 'c4dnb_e4rt0'], ['2Dp88_5Go00', 'h_XfxYRI90I']], # 0 - not trade it self, 1 - trade it self
  5: ['zCEcZjzKVn4', 'pfcKHXAzZps', 'vGveKGwXSlw', '16AL5ElxDTY'],
  6: [
      [# not aggressive
        ['ZyX55eDKr90', 'dk_mEC-cpkw', '1UZw358I6ro', 'kpjn1qfdng8', 'z1Fi9AwRKg8'],# 0 - not trade it self, 1 - trade it self
        ['ZyX55eDKr90', 'iciDnQPX9qQ', 'lLwYAjd_fWM', 'lLwYAjd_fWM', 'z1Fi9AwRKg8']
      ],
      [# aggressive
        ['ZyX55eDKr90', 'ud-q_cJlciE', 'fFNM0Yj9fS4', 'MOgszmn-pDk', 'z1Fi9AwRKg8'],# 0 - not trade it self, 1 - trade it self
        ['ZyX55eDKr90', 'ud-q_cJlciE', 'lLwYAjd_fWM', 'lLwYAjd_fWM', 'z1Fi9AwRKg8']
      ]
  ],
  7: ['jaKF0W1Wxuw']
}

setPlayerWidth = ( width ) ->
  switch width
    when 320 then playerWidth = [300, 169]
    when 760 then playerWidth = [740, 416]
    when 980 then playerWidth = [960, 540]
    else
      playerWidth = [300, 169]
$ ->
  _containerWidth = $( '.container' ).width()
  setPlayerWidth _containerWidth

  $( window ).on 'resize', ->
    setPlayerWidth _containerWidth
    #$( '.video .plyer iframe' ).css({'width': playerWidth[0], 'height': playerWidth[1]})

  $( btnStart ).on 'click', ->
    $( '#first, #shadow' ).fadeOut fadeSpeed, ->
      $( '#q02' ).fadeIn fadeSpeed

    $( '.btn-answer' ).on 'click', ->
      _this = $(@)
      _video = $(@).data( 'video-id' )
      _question = $(@).data( 'next-question' )
      _screen = $(@).data( 'screen' )
      _set = parseInt _screen.substr(2)
      _playerId = _screen.substr(1) + 'player'
      _specialBtn = $(@).data( 'special' )
      _goto = $(@).data( 'goto' )
      _amount = $( '#investments-amount' ).val()

      # set selfTrade in q03 section
      selfTrade = 1 if _set == 3 and _video == 0
      switch _set
        when 4 then _videoId = videos[_set][selfTrade][_video]
        else _videoId = videos[_set][_video]

      if _set == 4 and _video == 1 then aggressive = 1
      if _set == 5 and $( '.answers li', _screen).length < 3
        $( '.answers li:last', _screen).removeClass( 'hidden' )

      if _set == 6 and _amount != undefined
        $( '.video', _screen ).children( 'button' ).removeClass( 'btn-consultation' ).text( 'Открыть счёт' )
        if _amount < 300000 and _amount > 50000
          _videoId = videos[_set][aggressive][selfTrade][1]
        else if _amount <= 1000000 and _amount >= 300000
            _videoId = videos[_set][aggressive][selfTrade][2]
        else if _amount <= 3000000 and _amount > 1000000
            _videoId = videos[_set][aggressive][selfTrade][3]
        else if _amount > 3000000
            _videoId = videos[_set][aggressive][selfTrade][4]
        else
          $( '.video', _screen ).children( 'button' ).text( 'Далее' )
          if minAmount == 0
            _videoId = videos[_set][aggressive][selfTrade][0]
          else
            _videoId = videos[7][0]
            setTimeout((->
              $( '.video', _screen ).children( 'button' ).data( 'next-question', '#q101' )
              $( '.video', _screen ).children( 'button' ).addClass( 'btn-consultation' ).text( 'Получить консультацию' )
              ),
              500
            )
          _goto = '#q07'
          minAmount = 1

      # abracadabra
      #
      if undefined != _specialBtn
        $( '.video .btn-answer', _screen).data( 'next-question', _specialBtn )
      else
        $( '.video .btn-answer', _screen).data( 'next-question', _goto )

      if undefined == _video
        if player and typeof player.pauseVideo == 'function' then player.pauseVideo()
        $( _screen ).fadeOut 100, ->
          $( '.video', _question ).css( 'display', 'none' )
          $( '.question', _question ).css( 'display', 'block' )
          $( _question ).fadeIn fadeSpeed, ->
            $( 'body' ).removeClass( 'active-video' )
      else
        $( '.question', _screen ).fadeOut fadeSpeed, ->
          $( '.player', _screen ).html('').append( playerBox.attr( 'id', _playerId ) )
          player =  new YT.Player _playerId, {
                      height: playerWidth[1],
                      width: playerWidth[0],
                      playerVars:
                        'autoplay': 1,
                        'controls': 1,
                        'rel': 0,
                        'showinfo': 0
                      videoId: _videoId
                      #events:
                        #'onStateChange': onPlayerStateChange
                    }
          $( '.video', _screen ).fadeIn fadeSpeed, ->
            $( 'body' ).addClass( 'active-video' )
            if undefined != _specialBtn
              _this.parent().remove()
