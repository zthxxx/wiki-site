#!/bin/sh
cmd="${1:-"./main"}"
data="${2:-"test_data.txt"}"
output="${3:-"stdout.txt"}"

awk -v RS="" '{print $n | "\"'"${cmd}"'\" >> \"'"${output}"'\"";close("\"'"${cmd}"'\" >> \"'"${output}"'\"")}' ${data}