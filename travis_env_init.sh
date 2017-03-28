#!/bin/bash

__COMMENTS__='
# OS: ubuntu 14.04 trusty
# nodejs: 6.9.1
# npm: 3.10.8
# sudo: required
# need "GIT_USER_NAME" "GIT_USER_EMAIL" "GIT_REPO_TOKEN" variable in env.
# how to use: in travis, use the script to run, eg:
#    source travis_env_init.sh
#    sh travis_env_init.sh
#    ./travis_env_init.sh
'


node --version
npm --version

echo "Hexo environment pre install start."
echo "${__COMMENTS__}"

npm install -g gulp > /dev/null
npm install -g hexo-cli > /dev/null
npm install

echo "hexo and packages install complete."

# Set git config 
git config --global user.name "${GIT_USER_NAME}"
git config --global user.email "${GIT_USER_EMAIL}"
sed -i'' "s~git@github.com:~https://${GIT_REPO_TOKEN}@github.com/~" _config.yml


theme_config_file="themes/Wikitten/_config.yml"
cp "${theme_config_file}.example" "${theme_config_file}"
# Set Wikitten theme config

echo "Hexo environment pre install complete OK."
