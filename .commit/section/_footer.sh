#!/bin/bash

echo "Please enter the issue numbers you have resolved (#1, #2 ...)"
read -ep "Resolved: " resolved_items
if  [[ -n "$resolved_items" ]] ; then
    RESULT="${RESULT}Resolved: ${resolved_items}\n"
fi

echo "Please enter the hash value of the referenced commit (df33fc56, af33fc56 ...)"
read -ep "Referenced: " referenced_items
if  [[ -n "$referenced_items" ]] ; then
    RESULT="${RESULT}Referenced: ${referenced_items}\n"
fi

echo "Please enter the related PR numbers (#1, #2 ...)"
read -ep "Related: " related_items
if  [[ -n "$related_items" ]] ; then
    RESULT="${RESULT}Related: ${related_items}\n"
fi

# Footer - TEST
echo ""
echo "[COMMIT MESSAGE]"
echo ""
echo "${RESULT}"
