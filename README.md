# dummy-commits

## Purpose
The purpose of this repository is to ensure that there is a daily contribution. If there were no activities yesterday, the script will create a dummy commit and push it to your specified repository with yesterday's date.

Note: This is not meant to deceive anyone - it is with the intention of maintianing a colorful contributions graph. :)

It does so in the following steps using the github API:

1. Check whether a github event was performed yesterday through your account
2. If not, get the last commit in the specified repository
3. Using the last commit sha, create a new child dummy commit
4. Update the HEAD reference to point to the newly created commit

## Installation
1. Install node
2. Clone this repo
3. Run `npm install`
4. Change the sample-config.js file to config.js with your credentials
  - you can grab an access token by following [this](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)
5. Run node dummyCommit.js OR
6. (Bonus) set up a cron job to automate daily