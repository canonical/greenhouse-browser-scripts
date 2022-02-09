# Canonical's Greenhouse Userscripts

This project contains a set of [Userscripts](https://en.wikipedia.org/wiki/Userscript) that enhance the user experience on Canonical's Greenhouse dashboard.

## Project structure

Each Userscript is a standalone file, there is no dependency to other files in this project.
The Userscript file look like: `*.user.js`

The file `package.json` contains some devolopment dependencies that helps to enforce a coding style and format the code:

-   Install depndecies:

```bash
yarn
```

-   Run the `format` script:

```bash
yarn format
```

## Development process/tools

### Code editor

We recommend developing on VSCode for the Userscript, and install the following extensions:

-   [TamperMonkey Snippets](https://marketplace.visualstudio.com/items?itemName=darxeal.tampermonkey-snippets)
-   [UserScript](https://marketplace.visualstudio.com/items?itemName=adpyke.vscode-userscript)
-   [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)

### Running the project

As the nature of Userscript requires interaction with the UI of Greenhouse dashboard, you have to go throw testing the Userscript manually:

1. Copy your code from the editor
2. Go to the TamperMonkey dashboard > "+ button" > Select all > delete
3. Paste your code and hit save (`ctrl+s`/`cmd+s`)
4. Reload your Greenhouse dashboard
5. If the Userscript is running, you will see something like this:
   ![TamperMonkey active icon](/resources/tampermonkey-running.png)
