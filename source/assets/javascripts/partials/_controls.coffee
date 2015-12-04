fadeSpeed = 400
playerBox = $( '<div class="player-box"></div>' )
player = false
selfTrade = 0
aggressive = 0
videos = {
  1: [],
  2: ['ekK7peRxKGc', 'uf8OKOt591E', 'sc0mi0Ei1CQ'],
  3: ['ekK7peRxKGc', 'uf8OKOt591E', 'sc0mi0Ei1CQ'],
  4: [['LVoElgX2irI', 'Xgm-iOW-uBY'], ['J7UwSVsiwzI', 'vP8RbfSgZtw']], # 0 - not trade it self, 1 - trade it self
  5: ['0gknoM7tglY', 'uf8OKOt591E', 'sc0mi0Ei1CQ', 'vP8RbfSgZtw'],
  6: [
      [# not aggressive
        ['1Kl4rNUTWCA', '9uvlxf94FMI', 'QZfkRsRxxgA', 'XtQkboxauOo', 'Y_TF9N2XlAs'],# 0 - not trade it self, 1 - trade it self
        ['1Kl4rNUTWCA', 'k6lbKLx6axg', 'ny5vGbTfB8c', 'ny5vGbTfB8c', 'hzv0Jyr5FWE']
      ],
      [# aggressive
        ['1Kl4rNUTWCA', 'DpN8UskODLE', 'qVFHLBUkGAQ', 's_Q954MTENQ', 'hzv0Jyr5FWE'],# 0 - not trade it self, 1 - trade it self
        ['1Kl4rNUTWCA', 'DpN8UskODLE', 'ny5vGbTfB8c', 'ny5vGbTfB8c', 'hzv0Jyr5FWE']
      ]
  ],
  7: ['6-DRAV6JSO0']
}

$ ->
  $( btnStart ).on 'click', ->
    $( '#first' ).fadeOut fadeSpeed, ->
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
        console.log _amount
        if _amount <= 300000 and _amount > 50000
          _videoId = videos[_set][aggressive][selfTrade][1]
        else if _amount <= 1000000 and _amount > 300000
            _videoId = videos[_set][aggressive][selfTrade][2]
        else if _amount <= 3000000 and _amount > 1000000
            _videoId = videos[_set][aggressive][selfTrade][3]
        else if _amount > 3000000
            _videoId = videos[_set][aggressive][selfTrade][4]
        else
          _videoId = videos[_set][aggressive][selfTrade][0]

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
          $( _question ).fadeIn fadeSpeed
      else
        $( '.question', _screen ).fadeOut fadeSpeed, ->
          $( '.player', _screen ).html('').append( playerBox.attr( 'id', _playerId ) )
          player =  new YT.Player _playerId, {
                      height: '540',
                      width: '960',
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
            if undefined != _specialBtn
              _this.parent().remove()
