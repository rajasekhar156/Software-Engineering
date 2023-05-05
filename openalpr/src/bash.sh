#!/bin/bash
echo "Enter the file name with the file-extension: "  
read file_name  
alpr -c in -n 1 $file_name > all_reads.txt
grep "confidence" all_reads.txt | sort -k4 | tail -1 > best.txt
awk '{print $2}' best.txt > ../../Frontend/public/highest.txt
ss=$(cat 'highest.txt')
grep -B 2 "$ss" all_reads.txt | head -1