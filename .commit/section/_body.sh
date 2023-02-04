#!/bin/bash

# Summary
echo "Please enter your commit summary"
read -ep "Summary: " summary

# Summary - Result
RESULT="${RESULT}Summary:\n${summary}\n\n"

# Summary - TEST
# echo "$RESULT"

# Details
echo "Please enter your commit details (E/end)"

# Details - Result
DETAILS=""
declare -i INDEX=1
while :
do
    read -ep "$INDEX) " details
    case $details in
        "E"|"end")
            break
            ;;
        *)
            DETAILS="${DETAILS}${INDEX}) ${details}\n"
            ;;
    esac
    INDEX=$(( $INDEX + 1 ))
done
RESULT="${RESULT}${DETAILS}\n"

# Details - TEST
# echo "DETAILS TEST"
# echo "${RESULT}"

