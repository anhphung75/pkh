
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, callback) {
        const unsub = store.subscribe(callback);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? undefined : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment && $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, props) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : prop_values;
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    var kho = writable({});
    var ga = writable({});

    function getCookie(name) {
      var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
      return r ? r[1] : undefined;
    }

    function filterListObj(listobj, stim) {
      let s = stim.toLowerCase() || '';
      let data = listobj.filter(v => JSON.stringify(v).toLowerCase().indexOf(s) > -1);
      return JSON.parse(JSON.stringify(data));
    }
    function getdsNam(sonam) {
      sonam = sonam > 0 ? sonam : 10;
      var d = new Date(), year = d.getFullYear() + 1;
      let dsnam = [year,];
      for (let i = 0; i < sonam; i++) {
        year = year - 1;
        dsnam.push(year);
      }
      return dsnam;
    }

    /* src\Progress.svelte generated by Svelte v3.15.0 */
    const file = "src\\Progress.svelte";

    // (12:0) {#if isOpen}
    function create_if_block(ctx) {
    	let div3;
    	let div2;
    	let div1;
    	let div0;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(ctx.p);
    			t1 = text("%");
    			attr_dev(div0, "class", "progress-bar progress-bar-striped progress-bar-animated bg-info");
    			attr_dev(div0, "role", "progressbar");
    			attr_dev(div0, "aria-valuenow", ctx.p);
    			attr_dev(div0, "aria-valuemin", "0");
    			attr_dev(div0, "aria-valuemax", "100");
    			set_style(div0, "width", ctx.p + "%");
    			add_location(div0, file, 15, 8, 265);
    			attr_dev(div1, "class", "progress");
    			add_location(div1, file, 14, 6, 233);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file, 13, 4, 208);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file, 12, 2, 185);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(12:0) {#if isOpen}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let if_block_anchor;
    	let if_block = ctx.isOpen && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(changed, ctx) {
    			if (ctx.isOpen) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	let p = $kho.progress || 0;

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("p" in $$props) $$invalidate("p", p = $$props.p);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("isOpen" in $$props) $$invalidate("isOpen", isOpen = $$props.isOpen);
    	};

    	let isOpen;

    	$$self.$$.update = (changed = { p: 1 }) => {
    		if (changed.p) {
    			 $$invalidate("isOpen", isOpen = p < 100 ? true : false);
    		}
    	};

    	return { p, isOpen };
    }

    class Progress extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Progress",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src\Timhoso.svelte generated by Svelte v3.15.0 */

    const { console: console_1 } = globals;
    const file$1 = "src\\Timhoso.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.id = i;
    	return child_ctx;
    }

    // (71:10) {#each $kho.dstim as item, id}
    function create_each_block(ctx) {
    	let button;
    	let t0_value = ctx.item + "";
    	let t0;
    	let t1;
    	let dispose;

    	function mouseover_handler(...args) {
    		return ctx.mouseover_handler(ctx, ...args);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-outline-info");
    			add_location(button, file$1, 71, 12, 1944);

    			dispose = [
    				listen_dev(button, "mouseover", mouseover_handler, false, false, false),
    				listen_dev(button, "click", prevent_default(ctx.xoaDstim), false, false, true)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.$kho && t0_value !== (t0_value = ctx.item + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(71:10) {#each $kho.dstim as item, id}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div6;
    	let div5;
    	let div3;
    	let div2;
    	let div0;
    	let t0;
    	let div1;
    	let button;
    	let i;
    	let t1;
    	let t2;
    	let div4;
    	let input;
    	let dispose;
    	let each_value = ctx.$kho.dstim;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div5 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div1 = element("div");
    			button = element("button");
    			i = element("i");
    			t1 = text("\r\n            Xóa lọc");
    			t2 = space();
    			div4 = element("div");
    			input = element("input");
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$1, 69, 8, 1871);
    			attr_dev(i, "class", "fa fa-trash fa-lg");
    			add_location(i, file$1, 82, 12, 2320);
    			attr_dev(button, "class", "btn");
    			add_location(button, file$1, 81, 10, 2251);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$1, 80, 8, 2217);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$1, 68, 6, 1844);
    			attr_dev(div3, "class", "col border border-primary");
    			add_location(div3, file$1, 67, 4, 1797);
    			attr_dev(input, "class", "col");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Tìm ... (không phân biệt chữ hoa hay thường)");
    			add_location(input, file$1, 89, 6, 2468);
    			attr_dev(div4, "class", "col-3");
    			add_location(div4, file$1, 88, 4, 2441);
    			attr_dev(div5, "class", "row");
    			add_location(div5, file$1, 66, 2, 1774);
    			attr_dev(div6, "class", "container-fluid");
    			add_location(div6, file$1, 65, 0, 1741);

    			dispose = [
    				listen_dev(button, "click", ctx.click_handler, false, false, false),
    				listen_dev(input, "input", ctx.input_input_handler),
    				listen_dev(input, "keydown", ctx.addDsTim, false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, button);
    			append_dev(button, i);
    			append_dev(button, t1);
    			append_dev(div5, t2);
    			append_dev(div5, div4);
    			append_dev(div4, input);
    			set_input_value(input, ctx.stim);
    		},
    		p: function update(changed, ctx) {
    			if (changed.curdstim || changed.xoaDstim || changed.$kho) {
    				each_value = ctx.$kho.dstim;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (changed.stim) {
    				set_input_value(input, ctx.stim);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_each(each_blocks, detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	let { hoso } = $$props;
    	console.log("hoso= " + $kho.hoso.length);
    	set_store_value(kho, $kho.dsloc = [], $kho);
    	set_store_value(kho, $kho.dstim = [], $kho);
    	let stim = "";
    	let curdstim = 0;

    	function addDsTim(event) {
    		if (event.key === "Enter" && stim.length > 0) {
    			$$invalidate("stim", stim = stim.trim());
    			let dai = $kho.dstim ? $kho.dstim.length : 0;
    			let data = [stim];

    			for (let i = 0; i < dai; i++) {
    				if ($kho.dstim[i] !== stim) {
    					data.push($kho.dstim[i]);
    				}
    			}

    			set_store_value(kho, $kho.dstim = JSON.parse(JSON.stringify(data)), $kho);
    			$$invalidate("stim", stim = "");
    		}
    	}

    	function xoaDstim() {
    		let dai = dstim.length;
    		let data = [];

    		for (let i = 0; i < dai; i++) {
    			if (i !== curdstim) {
    				data.push($kho.dstim[i]);
    			}
    		}

    		dstim = data;
    	}

    	function locNhom(nhom) {
    		let l = nhom.length || 0;
    		let data = hoso;

    		if (l > 0) {
    			for (let i = 0; i < l; i++) {
    				let s = nhom[i];
    				data = filterListObj(data, s);
    			}
    		}

    		return data;
    	}

    	set_store_value(kho, $kho.hs_trang = 7, $kho);
    	set_store_value(kho, $kho.tongtrang = 0, $kho);
    	set_store_value(kho, $kho.curtrang = 0, $kho);

    	function tongTrang(danhsach) {
    		let a = danhsach ? danhsach.length : 0;
    		let l = a % $kho.hs_trang > 0 ? 1 : 0;
    		let c = parseInt(a / $kho.hs_trang);
    		let t = c > 0 ? c + l : 0;
    		return t;
    	}

    	const writable_props = ["hoso"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Timhoso> was created with unknown prop '${key}'`);
    	});

    	const mouseover_handler = ({ id }) => $$invalidate("curdstim", curdstim = id);
    	const click_handler = () => set_store_value(kho, $kho.dstim = [], $kho);

    	function input_input_handler() {
    		stim = this.value;
    		$$invalidate("stim", stim);
    	}

    	$$self.$set = $$props => {
    		if ("hoso" in $$props) $$invalidate("hoso", hoso = $$props.hoso);
    	};

    	$$self.$capture_state = () => {
    		return { hoso, stim, curdstim, $kho };
    	};

    	$$self.$inject_state = $$props => {
    		if ("hoso" in $$props) $$invalidate("hoso", hoso = $$props.hoso);
    		if ("stim" in $$props) $$invalidate("stim", stim = $$props.stim);
    		if ("curdstim" in $$props) $$invalidate("curdstim", curdstim = $$props.curdstim);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    	};

    	$$self.$$.update = (changed = { $kho: 1, stim: 1 }) => {
    		if (changed.$kho || changed.stim) {
    			 set_store_value(kho, $kho.dsloc = filterListObj(locNhom($kho.dstim), stim), $kho);
    		}

    		if (changed.$kho) {
    			 set_store_value(kho, $kho.tongtrang = tongTrang($kho.dsloc), $kho);
    		}

    		if (changed.$kho) {
    			 set_store_value(
    				kho,
    				$kho.curtrang = $kho.curtrang > $kho.tongtrang
    				? $kho.tongtrang
    				: $kho.curtrang,
    				$kho
    			);
    		}

    		if (changed.$kho) {
    			 set_store_value(kho, $kho.hs_start = $kho.curtrang * $kho.hs_trang, $kho);
    		}

    		if (changed.$kho) {
    			 set_store_value(kho, $kho.hs_stop = $kho.hs_start + $kho.hs_trang - 1, $kho);
    		}
    	};

    	return {
    		hoso,
    		stim,
    		curdstim,
    		addDsTim,
    		xoaDstim,
    		$kho,
    		mouseover_handler,
    		click_handler,
    		input_input_handler
    	};
    }

    class Timhoso extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { hoso: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timhoso",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (ctx.hoso === undefined && !("hoso" in props)) {
    			console_1.warn("<Timhoso> was created without expected prop 'hoso'");
    		}
    	}

    	get hoso() {
    		throw new Error("<Timhoso>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hoso(value) {
    		throw new Error("<Timhoso>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Banghoso.svelte generated by Svelte v3.15.0 */

    const { Object: Object_1 } = globals;
    const file$2 = "src\\Banghoso.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.hs = list[i];
    	child_ctx.stt = i;
    	return child_ctx;
    }

    // (358:8) {:else}
    function create_else_block_3(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Mã dma";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "Mã lộ trình";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "Số danh bộ";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "Mã QR";
    			attr_dev(div0, "class", "madma svelte-15u659a");
    			add_location(div0, file$2, 358, 10, 9373);
    			attr_dev(div1, "class", "malotrinh svelte-15u659a");
    			add_location(div1, file$2, 359, 10, 9416);
    			attr_dev(div2, "class", "sodanhbo svelte-15u659a");
    			add_location(div2, file$2, 360, 10, 9468);
    			attr_dev(div3, "class", "qrcode svelte-15u659a");
    			add_location(div3, file$2, 361, 10, 9518);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(358:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (351:32) 
    function create_if_block_14(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;
    	let t9;
    	let div5;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Mã qtgt";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "Ngày lên đợt";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "Ngày gắn";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "Số đhn";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "Hiệu đhn";
    			t9 = space();
    			div5 = element("div");
    			div5.textContent = "Chỉ số";
    			attr_dev(div0, "class", "maqt svelte-15u659a");
    			add_location(div0, file$2, 351, 10, 9076);
    			attr_dev(div1, "class", "ngaylendot svelte-15u659a");
    			add_location(div1, file$2, 352, 10, 9119);
    			attr_dev(div2, "class", "ngaygan svelte-15u659a");
    			add_location(div2, file$2, 353, 10, 9173);
    			attr_dev(div3, "class", "sodhn svelte-15u659a");
    			add_location(div3, file$2, 354, 10, 9220);
    			attr_dev(div4, "class", "hieudhn svelte-15u659a");
    			add_location(div4, file$2, 355, 10, 9263);
    			attr_dev(div5, "class", "chisodhn svelte-15u659a");
    			add_location(div5, file$2, 356, 10, 9310);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div5, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_14.name,
    		type: "if",
    		source: "(351:32) ",
    		ctx
    	});

    	return block;
    }

    // (345:32) 
    function create_if_block_13(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Địa chỉ 1";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "Địa chỉ 2";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "Mã quận";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "Mã qp";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "Ghi tắt";
    			attr_dev(div0, "class", "dc1 svelte-15u659a");
    			add_location(div0, file$2, 345, 10, 8826);
    			attr_dev(div1, "class", "dc2 svelte-15u659a");
    			add_location(div1, file$2, 346, 10, 8870);
    			attr_dev(div2, "class", "maq svelte-15u659a");
    			add_location(div2, file$2, 347, 10, 8914);
    			attr_dev(div3, "class", "maqp svelte-15u659a");
    			add_location(div3, file$2, 348, 10, 8956);
    			attr_dev(div4, "class", "ghitat svelte-15u659a");
    			add_location(div4, file$2, 349, 10, 8997);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_13.name,
    		type: "if",
    		source: "(345:32) ",
    		ctx
    	});

    	return block;
    }

    // (338:32) 
    function create_if_block_12(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;
    	let t9;
    	let div5;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Liên hệ1";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "Mô tả";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "Trở ngại";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "Tái nhập";
    			t7 = space();
    			div4 = element("div");
    			div4.textContent = "Tái thi công";
    			t9 = space();
    			div5 = element("div");
    			div5.textContent = "Hoàn tiền";
    			attr_dev(div0, "class", "lien-he svelte-15u659a");
    			add_location(div0, file$2, 338, 10, 8501);
    			attr_dev(div1, "class", "mo-ta svelte-15u659a");
    			add_location(div1, file$2, 339, 10, 8548);
    			attr_dev(div2, "class", "tro-ngai svelte-15u659a");
    			add_location(div2, file$2, 340, 10, 8590);
    			attr_dev(div3, "class", "tai-nhap svelte-15u659a");
    			add_location(div3, file$2, 341, 10, 8638);
    			attr_dev(div4, "class", "tai-thi-cong svelte-15u659a");
    			add_location(div4, file$2, 342, 10, 8686);
    			attr_dev(div5, "class", "hoan-tien svelte-15u659a");
    			add_location(div5, file$2, 343, 10, 8742);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div5, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(338:32) ",
    		ctx
    	});

    	return block;
    }

    // (333:8) {#if curbang === 0}
    function create_if_block_11(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "Mã hồ sơ";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "Mã đợt";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "Số hồ sơ";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "Địa chỉ";
    			attr_dev(div0, "class", "mahoso svelte-15u659a");
    			add_location(div0, file$2, 333, 10, 8286);
    			attr_dev(div1, "class", "madot svelte-15u659a");
    			add_location(div1, file$2, 334, 10, 8332);
    			attr_dev(div2, "class", "sohoso svelte-15u659a");
    			add_location(div2, file$2, 335, 10, 8375);
    			attr_dev(div3, "class", "dia-chi svelte-15u659a");
    			add_location(div3, file$2, 336, 10, 8421);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(333:8) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (367:10) {#if stt >= hs_start && stt <= hs_stop}
    function create_if_block_1(ctx) {
    	let div;
    	let t;
    	let div_class_value;
    	let dispose;

    	function select_block_type_1(changed, ctx) {
    		if (ctx.hs.isEdit) return create_if_block_2;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type_1(null, ctx);
    	let if_block = current_block_type(ctx);

    	function mouseover_handler(...args) {
    		return ctx.mouseover_handler(ctx, ...args);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			t = space();
    			attr_dev(div, "class", div_class_value = "bang" + ctx.curbang + " svelte-15u659a");
    			add_location(div, file$2, 367, 12, 9709);
    			dispose = listen_dev(div, "mouseover", mouseover_handler, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    			append_dev(div, t);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;

    			if (current_block_type === (current_block_type = select_block_type_1(changed, ctx)) && if_block) {
    				if_block.p(changed, ctx);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, t);
    				}
    			}

    			if (changed.curbang && div_class_value !== (div_class_value = "bang" + ctx.curbang + " svelte-15u659a")) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(367:10) {#if stt >= hs_start && stt <= hs_stop}",
    		ctx
    	});

    	return block;
    }

    // (475:14) {:else}
    function create_else_block_1(ctx) {
    	let div0;
    	let i;
    	let t0_value = ctx.stt + 1 + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = ctx.hs.khachhang + "";
    	let t2;
    	let t3;
    	let if_block_anchor;
    	let dispose;

    	function click_handler_1(...args) {
    		return ctx.click_handler_1(ctx, ...args);
    	}

    	function select_block_type_3(changed, ctx) {
    		if (ctx.curbang === 0) return create_if_block_7;
    		if (ctx.curbang === 1) return create_if_block_8;
    		if (ctx.curbang === 2) return create_if_block_9;
    		if (ctx.curbang === 3) return create_if_block_10;
    		return create_else_block_2;
    	}

    	let current_block_type = select_block_type_3(null, ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			i = element("i");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			attr_dev(i, "class", "fa fa-edit");
    			add_location(i, file$2, 476, 18, 14136);
    			attr_dev(div0, "class", "stt svelte-15u659a");
    			add_location(div0, file$2, 475, 16, 14099);
    			attr_dev(div1, "class", "khach-hang svelte-15u659a");
    			add_location(div1, file$2, 486, 16, 14506);
    			dispose = listen_dev(i, "click", click_handler_1, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, i);
    			append_dev(i, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.danhsach && t2_value !== (t2_value = ctx.hs.khachhang + "")) set_data_dev(t2, t2_value);

    			if (current_block_type === (current_block_type = select_block_type_3(changed, ctx)) && if_block) {
    				if_block.p(changed, ctx);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(475:14) {:else}",
    		ctx
    	});

    	return block;
    }

    // (369:14) {#if hs.isEdit}
    function create_if_block_2(ctx) {
    	let div0;
    	let i0;
    	let t0_value = ctx.stt + 1 + "";
    	let t0;
    	let t1;
    	let i1;
    	let t2;
    	let div1;
    	let t3;
    	let if_block_anchor;
    	let dispose;

    	function click_handler(...args) {
    		return ctx.click_handler(ctx, ...args);
    	}

    	function select_block_type_2(changed, ctx) {
    		if (ctx.curbang === 0) return create_if_block_3;
    		if (ctx.curbang === 1) return create_if_block_4;
    		if (ctx.curbang === 2) return create_if_block_5;
    		if (ctx.curbang === 3) return create_if_block_6;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type_2(null, ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			i0 = element("i");
    			t0 = text(t0_value);
    			t1 = space();
    			i1 = element("i");
    			t2 = space();
    			div1 = element("div");
    			t3 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			attr_dev(i0, "class", "fa fa-save");
    			add_location(i0, file$2, 370, 18, 9858);
    			attr_dev(i1, "class", "fa fa-stop-circle");
    			add_location(i1, file$2, 371, 18, 9932);
    			attr_dev(div0, "class", "stt svelte-15u659a");
    			add_location(div0, file$2, 369, 16, 9821);
    			attr_dev(div1, "class", "khach-hang svelte-15u659a");
    			attr_dev(div1, "contenteditable", "true");
    			if (ctx.hssua.khachhang === void 0) add_render_callback(() => ctx.div1_input_handler.call(div1));
    			add_location(div1, file$2, 375, 16, 10084);

    			dispose = [
    				listen_dev(i0, "click", ctx.btnSave, false, false, false),
    				listen_dev(i1, "click", click_handler, false, false, false),
    				listen_dev(div1, "input", ctx.div1_input_handler)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, i0);
    			append_dev(i0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, i1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);

    			if (ctx.hssua.khachhang !== void 0) {
    				div1.innerHTML = ctx.hssua.khachhang;
    			}

    			insert_dev(target, t3, anchor);
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;

    			if (changed.hssua && ctx.hssua.khachhang !== div1.innerHTML) {
    				div1.innerHTML = ctx.hssua.khachhang;
    			}

    			if (current_block_type === (current_block_type = select_block_type_2(changed, ctx)) && if_block) {
    				if_block.p(changed, ctx);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(369:14) {#if hs.isEdit}",
    		ctx
    	});

    	return block;
    }

    // (513:16) {:else}
    function create_else_block_2(ctx) {
    	let div0;
    	let t0_value = ctx.hs.madma + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = ctx.hs.malotrinh + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = ctx.hs.sodanhbo + "";
    	let t4;
    	let t5;
    	let div3;
    	let t6_value = ctx.hs.qrcode + "";
    	let t6;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			attr_dev(div0, "class", "madma svelte-15u659a");
    			add_location(div0, file$2, 513, 18, 15961);
    			attr_dev(div1, "class", "malotrinh svelte-15u659a");
    			add_location(div1, file$2, 514, 18, 16016);
    			attr_dev(div2, "class", "sodanhbo svelte-15u659a");
    			add_location(div2, file$2, 515, 18, 16079);
    			attr_dev(div3, "class", "qrcode svelte-15u659a");
    			add_location(div3, file$2, 516, 18, 16140);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t6);
    		},
    		p: function update(changed, ctx) {
    			if (changed.danhsach && t0_value !== (t0_value = ctx.hs.madma + "")) set_data_dev(t0, t0_value);
    			if (changed.danhsach && t2_value !== (t2_value = ctx.hs.malotrinh + "")) set_data_dev(t2, t2_value);
    			if (changed.danhsach && t4_value !== (t4_value = ctx.hs.sodanhbo + "")) set_data_dev(t4, t4_value);
    			if (changed.danhsach && t6_value !== (t6_value = ctx.hs.qrcode + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(513:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (506:40) 
    function create_if_block_10(ctx) {
    	let div0;
    	let t0_value = ctx.hs.maqt + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = ctx.hs.ngaylendot + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = ctx.hs.ngaygan + "";
    	let t4;
    	let t5;
    	let div3;
    	let t6_value = ctx.hs.sodhn + "";
    	let t6;
    	let t7;
    	let div4;
    	let t8_value = ctx.hs.hieudhn + "";
    	let t8;
    	let t9;
    	let div5;
    	let t10_value = ctx.hs.chisodhn + "";
    	let t10;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div4 = element("div");
    			t8 = text(t8_value);
    			t9 = space();
    			div5 = element("div");
    			t10 = text(t10_value);
    			attr_dev(div0, "class", "maqt svelte-15u659a");
    			add_location(div0, file$2, 506, 18, 15584);
    			attr_dev(div1, "class", "ngaylendot svelte-15u659a");
    			add_location(div1, file$2, 507, 18, 15637);
    			attr_dev(div2, "class", "ngaygan svelte-15u659a");
    			add_location(div2, file$2, 508, 18, 15702);
    			attr_dev(div3, "class", "sodhn svelte-15u659a");
    			add_location(div3, file$2, 509, 18, 15761);
    			attr_dev(div4, "class", "hieudhn svelte-15u659a");
    			add_location(div4, file$2, 510, 18, 15816);
    			attr_dev(div5, "class", "chisodhn svelte-15u659a");
    			add_location(div5, file$2, 511, 18, 15875);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, t10);
    		},
    		p: function update(changed, ctx) {
    			if (changed.danhsach && t0_value !== (t0_value = ctx.hs.maqt + "")) set_data_dev(t0, t0_value);
    			if (changed.danhsach && t2_value !== (t2_value = ctx.hs.ngaylendot + "")) set_data_dev(t2, t2_value);
    			if (changed.danhsach && t4_value !== (t4_value = ctx.hs.ngaygan + "")) set_data_dev(t4, t4_value);
    			if (changed.danhsach && t6_value !== (t6_value = ctx.hs.sodhn + "")) set_data_dev(t6, t6_value);
    			if (changed.danhsach && t8_value !== (t8_value = ctx.hs.hieudhn + "")) set_data_dev(t8, t8_value);
    			if (changed.danhsach && t10_value !== (t10_value = ctx.hs.chisodhn + "")) set_data_dev(t10, t10_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(506:40) ",
    		ctx
    	});

    	return block;
    }

    // (500:40) 
    function create_if_block_9(ctx) {
    	let div0;
    	let t0_value = ctx.hs.dc1 + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = ctx.hs.dc2 + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = ctx.hs.maq + "";
    	let t4;
    	let t5;
    	let div3;
    	let t6_value = ctx.hs.maqp + "";
    	let t6;
    	let t7;
    	let div4;
    	let t8_value = ctx.hs.ghitat + "";
    	let t8;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div4 = element("div");
    			t8 = text(t8_value);
    			attr_dev(div0, "class", "dc1 svelte-15u659a");
    			add_location(div0, file$2, 500, 18, 15279);
    			attr_dev(div1, "class", "dc2 svelte-15u659a");
    			add_location(div1, file$2, 501, 18, 15330);
    			attr_dev(div2, "class", "maq svelte-15u659a");
    			add_location(div2, file$2, 502, 18, 15381);
    			attr_dev(div3, "class", "maqp svelte-15u659a");
    			add_location(div3, file$2, 503, 18, 15432);
    			attr_dev(div4, "class", "ghitat svelte-15u659a");
    			add_location(div4, file$2, 504, 18, 15485);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, t8);
    		},
    		p: function update(changed, ctx) {
    			if (changed.danhsach && t0_value !== (t0_value = ctx.hs.dc1 + "")) set_data_dev(t0, t0_value);
    			if (changed.danhsach && t2_value !== (t2_value = ctx.hs.dc2 + "")) set_data_dev(t2, t2_value);
    			if (changed.danhsach && t4_value !== (t4_value = ctx.hs.maq + "")) set_data_dev(t4, t4_value);
    			if (changed.danhsach && t6_value !== (t6_value = ctx.hs.maqp + "")) set_data_dev(t6, t6_value);
    			if (changed.danhsach && t8_value !== (t8_value = ctx.hs.ghitat + "")) set_data_dev(t8, t8_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(500:40) ",
    		ctx
    	});

    	return block;
    }

    // (493:40) 
    function create_if_block_8(ctx) {
    	let div0;
    	let t0_value = ctx.hs.lienhe + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = ctx.hs.mota + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = ctx.hs.trongai + "";
    	let t4;
    	let t5;
    	let div3;
    	let t6_value = ctx.hs.tainhap + "";
    	let t6;
    	let t7;
    	let div4;
    	let t8_value = ctx.hs.taithicong + "";
    	let t8;
    	let t9;
    	let div5;
    	let t10_value = ctx.hs.hoantien + "";
    	let t10;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			t7 = space();
    			div4 = element("div");
    			t8 = text(t8_value);
    			t9 = space();
    			div5 = element("div");
    			t10 = text(t10_value);
    			attr_dev(div0, "class", "lien-he svelte-15u659a");
    			add_location(div0, file$2, 493, 18, 14876);
    			attr_dev(div1, "class", "mo-ta svelte-15u659a");
    			add_location(div1, file$2, 494, 18, 14934);
    			attr_dev(div2, "class", "tro-ngai svelte-15u659a");
    			add_location(div2, file$2, 495, 18, 14988);
    			attr_dev(div3, "class", "tai-nhap svelte-15u659a");
    			add_location(div3, file$2, 496, 18, 15048);
    			attr_dev(div4, "class", "tai-thi-cong svelte-15u659a");
    			add_location(div4, file$2, 497, 18, 15108);
    			attr_dev(div5, "class", "hoan-tien svelte-15u659a");
    			add_location(div5, file$2, 498, 18, 15175);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, t10);
    		},
    		p: function update(changed, ctx) {
    			if (changed.danhsach && t0_value !== (t0_value = ctx.hs.lienhe + "")) set_data_dev(t0, t0_value);
    			if (changed.danhsach && t2_value !== (t2_value = ctx.hs.mota + "")) set_data_dev(t2, t2_value);
    			if (changed.danhsach && t4_value !== (t4_value = ctx.hs.trongai + "")) set_data_dev(t4, t4_value);
    			if (changed.danhsach && t6_value !== (t6_value = ctx.hs.tainhap + "")) set_data_dev(t6, t6_value);
    			if (changed.danhsach && t8_value !== (t8_value = ctx.hs.taithicong + "")) set_data_dev(t8, t8_value);
    			if (changed.danhsach && t10_value !== (t10_value = ctx.hs.hoantien + "")) set_data_dev(t10, t10_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(493:40) ",
    		ctx
    	});

    	return block;
    }

    // (488:16) {#if curbang === 0}
    function create_if_block_7(ctx) {
    	let div0;
    	let t0_value = ctx.hs.mahoso + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = ctx.hs.madot + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4_value = ctx.hs.sohoso + "";
    	let t4;
    	let t5;
    	let div3;
    	let t6_value = ctx.hs.diachi + "";
    	let t6;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			div3 = element("div");
    			t6 = text(t6_value);
    			attr_dev(div0, "class", "mahoso svelte-15u659a");
    			add_location(div0, file$2, 488, 18, 14607);
    			attr_dev(div1, "class", "madot svelte-15u659a");
    			add_location(div1, file$2, 489, 18, 14664);
    			attr_dev(div2, "class", "sohoso svelte-15u659a");
    			add_location(div2, file$2, 490, 18, 14719);
    			attr_dev(div3, "class", "dia-chi svelte-15u659a");
    			add_location(div3, file$2, 491, 18, 14776);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t6);
    		},
    		p: function update(changed, ctx) {
    			if (changed.danhsach && t0_value !== (t0_value = ctx.hs.mahoso + "")) set_data_dev(t0, t0_value);
    			if (changed.danhsach && t2_value !== (t2_value = ctx.hs.madot + "")) set_data_dev(t2, t2_value);
    			if (changed.danhsach && t4_value !== (t4_value = ctx.hs.sohoso + "")) set_data_dev(t4, t4_value);
    			if (changed.danhsach && t6_value !== (t6_value = ctx.hs.diachi + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(488:16) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (460:16) {:else}
    function create_else_block(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3_value = ctx.hssua.qrcode + "";
    	let t3;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = text(t3_value);
    			attr_dev(div0, "class", "madma svelte-15u659a");
    			attr_dev(div0, "contenteditable", "true");
    			if (ctx.hssua.madma === void 0) add_render_callback(() => ctx.div0_input_handler_3.call(div0));
    			add_location(div0, file$2, 460, 18, 13513);
    			attr_dev(div1, "class", "malotrinh svelte-15u659a");
    			attr_dev(div1, "contenteditable", "true");
    			if (ctx.hssua.malotrinh === void 0) add_render_callback(() => ctx.div1_input_handler_3.call(div1));
    			add_location(div1, file$2, 464, 18, 13669);
    			attr_dev(div2, "class", "sodanhbo svelte-15u659a");
    			attr_dev(div2, "contenteditable", "true");
    			if (ctx.hssua.sodanhbo === void 0) add_render_callback(() => ctx.div2_input_handler_3.call(div2));
    			add_location(div2, file$2, 468, 18, 13833);
    			attr_dev(div3, "class", "qrcode svelte-15u659a");
    			add_location(div3, file$2, 472, 18, 13995);

    			dispose = [
    				listen_dev(div0, "input", ctx.div0_input_handler_3),
    				listen_dev(div1, "input", ctx.div1_input_handler_3),
    				listen_dev(div2, "input", ctx.div2_input_handler_3)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);

    			if (ctx.hssua.madma !== void 0) {
    				div0.innerHTML = ctx.hssua.madma;
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);

    			if (ctx.hssua.malotrinh !== void 0) {
    				div1.innerHTML = ctx.hssua.malotrinh;
    			}

    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);

    			if (ctx.hssua.sodanhbo !== void 0) {
    				div2.innerHTML = ctx.hssua.sodanhbo;
    			}

    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t3);
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && ctx.hssua.madma !== div0.innerHTML) {
    				div0.innerHTML = ctx.hssua.madma;
    			}

    			if (changed.hssua && ctx.hssua.malotrinh !== div1.innerHTML) {
    				div1.innerHTML = ctx.hssua.malotrinh;
    			}

    			if (changed.hssua && ctx.hssua.sodanhbo !== div2.innerHTML) {
    				div2.innerHTML = ctx.hssua.sodanhbo;
    			}

    			if (changed.hssua && t3_value !== (t3_value = ctx.hssua.qrcode + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(460:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (437:40) 
    function create_if_block_6(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let input0;
    	let t1;
    	let div2;
    	let input1;
    	let t2;
    	let div3;
    	let t3;
    	let div4;
    	let t4;
    	let div5;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			input0 = element("input");
    			t1 = space();
    			div2 = element("div");
    			input1 = element("input");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div4 = element("div");
    			t4 = space();
    			div5 = element("div");
    			attr_dev(div0, "class", "maqt svelte-15u659a");
    			attr_dev(div0, "contenteditable", "true");
    			if (ctx.hssua.maqt === void 0) add_render_callback(() => ctx.div0_input_handler_2.call(div0));
    			add_location(div0, file$2, 437, 18, 12576);
    			attr_dev(input0, "type", "date");
    			attr_dev(input0, "class", "svelte-15u659a");
    			add_location(input0, file$2, 442, 20, 12776);
    			attr_dev(div1, "class", "ngaylendot svelte-15u659a");
    			add_location(div1, file$2, 441, 18, 12730);
    			attr_dev(input1, "type", "date");
    			attr_dev(input1, "class", "svelte-15u659a");
    			add_location(input1, file$2, 445, 20, 12916);
    			attr_dev(div2, "class", "ngaygan svelte-15u659a");
    			add_location(div2, file$2, 444, 18, 12873);
    			attr_dev(div3, "class", "sodhn svelte-15u659a");
    			attr_dev(div3, "contenteditable", "true");
    			if (ctx.hssua.sodhn === void 0) add_render_callback(() => ctx.div3_input_handler_3.call(div3));
    			add_location(div3, file$2, 447, 18, 13010);
    			attr_dev(div4, "class", "hieudhn svelte-15u659a");
    			attr_dev(div4, "contenteditable", "true");
    			if (ctx.hssua.hieudhn === void 0) add_render_callback(() => ctx.div4_input_handler_2.call(div4));
    			add_location(div4, file$2, 451, 18, 13166);
    			attr_dev(div5, "class", "chisodhn svelte-15u659a");
    			attr_dev(div5, "contenteditable", "true");
    			if (ctx.hssua.chisodhn === void 0) add_render_callback(() => ctx.div5_input_handler_1.call(div5));
    			add_location(div5, file$2, 455, 18, 13326);

    			dispose = [
    				listen_dev(div0, "input", ctx.div0_input_handler_2),
    				listen_dev(input0, "input", ctx.input0_input_handler),
    				listen_dev(input1, "input", ctx.input1_input_handler),
    				listen_dev(div3, "input", ctx.div3_input_handler_3),
    				listen_dev(div4, "input", ctx.div4_input_handler_2),
    				listen_dev(div5, "input", ctx.div5_input_handler_1)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);

    			if (ctx.hssua.maqt !== void 0) {
    				div0.innerHTML = ctx.hssua.maqt;
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input0);
    			set_input_value(input0, ctx.hssua.ngaylendot);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, input1);
    			set_input_value(input1, ctx.hssua.ngaygan);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);

    			if (ctx.hssua.sodhn !== void 0) {
    				div3.innerHTML = ctx.hssua.sodhn;
    			}

    			insert_dev(target, t3, anchor);
    			insert_dev(target, div4, anchor);

    			if (ctx.hssua.hieudhn !== void 0) {
    				div4.innerHTML = ctx.hssua.hieudhn;
    			}

    			insert_dev(target, t4, anchor);
    			insert_dev(target, div5, anchor);

    			if (ctx.hssua.chisodhn !== void 0) {
    				div5.innerHTML = ctx.hssua.chisodhn;
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && ctx.hssua.maqt !== div0.innerHTML) {
    				div0.innerHTML = ctx.hssua.maqt;
    			}

    			if (changed.hssua) {
    				set_input_value(input0, ctx.hssua.ngaylendot);
    			}

    			if (changed.hssua) {
    				set_input_value(input1, ctx.hssua.ngaygan);
    			}

    			if (changed.hssua && ctx.hssua.sodhn !== div3.innerHTML) {
    				div3.innerHTML = ctx.hssua.sodhn;
    			}

    			if (changed.hssua && ctx.hssua.hieudhn !== div4.innerHTML) {
    				div4.innerHTML = ctx.hssua.hieudhn;
    			}

    			if (changed.hssua && ctx.hssua.chisodhn !== div5.innerHTML) {
    				div5.innerHTML = ctx.hssua.chisodhn;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div5);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(437:40) ",
    		ctx
    	});

    	return block;
    }

    // (416:40) 
    function create_if_block_5(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let div4;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div4 = element("div");
    			attr_dev(div0, "class", "dc1 svelte-15u659a");
    			attr_dev(div0, "contenteditable", "true");
    			if (ctx.hssua.dc1 === void 0) add_render_callback(() => ctx.div0_input_handler_1.call(div0));
    			add_location(div0, file$2, 416, 18, 11766);
    			attr_dev(div1, "class", "dc2 svelte-15u659a");
    			attr_dev(div1, "contenteditable", "true");
    			if (ctx.hssua.dc2 === void 0) add_render_callback(() => ctx.div1_input_handler_2.call(div1));
    			add_location(div1, file$2, 420, 18, 11918);
    			attr_dev(div2, "class", "maq svelte-15u659a");
    			attr_dev(div2, "contenteditable", "true");
    			if (ctx.hssua.maq === void 0) add_render_callback(() => ctx.div2_input_handler_2.call(div2));
    			add_location(div2, file$2, 424, 18, 12070);
    			attr_dev(div3, "class", "maqp svelte-15u659a");
    			attr_dev(div3, "contenteditable", "true");
    			if (ctx.hssua.maqp === void 0) add_render_callback(() => ctx.div3_input_handler_2.call(div3));
    			add_location(div3, file$2, 428, 18, 12222);
    			attr_dev(div4, "class", "ghitat svelte-15u659a");
    			attr_dev(div4, "contenteditable", "true");
    			if (ctx.hssua.ghitat === void 0) add_render_callback(() => ctx.div4_input_handler_1.call(div4));
    			add_location(div4, file$2, 432, 18, 12376);

    			dispose = [
    				listen_dev(div0, "input", ctx.div0_input_handler_1),
    				listen_dev(div1, "input", ctx.div1_input_handler_2),
    				listen_dev(div2, "input", ctx.div2_input_handler_2),
    				listen_dev(div3, "input", ctx.div3_input_handler_2),
    				listen_dev(div4, "input", ctx.div4_input_handler_1)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);

    			if (ctx.hssua.dc1 !== void 0) {
    				div0.innerHTML = ctx.hssua.dc1;
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);

    			if (ctx.hssua.dc2 !== void 0) {
    				div1.innerHTML = ctx.hssua.dc2;
    			}

    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);

    			if (ctx.hssua.maq !== void 0) {
    				div2.innerHTML = ctx.hssua.maq;
    			}

    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);

    			if (ctx.hssua.maqp !== void 0) {
    				div3.innerHTML = ctx.hssua.maqp;
    			}

    			insert_dev(target, t3, anchor);
    			insert_dev(target, div4, anchor);

    			if (ctx.hssua.ghitat !== void 0) {
    				div4.innerHTML = ctx.hssua.ghitat;
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && ctx.hssua.dc1 !== div0.innerHTML) {
    				div0.innerHTML = ctx.hssua.dc1;
    			}

    			if (changed.hssua && ctx.hssua.dc2 !== div1.innerHTML) {
    				div1.innerHTML = ctx.hssua.dc2;
    			}

    			if (changed.hssua && ctx.hssua.maq !== div2.innerHTML) {
    				div2.innerHTML = ctx.hssua.maq;
    			}

    			if (changed.hssua && ctx.hssua.maqp !== div3.innerHTML) {
    				div3.innerHTML = ctx.hssua.maqp;
    			}

    			if (changed.hssua && ctx.hssua.ghitat !== div4.innerHTML) {
    				div4.innerHTML = ctx.hssua.ghitat;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div4);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(416:40) ",
    		ctx
    	});

    	return block;
    }

    // (391:40) 
    function create_if_block_4(ctx) {
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let t2;
    	let div3;
    	let t3;
    	let div4;
    	let t4;
    	let div5;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div4 = element("div");
    			t4 = space();
    			div5 = element("div");
    			attr_dev(div0, "class", "lien-he svelte-15u659a");
    			attr_dev(div0, "contenteditable", "true");
    			if (ctx.hssua.lienhe === void 0) add_render_callback(() => ctx.div0_input_handler.call(div0));
    			add_location(div0, file$2, 391, 18, 10757);
    			attr_dev(div1, "class", "mo-ta svelte-15u659a");
    			attr_dev(div1, "contenteditable", "true");
    			if (ctx.hssua.mota === void 0) add_render_callback(() => ctx.div1_input_handler_1.call(div1));
    			add_location(div1, file$2, 395, 18, 10916);
    			attr_dev(div2, "class", "tro-ngai svelte-15u659a");
    			attr_dev(div2, "contenteditable", "true");
    			if (ctx.hssua.trongai === void 0) add_render_callback(() => ctx.div2_input_handler_1.call(div2));
    			add_location(div2, file$2, 399, 18, 11071);
    			attr_dev(div3, "class", "tai-nhap svelte-15u659a");
    			attr_dev(div3, "contenteditable", "true");
    			if (ctx.hssua.tainhap === void 0) add_render_callback(() => ctx.div3_input_handler_1.call(div3));
    			add_location(div3, file$2, 403, 18, 11232);
    			attr_dev(div4, "class", "tai-thi-cong svelte-15u659a");
    			attr_dev(div4, "contenteditable", "true");
    			if (ctx.hssua.taithicong === void 0) add_render_callback(() => ctx.div4_input_handler.call(div4));
    			add_location(div4, file$2, 407, 18, 11393);
    			attr_dev(div5, "class", "hoan-tien svelte-15u659a");
    			attr_dev(div5, "contenteditable", "true");
    			if (ctx.hssua.hoantien === void 0) add_render_callback(() => ctx.div5_input_handler.call(div5));
    			add_location(div5, file$2, 411, 18, 11561);

    			dispose = [
    				listen_dev(div0, "input", ctx.div0_input_handler),
    				listen_dev(div1, "input", ctx.div1_input_handler_1),
    				listen_dev(div2, "input", ctx.div2_input_handler_1),
    				listen_dev(div3, "input", ctx.div3_input_handler_1),
    				listen_dev(div4, "input", ctx.div4_input_handler),
    				listen_dev(div5, "input", ctx.div5_input_handler)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);

    			if (ctx.hssua.lienhe !== void 0) {
    				div0.innerHTML = ctx.hssua.lienhe;
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);

    			if (ctx.hssua.mota !== void 0) {
    				div1.innerHTML = ctx.hssua.mota;
    			}

    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);

    			if (ctx.hssua.trongai !== void 0) {
    				div2.innerHTML = ctx.hssua.trongai;
    			}

    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);

    			if (ctx.hssua.tainhap !== void 0) {
    				div3.innerHTML = ctx.hssua.tainhap;
    			}

    			insert_dev(target, t3, anchor);
    			insert_dev(target, div4, anchor);

    			if (ctx.hssua.taithicong !== void 0) {
    				div4.innerHTML = ctx.hssua.taithicong;
    			}

    			insert_dev(target, t4, anchor);
    			insert_dev(target, div5, anchor);

    			if (ctx.hssua.hoantien !== void 0) {
    				div5.innerHTML = ctx.hssua.hoantien;
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && ctx.hssua.lienhe !== div0.innerHTML) {
    				div0.innerHTML = ctx.hssua.lienhe;
    			}

    			if (changed.hssua && ctx.hssua.mota !== div1.innerHTML) {
    				div1.innerHTML = ctx.hssua.mota;
    			}

    			if (changed.hssua && ctx.hssua.trongai !== div2.innerHTML) {
    				div2.innerHTML = ctx.hssua.trongai;
    			}

    			if (changed.hssua && ctx.hssua.tainhap !== div3.innerHTML) {
    				div3.innerHTML = ctx.hssua.tainhap;
    			}

    			if (changed.hssua && ctx.hssua.taithicong !== div4.innerHTML) {
    				div4.innerHTML = ctx.hssua.taithicong;
    			}

    			if (changed.hssua && ctx.hssua.hoantien !== div5.innerHTML) {
    				div5.innerHTML = ctx.hssua.hoantien;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div5);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(391:40) ",
    		ctx
    	});

    	return block;
    }

    // (380:16) {#if curbang === 0}
    function create_if_block_3(ctx) {
    	let div0;
    	let t0_value = ctx.hssua.mahoso + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = ctx.hssua.madot + "";
    	let t2;
    	let t3;
    	let div2;
    	let t4;
    	let div3;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			t4 = space();
    			div3 = element("div");
    			attr_dev(div0, "class", "mahoso svelte-15u659a");
    			add_location(div0, file$2, 380, 18, 10280);
    			attr_dev(div1, "class", "madot svelte-15u659a");
    			add_location(div1, file$2, 381, 18, 10340);
    			attr_dev(div2, "class", "sohoso svelte-15u659a");
    			attr_dev(div2, "contenteditable", "true");
    			if (ctx.hssua.sohoso === void 0) add_render_callback(() => ctx.div2_input_handler.call(div2));
    			add_location(div2, file$2, 382, 18, 10398);
    			attr_dev(div3, "class", "dia-chi svelte-15u659a");
    			attr_dev(div3, "contenteditable", "true");
    			if (ctx.hssua.diachi === void 0) add_render_callback(() => ctx.div3_input_handler.call(div3));
    			add_location(div3, file$2, 386, 18, 10556);

    			dispose = [
    				listen_dev(div2, "input", ctx.div2_input_handler),
    				listen_dev(div3, "input", ctx.div3_input_handler)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);

    			if (ctx.hssua.sohoso !== void 0) {
    				div2.innerHTML = ctx.hssua.sohoso;
    			}

    			insert_dev(target, t4, anchor);
    			insert_dev(target, div3, anchor);

    			if (ctx.hssua.diachi !== void 0) {
    				div3.innerHTML = ctx.hssua.diachi;
    			}
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && t0_value !== (t0_value = ctx.hssua.mahoso + "")) set_data_dev(t0, t0_value);
    			if (changed.hssua && t2_value !== (t2_value = ctx.hssua.madot + "")) set_data_dev(t2, t2_value);

    			if (changed.hssua && ctx.hssua.sohoso !== div2.innerHTML) {
    				div2.innerHTML = ctx.hssua.sohoso;
    			}

    			if (changed.hssua && ctx.hssua.diachi !== div3.innerHTML) {
    				div3.innerHTML = ctx.hssua.diachi;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div3);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(380:16) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (366:8) {#each danhsach as hs, stt}
    function create_each_block$1(ctx) {
    	let if_block_anchor;
    	let if_block = ctx.stt >= ctx.hs_start && ctx.stt <= ctx.hs_stop && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(changed, ctx) {
    			if (ctx.stt >= ctx.hs_start && ctx.stt <= ctx.hs_stop) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(366:8) {#each danhsach as hs, stt}",
    		ctx
    	});

    	return block;
    }

    // (544:8) {#if tongbang > 0}
    function create_if_block$1(ctx) {
    	let div;
    	let input;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			attr_dev(input, "class", "col svelte-15u659a");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", tongbang);
    			add_location(input, file$2, 545, 12, 16883);
    			attr_dev(div, "class", "col-4 mb-12 chonbang");
    			add_location(div, file$2, 544, 10, 16835);

    			dispose = [
    				listen_dev(input, "change", ctx.input_change_input_handler_1),
    				listen_dev(input, "input", ctx.input_change_input_handler_1)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			set_input_value(input, ctx.curbang);
    		},
    		p: function update(changed, ctx) {
    			if (changed.curbang) {
    				set_input_value(input, ctx.curbang);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(544:8) {#if tongbang > 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let header;
    	let t0;
    	let main;
    	let div6;
    	let div2;
    	let div0;
    	let t2;
    	let div1;
    	let t4;
    	let div2_class_value;
    	let t5;
    	let div3;
    	let t6;
    	let div4;
    	let input;
    	let input_max_value;
    	let t7;
    	let div5;
    	let t8;
    	let hr;
    	let t9;
    	let footer;
    	let div11;
    	let div10;
    	let div8;
    	let div7;
    	let t10;
    	let t11;
    	let t12;
    	let t13;
    	let t14;
    	let t15;
    	let t16;
    	let div9;
    	let button;
    	let i;
    	let t17;
    	let current;
    	let dispose;

    	const timhoso = new Timhoso({
    			props: { hoso: ctx.$kho.hoso },
    			$$inline: true
    		});

    	function select_block_type(changed, ctx) {
    		if (ctx.curbang === 0) return create_if_block_11;
    		if (ctx.curbang === 1) return create_if_block_12;
    		if (ctx.curbang === 2) return create_if_block_13;
    		if (ctx.curbang === 3) return create_if_block_14;
    		return create_else_block_3;
    	}

    	let current_block_type = select_block_type(null, ctx);
    	let if_block0 = current_block_type(ctx);
    	let each_value = ctx.danhsach;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	let if_block1 = tongbang > 0 && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			create_component(timhoso.$$.fragment);
    			t0 = space();
    			main = element("main");
    			div6 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "STT";
    			t2 = space();
    			div1 = element("div");
    			div1.textContent = "Khách hàng";
    			t4 = space();
    			if_block0.c();
    			t5 = space();
    			div3 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			div4 = element("div");
    			input = element("input");
    			t7 = space();
    			div5 = element("div");
    			t8 = space();
    			hr = element("hr");
    			t9 = space();
    			footer = element("footer");
    			div11 = element("div");
    			div10 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			t10 = text("Hiện có ");
    			t11 = text(ctx.tongloc);
    			t12 = text("/");
    			t13 = text(ctx.tonghoso);
    			t14 = text(" hồ sơ");
    			t15 = space();
    			if (if_block1) if_block1.c();
    			t16 = space();
    			div9 = element("div");
    			button = element("button");
    			i = element("i");
    			t17 = text("\r\n            Thêm mới");
    			add_location(header, file$2, 323, 2, 8023);
    			attr_dev(div0, "class", "stt svelte-15u659a");
    			add_location(div0, file$2, 330, 8, 8169);
    			attr_dev(div1, "class", "khach-hang svelte-15u659a");
    			add_location(div1, file$2, 331, 8, 8205);
    			attr_dev(div2, "class", div2_class_value = "tieude bang" + ctx.curbang + " svelte-15u659a");
    			add_location(div2, file$2, 329, 6, 8125);
    			attr_dev(div3, "class", "noidung svelte-15u659a");
    			add_location(div3, file$2, 364, 6, 9586);
    			attr_dev(input, "id", "cuonhoso");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = ctx.tongloc - ctx.hs_per - 1);
    			attr_dev(input, "class", "svelte-15u659a");
    			add_location(input, file$2, 524, 8, 16329);
    			attr_dev(div4, "class", "cuonhoso svelte-15u659a");
    			add_location(div4, file$2, 523, 6, 16297);
    			attr_dev(div5, "class", "per-hoso svelte-15u659a");
    			attr_dev(div5, "contenteditable", "true");
    			if (ctx.hs_per === void 0) add_render_callback(() => ctx.div5_input_handler_2.call(div5));
    			add_location(div5, file$2, 531, 6, 16499);
    			attr_dev(div6, "class", "banghoso svelte-15u659a");
    			add_location(div6, file$2, 328, 4, 8095);
    			add_location(hr, file$2, 533, 4, 16588);
    			attr_dev(main, "class", "svelte-15u659a");
    			add_location(main, file$2, 327, 2, 8083);
    			attr_dev(div7, "class", "col");
    			add_location(div7, file$2, 540, 10, 16720);
    			attr_dev(div8, "class", "col-3");
    			add_location(div8, file$2, 539, 8, 16689);
    			attr_dev(i, "class", "fa fa-plus");
    			add_location(i, file$2, 555, 12, 17185);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 554, 10, 17115);
    			attr_dev(div9, "class", "col-1 mb-3");
    			add_location(div9, file$2, 553, 8, 17079);
    			attr_dev(div10, "class", "row");
    			add_location(div10, file$2, 538, 6, 16662);
    			attr_dev(div11, "class", "container-fluid");
    			add_location(div11, file$2, 537, 4, 16625);
    			add_location(footer, file$2, 536, 2, 16611);
    			attr_dev(section, "class", "svelte-15u659a");
    			add_location(section, file$2, 322, 0, 8010);

    			dispose = [
    				listen_dev(input, "change", ctx.input_change_input_handler),
    				listen_dev(input, "input", ctx.input_change_input_handler),
    				listen_dev(div5, "input", ctx.div5_input_handler_2)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			mount_component(timhoso, header, null);
    			append_dev(section, t0);
    			append_dev(section, main);
    			append_dev(main, div6);
    			append_dev(div6, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div2, t4);
    			if_block0.m(div2, null);
    			append_dev(div6, t5);
    			append_dev(div6, div3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			append_dev(div6, t6);
    			append_dev(div6, div4);
    			append_dev(div4, input);
    			set_input_value(input, ctx.hs_start);
    			append_dev(div6, t7);
    			append_dev(div6, div5);

    			if (ctx.hs_per !== void 0) {
    				div5.innerHTML = ctx.hs_per;
    			}

    			append_dev(main, t8);
    			append_dev(main, hr);
    			append_dev(section, t9);
    			append_dev(section, footer);
    			append_dev(footer, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div8);
    			append_dev(div8, div7);
    			append_dev(div7, t10);
    			append_dev(div7, t11);
    			append_dev(div7, t12);
    			append_dev(div7, t13);
    			append_dev(div7, t14);
    			append_dev(div10, t15);
    			if (if_block1) if_block1.m(div10, null);
    			append_dev(div10, t16);
    			append_dev(div10, div9);
    			append_dev(div9, button);
    			append_dev(button, i);
    			append_dev(button, t17);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			const timhoso_changes = {};
    			if (changed.$kho) timhoso_changes.hoso = ctx.$kho.hoso;
    			timhoso.$set(timhoso_changes);

    			if (current_block_type !== (current_block_type = select_block_type(changed, ctx))) {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div2, null);
    				}
    			}

    			if (!current || changed.curbang && div2_class_value !== (div2_class_value = "tieude bang" + ctx.curbang + " svelte-15u659a")) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (changed.hs_start || changed.hs_stop || changed.curbang || changed.rowCur || changed.danhsach || changed.hssua || changed.btnSave || changed.hsgoc || changed.JSON) {
    				each_value = ctx.danhsach;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div3, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || (changed.tongloc || changed.hs_per) && input_max_value !== (input_max_value = ctx.tongloc - ctx.hs_per - 1)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (changed.hs_start) {
    				set_input_value(input, ctx.hs_start);
    			}

    			if (changed.hs_per && ctx.hs_per !== div5.innerHTML) {
    				div5.innerHTML = ctx.hs_per;
    			}

    			if (!current || changed.tongloc) set_data_dev(t11, ctx.tongloc);
    			if (!current || changed.tonghoso) set_data_dev(t13, ctx.tonghoso);
    			if (tongbang > 0) if_block1.p(changed, ctx);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(timhoso.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(timhoso.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(timhoso);
    			if_block0.d();
    			destroy_each(each_blocks, detaching);
    			if (if_block1) if_block1.d();
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    let tongbang = 4;

    function instance$2($$self, $$props, $$invalidate) {
    	let $ga;
    	let $kho;
    	validate_store(ga, "ga");
    	component_subscribe($$self, ga, $$value => $$invalidate("$ga", $ga = $$value));
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	let { hoso } = $$props;
    	set_store_value(ga, $ga.conggiaotiep = $ga.conggiaotiep ? $ga.conggiaotiep : "pkh", $ga);
    	set_store_value(ga, $ga.manguoidung = $ga.manguoidung ? $ga.manguoidung : "pkh002", $ga);
    	set_store_value(ga, $ga.magiaotiep = $ga.magiaotiep ? $ga.magiaotiep : "1pkh2Pkh3pKh4pkH", $ga);
    	set_store_value(kho, $kho.progress = $kho.progress ? $kho.progress : 100, $kho);
    	set_store_value(kho, $kho.dstim = $kho.dstim ? $kho.dstim : [], $kho);

    	function refreshHoso() {
    		set_store_value(kho, $kho.dstim = [...$kho.dstim, "h"], $kho);
    		let r = $kho.dstim.pop();
    		r = null;
    	}

    	function suaHoso(listhoso) {
    		listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];

    		if (listhoso.length === 0) {
    			return;
    		}

    		if ($kho.hoso.length === 0) {
    			set_store_value(kho, $kho.hoso = listhoso, $kho);
    			return;
    		}

    		let l1 = listhoso.length;

    		for (let i1 = 0; i1 < l1; i1++) {
    			let hsr = listhoso[i1];
    			let l = $kho.hoso.length;

    			for (let i = 0; i < l; i++) {
    				let hss = $kho.hoso[i];

    				if (hsr.mahoso === hss.mahoso) {
    					for (let k in hsr) {
    						if (hss.hasOwnProperty(k)) {
    							hss[k] = hsr[k];
    						}
    					}
    				}
    			}
    		}

    		refreshHoso();
    	}

    	function guiServer(listhoso) {
    		var chat = {
    			uuid: [$ga.manguoidung, Date.now()].join("."),
    			data: { tin: {}, goi: {} }
    		};

    		chat.data.tin = { nhan: "sua", magiaotiep: $ga.magiaotiep };
    		chat.data.goi = { hoso: listhoso };
    	}

    	let rowCur = 0;
    	let hsgoc = {};
    	let hssua = {};

    	function btnSave() {
    		let tam = { mahoso: hssua["mahoso"] };

    		for (let k in hssua) {
    			let a = hssua[k] || "";

    			if (a.length > 0 && a !== hsgoc[k]) {
    				tam[k] = typeof a === "string" ? a.trim() : a;
    			}
    		}

    		if (Object.keys(tam).length > 1) {
    			let listhoso = [JSON.parse(JSON.stringify(tam))];
    			suaHoso(listhoso);
    			refreshHoso();
    			guiServer(listhoso);
    		} else {
    			let dai = danhsach.length;

    			for (let i = 0; i < dai; i++) {
    				let a = danhsach[i];

    				if (a.mahoso === tam.mahoso) {
    					a["isEdit"] = false;
    				}
    			}
    		}

    		$$invalidate("hssua", hssua = {});
    	}

    	let hs_start = 0;
    	let hs_per = 7;
    	let curbang = 0;
    	const writable_props = ["hoso"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Banghoso> was created with unknown prop '${key}'`);
    	});

    	const click_handler = ({ hs }) => $$invalidate("danhsach", hs.isEdit = false, danhsach);

    	function div1_input_handler() {
    		hssua.khachhang = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div2_input_handler() {
    		hssua.sohoso = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div3_input_handler() {
    		hssua.diachi = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div0_input_handler() {
    		hssua.lienhe = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div1_input_handler_1() {
    		hssua.mota = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div2_input_handler_1() {
    		hssua.trongai = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div3_input_handler_1() {
    		hssua.tainhap = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div4_input_handler() {
    		hssua.taithicong = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div5_input_handler() {
    		hssua.hoantien = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div0_input_handler_1() {
    		hssua.dc1 = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div1_input_handler_2() {
    		hssua.dc2 = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div2_input_handler_2() {
    		hssua.maq = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div3_input_handler_2() {
    		hssua.maqp = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div4_input_handler_1() {
    		hssua.ghitat = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div0_input_handler_2() {
    		hssua.maqt = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function input0_input_handler() {
    		hssua.ngaylendot = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input1_input_handler() {
    		hssua.ngaygan = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function div3_input_handler_3() {
    		hssua.sodhn = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div4_input_handler_2() {
    		hssua.hieudhn = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div5_input_handler_1() {
    		hssua.chisodhn = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div0_input_handler_3() {
    		hssua.madma = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div1_input_handler_3() {
    		hssua.malotrinh = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	function div2_input_handler_3() {
    		hssua.sodanhbo = this.innerHTML;
    		$$invalidate("hssua", hssua);
    	}

    	const click_handler_1 = ({ hs }) => {
    		$$invalidate("danhsach", hs.isEdit = true, danhsach);
    		$$invalidate("hsgoc", hsgoc = JSON.parse(JSON.stringify(hs)));
    		$$invalidate("hssua", hssua = JSON.parse(JSON.stringify(hs)));
    	};

    	const mouseover_handler = ({ stt }) => $$invalidate("rowCur", rowCur = stt);

    	function input_change_input_handler() {
    		hs_start = to_number(this.value);
    		$$invalidate("hs_start", hs_start);
    	}

    	function div5_input_handler_2() {
    		hs_per = this.innerHTML;
    		$$invalidate("hs_per", hs_per);
    	}

    	function input_change_input_handler_1() {
    		curbang = to_number(this.value);
    		$$invalidate("curbang", curbang);
    	}

    	$$self.$set = $$props => {
    		if ("hoso" in $$props) $$invalidate("hoso", hoso = $$props.hoso);
    	};

    	$$self.$capture_state = () => {
    		return {
    			hoso,
    			rowCur,
    			hsgoc,
    			hssua,
    			hs_start,
    			hs_per,
    			curbang,
    			tongbang,
    			$ga,
    			$kho,
    			danhsach,
    			tonghoso,
    			tongloc,
    			hs_stop
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("hoso" in $$props) $$invalidate("hoso", hoso = $$props.hoso);
    		if ("rowCur" in $$props) $$invalidate("rowCur", rowCur = $$props.rowCur);
    		if ("hsgoc" in $$props) $$invalidate("hsgoc", hsgoc = $$props.hsgoc);
    		if ("hssua" in $$props) $$invalidate("hssua", hssua = $$props.hssua);
    		if ("hs_start" in $$props) $$invalidate("hs_start", hs_start = $$props.hs_start);
    		if ("hs_per" in $$props) $$invalidate("hs_per", hs_per = $$props.hs_per);
    		if ("curbang" in $$props) $$invalidate("curbang", curbang = $$props.curbang);
    		if ("tongbang" in $$props) $$invalidate("tongbang", tongbang = $$props.tongbang);
    		if ("$ga" in $$props) ga.set($ga = $$props.$ga);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("danhsach" in $$props) $$invalidate("danhsach", danhsach = $$props.danhsach);
    		if ("tonghoso" in $$props) $$invalidate("tonghoso", tonghoso = $$props.tonghoso);
    		if ("tongloc" in $$props) $$invalidate("tongloc", tongloc = $$props.tongloc);
    		if ("hs_stop" in $$props) $$invalidate("hs_stop", hs_stop = $$props.hs_stop);
    	};

    	let tonghoso;
    	let tongloc;
    	let danhsach;
    	let hs_stop;

    	$$self.$$.update = (changed = { $kho: 1, tongloc: 1, hs_start: 1, hs_per: 1 }) => {
    		if (changed.$kho) {
    			 $$invalidate("tonghoso", tonghoso = $kho.hoso ? $kho.hoso.length : 0);
    		}

    		if (changed.$kho) {
    			 $$invalidate("tongloc", tongloc = $kho.dsloc ? $kho.dsloc.length : 0);
    		}

    		if (changed.$kho) {
    			 $$invalidate("danhsach", danhsach = $kho.dsloc
    			? $kho.dsloc.map(x => ({ ...x, isEdit: false }))
    			: []);
    		}

    		if (changed.tongloc || changed.hs_start || changed.hs_per) {
    			 $$invalidate("hs_stop", hs_stop = tongloc ? hs_start + hs_per : tongloc);
    		}
    	};

    	return {
    		hoso,
    		rowCur,
    		hsgoc,
    		hssua,
    		btnSave,
    		hs_start,
    		hs_per,
    		curbang,
    		$kho,
    		danhsach,
    		tonghoso,
    		tongloc,
    		hs_stop,
    		click_handler,
    		div1_input_handler,
    		div2_input_handler,
    		div3_input_handler,
    		div0_input_handler,
    		div1_input_handler_1,
    		div2_input_handler_1,
    		div3_input_handler_1,
    		div4_input_handler,
    		div5_input_handler,
    		div0_input_handler_1,
    		div1_input_handler_2,
    		div2_input_handler_2,
    		div3_input_handler_2,
    		div4_input_handler_1,
    		div0_input_handler_2,
    		input0_input_handler,
    		input1_input_handler,
    		div3_input_handler_3,
    		div4_input_handler_2,
    		div5_input_handler_1,
    		div0_input_handler_3,
    		div1_input_handler_3,
    		div2_input_handler_3,
    		click_handler_1,
    		mouseover_handler,
    		input_change_input_handler,
    		div5_input_handler_2,
    		input_change_input_handler_1
    	};
    }

    class Banghoso extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { hoso: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Banghoso",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (ctx.hoso === undefined && !("hoso" in props)) {
    			console.warn("<Banghoso> was created without expected prop 'hoso'");
    		}
    	}

    	get hoso() {
    		throw new Error("<Banghoso>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hoso(value) {
    		throw new Error("<Banghoso>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.15.0 */

    const { Object: Object_1$1 } = globals;
    const file$3 = "src\\App.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object_1$1.create(ctx);
    	child_ctx.item = list[i];
    	return child_ctx;
    }

    // (204:4) {#if isOpen}
    function create_if_block$2(ctx) {
    	let div3;
    	let div0;
    	let t1;
    	let div1;
    	let select;
    	let t2;
    	let div2;
    	let button;
    	let i;
    	let dispose;
    	let each_value = ctx.dsnam;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			div0.textContent = "Vui lòng lựa chọn hồ sơ của năm ";
    			t1 = space();
    			div1 = element("div");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			div2 = element("div");
    			button = element("button");
    			i = element("i");
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$3, 205, 8, 5965);
    			attr_dev(select, "class", "custom-select");
    			attr_dev(select, "id", "selectnam");
    			if (ctx.namhoso === void 0) add_render_callback(() => ctx.select_change_handler.call(select));
    			add_location(select, file$3, 207, 10, 6074);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$3, 206, 8, 6040);
    			attr_dev(i, "class", "fa fa-sync-alt");
    			add_location(i, file$3, 218, 12, 6461);
    			attr_dev(button, "class", "btn btn-outline-primary btn-rounded");
    			attr_dev(button, "type", "button");
    			add_location(button, file$3, 214, 10, 6324);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$3, 213, 8, 6295);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file$3, 204, 6, 5938);

    			dispose = [
    				listen_dev(select, "change", ctx.select_change_handler),
    				listen_dev(button, "click", ctx.guiTau, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, ctx.namhoso);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, button);
    			append_dev(button, i);
    		},
    		p: function update(changed, ctx) {
    			if (changed.dsnam) {
    				each_value = ctx.dsnam;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (changed.namhoso) {
    				select_option(select, ctx.namhoso);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(204:4) {#if isOpen}",
    		ctx
    	});

    	return block;
    }

    // (209:12) {#each dsnam as item}
    function create_each_block$2(ctx) {
    	let option;
    	let t_value = ctx.item + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = ctx.item;
    			option.value = option.__value;
    			add_location(option, file$3, 209, 14, 6191);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(209:12) {#each dsnam as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let section;
    	let header;
    	let div1;
    	let div0;
    	let h3;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let main;
    	let t5;
    	let footer;
    	let t6;
    	let t7_value = ctx.$kho.hoso + "";
    	let t7;
    	let current;
    	let dispose;
    	let if_block = ctx.isOpen && create_if_block$2(ctx);
    	const progress = new Progress({ $$inline: true });

    	const hoso_1 = new Banghoso({
    			props: { hoso: ctx.$kho.hoso },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			div1 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			t0 = text("DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN NĂM ");
    			t1 = text(ctx.namhoso);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			create_component(progress.$$.fragment);
    			t4 = space();
    			main = element("main");
    			create_component(hoso_1.$$.fragment);
    			t5 = space();
    			footer = element("footer");
    			t6 = text("hoso ");
    			t7 = text(t7_value);
    			add_location(h3, file$3, 200, 8, 5832);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$3, 199, 6, 5764);
    			attr_dev(div1, "class", "row justify-content-center text-primary");
    			add_location(div1, file$3, 198, 4, 5703);
    			attr_dev(header, "class", "container-fluid");
    			add_location(header, file$3, 197, 2, 5665);
    			attr_dev(main, "class", "svelte-1jhup2v");
    			add_location(main, file$3, 226, 2, 6588);
    			add_location(footer, file$3, 230, 2, 6641);
    			attr_dev(section, "class", "svelte-1jhup2v");
    			add_location(section, file$3, 196, 0, 5652);
    			dispose = listen_dev(div0, "click", ctx.click_handler, false, false, false);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			append_dev(header, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h3);
    			append_dev(h3, t0);
    			append_dev(h3, t1);
    			append_dev(header, t2);
    			if (if_block) if_block.m(header, null);
    			append_dev(header, t3);
    			mount_component(progress, header, null);
    			append_dev(section, t4);
    			append_dev(section, main);
    			mount_component(hoso_1, main, null);
    			append_dev(section, t5);
    			append_dev(section, footer);
    			append_dev(footer, t6);
    			append_dev(footer, t7);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (!current || changed.namhoso) set_data_dev(t1, ctx.namhoso);

    			if (ctx.isOpen) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(header, t3);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const hoso_1_changes = {};
    			if (changed.$kho) hoso_1_changes.hoso = ctx.$kho.hoso;
    			hoso_1.$set(hoso_1_changes);
    			if ((!current || changed.$kho) && t7_value !== (t7_value = ctx.$kho.hoso + "")) set_data_dev(t7, t7_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(progress.$$.fragment, local);
    			transition_in(hoso_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(progress.$$.fragment, local);
    			transition_out(hoso_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block) if_block.d();
    			destroy_component(progress);
    			destroy_component(hoso_1);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $kho;
    	let $ga;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	validate_store(ga, "ga");
    	component_subscribe($$self, ga, $$value => $$invalidate("$ga", $ga = $$value));
    	set_store_value(kho, $kho.hoso = [], $kho);
    	set_store_value(kho, $kho.progress = 100, $kho);
    	set_store_value(kho, $kho.hoso = [], $kho);
    	let curComp = Banghoso;
    	let dsnam = getdsNam(10);
    	let namhoso = dsnam ? dsnam[1] : 0;
    	let isOpen = false;
    	set_store_value(ga, $ga.toa = getCookie("toa") || "pkh", $ga);
    	set_store_value(ga, $ga.khach = getCookie("khach") || ["pkh002", Date.now()].join("."), $ga);
    	set_store_value(ga, $ga.ve = getCookie("ve") || "1pkh2Pkh3pKh4pkH", $ga);

    	const tuyen = "ws://localhost:8888" + "/api1108/" + $ga.toa + "/hoso/" + $ga.khach;
    	set_store_value(ga, $ga.tau = new WebSocket(tuyen) || null, $ga);

    	function nhanTau() {
    		let dsnhan = ["gom", "moi", "xem", "sua", "xoa"];

    		try {
    			set_store_value(
    				ga,
    				$ga.tau.onmessage = function (event) {
    					let chat = JSON.parse(event.data);
    					console.log("nhanSocket chat=" + JSON.stringify(chat));

    					if (dsnhan.indexOf(chat["tin"]["nhan"]) !== -1) {
    						set_store_value(ga, $ga.ve = chat["tin"]["ve"], $ga);
    						autoNhan(chat);
    					}
    				},
    				$ga
    			);
    		} catch(err) {
    			console.log("error " + err);
    		} finally {
    		}
    	}

    	function guiTau() {
    		let chat = {
    			tin: {
    				uuid: [$ga.khach, Date.now()].join("."),
    				nhan: "gom",
    				ve: $ga.ve
    			},
    			kho: { hoso: { namhoso } }
    		};

    		try {
    			$ga.tau.send(JSON.stringify(chat));
    			console.log("rest try guiSocket=" + JSON.stringify(chat));
    		} catch(err) {
    			console.log("error " + err);
    		}
    	}

    	function refreshHoso() {
    		set_store_value(kho, $kho.dstim = [...$kho.dstim, "h"], $kho);
    		let r = $kho.dstim.pop();
    		r = null;
    	}

    	function moiHoso(listhoso) {
    		listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];

    		if (listhoso.length === 0) {
    			return;
    		}

    		let hsnam = listhoso.filter(i => i.mahoso.startsWith(namhoso));
    		listhoso = JSON.parse(JSON.stringify(hsnam));
    		let hosonew = $kho.hoso;
    		let l = listhoso.length;

    		for (let i = 0; i < l; i++) {
    			hosonew.push(listhoso[i]);
    		}

    		set_store_value(kho, $kho.hoso = JSON.parse(JSON.stringify(hosonew)), $kho);
    		refreshHoso();
    	}

    	function suaHoso(listhoso) {
    		listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    		let l = hoso.length;

    		if (listhoso.length === 0 || l === 0) {
    			return;
    		}

    		let l1 = listhoso.length;

    		for (let i1 = 0; i1 < l1; i1++) {
    			let hsr = listhoso[i1];

    			for (let i = 0; i < l; i++) {
    				let hss = hoso[i];

    				if (hsr.mahoso === hss.mahoso) {
    					for (let k in hsr) {
    						if (hss.hasOwnProperty(k)) {
    							hss[k] = hsr[k];
    						}
    					}
    				}
    			}
    		}

    		set_store_value(kho, $kho.hoso = JSON.parse(JSON.stringify(hoso)), $kho);
    		refreshHoso();
    	}

    	function xoaHoso(listhoso) {
    		listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    		let l = hoso.length || 0;

    		if (listhoso.length === 0 || l === 0) {
    			return;
    		}

    		let l1 = listhoso.length;

    		for (let i1 = 0; i1 < l1; i1++) {
    			let hsr = listhoso[i1];

    			for (let i = 0; i < l; i++) {
    				let hss = $kho.hoso[i];

    				if (hsr.mahoso === hss.mahoso) {
    					$kho.hoso.splice(i, 1);
    					break;
    				}
    			}
    		}

    		set_store_value(kho, $kho.hoso = hoso, $kho);
    		refreshHoso();
    	}

    	function autoNhan(chat) {
    		chat = JSON.parse(JSON.stringify(chat));
    		let listhoso = chat.kho.hoso || [];
    		console.log("autoNhan listhoso=" + typeof listhoso);
    		console.log("autoNhan listhoso[0]=" + JSON.stringify(listhoso[0]));

    		if (listhoso.length === 0) {
    			return;
    		}

    		if (chat.tin.nhan === "moi" || chat.tin.nhan === "gom") {
    			moiHoso(listhoso);
    		}

    		if (chat.tin.nhan === "sua") {
    			suaHoso(listhoso);
    		}

    		if (chat.tin.nhan === "xoa") {
    			xoaHoso(listhoso);
    		}
    	}

    	const click_handler = () => $$invalidate("isOpen", isOpen = !isOpen);

    	function select_change_handler() {
    		namhoso = select_value(this);
    		$$invalidate("namhoso", namhoso);
    		$$invalidate("dsnam", dsnam);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("curComp" in $$props) curComp = $$props.curComp;
    		if ("dsnam" in $$props) $$invalidate("dsnam", dsnam = $$props.dsnam);
    		if ("namhoso" in $$props) $$invalidate("namhoso", namhoso = $$props.namhoso);
    		if ("isOpen" in $$props) $$invalidate("isOpen", isOpen = $$props.isOpen);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("$ga" in $$props) ga.set($ga = $$props.$ga);
    	};

    	  nhanTau();

    	return {
    		dsnam,
    		namhoso,
    		isOpen,
    		guiTau,
    		$kho,
    		click_handler,
    		select_change_handler
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    const app = new App({
      target: document.getElementById("pna")
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
