export {}

/* typal types/ÀLaMode.xml namespace */
/**
 * @typedef {import('restream').ReplaceableInterface} _restream.ReplaceableInterface
 * @typedef {import('restream/src/lib/markers').Marker} _restream.Marker
 * @typedef {_alamode.Import} Import `＠record`
 * @typedef {Object} _alamode.Import `＠record`
 * @prop {{ from: string, to: string }} [replacement] How to replace the imported module name.
 * @prop {boolean} [esCheck=false] Whether to always perform es check and add `if (__esModule)` clause. Default `false`.
 * @prop {{ packages: !Array<string>, path: string }} [stdlib] Rearranges imports to require them from the compiled standard library from the given path. The default imports will become named.
 * @prop {!Array<string>} [alamodeModules] The list of modules that should not be checked for the `__esModule` export, i.e., knowing that they have been compiled with ÀLaMode, or are traditional CommonJS modules.
 * @prop {boolean} [skipLookup=false] If the module is not in the `alamodeModules`, its _package.json_ will be inspected to see if it exports the `alamode` property that would mean it does not have to have `esCheck`. Default `false`.
 * @typedef {_alamode.Jsx} Jsx `＠record`
 * @typedef {Object} _alamode.Jsx `＠record`
 * @prop {boolean} [prop2class=false] Convert properties that start with a capital letter to class names. Default `false`.
 * @prop {string|!Array<string>} [classNames] Paths to class names maps. Properties that are found in those maps, will be converted into a class name.
 * Example:
 * ```json
 * {
 *   "container": true,
 *   "row": true
 * }
 * ```
 * @prop {string|!Array<string>} [renameMaps] Paths to rename maps. All classes found in the maps will be renamed according to the rule.
 * Example:
 * ```json
 * {
 *   "row": "bt-a",
 *   "Image": "pu-i"
 * }
 * ```
 * @typedef {_alamode.CSS} CSS `＠record`
 * @typedef {Object} _alamode.CSS `＠record`
 * @prop {!Object<string, string>} [classNames] A map of CSS paths to their class names, which will be exported from the generated CSS.
 * @typedef {_alamode.Config} Config `＠record` The configuration set via the .alamoderc file.
 * @typedef {_alamode.$Config & _alamode.HookConfig} _alamode.Config `＠record` The configuration set via the .alamoderc file.
 * @typedef {Object} _alamode.$Config `＠record` The configuration set via the .alamoderc file.
 * @prop {!_alamode.Import} [import] Config for import transforms.
 * @prop {!_alamode.CSS} [css] Config for the inlined CSS.
 * @prop {!_alamode.Jsx} [jsx] JSX configuration.
 * @typedef {_alamode.ÀLaMode} ÀLaMode `＠interface` ÀLaMode instances extend the _Replaceable_ to process input data according to the rules.
 * @typedef {_alamode.$ÀLaMode & _restream.ReplaceableInterface} _alamode.ÀLaMode `＠interface` ÀLaMode instances extend the _Replaceable_ to process input data according to the rules.
 * @typedef {Object} _alamode.$ÀLaMode `＠interface` ÀLaMode instances extend the _Replaceable_ to process input data according to the rules.
 * @prop {{literals: _restream.Marker, strings: _restream.Marker, comments: _restream.Marker, inlineComments: _restream.Marker, escapes: _restream.Marker, regexes: _restream.Marker, regexGroups: _restream.Marker}} markers Initialised markers.
 * @prop {!_alamode.Config} config The configuration object.
 * @prop {string} file The current file being processed.
 * @prop {boolean} [noSourceMaps=false] Whether the source maps are disabled, and whitespace does not need to be added for `module.exports`. Default `false`.
 * @prop {boolean} [stopProcessing=false] Debug mode. Default `false`.
 * @prop {boolean} async Whether the stream is running in async mode, that is, not the require hook.
 * @prop {boolean} [renameOnly=false] Only remap imports' locations, without transpiling into require. Default `false`.
 * @typedef {_alamode.ÀLaModeReplacer} ÀLaModeReplacer A sync replacement function with ÀLaMode as its `this` context.
 * @typedef {function(this: _alamode.ÀLaMode, ...string): string} _alamode.ÀLaModeReplacer A sync replacement function with ÀLaMode as its `this` context.
 */

/* typal types/Hook.xml namespace */
/**
 * @typedef {_alamode.HookConfig} HookConfig The options for ÀLaMode Hook.
 * @typedef {Object} _alamode.HookConfig The options for ÀLaMode Hook.
 * @prop {string} [pragma] What pragma to add on top of JSX programs. Default `const { h } = require('preact');`.
 * @prop {boolean} [noWarning=false] Disable warnings when resetting existing hooks. Default `false`.
 * @prop {boolean} [ignoreNodeModules=true] Auto-ignore node_modules. Independent of any matcher. Default `true`.
 * @prop {(path: string) => boolean} [matcher] The function that will be called with the path and return whether the file should be transpiled.
 */
