# neovim-project

If one wants a file explorer within vim,
[NERDTree](https://github.com/scrooloose/nerdtree) is the usual go-to. 
But for the longest time I also wanted a customizable view of a project's files,
where I could group the files according to my whim. For that,
[vim-project](https://www.vim.org/scripts/script.php?script_id=69)
comes close (I mirror the code at https://github.com/yanick/vim-project). 
But `vim-project` by itself discard
any local changes to the file listing as soon as one refreshes the view.

Hence this additional plugin, which implements a project refresh that
leaves the order of files in the project file undisturbed. 

## Installation

Assuming you use [Plug](https://github.com/junegunn/vim-plug):

    function! JSPluginUpdate(args)
        !npm install
        UpdateRemotePlugins
    endfunction

    Plug 'yanick/vim-project'

    Plug 'yanick/neovim-project', {
    \   'do': function('JSPluginUpdate')
    \ }


## Project file format

This plugin uses the same project file format as `vim-project`, with the
following additions:

* lines with a leading `#` are comments.

* Project-level lines with a leading `#!` are regexes for files that
    should be skipped. 

* lines with leading `#?` are files that were in the project file but are now
    missing on disk.

e.g.,

```
project=foo CD=/path/to/project {
    #! \.git
    #! node_modules
    #! \.bk$
}
```


## Functions

### ProjectRefresh

This command, when called in a project buffer, will update the list of files 
with what's found on disk.

* Files that are in the project file but are no longer on disk will get
    prepended with `#?` .

* New files will be inserted at the top of the most specific folder.

### ProjectSection

This function is for ranges. It takes a range of lines containing files, and
generates a folder section using the longest common directory.

I.e., calling it over

```
this/and/that/foo.c
this/and/bar.c
this/and/those/thing.c
```

will generate

```
this/and  Files=this/and {
    that/foo.c
    bar.c
    those/thing.c
}
```

## My associated vim config

    map <F10> :Project .git/vim.project<CR>

    au BufNewFile,BufRead vim.project set filetype=project

    au FileType project set noswapfile

    au FileType project nmap <buffer><F5> :ProjectRefresh<CR>

    au FileType project vmap <buffer><F4> :call ProjectSection()<CR>

## My associated Synaptic config

    snippet pro "project def" b
    ${1:project}=`!v getcwd()` CD=. {
        #! \.git
    }
    endsnippet

    snippet section "section" b
    ${1:name}     Files=$1 {
    $0
    }
    endsnippet


## See also

Blog entries documenting my iterative scratching of this particular itch:
http://techblog.babyl.ca/entry/vim-project and http://techblog.babyl.ca/entry/nerdier


