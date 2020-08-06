# ARes Templates

NYU customizations of the ARes proprietary templates.

[https://ares.library.nyu.edu](https://ares.library.nyu.edu)

## Editing Forms

When editing forms make sure you edit both the creation and edit forms with the `IRF` prefix. The forms seem identical but the former is for creating new reserve items and the latter is for editing those items later on. For instance, if editing the Book form make change on the following two forms:

```
IRFBook.html
IRFEditBook.html
```

**Note the following abbreviations:**

```
IRF = Instructor Request Form
ISLRF = Instructor Shared List Request Form
```

We don't use the shared list functionality (i.e. `ISLRF`), so those forms shouldn't matter much.

## Connecting to ARes server

You can SFTP (or use `lftp` for automation) to the ARes server with the credentials provided by the vendor. There are two root folders: `RemoteAuth` and `AresAuth`. We are using both depending on where the user comes from. `RemoteAuth` directory will forward users to the institution's SSO screen to login, but the `AresAuth` one is the one used from within NYU Classes. The functionality is supposed to be identical.

The two URLs are:

- [https://ares.library.nyu.edu/remoteauth/ares.dll](https://ares.library.nyu.edu/remoteauth/ares.dll)
- [https://ares.library.nyu.edu/aresauth/ares.dll](https://ares.library.nyu.edu/aresauth/ares.dll)

RemoteAuth authenticates via Shibboleth, while AresAuth authenticates via NYU Classes. However, authenticating to one gives access to both.

### Usage

Make your changes in the `./dist` directory and run `./ftp.sh` to deploy changes to the ARes server. You must set `$SFTP_USERNAME` and `$SFTP_PASSWORD` environment variables to authenticate.

To deploy all files to TestWeb:

`./dist.sh`

To deploy a specific file to TestWeb:

`./dist.sh 'include_header.html'`

To deploy all files to production:

`./dist.sh '*.html' prod`

To deploy a specific file to production:

`./dist.sh 'include_header.html' prod`

## Docker

Again, you must set credentials in environment variables either on the host or via an env file.

To deploy all files to TestWeb:

`docker-compose run deploy`

To deploy a specific file to TestWeb:

`docker-compose run deploy 'include_header.html'`

To deploy all files to production:

`docker-compose run deploy '*.html' prod`

To deploy a specific file to production:

`docker-compose run deploy 'include_header.html' prod`

### Environments

#### TestWeb

ARes provides a copy of the application in the `TestWeb` folder which is accessible from [https://ares.library.nyu.edu/aresauth/TestWeb/ares.dll](https://ares.library.nyu.edu/aresauth/TestWeb/ares.dll). You should use this folder as a staging environment before merging into the top-level directory, which contains the public-facing pages.

The `ftp.sh` script will upload the same files to both the `RemoteAuth` and the `AresAuth` directories. **Note:** `TestWeb` directory only works as a staging environment in the `AresAuth` directory.

#### Production

Pages updated in the top-level `RemoteAuth` and `AresAuth` directories are instantly reflected in the web inteface.

### Road map

- Throw pages into static site generator (e.g. Jekyll, Hugo; implementation TBD) with wrapping templates to DRY up implementation and make automated deploys easier
- ~~Automate deploys to TestWeb and prod based on Gitflow, i.e. non-master to staging, master to prod~~
- ~~Containerize build process and deploy from K8s Jenkins~~
