## ARes Templates

NYU customizations of the ARes proprietary templates.

### Connecting to ARes server

You can SFTP (or use `lftp` for automation) to the ARes server with the credentials provided by the vendor. There are two root folder: `RemoteAuth` and `AresAuth`. We are using the `RemoteAuth` version so do any custom work only after `cd`-ing to that directory.

### Use

Make your changes in the `./dist` directory and run `./ftp.sh` to deploy changes to the ARes server. 

### Environments

#### TestWeb

ARes provides a copy of the application in the `TestWeb` folder which is accessible from [https://ares.library.nyu.edu/remoteauth/TestWeb/ares.dll](https://ares.library.nyu.edu/remoteauth/TestWeb/ares.dll). You should use this folder as a staging environment before merging into the top-level directory, which contains the public-facing pages.

#### Production

Pages updated in the top-level `RemoteAuth` directory are instantly reflected in the web inteface.

### Road map

- Throw pages into static site generator (e.g. Jekyll, Hugo; implementation TBD) with wrapping templates to DRY up implementation and make automated deploys easier
- Use Bootstrap to re-theme the pages responsively
- Automate deploys to TestWeb and prod based on Gitflow, i.e. non-master to staging, master to prod
- Containerize build process and deploy from K8s Jenkins