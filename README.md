# ARes Templates

[![Web Services](https://img.shields.io/badge/Owner-LITS%20Web%20Services-Black.svg)](https://shields.io/) 

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

## Connecting to ARes files

Atlas stores ARes files on a separate github repository with four directories: two "dev" directories (AresAuth_TestWeb and RemoteAuth_TestWeb) and two "prod" directories (AresAuth and RemoteAuth). We are using both depending on where the user comes from. `RemoteAuth` directory will forward users to the institution's SSO screen to login, but the `AresAuth` one is the one used from within NYU Classes. The functionality is supposed to be identical.

The two URLs are:

- [https://ares.library.nyu.edu/remoteauth/ares.dll](https://ares.library.nyu.edu/remoteauth/ares.dll)
- [https://ares.library.nyu.edu/aresauth/ares.dll](https://ares.library.nyu.edu/aresauth/ares.dll)

RemoteAuth authenticates via Shibboleth, while AresAuth authenticates via NYU Classes. However, authenticating to one gives access to both.

### Usage

Initialize the submodule with Atlas's repository:

```
git submodule sync && git submodule update --init
```

Pull in any changes from Atlas's upstream repository:

```
./load_upstream.sh
```

This defaults to pulling in changes from the `AresAuth_TestWeb` directory, but you can alternatively specify (another) directory:

```
./load_upstream.sh RemoteAuth_TestWeb
```

Once you make your changes in `./src` directory, then compile the changes into the dev (*TestWeb) directories:

```
./compile.sh dev
```

Before merging into `master`, compile into the production directories:

```
./compile.sh prod
```

If you want to compile only a specific file or path:

```
./compile.sh dev AboutAres.html
```

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
