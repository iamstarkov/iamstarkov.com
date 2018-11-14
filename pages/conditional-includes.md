import { Meta } from '../components'

<Meta
  title="Keeping up with two git identities"
  description="You can work with your company projects and with open-source projects without mixing two git identities."
/>

# Keeping up with two git identities

_November 14, 2018_

If you are working as a developer these days, then you most likely use a lot of open-source projects and perhaps your company even open sourced several internal projects. You probably fix issues you have with 3rd party dependencies from time to time. While at the same time you have internal project which you keep in the internal source control system.

Or maybe you are a consultant and have personal projects and clients' projects, then chances are high you have client specific email and your personal email.

While everything may seem to be working fine with your simple global git name and email, you then start to notice some of your GitHub commits lack an avatar, or quite the opposite—in your internal source control system (e.g. hosted BitBucket or Gitlab) your commits lack the avatar and username link is shaded.

You start to wonder why and after some digging you find out that you committed to an open-source project using your company email, or the other way around. None of these two options are good.

Don't worry, because with git [2.13](https://github.com/git/git/blob/v2.13.0/Documentation/RelNotes/2.13.0.txt) you get a feature called [conditional includes](https://git-scm.com/docs/git-config#_includes). It allows you to configure git to take file system into consideration to figure out which credentials to use for the commit.

Say you keep your repositories in a specific folder or folders. And structure of those folder probably look similar to this:

```
☯ tree projects/ -L 2
projects/
├── company
│   ├── route
│   ├── scripts
│   └── tools
└── oss
    ├── iamstarkov.com
    ├── mdx
    └── next.js
```

Then you want to use different identities for different purposes. Conditional includes will help with that.

> You can include a config file from another conditionally by setting a `includeIf.<condition>.path` variable to the name of the file to be included.  
> [git docs](https://git-scm.com/docs/git-config#_conditional_includes)

In order to utilise this feature you need three files:

- `~/.gitconfig`
- `~/.gitconfig_oss`
- `~/.gitconfig_company`

And content of these files should look like this:

```
$ cat ~/.gitconfig
[user]
  name = Firstname and Lastname
[includeIf "gitdir:~/projects/oss/"]
    path = ~/.gitconfig_oss
[includeIf "gitdir:~/projects/company/"]
    path = ~/.gitconfig_company

$ cat ~/.gitconfig_oss
[user]
  email = personal@gmail.com

$ cat ~/.gitconfig_company
[user]
  email = work@company.org
```

Let's go through what is going on here.

in `~/.gitconfig` you specify general options which can be overridden by sub-configs. In this case you specify `user.name`, after that you have two `includeIf` sections, with `gitdir` option set to relevant folders with paths set to relevant sub-configs. And those sub-configs in turn should specify different `user.email` values for different purposes: `user.email=personal@gmail.com` for open-source projects and `user.email=work@company.org` for company specific projects. It was fast, huh?

Let's check if it works or not:

```
☯ cd ~/projects/oss/mdx
☯ git config --list | grep user
user.name=Firstname and Lastname
user.email=personal@gmail.com

☯ cd ~/projects/company/route
☯ git config --list | grep user
user.name=Firstname and Lastname
user.email=work@company.org
```

Looks like, it does indeed work. Worth noticing this scheme will work for any number of git identities, the only requirement is to keep it in different folders.

To sum it up, now you can work with your company projects and with open-source projects without mixing two git identities ever again. Hurray!

_Configure the shit out of your git!  
your [Vladimir Starkov](https://iamstarkov.com)_
