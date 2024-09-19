// Built by eustia.
(function(root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define([], factory);
    } else if (typeof module === 'object' && module.exports)
    {
        module.exports = factory();
    } else { root._ = factory(); }
}(this, function ()
{
    /* eslint-disable */

    var _ = {};

    if (typeof window === 'object' && window._) _ = window._;

    /* ------------------------------ types ------------------------------ */

    var types = _.types = (function (exports) {
        /* Used for typescript definitions only.
         */

        /* typescript
         * export declare namespace types {
         *     interface Collection<T> {}
         *     interface List<T> extends Collection<T> {
         *         [index: number]: T;
         *         length: number;
         *     }
         *     interface ListIterator<T, TResult> {
         *         (value: T, index: number, list: List<T>): TResult;
         *     }
         *     interface Dictionary<T> extends Collection<T> {
         *         [index: string]: T;
         *     }
         *     interface ObjectIterator<T, TResult> {
         *         (element: T, key: string, list: Dictionary<T>): TResult;
         *     }
         *     interface MemoIterator<T, TResult> {
         *         (prev: TResult, curr: T, index: number, list: List<T>): TResult;
         *     }
         *     interface MemoObjectIterator<T, TResult> {
         *         (prev: TResult, curr: T, key: string, list: Dictionary<T>): TResult;
         *     }
         *     type Fn<T> = (...args: any[]) => T;
         *     type AnyFn = Fn<any>;
         *     type PlainObj<T> = { [name: string]: T };
         * }
         * export declare const types: {};
         */

        exports = {};

        return exports;
    })({});

    /* ------------------------------ debounce ------------------------------ */
    _.debounce = (function (exports) {
        /* Return a new debounced version of the passed function.
         *
         * |Name  |Desc                           |
         * |------|-------------------------------|
         * |fn    |Function to debounce           |
         * |wait  |Number of milliseconds to delay|
         * |return|New debounced function         |
         */

        /* example
         * const calLayout = debounce(function() {}, 300);
         * // $(window).resize(calLayout);
         */

        /* typescript
         * export declare function debounce<T extends types.AnyFn>(fn: T, wait: number): T;
         */

        /* dependencies
         * types 
         */
        exports = function(fn, wait, immediate) {
            var timeout;
            return function() {
                var ctx = this;
                var args = arguments;
                var throttler = function() {
                    timeout = null;
                    fn.apply(ctx, args);
                };
                if (!immediate) clearTimeout(timeout);
                if (!immediate || !timeout) timeout = setTimeout(throttler, wait);
            };
        };

        return exports;
    })({});

    return _;
}));