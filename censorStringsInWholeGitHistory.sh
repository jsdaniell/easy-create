for string in "$@"
do
  echo ""
  echo "================ Censoring string "$string": ================"
  sh replaceStringInWholeGitHistory.sh "$string" "********"
done