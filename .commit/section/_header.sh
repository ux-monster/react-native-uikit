#!/bin/bash

echo "What is your commit type?"
PS3='Please enter your commit type (help): '
options=(
  "feat: "
  "fix: "
  "docs: "
  "style: "
  "refactor: "
  "perf: "
  "test: "
  "build: "
  "ci: "
  "chore: "
  "revert: "
  "[WIP] "
)

select opt in "${options[@]}"
do
    case $opt in
        "feat: "|"fix: "|"docs: "|"style: "|"refactor: "|"perf: "|"test: "|"build: "|"ci: "|"chore: "|"revert: "|"[WIP] ")
            # echo "$opt"
            break
            ;;
        *) 
            # echo "invalid option $REPLY"
            echo "* feat     : A new feature"
            echo "* fix      : A bug Fix"
            echo "* docs     : Documentation only changes"
            echo "* style    : Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)"
            echo "* refactor : A code change that neither fixes a bug nor adds a feature"
            echo "* perf     : A code change that improves performance"
            echo "* test     : Adding missing tests or correcting existing tests"
            echo "* build    : Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)"
            echo "* ci       : Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)"
            echo "* chore    : Other changes that don't modify src or test files"
            echo "* revert   : Reverts a previous commit"
            echo "* [WIP]    : Work In Progress"
            ;;
    esac
done

echo "Please enter your commit message"
read -ep "$opt" message
RESULT="$opt$message\n\n"

# TEST
# echo "$opt$message"
# echo "RESULT :: $RESULT"