var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videos = [
    'bk-BPRXYk9g',
    'Qkuu0Lwb5EM'
]
var player
function onYouTubeIframeAPIReady() {
    var idx = Math.floor(Math.random() * videos.length)
    player = new YT.Player('player', {
        height: '315',
        width: '460',
        videoId: videos[idx],
        events: {}
    });
}

var loop
var interval = 700
var playing = false
var dance = '.dance-floor'
function party() {
    if (!playing) {
        loop = setInterval(_mirror_ball, interval);
        player.playVideo()
        $(dance).show();
        playing = true
        $('*:not(button)').css('color', 'white');
        document.body.style.backgroundColor = "black";
    } else {
        clearInterval(loop);
        player.pauseVideo()
        $(dance).hide();
        playing = false
        $('*:not(button)').css('color', 'black');
        document.body.style.backgroundColor = "white";
    }
}
