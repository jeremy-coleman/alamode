
## Require Hook

The purpose of the require hook is to be able to run transpile files automatically when they are imported.

To use this feature, `alamode` needs to be `required` in a separate file, after which `import` and `export` statements will become available.

For example, take the following directory structure, with a main and library files:

%TREE example/require%

<table>
<thead>
<tr>
<th><code>index.js</code></th>
<th><code>lib.js</code></th>
</tr>
</thead>
<tbody>
<tr/><tr>
<td>

%EXAMPLE: example/require/index.js%
</td>
<td>

%EXAMPLE: example/require/lib.js%
</td>
</tr>
</tbody>
</table>


The require hook would work in the following way:

%EXAMPLE: example/fake-require.js, ../.. => alamode%

By executing the `node require.js` command, `alamode` will be installed and it will do its job dynamically for every `.js` file that is required, enabling to use `import` and `export` statements.

%FORK example/require/require%

<!-- ### Options

A number of options can be passed as the argument to the `alamode` function.

%TYPEDEF types/register.xml%

```js
require('alamode') {
  cwd:
}
``` -->