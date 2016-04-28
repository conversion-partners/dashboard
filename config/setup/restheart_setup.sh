#!/bin/sh

USER=admin
PASS=changeit
IP=127.0.0.1
PORT=8080
FILE=test_png.png
TESTDB=testdb
FILEBUCKET=mybucket.files

CMD1='curl -u '$USER':'$PASS' -X PUT -H "Content-Type: application/json" '$IP:$PORT/$TESTDB

echo $CMD1
#exec $CMD1

CMD2='curl -v -u '$USER':'$PASS' -X PUT -H "Content-Type: application/json" '$IP:$PORT/$TESTDB/$FILEBUCKET


echo $CMD2
#exec $CMD2


#curl -v -u admin:changeit -X POST -F 'properties={filename:"test_png.png"}' -F "file=@test_png.png" 192.168.1.71:8080/testdb/mybucket.files

CMD3='curl -v -u '$USER:$PASS' -X POST -F '''properties={"filename":"'$FILE'"}''' -F "file=@'$FILE'" '$IP:$PORT/$TESTDB/$FILEBUCKET



echo $CMD3
#exec $CMD3


