require 'sinatra'
require 'json'

post '/githubwebhook' do
    push = JSON.parse()
    puts