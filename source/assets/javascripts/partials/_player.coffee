onYouTubeIframeAPIReady = () ->
    document.getElementById( 'btn-start' ).setAttribute( 'class', 'btn' )
    document.getElementById('btn-start').removeAttribute('disabled')
checkApiYoutube = () ->
  if window['YT'] 
    document.getElementById( 'btn-start' ).setAttribute( 'class', 'btn' )
    document.getElementById('btn-start').removeAttribute('disabled')
    clearInterval IID

IID = setInterval checkApiYoutube(), 1000  
