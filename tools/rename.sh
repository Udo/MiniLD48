mkdir tmp/
x=1; for i in screencaps/*jpg; do counter=$(printf %05d $x); ln "$i" tmp/"$counter".jpg; x=$(($x+1)); done
