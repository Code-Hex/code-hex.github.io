var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '460',
        videoId: 'Qkuu0Lwb5EM',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

var playing = false
function onPlayerStateChange(event) {
    playing = event.data == YT.PlayerState.PLAYING
}

var colors = [
    "#cbff8a",
    "#75cc57",
    "#459ce6",
    "#7b2742",
    "#f9583c",
    "#dd355b"
]

var idx
var white = "white"
function _mirror_ball() {
    for (;;) {
        var i = Math.floor(Math.random() * colors.length)
        if (idx !== i) {
            idx = i
            break
        }
    }
    console.log("Hello!!!" + colors[idx] + " " + idx)
    document.body.style.backgroundColor = colors[idx];
}

var timeout;
function party() {
    if (!playing) {
        timeout = setTimeout(_mirror_ball, 1000);
        player.playVideo()
    } else {
        clearTimeout(timeout);
        document.body.style.backgroundColor = white
        player.pauseVideo()
    }
}
