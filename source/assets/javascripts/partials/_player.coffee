onYouTubeIframeAPIReady = () ->
  document.getElementById( 'btn-start' ).setAttribute( 'class', 'btn' )
  document.getElementById('btn-start').removeAttribute('disabled')
