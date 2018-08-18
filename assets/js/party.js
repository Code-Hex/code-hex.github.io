var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videos = [
    'bk-BPRXYk9g',
    'Qkuu0Lwb5EM',
    '5NV6Rdv1a3I'
]
var player
function onYouTubeIframeAPIReady() {
    var idx = Math.floor(Math.random() * videos.length)
    player = new YT.Player('player', {
        height: '315',
        width: '460',
        videoId: videos[idx],
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.mute();
}

var interval = 700
var playing = false
var dance = '.dance-floor'
function party() {
    if (!playing) {
        player.playVideo()
        $(dance).show();
        playing = true
        $('*:not(button)').css('color', 'white');
        document.body.style.backgroundColor = "#1e272e";
    } else {
        player.pauseVideo()
        $(dance).hide();
        playing = false
        $('*:not(button)').css('color', 'black');
        document.body.style.backgroundColor = "white";
    }
}
