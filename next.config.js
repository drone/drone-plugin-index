module.exports = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/comcast/drone-cloudfoundry",
        destination: "/plugins/cloudfoundry",
        permanent: true,
      },
      {
        source: "/jetrails/drone-cloudflare-caching",
        destination: "/plugins/cloudflare-caching",
        permanent: true,
      },
      {
        source: "/jetrails/drone-cloudflare-dns",
        destination: "/plugins/cloudflare-dns",
        permanent: true,
      },
      {
        source: "/jonasfranzdev/drone-crowdin",
        destination: "/plugins/crowdin",
        permanent: true,
      },
      {
        source: "/allgreed/drone-load-and-store",
        destination: "/plugins/load-and-store",
        permanent: true,
      },
      {
        source: "/amirbagh75/drone-fandogh",
        destination: "/plugins/fandogh",
        permanent: true,
      },
      {
        source: "/aosapps/drone-sonar-plugin",
        destination: "/plugins/sonar-plugin",
        permanent: true,
      },
      {
        source: "/appleboy/drone-apex-up",
        destination: "/plugins/apex-up",
        permanent: true,
      },
      {
        source: "/appleboy/drone-discord",
        destination: "/plugins/discord",
        permanent: true,
      },
      {
        source: "/appleboy/drone-facebook",
        destination: "/plugins/facebook",
        permanent: true,
      },
      {
        source: "/appleboy/drone-git-push",
        destination: "/plugins/git-push",
        permanent: true,
      },
      {
        source: "/appleboy/drone-gitlab-ci",
        destination: "/plugins/gitlab-ci",
        permanent: true,
      },
      {
        source: "/appleboy/drone-gtalk",
        destination: "/plugins/gtalk",
        permanent: true,
      },
      {
        source: "/appleboy/drone-jenkins",
        destination: "/plugins/jenkins",
        permanent: true,
      },
      {
        source: "/appleboy/drone-line",
        destination: "/plugins/line",
        permanent: true,
      },
      {
        source: "/appleboy/drone-packer",
        destination: "/plugins/packer",
        permanent: true,
      },
      {
        source: "/appleboy/drone-scp",
        destination: "/plugins/scp",
        permanent: true,
      },
      {
        source: "/appleboy/drone-sftp-cache",
        destination: "/plugins/sftp-cache",
        permanent: true,
      },
      {
        source: "/appleboy/drone-ssh",
        destination: "/plugins/ssh",
        permanent: true,
      },
      {
        source: "/appleboy/drone-telegram",
        destination: "/plugins/telegram",
        permanent: true,
      },
      {
        source: "/athieriot/drone-artifactory",
        destination: "/plugins/artifactory",
        permanent: true,
      },
      {
        source: "/banzaicloud/drone-kaniko",
        destination: "/plugins/kaniko",
        permanent: true,
      },
      // {
      //   source: "bitsbeats/drone-helm3",
      //   destination: "/plugins/helm3-2",
      //   permanent: true,
      // },
      {
        source: "/cbrgm/drone-hugo",
        destination: "/plugins/hugo",
        permanent: true,
      },
      {
        source: "/christophschlosser/drone-ftps",
        destination: "/plugins/ftps",
        permanent: true,
      },
      {
        source: "/clem109/drone-wechat",
        destination: "/plugins/wechat-2",
        permanent: true,
      },
      {
        source: "/cnbattle/drone-upx",
        destination: "/plugins/upx",
        permanent: true,
      },
      {
        source: "/codehimanshu/drone-github-comment",
        destination: "/plugins/github-comment",
        permanent: true,
      },
      {
        source: "/danielgormly/drone-plugin-kube",
        destination: "/plugins/plugin-kube",
        permanent: true,
      },
      {
        source: "/devops-israel/drone-ecs-deploy",
        destination: "/plugins/ecs-deploy",
        permanent: true,
      },
      {
        source: "/devops-israel/drone-lambda",
        destination: "/plugins/lambda",
        permanent: true,
      },
      {
        source: "/dhoeric/drone-airbrake-deployment",
        destination: "/plugins/airbrake-deployment",
        permanent: true,
      },
      {
        source: "/drillster/drone-email",
        destination: "/plugins/email",
        permanent: true,
      },
      {
        source: "/drillster/drone-rsync",
        destination: "/plugins/rsync",
        permanent: true,
      },
      {
        source: "/drillster/drone-volume-cache",
        destination: "/plugins/volume-cache",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-ansible",
        destination: "/plugins/ansible",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-anynines",
        destination: "/plugins/anynines",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-codacy",
        destination: "/plugins/codacy",
        permanent: true,
      },
      // {
      //   source: "/drone-plugins/drone-codecov",
      //   destination: "/plugins/codecov-2",
      //   permanent: true,
      // },
      {
        source: "/drone-plugins/drone-coveralls",
        destination: "/plugins/coveralls",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-docker",
        destination: "/plugins/docker",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-download",
        destination: "/plugins/download",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-downstream",
        destination: "/plugins/downstream",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-ecr",
        destination: "/plugins/ecr",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-gcr",
        destination: "/plugins/gcr",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-gcs",
        destination: "/plugins/gcs",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-gh-pages",
        destination: "/plugins/gh-pages",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-git",
        destination: "/plugins/git",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-gitea-release",
        destination: "/plugins/gitea-release",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-github-release",
        destination: "/plugins/github-release",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-gitter",
        destination: "/plugins/gitter",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-gpgsign",
        destination: "/plugins/gpgsign",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-hg",
        destination: "/plugins/hg",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-manifest",
        destination: "/plugins/manifest",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-matrix",
        destination: "/plugins/matrix",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-npm",
        destination: "/plugins/npm",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-pypi",
        destination: "/plugins/pypi",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-s3-cache",
        destination: "/plugins/s3-cache",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-s3-sync",
        destination: "/plugins/s3-sync",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-s3",
        destination: "/plugins/s3",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-slack-blame",
        destination: "/plugins/slack-blame",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-slack",
        destination: "/plugins/slack",
        permanent: true,
      },
      {
        source: "/drone-plugins/drone-webhook",
        destination: "/plugins/webhook",
        permanent: true,
      },
      {
        source: "/e20co/drone-marathon",
        destination: "/plugins/marathon",
        permanent: true,
      },
      {
        source: "/erguotou/drone-instant-access",
        destination: "/plugins/instant-access",
        permanent: true,
      },
      {
        source: "/fdeschenes/drone-grafana-annotation",
        destination: "/plugins/grafana-annotation",
        permanent: true,
      },
      {
        source: "/gboddin/drone-github-search-downstream",
        destination: "/plugins/github-search-downstream",
        permanent: true,
      },
      {
        source: "/hvalle/drone-gcs-cache",
        destination: "/plugins/gcs-cache",
        permanent: true,
      },
      {
        source: "/ibm/drone-bluemix-cloudfoundry",
        destination: "/plugins/bluemix-cloudfoundry",
        permanent: true,
      },
      {
        source: "/ipedrazas/drone-helm",
        destination: "/plugins/helm",
        permanent: true,
      },
      {
        source: "/knovus/drone-openfaas",
        destination: "/plugins/openfaas",
        permanent: true,
      },
      {
        source: "/lddsb/drone-dingtalk-message",
        destination: "/plugins/dingtalk-message",
        permanent: true,
      },
      {
        source: "/lizheming/drone-wechat",
        destination: "/plugins/wechat",
        permanent: true,
      },
      {
        source: "/loq9/drone-nomad",
        destination: "/plugins/nomad",
        permanent: true,
      },
      {
        source: "/lucaperret/drone-netlify",
        destination: "/plugins/netlify",
        permanent: true,
      },
      {
        source: "/lucaperret/drone-now",
        destination: "/plugins/now",
        permanent: true,
      },
      {
        source: "/mactynow/drone-kubernetes",
        destination: "/plugins/kubernetes",
        permanent: true,
      },
      {
        source: "/masci/drone-datadog",
        destination: "/plugins/datadog",
        permanent: true,
      },
      {
        source: "/meltwater/drone-cache",
        destination: "/plugins/cache",
        permanent: true,
      },
      {
        source: "/mike1pol/drone-rocket",
        destination: "/plugins/rocket",
        permanent: true,
      },
      {
        source: "/naorlivne/drone-github-changelog-generator",
        destination: "/plugins/github-changelog-generator",
        permanent: true,
      },
      {
        source: "/naorlivne/drone-metronome",
        destination: "/plugins/metronome",
        permanent: true,
      },
      {
        source: "/oliver006/drone-gcf",
        destination: "/plugins/gcf",
        permanent: true,
      },
      {
        source: "/pelotech/drone-ecs",
        destination: "/plugins/ecs",
        permanent: true,
      },
      {
        source: "/pelotech/drone-elastic-beanstalk",
        destination: "/plugins/elastic-beanstalk",
        permanent: true,
      },
      {
        source: "/pelotech/drone-google-chat",
        destination: "/plugins/google-chat",
        permanent: true,
      },
      {
        source: "/pelotech/drone-helm3",
        destination: "/plugins/helm3",
        permanent: true,
      },
      {
        source: "/pelotech/drone-rancher",
        destination: "/plugins/rancher",
        permanent: true,
      },
      {
        source: "/robertstettner/drone-cloudformation",
        destination: "/plugins/cloudformation",
        permanent: true,
      },
      {
        source: "/robertstettner/drone-codecov",
        destination: "/plugins/codecov",
        permanent: true,
      },
      {
        source: "/robertstettner/drone-mvn-auth",
        destination: "/plugins/mvn-auth",
        permanent: true,
      },
      {
        source: "/robertstettner/drone-npm-auth",
        destination: "/plugins/npm-auth",
        permanent: true,
      },
      {
        source: "/techknowlogick/drone-b2",
        destination: "/plugins/b2",
        permanent: true,
      },
      {
        source: "/tuannvm/drone-rds-snapper",
        destination: "/plugins/rds-snapper",
        permanent: true,
      },
      {
        source: "/vallard/drone-kube",
        destination: "/plugins/kube",
        permanent: true,
      },
      {
        source: "/vividboarder/drone-webdav",
        destination: "/plugins/webdav",
        permanent: true,
      },
      {
        source: "/wayneconnolly/drone-rancher-stack-v1",
        destination: "/plugins/rancher-stack-v1",
        permanent: true,
      },
      {
        source: "/wesleimp/drone-circleci",
        destination: "/plugins/circleci",
        permanent: true,
      },
      {
        source: "/wyattjoh/drone-gcs",
        destination: "/plugins/gcs-2",
        permanent: true,
      },
      {
        source: "/yakumioto/drone-serverchan",
        destination: "/plugins/serverchan",
        permanent: true,
      },
      {
        source: "/CityFurniture/newrelic-deployment",
        destination: "/plugins/newrelic-deployment",
        permanent: true,
      },
      {
        source: "/target/captains-log",
        destination: "/plugins/captains-log",
        permanent: true,
      },
      {
        source: "/bh90210/dron8s",
        destination: "/plugins/dron8s",
        permanent: true,
      },
      {
        source: "/jmccann/chef-supermarket",
        destination: "/plugins/chef-supermarket",
        permanent: true,
      },
      {
        source: "/jmccann/clair",
        destination: "/plugins/clair",
        permanent: true,
      },
      {
        source: "/jmccann/terraform",
        destination: "/plugins/terraform",
        permanent: true,
      },
    ]
  }
};
