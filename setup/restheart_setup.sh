#!/bin/sh

USER=admin
PASS=changeit
IP=192.168.1.71
PORT=8080
FILE=test_png.png
TESTDB=testdb
FILEBUCKET=mybucket.files

CMD1='curl -u '$USER':'$PASS' -X PUT -H "Content-Type: application/json" '$IP:$PORT/$TESTDB

echo $CMD1
exec $CMD1

CMD2='curl -v -u '$USER':'$PASS' -X PUT -H "Content-Type: application/json" '$IP:$PORT/$TESTDB/$FILEBUCKET


echo $CMD2
exec $CMD2

#CMD3='curl -v -u '$USER':'$PASS'" -X POST -F 'properties={"filename":"'$FILE'\"}\' -F "file=@$FILE" $IP:$PORT/$TESTDB/$FILEBUCKET

CMD3='curl -v -u '$USER:$PASS $CMD3'-X POST -F '''properties={"filename":"'$FILE'"}''' -F "file=@'$FILE'"' $IP:$PORT/$TESTDB/$FILEBUCKET



echo $CMD3
exec $CMD3


