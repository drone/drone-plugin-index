---
version: '0.8'
date: 2018-08-17T00:00:00+00:00
title: Captains Log
author: Target
tags: [ notifications, chat, slack, logs, build, release notes, releases, notes ]
logo: captains_log.svg
repo: target/captains-log
image: target/captains-log
---

A Drone plugin that helps organize release information in Slack

# Example Configuration

This is the base configuration for Captain's Log. (When using this configuration, all messages will default to the `general` bucket.)

```yaml
my-release-log-step:
  image: target/captains-log:1
  secrets: [ SLACK_URL, GITHUB_TOKEN ] 
  github_owner: target
  github_repo: captains-log
  jira_team_domain: myteamnamespace
```

You can also employ the use of `teams`. These are helpful for organizing different issue types into different buckets. 

```diff
my-release-log-step:
  image: target/captains-log:1
  secrets: [ SLACK_URL, GITHUB_TOKEN ]
  github_owner: ReactTraining
  github_repo: react-media
  jira_team_domain: myteamnamespace
+ teams:
+   - name: Team1
+     color: "#FFDC18"
+     emoji: "✨"
+     mentions: "<@person1>  <@person2>"
+     issueTracking:
+       - jira:
+           projects:
+           - TEAM1
+           - TEAM1SUBGROUP
+   - name: Team2
+     color: "#F48642"
+     emoji: "🔥"
+     mentions: "<@person3>"
+     issueTracking:
+       - jira:
+           projects:
+           - TEAM2
```



Full Plugin With _all_ parameters:
```yaml
my-release-log-step:
  image: target/captains-log:1
  secrets: [ SLACK_TOKEN, SLACK_URL, GITHUB_TOKEN ]
  github_owner: ReactTraining
  github_repo: react-media
  slack_channel: reactify
  jira_team_domain: myteamnamespace
  enterprise_host: https://git.reactify.com/api/v3
  teams:
    - name: Team1
      color: "#FFDC18"
      emoji: "✨"
      mentions: "<@person1>  <@person2>"
      issueTracking:
        - jira:
            projects:
            - TEAM1
            - TEAM1SUBGROUP
    - name: Team2
      color: "#F48642"
      emoji: "🔥"
      mentions: "<@person3>"
      issueTracking:
        - jira:
            projects:
            - TEAM2
```



# Secret Reference

github_token
: to fetch github info on releases/tags

slack_token
: or if you don't have an api token the `slack_url` secret can be used

# Parameter Reference

github_owner - **required**
: Owner of the repository

github_repo - **required**
: Target repository name

jira_team_domain - **required**
: (**required** until Jira is not the only issue tracker) - namespace of Jira workspace (e.g. `jira.myteamnamespace.com`)

github_tag_id
: you can use this as regex to match on specific tags.

slack_channel/slack_url
: when using the API, you should use `slack_channel` to specify which room you'd like to post to. When using `SLACK_URL` you should not specify the room (i.e. `slack_channel`) because the room is already a part of the webhook. ([Setting Up A Webhook (e.g. SLACK_URL)](https://api.slack.com/incoming-webhooks), [Setting Up A Slack Token](https://api.slack.com/docs/token-types#verification))

teams
: a list of teams which allows you to organize the output of Captains Log into meaningful chunks. ([more here](https://github.com/target/captains-log#teams-structure))

enterprise_host
: if you use Enterprise Github, this is where you would supply the custom domain. (e.g. `https://git.myCompany.com`)

# Example Output

[Found in README at `target/captains-log`](https://github.com/target/captains-log#example-output).
