# !/bin/bash
# 使用举例： ./run.sh 'commit的信息' '要push的分支'
# 添加入版本库
git add .
# 提交版本信息
if test "$1" != "" -a $? -eq 0
then
  git commit -m $1
else
  echo '2'
  git commit -m '提交'
fi
# push到远程仓库
if test "$2" != "" -a $? -eq 0
then
  git push -u origin $2
else
  git push -u origin dev
fi
