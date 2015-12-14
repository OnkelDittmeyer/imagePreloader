#!/usr/bin/env ruby
require 'json'

class ListImages
    def call(env)
        imageDir = Dir.chdir("./img");
        files = Dir.glob("img*")

        n = 0
        tempHash = {}

        files.each do |i|
          tempHash["img#{n}"] = i
          n += 1
        end

       #File.open("temp.json","w") do |f|
         #f.write(tempHash.to_json)
       #end

      [200,{"Content-Type" => "application/javascript"}, [tempHash.to_json]]
      # the json content i want to return, couldnt find a good referene about the correct structure here
   puts "All done!"
   end
end

run listImages.new

# presuming you have rack & webrick
if $0 == __FILE__
  require 'rack'
  Rack::Handler::WEBrick.run ListImages.new
end
