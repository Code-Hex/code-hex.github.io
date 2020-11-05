#!/usr/bin/env perl

use strict;
use warnings;
use utf8;
use feature qw/say/;
use Data::Dumper;
use YAML::XS;
use JSON::XS;

# You can get this file following these flows.
# 1. access to https://YOUR-WORKSPACE.slack.com/customize/emoji
# 2. search you want emojis
# 3. if you are using Google Chrome, open the network tab and find like "emoji.adminList"'s response.
# 4. copy content of the response, and create result.json and paste it!!
my $jsonfile = "result.json";

open my $fh, "<", $jsonfile;
my $json = do { local $/; <$fh>; };
close $fh;

my $decoded = decode_json($json);

my @img_urls;
for my $emoji (@{$decoded->{emoji}}) {
    push @img_urls, $emoji->{url};
}

my $src = "https://raw.githubusercontent.com/Code-Hex/code-hex.github.io/master/slack/assets";

my $data = +{
    title  => 'codehex',
    emojis => +[],
};
my $yaml = "codehex.yaml";

for my $img_url (@img_urls) {
    my $filename = $img_url =~ s/\A.*\/(.*)\/.*(\.[a-z]+)\z/$1$2/gr;
    my $title = (split /\./, $filename)[0];
    system("curl -o assets/$filename -O $img_url");
    push @{$data->{emojis}}, +{
        name => $title,
        src  => "$src/$filename",
    };
}

YAML::XS::DumpFile($yaml, $data);

