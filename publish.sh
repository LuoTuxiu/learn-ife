# !/bin/bash
# 使用举例： ./publish.sh
git checkout dev
if test $? -eq 0
then
  git pull origin dev
  git status
  git checkout master
  git pull origin master
  git merge --no-ff dev
  npm run build
  git add .
  git commit -m '构建'
  git push -u origin master
else
  echo 'git checkout dev出错'
fi
