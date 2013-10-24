#!/bin/bash
rsync -avze ssh --progress --delete --exclude-from="./rsyncignore" ./ aestik@direct.aestik.com:~/www/www.aestik.com/
