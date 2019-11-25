
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
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
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
    var chu = writable({});

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

    // web

    function guiSocket(datajson, conggiaotiep , manguoidung) {
      //const socket_url = "ws://" + location.host + "/api1108/" + conggiaotiep + "/hoso/" + manguoidung;
      const socket_url = "ws://localhost:8888" + "/api1108/" + conggiaotiep + "/hoso/" + manguoidung;
      var ws = new WebSocket(socket_url);
      if (ws.readyState > 1) {
        try {
          ws.send(JSON.stringify(datajson));
          console.log("rest try guiSocket=" + JSON.stringify(datajson));
        } catch (err) {
          ws = new WebSocket(socket_url);
        } finally {
          ws.send(JSON.stringify(datajson));
          console.log("rest final guiSocket=" + JSON.stringify(datajson));
        }  }
    }

    /* src\Timhoso.svelte generated by Svelte v3.15.0 */
    const file$1 = "src\\Timhoso.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.id = i;
    	return child_ctx;
    }

    // (69:10) {#each $kho.dstim as item, id}
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
    			add_location(button, file$1, 69, 12, 1885);

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
    		source: "(69:10) {#each $kho.dstim as item, id}",
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
    			add_location(div0, file$1, 67, 8, 1812);
    			attr_dev(i, "class", "fa fa-trash fa-lg");
    			add_location(i, file$1, 80, 12, 2261);
    			attr_dev(button, "class", "btn");
    			add_location(button, file$1, 79, 10, 2192);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$1, 78, 8, 2158);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$1, 66, 6, 1785);
    			attr_dev(div3, "class", "col border border-primary");
    			add_location(div3, file$1, 65, 4, 1738);
    			attr_dev(input, "class", "col");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Tìm ... (không phân biệt chữ hoa hay thường)");
    			add_location(input, file$1, 87, 6, 2409);
    			attr_dev(div4, "class", "col-3");
    			add_location(div4, file$1, 86, 4, 2382);
    			attr_dev(div5, "class", "row");
    			add_location(div5, file$1, 64, 2, 1715);
    			attr_dev(div6, "class", "container-fluid");
    			add_location(div6, file$1, 63, 0, 1682);

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
    		let data = $kho.hoso;

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

    	const mouseover_handler = ({ id }) => $$invalidate("curdstim", curdstim = id);
    	const click_handler = () => set_store_value(kho, $kho.dstim = [], $kho);

    	function input_input_handler() {
    		stim = this.value;
    		$$invalidate("stim", stim);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
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
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timhoso",
    			options,
    			id: create_fragment$1.name
    		});
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

    // (355:8) {:else}
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
    			add_location(div0, file$2, 355, 10, 9351);
    			attr_dev(div1, "class", "malotrinh svelte-15u659a");
    			add_location(div1, file$2, 356, 10, 9394);
    			attr_dev(div2, "class", "sodanhbo svelte-15u659a");
    			add_location(div2, file$2, 357, 10, 9446);
    			attr_dev(div3, "class", "qrcode svelte-15u659a");
    			add_location(div3, file$2, 358, 10, 9496);
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
    		source: "(355:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (348:32) 
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
    			add_location(div0, file$2, 348, 10, 9054);
    			attr_dev(div1, "class", "ngaylendot svelte-15u659a");
    			add_location(div1, file$2, 349, 10, 9097);
    			attr_dev(div2, "class", "ngaygan svelte-15u659a");
    			add_location(div2, file$2, 350, 10, 9151);
    			attr_dev(div3, "class", "sodhn svelte-15u659a");
    			add_location(div3, file$2, 351, 10, 9198);
    			attr_dev(div4, "class", "hieudhn svelte-15u659a");
    			add_location(div4, file$2, 352, 10, 9241);
    			attr_dev(div5, "class", "chisodhn svelte-15u659a");
    			add_location(div5, file$2, 353, 10, 9288);
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
    		source: "(348:32) ",
    		ctx
    	});

    	return block;
    }

    // (342:32) 
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
    			add_location(div0, file$2, 342, 10, 8804);
    			attr_dev(div1, "class", "dc2 svelte-15u659a");
    			add_location(div1, file$2, 343, 10, 8848);
    			attr_dev(div2, "class", "maq svelte-15u659a");
    			add_location(div2, file$2, 344, 10, 8892);
    			attr_dev(div3, "class", "maqp svelte-15u659a");
    			add_location(div3, file$2, 345, 10, 8934);
    			attr_dev(div4, "class", "ghitat svelte-15u659a");
    			add_location(div4, file$2, 346, 10, 8975);
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
    		source: "(342:32) ",
    		ctx
    	});

    	return block;
    }

    // (335:32) 
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
    			add_location(div0, file$2, 335, 10, 8479);
    			attr_dev(div1, "class", "mo-ta svelte-15u659a");
    			add_location(div1, file$2, 336, 10, 8526);
    			attr_dev(div2, "class", "tro-ngai svelte-15u659a");
    			add_location(div2, file$2, 337, 10, 8568);
    			attr_dev(div3, "class", "tai-nhap svelte-15u659a");
    			add_location(div3, file$2, 338, 10, 8616);
    			attr_dev(div4, "class", "tai-thi-cong svelte-15u659a");
    			add_location(div4, file$2, 339, 10, 8664);
    			attr_dev(div5, "class", "hoan-tien svelte-15u659a");
    			add_location(div5, file$2, 340, 10, 8720);
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
    		source: "(335:32) ",
    		ctx
    	});

    	return block;
    }

    // (330:8) {#if curbang === 0}
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
    			add_location(div0, file$2, 330, 10, 8264);
    			attr_dev(div1, "class", "madot svelte-15u659a");
    			add_location(div1, file$2, 331, 10, 8310);
    			attr_dev(div2, "class", "sohoso svelte-15u659a");
    			add_location(div2, file$2, 332, 10, 8353);
    			attr_dev(div3, "class", "dia-chi svelte-15u659a");
    			add_location(div3, file$2, 333, 10, 8399);
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
    		source: "(330:8) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (364:10) {#if stt >= hs_start && stt <= hs_stop}
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
    			add_location(div, file$2, 364, 12, 9687);
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
    		source: "(364:10) {#if stt >= hs_start && stt <= hs_stop}",
    		ctx
    	});

    	return block;
    }

    // (472:14) {:else}
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
    			add_location(i, file$2, 473, 18, 14114);
    			attr_dev(div0, "class", "stt svelte-15u659a");
    			add_location(div0, file$2, 472, 16, 14077);
    			attr_dev(div1, "class", "khach-hang svelte-15u659a");
    			add_location(div1, file$2, 483, 16, 14484);
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
    		source: "(472:14) {:else}",
    		ctx
    	});

    	return block;
    }

    // (366:14) {#if hs.isEdit}
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
    			add_location(i0, file$2, 367, 18, 9836);
    			attr_dev(i1, "class", "fa fa-stop-circle");
    			add_location(i1, file$2, 368, 18, 9910);
    			attr_dev(div0, "class", "stt svelte-15u659a");
    			add_location(div0, file$2, 366, 16, 9799);
    			attr_dev(div1, "class", "khach-hang svelte-15u659a");
    			attr_dev(div1, "contenteditable", "true");
    			if (ctx.hssua.khachhang === void 0) add_render_callback(() => ctx.div1_input_handler.call(div1));
    			add_location(div1, file$2, 372, 16, 10062);

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
    		source: "(366:14) {#if hs.isEdit}",
    		ctx
    	});

    	return block;
    }

    // (510:16) {:else}
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
    			add_location(div0, file$2, 510, 18, 15939);
    			attr_dev(div1, "class", "malotrinh svelte-15u659a");
    			add_location(div1, file$2, 511, 18, 15994);
    			attr_dev(div2, "class", "sodanhbo svelte-15u659a");
    			add_location(div2, file$2, 512, 18, 16057);
    			attr_dev(div3, "class", "qrcode svelte-15u659a");
    			add_location(div3, file$2, 513, 18, 16118);
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
    		source: "(510:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (503:40) 
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
    			add_location(div0, file$2, 503, 18, 15562);
    			attr_dev(div1, "class", "ngaylendot svelte-15u659a");
    			add_location(div1, file$2, 504, 18, 15615);
    			attr_dev(div2, "class", "ngaygan svelte-15u659a");
    			add_location(div2, file$2, 505, 18, 15680);
    			attr_dev(div3, "class", "sodhn svelte-15u659a");
    			add_location(div3, file$2, 506, 18, 15739);
    			attr_dev(div4, "class", "hieudhn svelte-15u659a");
    			add_location(div4, file$2, 507, 18, 15794);
    			attr_dev(div5, "class", "chisodhn svelte-15u659a");
    			add_location(div5, file$2, 508, 18, 15853);
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
    		source: "(503:40) ",
    		ctx
    	});

    	return block;
    }

    // (497:40) 
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
    			add_location(div0, file$2, 497, 18, 15257);
    			attr_dev(div1, "class", "dc2 svelte-15u659a");
    			add_location(div1, file$2, 498, 18, 15308);
    			attr_dev(div2, "class", "maq svelte-15u659a");
    			add_location(div2, file$2, 499, 18, 15359);
    			attr_dev(div3, "class", "maqp svelte-15u659a");
    			add_location(div3, file$2, 500, 18, 15410);
    			attr_dev(div4, "class", "ghitat svelte-15u659a");
    			add_location(div4, file$2, 501, 18, 15463);
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
    		source: "(497:40) ",
    		ctx
    	});

    	return block;
    }

    // (490:40) 
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
    			add_location(div0, file$2, 490, 18, 14854);
    			attr_dev(div1, "class", "mo-ta svelte-15u659a");
    			add_location(div1, file$2, 491, 18, 14912);
    			attr_dev(div2, "class", "tro-ngai svelte-15u659a");
    			add_location(div2, file$2, 492, 18, 14966);
    			attr_dev(div3, "class", "tai-nhap svelte-15u659a");
    			add_location(div3, file$2, 493, 18, 15026);
    			attr_dev(div4, "class", "tai-thi-cong svelte-15u659a");
    			add_location(div4, file$2, 494, 18, 15086);
    			attr_dev(div5, "class", "hoan-tien svelte-15u659a");
    			add_location(div5, file$2, 495, 18, 15153);
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
    		source: "(490:40) ",
    		ctx
    	});

    	return block;
    }

    // (485:16) {#if curbang === 0}
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
    			add_location(div0, file$2, 485, 18, 14585);
    			attr_dev(div1, "class", "madot svelte-15u659a");
    			add_location(div1, file$2, 486, 18, 14642);
    			attr_dev(div2, "class", "sohoso svelte-15u659a");
    			add_location(div2, file$2, 487, 18, 14697);
    			attr_dev(div3, "class", "dia-chi svelte-15u659a");
    			add_location(div3, file$2, 488, 18, 14754);
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
    		source: "(485:16) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (457:16) {:else}
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
    			add_location(div0, file$2, 457, 18, 13491);
    			attr_dev(div1, "class", "malotrinh svelte-15u659a");
    			attr_dev(div1, "contenteditable", "true");
    			if (ctx.hssua.malotrinh === void 0) add_render_callback(() => ctx.div1_input_handler_3.call(div1));
    			add_location(div1, file$2, 461, 18, 13647);
    			attr_dev(div2, "class", "sodanhbo svelte-15u659a");
    			attr_dev(div2, "contenteditable", "true");
    			if (ctx.hssua.sodanhbo === void 0) add_render_callback(() => ctx.div2_input_handler_3.call(div2));
    			add_location(div2, file$2, 465, 18, 13811);
    			attr_dev(div3, "class", "qrcode svelte-15u659a");
    			add_location(div3, file$2, 469, 18, 13973);

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
    		source: "(457:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (434:40) 
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
    			add_location(div0, file$2, 434, 18, 12554);
    			attr_dev(input0, "type", "date");
    			attr_dev(input0, "class", "svelte-15u659a");
    			add_location(input0, file$2, 439, 20, 12754);
    			attr_dev(div1, "class", "ngaylendot svelte-15u659a");
    			add_location(div1, file$2, 438, 18, 12708);
    			attr_dev(input1, "type", "date");
    			attr_dev(input1, "class", "svelte-15u659a");
    			add_location(input1, file$2, 442, 20, 12894);
    			attr_dev(div2, "class", "ngaygan svelte-15u659a");
    			add_location(div2, file$2, 441, 18, 12851);
    			attr_dev(div3, "class", "sodhn svelte-15u659a");
    			attr_dev(div3, "contenteditable", "true");
    			if (ctx.hssua.sodhn === void 0) add_render_callback(() => ctx.div3_input_handler_3.call(div3));
    			add_location(div3, file$2, 444, 18, 12988);
    			attr_dev(div4, "class", "hieudhn svelte-15u659a");
    			attr_dev(div4, "contenteditable", "true");
    			if (ctx.hssua.hieudhn === void 0) add_render_callback(() => ctx.div4_input_handler_2.call(div4));
    			add_location(div4, file$2, 448, 18, 13144);
    			attr_dev(div5, "class", "chisodhn svelte-15u659a");
    			attr_dev(div5, "contenteditable", "true");
    			if (ctx.hssua.chisodhn === void 0) add_render_callback(() => ctx.div5_input_handler_1.call(div5));
    			add_location(div5, file$2, 452, 18, 13304);

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
    		source: "(434:40) ",
    		ctx
    	});

    	return block;
    }

    // (413:40) 
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
    			add_location(div0, file$2, 413, 18, 11744);
    			attr_dev(div1, "class", "dc2 svelte-15u659a");
    			attr_dev(div1, "contenteditable", "true");
    			if (ctx.hssua.dc2 === void 0) add_render_callback(() => ctx.div1_input_handler_2.call(div1));
    			add_location(div1, file$2, 417, 18, 11896);
    			attr_dev(div2, "class", "maq svelte-15u659a");
    			attr_dev(div2, "contenteditable", "true");
    			if (ctx.hssua.maq === void 0) add_render_callback(() => ctx.div2_input_handler_2.call(div2));
    			add_location(div2, file$2, 421, 18, 12048);
    			attr_dev(div3, "class", "maqp svelte-15u659a");
    			attr_dev(div3, "contenteditable", "true");
    			if (ctx.hssua.maqp === void 0) add_render_callback(() => ctx.div3_input_handler_2.call(div3));
    			add_location(div3, file$2, 425, 18, 12200);
    			attr_dev(div4, "class", "ghitat svelte-15u659a");
    			attr_dev(div4, "contenteditable", "true");
    			if (ctx.hssua.ghitat === void 0) add_render_callback(() => ctx.div4_input_handler_1.call(div4));
    			add_location(div4, file$2, 429, 18, 12354);

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
    		source: "(413:40) ",
    		ctx
    	});

    	return block;
    }

    // (388:40) 
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
    			add_location(div0, file$2, 388, 18, 10735);
    			attr_dev(div1, "class", "mo-ta svelte-15u659a");
    			attr_dev(div1, "contenteditable", "true");
    			if (ctx.hssua.mota === void 0) add_render_callback(() => ctx.div1_input_handler_1.call(div1));
    			add_location(div1, file$2, 392, 18, 10894);
    			attr_dev(div2, "class", "tro-ngai svelte-15u659a");
    			attr_dev(div2, "contenteditable", "true");
    			if (ctx.hssua.trongai === void 0) add_render_callback(() => ctx.div2_input_handler_1.call(div2));
    			add_location(div2, file$2, 396, 18, 11049);
    			attr_dev(div3, "class", "tai-nhap svelte-15u659a");
    			attr_dev(div3, "contenteditable", "true");
    			if (ctx.hssua.tainhap === void 0) add_render_callback(() => ctx.div3_input_handler_1.call(div3));
    			add_location(div3, file$2, 400, 18, 11210);
    			attr_dev(div4, "class", "tai-thi-cong svelte-15u659a");
    			attr_dev(div4, "contenteditable", "true");
    			if (ctx.hssua.taithicong === void 0) add_render_callback(() => ctx.div4_input_handler.call(div4));
    			add_location(div4, file$2, 404, 18, 11371);
    			attr_dev(div5, "class", "hoan-tien svelte-15u659a");
    			attr_dev(div5, "contenteditable", "true");
    			if (ctx.hssua.hoantien === void 0) add_render_callback(() => ctx.div5_input_handler.call(div5));
    			add_location(div5, file$2, 408, 18, 11539);

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
    		source: "(388:40) ",
    		ctx
    	});

    	return block;
    }

    // (377:16) {#if curbang === 0}
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
    			add_location(div0, file$2, 377, 18, 10258);
    			attr_dev(div1, "class", "madot svelte-15u659a");
    			add_location(div1, file$2, 378, 18, 10318);
    			attr_dev(div2, "class", "sohoso svelte-15u659a");
    			attr_dev(div2, "contenteditable", "true");
    			if (ctx.hssua.sohoso === void 0) add_render_callback(() => ctx.div2_input_handler.call(div2));
    			add_location(div2, file$2, 379, 18, 10376);
    			attr_dev(div3, "class", "dia-chi svelte-15u659a");
    			attr_dev(div3, "contenteditable", "true");
    			if (ctx.hssua.diachi === void 0) add_render_callback(() => ctx.div3_input_handler.call(div3));
    			add_location(div3, file$2, 383, 18, 10534);

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
    		source: "(377:16) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (363:8) {#each danhsach as hs, stt}
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
    		source: "(363:8) {#each danhsach as hs, stt}",
    		ctx
    	});

    	return block;
    }

    // (541:8) {#if tongbang > 0}
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
    			add_location(input, file$2, 542, 12, 16861);
    			attr_dev(div, "class", "col-4 mb-12 chonbang");
    			add_location(div, file$2, 541, 10, 16813);

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
    		source: "(541:8) {#if tongbang > 0}",
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
    	const timhoso = new Timhoso({ $$inline: true });

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
    			add_location(header, file$2, 320, 2, 8017);
    			attr_dev(div0, "class", "stt svelte-15u659a");
    			add_location(div0, file$2, 327, 8, 8147);
    			attr_dev(div1, "class", "khach-hang svelte-15u659a");
    			add_location(div1, file$2, 328, 8, 8183);
    			attr_dev(div2, "class", div2_class_value = "tieude bang" + ctx.curbang + " svelte-15u659a");
    			add_location(div2, file$2, 326, 6, 8103);
    			attr_dev(div3, "class", "noidung svelte-15u659a");
    			add_location(div3, file$2, 361, 6, 9564);
    			attr_dev(input, "id", "cuonhoso");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = ctx.tongloc - ctx.hs_per - 1);
    			attr_dev(input, "class", "svelte-15u659a");
    			add_location(input, file$2, 521, 8, 16307);
    			attr_dev(div4, "class", "cuonhoso svelte-15u659a");
    			add_location(div4, file$2, 520, 6, 16275);
    			attr_dev(div5, "class", "per-hoso svelte-15u659a");
    			attr_dev(div5, "contenteditable", "true");
    			if (ctx.hs_per === void 0) add_render_callback(() => ctx.div5_input_handler_2.call(div5));
    			add_location(div5, file$2, 528, 6, 16477);
    			attr_dev(div6, "class", "banghoso svelte-15u659a");
    			add_location(div6, file$2, 325, 4, 8073);
    			add_location(hr, file$2, 530, 4, 16566);
    			attr_dev(main, "class", "svelte-15u659a");
    			add_location(main, file$2, 324, 2, 8061);
    			attr_dev(div7, "class", "col");
    			add_location(div7, file$2, 537, 10, 16698);
    			attr_dev(div8, "class", "col-3");
    			add_location(div8, file$2, 536, 8, 16667);
    			attr_dev(i, "class", "fa fa-plus");
    			add_location(i, file$2, 556, 12, 17205);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 552, 10, 17095);
    			attr_dev(div9, "class", "col-1 mb-3");
    			add_location(div9, file$2, 551, 8, 17059);
    			attr_dev(div10, "class", "row");
    			add_location(div10, file$2, 535, 6, 16640);
    			attr_dev(div11, "class", "container-fluid");
    			add_location(div11, file$2, 534, 4, 16603);
    			add_location(footer, file$2, 533, 2, 16589);
    			attr_dev(section, "class", "svelte-15u659a");
    			add_location(section, file$2, 319, 0, 8004);

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
    	let $chu;
    	let $kho;
    	validate_store(chu, "chu");
    	component_subscribe($$self, chu, $$value => $$invalidate("$chu", $chu = $$value));
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	set_store_value(chu, $chu.conggiaotiep = $chu.conggiaotiep ? $chu.conggiaotiep : "pkh", $chu);
    	set_store_value(chu, $chu.manguoidung = $chu.manguoidung ? $chu.manguoidung : "pkh002", $chu);
    	set_store_value(chu, $chu.magiaotiep = $chu.magiaotiep ? $chu.magiaotiep : "1pkh2Pkh3pKh4pkH", $chu);
    	set_store_value(kho, $kho.hoso = $kho.hoso ? $kho.hoso : [], $kho);
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
    			uuid: [$chu.manguoidung, Date.now()].join("."),
    			data: { tin: {}, goi: {} }
    		};

    		chat.data.tin = { nhan: "sua", magiaotiep: $chu.magiaotiep };
    		chat.data.goi = { hoso: listhoso };
    		guiSocket(chat, $chu.conggiaotiep, $chu.manguoidung);
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
    			listhoso = [JSON.parse(JSON.stringify(tam))];
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

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("rowCur" in $$props) $$invalidate("rowCur", rowCur = $$props.rowCur);
    		if ("hsgoc" in $$props) $$invalidate("hsgoc", hsgoc = $$props.hsgoc);
    		if ("hssua" in $$props) $$invalidate("hssua", hssua = $$props.hssua);
    		if ("hs_start" in $$props) $$invalidate("hs_start", hs_start = $$props.hs_start);
    		if ("hs_per" in $$props) $$invalidate("hs_per", hs_per = $$props.hs_per);
    		if ("curbang" in $$props) $$invalidate("curbang", curbang = $$props.curbang);
    		if ("tongbang" in $$props) $$invalidate("tongbang", tongbang = $$props.tongbang);
    		if ("$chu" in $$props) chu.set($chu = $$props.$chu);
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
    		rowCur,
    		hsgoc,
    		hssua,
    		btnSave,
    		hs_start,
    		hs_per,
    		curbang,
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
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Banghoso",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    let tamdskh = [
      {
        mahoso: "2019hs001",
        khachhang: "Nguyen Van A",
        sohoso: "GM01200/19",
        diachi: "123 Tran Van Thoi, Q10",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        ghitat:'q10 tvt'
      },
      {
        mahoso: "2019hs002",
        khachhang: "Pham Van Tuan",
        diachi: "625 Tran Van Thoi, Q11",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      },
      {
        mahoso: "2019hs003",
        khachhang: "Tran Van Ty",
        diachi: "1243 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaylendot: '2019/10/10',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:'',
        sodot:'GMMP 001/19',
        madot:'2019gmmp001',
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaylendot: '2019/10/10',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:'',
        sodot:'GMMP 001/19',
        madot:'2019gmmp001',
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:'',
        sodot:'GMMP 001/19',
        madot:'2019gmmp001',
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:'',
        sodot:'GMMP 001/19',
        madot:'2019gmmp001',
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:'',
        sodot:'GMMP 001/19',
        madot:'2019gmmp001',
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      },
      {
        mahoso: "2019hs004",
        khachhang: "Nguyen Thi Nhanh",
        diachi: "125 Tran Van Thoi, Q12",
        maq:'01',
        maqp:'0102',
        mota:'',
        ngaygan: '2019/10/20',
        sodhn: '1232',
        chisodhn:0.00,
        madma:'xxx',
        malotrinh:'112',
        trongai:'',
        tainhap:'',
        taithicong:'',
        hoantien:'',
        lienhe:'',
        hieudhn:'kent',
        sohoso:''
      }
    ];

    /* src\App.svelte generated by Svelte v3.15.0 */
    const file$3 = "src\\App.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	return child_ctx;
    }

    // (201:4) {#if isOpen}
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$3, 202, 8, 6001);
    			attr_dev(select, "class", "custom-select");
    			attr_dev(select, "id", "selectnam");
    			if (ctx.namhoso === void 0) add_render_callback(() => ctx.select_change_handler.call(select));
    			add_location(select, file$3, 204, 10, 6105);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$3, 203, 8, 6071);
    			attr_dev(i, "class", "fa fa-sync-alt");
    			add_location(i, file$3, 215, 12, 6500);
    			attr_dev(button, "class", "btn btn-outline-primary btn-rounded");
    			attr_dev(button, "type", "button");
    			add_location(button, file$3, 211, 10, 6360);
    			attr_dev(div2, "class", "col-auto");
    			add_location(div2, file$3, 210, 8, 6326);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file$3, 201, 6, 5974);

    			dispose = [
    				listen_dev(select, "change", ctx.select_change_handler),
    				listen_dev(button, "click", ctx.guiServer, false, false, false)
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
    		source: "(201:4) {#if isOpen}",
    		ctx
    	});

    	return block;
    }

    // (206:12) {#each dsnam as item}
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
    			add_location(option, file$3, 206, 14, 6222);
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
    		source: "(206:12) {#each dsnam as item}",
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
    	let current;
    	let dispose;
    	let if_block = ctx.isOpen && create_if_block$2(ctx);
    	const progress = new Progress({ $$inline: true });
    	var switch_value = ctx.curComp;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

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
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t5 = space();
    			footer = element("footer");
    			add_location(h3, file$3, 197, 8, 5868);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$3, 196, 6, 5800);
    			attr_dev(div1, "class", "row justify-content-center text-primary");
    			add_location(div1, file$3, 195, 4, 5739);
    			attr_dev(header, "class", "container-fluid");
    			add_location(header, file$3, 194, 2, 5701);
    			attr_dev(main, "class", "svelte-1jhup2v");
    			add_location(main, file$3, 223, 2, 6627);
    			add_location(footer, file$3, 227, 2, 6691);
    			attr_dev(section, "class", "svelte-1jhup2v");
    			add_location(section, file$3, 193, 0, 5688);
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

    			if (switch_instance) {
    				mount_component(switch_instance, main, null);
    			}

    			append_dev(section, t5);
    			append_dev(section, footer);
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

    			if (switch_value !== (switch_value = ctx.curComp)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, main, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(progress.$$.fragment, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(progress.$$.fragment, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block) if_block.d();
    			destroy_component(progress);
    			if (switch_instance) destroy_component(switch_instance);
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
    	let $chu;
    	let $kho;
    	validate_store(chu, "chu");
    	component_subscribe($$self, chu, $$value => $$invalidate("$chu", $chu = $$value));
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	set_store_value(chu, $chu.conggiaotiep = $chu.conggiaotiep ? $chu.conggiaotiep : "pkh", $chu);
    	set_store_value(chu, $chu.manguoidung = $chu.manguoidung ? $chu.manguoidung : "pkh002", $chu);
    	set_store_value(chu, $chu.magiaotiep = $chu.magiaotiep ? $chu.magiaotiep : "1pkh2Pkh3pKh4pkH", $chu);
    	set_store_value(kho, $kho.hoso = $kho.hoso ? $kho.hoso : [], $kho);
    	set_store_value(kho, $kho.progress = $kho.progress ? $kho.progress : 100, $kho);
    	set_store_value(kho, $kho.hoso = $kho.hoso ? $kho.hoso : tamdskh, $kho);
    	let curComp = Banghoso;
    	let dsnam = getdsNam(10);
    	let namhoso = dsnam ? dsnam[1] : 0;
    	let isOpen = false;

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
    		set_store_value(kho, $kho.hoso = [...$kho.hoso, listhoso], $kho);
    		refreshHoso();
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

    	function xoaHoso(listhoso) {
    		listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];

    		if (listhoso.length === 0 || $kho.hoso.length === 0) {
    			return;
    		}

    		let l1 = listhoso.length;

    		for (let i1 = 0; i1 < l1; i1++) {
    			let hsr = listhoso[i1];
    			let l = $kho.hoso.length;

    			for (let i = 0; i < l; i++) {
    				let hss = $kho.hoso[i];

    				if (hsr.mahoso === hss.mahoso) {
    					$kho.hoso.splice(i, 1);
    					break;
    				}
    			}
    		}

    		kho.set($kho);
    		refreshHoso();
    	}

    	const socket_url = "ws://localhost:8888" + "/api1108/" + $chu.conggiaotiep + "/hoso/" + $chu.manguoidung;
    	var ws = new WebSocket(socket_url);

    	function nhanSocket() {

    		try {
    			ws.onmessage = function (event) {
    				let chat = JSON.parse(event.data);
    				console.log("nhanSocket tin tu server: 'tin'=" + JSON.stringify(chat));

    				if (["gom", "moi", "xem", "sua", "xoa"].indexOf(chat["data"]["tin"]["nhan"]) !== -1) {
    					return {
    						nhan: chat["data"]["tin"]["nhan"],
    						hoso: chat["data"]["goi"]["hoso"]
    					};
    				}
    			};
    		} catch(err) {
    			console.log("error " + err);
    		} finally {
    		}
    	}

    	function guiSocket(datajson) {
    		let noOK = false;

    		try {
    			ws.send(JSON.stringify(datajson));
    			console.log("rest try guiSocket=" + JSON.stringify(datajson));
    		} catch(err) {
    			noOK = true;
    			console.log("error " + err);
    		} finally {
    			if (noOK) {
    				ws = new WebSocket(socket_url);
    				ws.send(JSON.stringify(datajson));
    			}
    		}
    	}

    	function guiServer() {
    		var chat = {
    			uuid: [$chu.manguoidung, Date.now()].join("."),
    			data: { tin: {}, goi: {} }
    		};

    		chat.data.tin = { nhan: "gom", magiaotiep: $chu.magiaotiep };
    		chat.data.tin._xsrf = $chu._xsrf;
    		chat.data.goi = { hoso: { namhoso } };
    		guiSocket(chat);
    		console.log("guiSocket=" + JSON.stringify(chat));
    	}

    	function nhanServer() {
    		let chat = nhanSocket() || ({ nhan: "", hoso: [] });

    		if (chat.nhan === "moi") {
    			set_store_value(kho, $kho.hoso = chat.hoso ? moiHoso(chat.hoso) : $kho.hoso, $kho);
    		}

    		if (chat.nhan === "sua") {
    			set_store_value(kho, $kho.hoso = chat.hoso ? suaHoso(chat.hoso) : $kho.hoso, $kho);
    		}

    		if (chat.nhan === "xoa") {
    			set_store_value(kho, $kho.hoso = chat.hoso ? xoaHoso(chat.hoso) : $kho.hoso, $kho);
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
    		if ("curComp" in $$props) $$invalidate("curComp", curComp = $$props.curComp);
    		if ("dsnam" in $$props) $$invalidate("dsnam", dsnam = $$props.dsnam);
    		if ("namhoso" in $$props) $$invalidate("namhoso", namhoso = $$props.namhoso);
    		if ("isOpen" in $$props) $$invalidate("isOpen", isOpen = $$props.isOpen);
    		if ("ws" in $$props) ws = $$props.ws;
    		if ("$chu" in $$props) chu.set($chu = $$props.$chu);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("autoUpdate" in $$props) autoUpdate = $$props.autoUpdate;
    	};

    	let autoUpdate;
    	 set_store_value(chu, $chu.conggiaotiep = getCookie("conggiaotiep") || "pkh", $chu);
    	 set_store_value(chu, $chu.manguoidung = getCookie("manguoidung") || "pkh002", $chu);
    	 set_store_value(chu, $chu.magiaotiep = getCookie("magiaotiep") || "1pkh2Pkh3pKh4pkH", $chu);
    	 set_store_value(chu, $chu._xsrf = getCookie("_xsrf") || "1pkH2pKh3Pkh4pkh", $chu);
    	 autoUpdate = nhanServer();

    	return {
    		curComp,
    		dsnam,
    		namhoso,
    		isOpen,
    		guiServer,
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

    /* src\Header.svelte generated by Svelte v3.15.0 */

    const file$4 = "src\\Header.svelte";

    // (21:4) {:else}
    function create_else_block$1(ctx) {
    	let div0;
    	let button0;
    	let i0;
    	let t0;
    	let t1;
    	let div1;
    	let button1;
    	let i1;
    	let t2;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t0 = text("\r\n          Đăng ký");
    			t1 = space();
    			div1 = element("div");
    			button1 = element("button");
    			i1 = element("i");
    			t2 = text("\r\n          Đăng nhập");
    			attr_dev(i0, "class", "fa fa-indent");
    			add_location(i0, file$4, 23, 10, 518);
    			attr_dev(button0, "class", "btn btn-outline-secondary");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$4, 22, 8, 450);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$4, 21, 6, 418);
    			attr_dev(i1, "class", "fa fa-sign-in ");
    			add_location(i1, file$4, 29, 10, 704);
    			attr_dev(button1, "class", "btn btn-outline-secondary");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$4, 28, 8, 636);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$4, 27, 6, 604);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, button0);
    			append_dev(button0, i0);
    			append_dev(button0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, button1);
    			append_dev(button1, i1);
    			append_dev(button1, t2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(21:4) {:else}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let t;

    	function select_block_type(changed, ctx) {
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type();
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t = space();
    			if_block.c();
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$4, 12, 4, 168);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file$4, 11, 2, 145);
    			attr_dev(div2, "class", "container-fluid");
    			add_location(div2, file$4, 10, 0, 112);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t);
    			if_block.m(div1, null);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\Base.svelte generated by Svelte v3.15.0 */
    const file$5 = "src\\Base.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let header;
    	let t0;
    	let nav;
    	let t1;
    	let main;
    	let t2;
    	let aside;
    	let t3;
    	let footer;
    	let current;
    	var switch_value = Header;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance0 = new switch_value(switch_props());
    	}

    	var switch_value_1 = App;

    	function switch_props_1(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value_1) {
    		var switch_instance1 = new switch_value_1(switch_props_1());
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			header = element("header");
    			if (switch_instance0) create_component(switch_instance0.$$.fragment);
    			t0 = space();
    			nav = element("nav");
    			t1 = space();
    			main = element("main");
    			if (switch_instance1) create_component(switch_instance1.$$.fragment);
    			t2 = space();
    			aside = element("aside");
    			t3 = space();
    			footer = element("footer");
    			attr_dev(header, "class", "svelte-1u6ccv2");
    			add_location(header, file$5, 42, 2, 874);
    			attr_dev(nav, "class", "svelte-1u6ccv2");
    			add_location(nav, file$5, 45, 2, 939);
    			attr_dev(main, "class", "svelte-1u6ccv2");
    			add_location(main, file$5, 46, 2, 950);
    			attr_dev(aside, "class", "svelte-1u6ccv2");
    			add_location(aside, file$5, 49, 2, 1008);
    			attr_dev(footer, "class", "svelte-1u6ccv2");
    			add_location(footer, file$5, 50, 2, 1021);
    			attr_dev(div, "id", "webapp");
    			attr_dev(div, "class", "svelte-1u6ccv2");
    			add_location(div, file$5, 41, 0, 853);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, header);

    			if (switch_instance0) {
    				mount_component(switch_instance0, header, null);
    			}

    			append_dev(div, t0);
    			append_dev(div, nav);
    			append_dev(div, t1);
    			append_dev(div, main);

    			if (switch_instance1) {
    				mount_component(switch_instance1, main, null);
    			}

    			append_dev(div, t2);
    			append_dev(div, aside);
    			append_dev(div, t3);
    			append_dev(div, footer);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (switch_value !== (switch_value = Header)) {
    				if (switch_instance0) {
    					group_outros();
    					const old_component = switch_instance0;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance0 = new switch_value(switch_props());
    					create_component(switch_instance0.$$.fragment);
    					transition_in(switch_instance0.$$.fragment, 1);
    					mount_component(switch_instance0, header, null);
    				} else {
    					switch_instance0 = null;
    				}
    			}

    			if (switch_value_1 !== (switch_value_1 = App)) {
    				if (switch_instance1) {
    					group_outros();
    					const old_component = switch_instance1;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value_1) {
    					switch_instance1 = new switch_value_1(switch_props_1());
    					create_component(switch_instance1.$$.fragment);
    					transition_in(switch_instance1.$$.fragment, 1);
    					mount_component(switch_instance1, main, null);
    				} else {
    					switch_instance1 = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance0) transition_in(switch_instance0.$$.fragment, local);
    			if (switch_instance1) transition_in(switch_instance1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance0) transition_out(switch_instance0.$$.fragment, local);
    			if (switch_instance1) transition_out(switch_instance1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (switch_instance0) destroy_component(switch_instance0);
    			if (switch_instance1) destroy_component(switch_instance1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    class Base extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Base",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const app = new Base({
      target: document.getElementById("pna")
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
