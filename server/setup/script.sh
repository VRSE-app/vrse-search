#!/bin/sh

# read contents of unzipped file
# write to dB contents of file
# delete zipped file and unzipped file
# proceed to next file
for f in $(find . -name "*.gz"); do
    temp_dir="./temp";
    file_name="$f.json";
    # -k keeps both the original and uncompressed file (in case we mess up)
    gunzip -k "$f" > "$f.json";
    cd "./temp";
    echo $file_name;

    # no idea what this does
    split $file_name "$file_name-" -l 5000 -a 3 -d;
    # iterate through every element in the json file
    for fs in $(find . -name "$file_name-*"); do
		echo $fs;
		sed 's/^/{"index":{}}\n/' "$fs" > "$fs-i";
		echo "$fs-i";
        curl -XPOST -H 'Content-Type: application/json' 'localhost:9200/search/semanticscholar/_bulk?pretty' --data-binary "@$fs-i";
    done

    DATE=`date '+%Y-%m-%d %H:%M:%S'`;
	echo "$f $DATE" >> completed.log;
	cd ../;
    
    echo "\n\n";
    echo "the response is:";
    curl "localhost:9200/_cat/indices?v";
done
    # this deletes all the associated files
	# rm -R "$temp_dir";