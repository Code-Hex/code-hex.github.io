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
        }
    });
}



var colors = [
    "#cbff8a",
    "#75cc57",
    "#459ce6",
    "#fa6b52",
    "#5dcca7",
    "#ffff00"
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
    console.log(colors[idx] + " " + idx)
    document.body.style.backgroundColor = colors[idx];
}

var loop
var interval = 100
var playing = false
function party() {
    if (!playing) {
        loop = setInterval(_mirror_ball, interval);
        player.playVideo()
        playing = true
    } else {
        clearInterval(loop);
        document.body.style.backgroundColor = white
        player.pauseVideo()
        playing = false
    }
}
