
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
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
    function add_resize_listener(element, fn) {
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        const object = document.createElement('object');
        object.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
        object.type = 'text/html';
        object.tabIndex = -1;
        let win;
        object.onload = () => {
            win = object.contentDocument.defaultView;
            win.addEventListener('resize', fn);
        };
        if (/Trident/.test(navigator.userAgent)) {
            element.appendChild(object);
            object.data = 'about:blank';
        }
        else {
            object.data = 'about:blank';
            element.appendChild(object);
        }
        return {
            cancel: () => {
                win && win.removeEventListener && win.removeEventListener('resize', fn);
                element.removeChild(object);
            }
        };
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

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
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

    let kho = writable({});

    /* src\Khach.svelte generated by Svelte v3.14.0 */

    const { console: console_1 } = globals;
    const file = "src\\Khach.svelte";

    // (105:2) {:else}
    function create_else_block(ctx) {
    	let th;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.id + 1 + "";
    	let t1;
    	let t2;
    	let td0;
    	let t3;
    	let t4;
    	let td1;
    	let t5;
    	let t6;
    	let td2;
    	let t7;
    	let t8;
    	let td3;
    	let t9;
    	let t10;
    	let td4;
    	let t11;
    	let t12;
    	let td5;
    	let t13;
    	let dispose;

    	const block = {
    		c: function create() {
    			th = element("th");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			td0 = element("td");
    			t3 = text(ctx.mahoso);
    			t4 = space();
    			td1 = element("td");
    			t5 = text(ctx.sohoso);
    			t6 = space();
    			td2 = element("td");
    			t7 = text(ctx.khachhang);
    			t8 = space();
    			td3 = element("td");
    			t9 = text(ctx.diachi);
    			t10 = space();
    			td4 = element("td");
    			t11 = text(ctx.lienhe);
    			t12 = space();
    			td5 = element("td");
    			t13 = text(ctx.mota);
    			attr_dev(i, "class", "fa fa-edit");
    			add_location(i, file, 110, 8, 2545);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file, 106, 6, 2419);
    			attr_dev(th, "scope", "row");
    			add_location(th, file, 105, 4, 2395);
    			add_location(td0, file, 114, 4, 2621);
    			add_location(td1, file, 115, 4, 2644);
    			add_location(td2, file, 116, 4, 2667);
    			add_location(td3, file, 117, 4, 2693);
    			add_location(td4, file, 118, 4, 2716);
    			add_location(td5, file, 119, 4, 2739);
    			dispose = listen_dev(button, "click", ctx.click_handler_1, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, button);
    			append_dev(button, i);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, td0, anchor);
    			append_dev(td0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, td1, anchor);
    			append_dev(td1, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, td2, anchor);
    			append_dev(td2, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, td3, anchor);
    			append_dev(td3, t9);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, td4, anchor);
    			append_dev(td4, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, td5, anchor);
    			append_dev(td5, t13);
    		},
    		p: function update(changed, ctx) {
    			if (changed.id && t1_value !== (t1_value = ctx.id + 1 + "")) set_data_dev(t1, t1_value);
    			if (changed.mahoso) set_data_dev(t3, ctx.mahoso);
    			if (changed.sohoso) set_data_dev(t5, ctx.sohoso);
    			if (changed.khachhang) set_data_dev(t7, ctx.khachhang);
    			if (changed.diachi) set_data_dev(t9, ctx.diachi);
    			if (changed.lienhe) set_data_dev(t11, ctx.lienhe);
    			if (changed.mota) set_data_dev(t13, ctx.mota);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(td0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(td1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(td2);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(td3);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(td4);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(td5);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(105:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (76:2) {#if isEdit}
    function create_if_block(ctx) {
    	let th;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.id + 1 + "";
    	let t1;
    	let t2;
    	let td0;
    	let t3;
    	let t4_value = ctx.$kho.tblWidth + "";
    	let t4;
    	let t5;
    	let td1;
    	let input0;
    	let t6;
    	let td2;
    	let input1;
    	let t7;
    	let td3;
    	let input2;
    	let t8;
    	let td4;
    	let input3;
    	let t9;
    	let td5;
    	let input4;
    	let dispose;

    	const block = {
    		c: function create() {
    			th = element("th");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			td0 = element("td");
    			t3 = text(ctx.mahoso);
    			t4 = text(t4_value);
    			t5 = space();
    			td1 = element("td");
    			input0 = element("input");
    			t6 = space();
    			td2 = element("td");
    			input1 = element("input");
    			t7 = space();
    			td3 = element("td");
    			input2 = element("input");
    			t8 = space();
    			td4 = element("td");
    			input3 = element("input");
    			t9 = space();
    			td5 = element("td");
    			input4 = element("input");
    			attr_dev(i, "class", "fa fa-save");
    			add_location(i, file, 84, 8, 1979);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file, 77, 6, 1807);
    			attr_dev(th, "scope", "row");
    			add_location(th, file, 76, 4, 1783);
    			add_location(td0, file, 88, 4, 2055);
    			add_location(input0, file, 90, 6, 2105);
    			add_location(td1, file, 89, 4, 2093);
    			add_location(input1, file, 93, 6, 2163);
    			add_location(td2, file, 92, 4, 2151);
    			add_location(input2, file, 96, 6, 2224);
    			add_location(td3, file, 95, 4, 2212);
    			add_location(input3, file, 99, 6, 2282);
    			add_location(td4, file, 98, 4, 2270);
    			add_location(input4, file, 102, 6, 2340);
    			add_location(td5, file, 101, 4, 2328);

    			dispose = [
    				listen_dev(button, "click", ctx.click_handler, false, false, false),
    				listen_dev(input0, "input", ctx.input0_input_handler),
    				listen_dev(input1, "input", ctx.input1_input_handler),
    				listen_dev(input2, "input", ctx.input2_input_handler),
    				listen_dev(input3, "input", ctx.input3_input_handler),
    				listen_dev(input4, "input", ctx.input4_input_handler)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);
    			append_dev(th, button);
    			append_dev(button, i);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, td0, anchor);
    			append_dev(td0, t3);
    			append_dev(td0, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, td1, anchor);
    			append_dev(td1, input0);
    			set_input_value(input0, ctx.sohoso);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, td2, anchor);
    			append_dev(td2, input1);
    			set_input_value(input1, ctx.khachhang);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, td3, anchor);
    			append_dev(td3, input2);
    			set_input_value(input2, ctx.diachi);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, td4, anchor);
    			append_dev(td4, input3);
    			set_input_value(input3, ctx.lienhe);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, td5, anchor);
    			append_dev(td5, input4);
    			set_input_value(input4, ctx.mota);
    		},
    		p: function update(changed, ctx) {
    			if (changed.id && t1_value !== (t1_value = ctx.id + 1 + "")) set_data_dev(t1, t1_value);
    			if (changed.mahoso) set_data_dev(t3, ctx.mahoso);
    			if (changed.$kho && t4_value !== (t4_value = ctx.$kho.tblWidth + "")) set_data_dev(t4, t4_value);

    			if (changed.sohoso && input0.value !== ctx.sohoso) {
    				set_input_value(input0, ctx.sohoso);
    			}

    			if (changed.khachhang && input1.value !== ctx.khachhang) {
    				set_input_value(input1, ctx.khachhang);
    			}

    			if (changed.diachi && input2.value !== ctx.diachi) {
    				set_input_value(input2, ctx.diachi);
    			}

    			if (changed.lienhe && input3.value !== ctx.lienhe) {
    				set_input_value(input3, ctx.lienhe);
    			}

    			if (changed.mota && input4.value !== ctx.mota) {
    				set_input_value(input4, ctx.mota);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(td0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(td1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(td2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(td3);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(td4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(td5);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(76:2) {#if isEdit}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let tr;

    	function select_block_type(changed, ctx) {
    		if (ctx.isEdit) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(null, ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			if_block.c();
    			set_style(tr, "width", ctx.$kho.tblWidth + "px");
    			attr_dev(tr, "class", "svelte-1wao2px");
    			add_location(tr, file, 74, 0, 1724);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			if_block.m(tr, null);
    		},
    		p: function update(changed, ctx) {
    			if (current_block_type === (current_block_type = select_block_type(changed, ctx)) && if_block) {
    				if_block.p(changed, ctx);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(tr, null);
    				}
    			}

    			if (changed.$kho) {
    				set_style(tr, "width", ctx.$kho.tblWidth + "px");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if_block.d();
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

    let isOpen = false;
    const socket_url = "ws://localhost:8888/hoso/api1108";

    function instance($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	set_store_value(kho, $kho.hosocapnhat = "", $kho);
    	let { id } = $$props;
    	let { mahoso } = $$props;
    	let { sohoso } = $$props;
    	let { khachhang } = $$props;
    	let { diachi } = $$props;
    	let { lienhe } = $$props;
    	let { maq } = $$props;
    	let { maqp } = $$props;
    	let { mota } = $$props;
    	let { ngaygan } = $$props;
    	let { sodhn } = $$props;
    	let { hieudhn } = $$props;
    	let { chisodhn } = $$props;
    	let { madma } = $$props;
    	let { malotrinh } = $$props;
    	let { trongai } = $$props;
    	let { tainhap } = $$props;
    	let { taithicong } = $$props;
    	let { hoantien } = $$props;
    	let isEdit = false;
    	var ws = new WebSocket(socket_url);

    	function nhantinServer() {
    		console.log("nhan tin tu server ws.readyState=" + ws.readyState);

    		if (ws.readyState > 1) {
    			ws = new WebSocket(socket_url);
    		}

    		ws.onmessage = function (event) {
    			let tt = JSON.parse(event.data);
    			console.log("tin tu server: 'tin'=" + JSON.stringify(tt));

    			if (tt["tin"] === "capnhat") {
    				set_store_value(kho, $kho.hosocapnhat = tt["goi"], $kho);
    			}
    		};
    	}

    	function guitinServer(sjson) {
    		console.log("gui tin ws.readyState=" + ws.readyState);

    		if (ws.readyState > 1) {
    			ws = new WebSocket(socket_url);
    		}

    		ws.send(JSON.stringify(sjson));
    	}

    	function suaHoso() {
    		let goi = {};
    		goi.mahoso = mahoso;
    		goi.sohoso = sohoso;
    		goi.khachhang = khachhang;
    		goi.diachi = diachi;
    		let tincangui = { tin: "capnhat", goi };
    		guitinServer(tincangui);
    	}

    	const writable_props = [
    		"id",
    		"mahoso",
    		"sohoso",
    		"khachhang",
    		"diachi",
    		"lienhe",
    		"maq",
    		"maqp",
    		"mota",
    		"ngaygan",
    		"sodhn",
    		"hieudhn",
    		"chisodhn",
    		"madma",
    		"malotrinh",
    		"trongai",
    		"tainhap",
    		"taithicong",
    		"hoantien"
    	];

    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith("$$")) console_1.warn(`<Khach> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate("isEdit", isEdit = false);
    		suaHoso();
    	};

    	function input0_input_handler() {
    		sohoso = this.value;
    		$$invalidate("sohoso", sohoso);
    	}

    	function input1_input_handler() {
    		khachhang = this.value;
    		$$invalidate("khachhang", khachhang);
    	}

    	function input2_input_handler() {
    		diachi = this.value;
    		$$invalidate("diachi", diachi);
    	}

    	function input3_input_handler() {
    		lienhe = this.value;
    		$$invalidate("lienhe", lienhe);
    	}

    	function input4_input_handler() {
    		mota = this.value;
    		$$invalidate("mota", mota);
    	}

    	const click_handler_1 = () => $$invalidate("isEdit", isEdit = true);

    	$$self.$set = $$props => {
    		if ("id" in $$props) $$invalidate("id", id = $$props.id);
    		if ("mahoso" in $$props) $$invalidate("mahoso", mahoso = $$props.mahoso);
    		if ("sohoso" in $$props) $$invalidate("sohoso", sohoso = $$props.sohoso);
    		if ("khachhang" in $$props) $$invalidate("khachhang", khachhang = $$props.khachhang);
    		if ("diachi" in $$props) $$invalidate("diachi", diachi = $$props.diachi);
    		if ("lienhe" in $$props) $$invalidate("lienhe", lienhe = $$props.lienhe);
    		if ("maq" in $$props) $$invalidate("maq", maq = $$props.maq);
    		if ("maqp" in $$props) $$invalidate("maqp", maqp = $$props.maqp);
    		if ("mota" in $$props) $$invalidate("mota", mota = $$props.mota);
    		if ("ngaygan" in $$props) $$invalidate("ngaygan", ngaygan = $$props.ngaygan);
    		if ("sodhn" in $$props) $$invalidate("sodhn", sodhn = $$props.sodhn);
    		if ("hieudhn" in $$props) $$invalidate("hieudhn", hieudhn = $$props.hieudhn);
    		if ("chisodhn" in $$props) $$invalidate("chisodhn", chisodhn = $$props.chisodhn);
    		if ("madma" in $$props) $$invalidate("madma", madma = $$props.madma);
    		if ("malotrinh" in $$props) $$invalidate("malotrinh", malotrinh = $$props.malotrinh);
    		if ("trongai" in $$props) $$invalidate("trongai", trongai = $$props.trongai);
    		if ("tainhap" in $$props) $$invalidate("tainhap", tainhap = $$props.tainhap);
    		if ("taithicong" in $$props) $$invalidate("taithicong", taithicong = $$props.taithicong);
    		if ("hoantien" in $$props) $$invalidate("hoantien", hoantien = $$props.hoantien);
    	};

    	$$self.$capture_state = () => {
    		return {
    			id,
    			mahoso,
    			sohoso,
    			khachhang,
    			diachi,
    			lienhe,
    			maq,
    			maqp,
    			mota,
    			ngaygan,
    			sodhn,
    			hieudhn,
    			chisodhn,
    			madma,
    			malotrinh,
    			trongai,
    			tainhap,
    			taithicong,
    			hoantien,
    			isOpen,
    			isEdit,
    			ws,
    			$kho,
    			updateHoso
    		};
    	};

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) $$invalidate("id", id = $$props.id);
    		if ("mahoso" in $$props) $$invalidate("mahoso", mahoso = $$props.mahoso);
    		if ("sohoso" in $$props) $$invalidate("sohoso", sohoso = $$props.sohoso);
    		if ("khachhang" in $$props) $$invalidate("khachhang", khachhang = $$props.khachhang);
    		if ("diachi" in $$props) $$invalidate("diachi", diachi = $$props.diachi);
    		if ("lienhe" in $$props) $$invalidate("lienhe", lienhe = $$props.lienhe);
    		if ("maq" in $$props) $$invalidate("maq", maq = $$props.maq);
    		if ("maqp" in $$props) $$invalidate("maqp", maqp = $$props.maqp);
    		if ("mota" in $$props) $$invalidate("mota", mota = $$props.mota);
    		if ("ngaygan" in $$props) $$invalidate("ngaygan", ngaygan = $$props.ngaygan);
    		if ("sodhn" in $$props) $$invalidate("sodhn", sodhn = $$props.sodhn);
    		if ("hieudhn" in $$props) $$invalidate("hieudhn", hieudhn = $$props.hieudhn);
    		if ("chisodhn" in $$props) $$invalidate("chisodhn", chisodhn = $$props.chisodhn);
    		if ("madma" in $$props) $$invalidate("madma", madma = $$props.madma);
    		if ("malotrinh" in $$props) $$invalidate("malotrinh", malotrinh = $$props.malotrinh);
    		if ("trongai" in $$props) $$invalidate("trongai", trongai = $$props.trongai);
    		if ("tainhap" in $$props) $$invalidate("tainhap", tainhap = $$props.tainhap);
    		if ("taithicong" in $$props) $$invalidate("taithicong", taithicong = $$props.taithicong);
    		if ("hoantien" in $$props) $$invalidate("hoantien", hoantien = $$props.hoantien);
    		if ("isOpen" in $$props) isOpen = $$props.isOpen;
    		if ("isEdit" in $$props) $$invalidate("isEdit", isEdit = $$props.isEdit);
    		if ("ws" in $$props) ws = $$props.ws;
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("updateHoso" in $$props) updateHoso = $$props.updateHoso;
    	};

    	let updateHoso;
    	 updateHoso = nhantinServer();

    	return {
    		id,
    		mahoso,
    		sohoso,
    		khachhang,
    		diachi,
    		lienhe,
    		maq,
    		maqp,
    		mota,
    		ngaygan,
    		sodhn,
    		hieudhn,
    		chisodhn,
    		madma,
    		malotrinh,
    		trongai,
    		tainhap,
    		taithicong,
    		hoantien,
    		isEdit,
    		suaHoso,
    		$kho,
    		click_handler,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		click_handler_1
    	};
    }

    class Khach extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			id: 0,
    			mahoso: 0,
    			sohoso: 0,
    			khachhang: 0,
    			diachi: 0,
    			lienhe: 0,
    			maq: 0,
    			maqp: 0,
    			mota: 0,
    			ngaygan: 0,
    			sodhn: 0,
    			hieudhn: 0,
    			chisodhn: 0,
    			madma: 0,
    			malotrinh: 0,
    			trongai: 0,
    			tainhap: 0,
    			taithicong: 0,
    			hoantien: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Khach",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (ctx.id === undefined && !("id" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'id'");
    		}

    		if (ctx.mahoso === undefined && !("mahoso" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'mahoso'");
    		}

    		if (ctx.sohoso === undefined && !("sohoso" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'sohoso'");
    		}

    		if (ctx.khachhang === undefined && !("khachhang" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'khachhang'");
    		}

    		if (ctx.diachi === undefined && !("diachi" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'diachi'");
    		}

    		if (ctx.lienhe === undefined && !("lienhe" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'lienhe'");
    		}

    		if (ctx.maq === undefined && !("maq" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'maq'");
    		}

    		if (ctx.maqp === undefined && !("maqp" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'maqp'");
    		}

    		if (ctx.mota === undefined && !("mota" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'mota'");
    		}

    		if (ctx.ngaygan === undefined && !("ngaygan" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'ngaygan'");
    		}

    		if (ctx.sodhn === undefined && !("sodhn" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'sodhn'");
    		}

    		if (ctx.hieudhn === undefined && !("hieudhn" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'hieudhn'");
    		}

    		if (ctx.chisodhn === undefined && !("chisodhn" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'chisodhn'");
    		}

    		if (ctx.madma === undefined && !("madma" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'madma'");
    		}

    		if (ctx.malotrinh === undefined && !("malotrinh" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'malotrinh'");
    		}

    		if (ctx.trongai === undefined && !("trongai" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'trongai'");
    		}

    		if (ctx.tainhap === undefined && !("tainhap" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'tainhap'");
    		}

    		if (ctx.taithicong === undefined && !("taithicong" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'taithicong'");
    		}

    		if (ctx.hoantien === undefined && !("hoantien" in props)) {
    			console_1.warn("<Khach> was created without expected prop 'hoantien'");
    		}
    	}

    	get id() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mahoso() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mahoso(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sohoso() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sohoso(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get khachhang() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set khachhang(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get diachi() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set diachi(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lienhe() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lienhe(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maq() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maq(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get maqp() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maqp(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mota() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mota(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ngaygan() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ngaygan(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sodhn() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sodhn(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hieudhn() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hieudhn(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get chisodhn() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set chisodhn(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get madma() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set madma(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get malotrinh() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set malotrinh(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get trongai() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set trongai(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tainhap() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tainhap(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get taithicong() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set taithicong(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hoantien() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hoantien(value) {
    		throw new Error("<Khach>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function filterListObj(listobj, stim) {
      let s = stim.toLowerCase() || '';
      let data = listobj.filter(v => JSON.stringify(v).toLowerCase().indexOf(s) > -1);
      return JSON.parse(JSON.stringify(data));
    }

    /* src\App.svelte generated by Svelte v3.14.0 */
    const file$1 = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.khach = list[i];
    	child_ctx.id = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.id = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.namlamviec = list[i];
    	return child_ctx;
    }

    // (213:12) {#each dsnam as namlamviec}
    function create_each_block_2(ctx) {
    	let option;
    	let t_value = ctx.namlamviec + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = ctx.namlamviec;
    			option.value = option.__value;
    			add_location(option, file$1, 213, 14, 5205);
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
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(213:12) {#each dsnam as namlamviec}",
    		ctx
    	});

    	return block;
    }

    // (228:4) {#if $kho.showProgress}
    function create_if_block$1(ctx) {
    	let div3;
    	let div2;
    	let div1;
    	let div0;
    	let t0_value = ctx.$kho.progress + "";
    	let t0;
    	let t1;
    	let div0_aria_valuenow_value;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = text("%");
    			attr_dev(div0, "class", "progress-bar progress-bar-striped progress-bar-animated\r\n              bg-info");
    			attr_dev(div0, "role", "progressbar");
    			attr_dev(div0, "aria-valuenow", div0_aria_valuenow_value = ctx.$kho.progress);
    			attr_dev(div0, "aria-valuemin", "0");
    			attr_dev(div0, "aria-valuemax", "100");
    			set_style(div0, "width", ctx.$kho.progress + "%");
    			add_location(div0, file$1, 231, 12, 5697);
    			attr_dev(div1, "class", "progress");
    			add_location(div1, file$1, 230, 10, 5661);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$1, 229, 8, 5632);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file$1, 228, 6, 5605);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    		},
    		p: function update(changed, ctx) {
    			if (changed.$kho && t0_value !== (t0_value = ctx.$kho.progress + "")) set_data_dev(t0, t0_value);

    			if (changed.$kho && div0_aria_valuenow_value !== (div0_aria_valuenow_value = ctx.$kho.progress)) {
    				attr_dev(div0, "aria-valuenow", div0_aria_valuenow_value);
    			}

    			if (changed.$kho) {
    				set_style(div0, "width", ctx.$kho.progress + "%");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(228:4) {#if $kho.showProgress}",
    		ctx
    	});

    	return block;
    }

    // (251:12) {#each dstim as item, id}
    function create_each_block_1(ctx) {
    	let button;
    	let t0_value = ctx.item + "";
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let dispose;

    	function mouseover_handler(...args) {
    		return ctx.mouseover_handler(ctx, ...args);
    	}

    	const block = {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = text(" - id=");
    			t2 = text(ctx.id);
    			t3 = text(" - cur=");
    			t4 = text(ctx.curdstim);
    			t5 = space();
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-outline-info");
    			add_location(button, file$1, 251, 14, 6313);

    			dispose = [
    				listen_dev(button, "mouseover", mouseover_handler, false, false, false),
    				listen_dev(button, "click", prevent_default(ctx.xoaDstim), false, false, true)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			append_dev(button, t2);
    			append_dev(button, t3);
    			append_dev(button, t4);
    			append_dev(button, t5);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.dstim && t0_value !== (t0_value = ctx.item + "")) set_data_dev(t0, t0_value);
    			if (changed.curdstim) set_data_dev(t4, ctx.curdstim);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(251:12) {#each dstim as item, id}",
    		ctx
    	});

    	return block;
    }

    // (296:12) {#each dsLoc as khach, id}
    function create_each_block(ctx) {
    	let current;
    	const khach_spread_levels = [ctx.khach, { id: true }];
    	let khach_props = {};

    	for (let i = 0; i < khach_spread_levels.length; i += 1) {
    		khach_props = assign(khach_props, khach_spread_levels[i]);
    	}

    	const khach = new Khach({ props: khach_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(khach.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(khach, target, anchor);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			const khach_changes = changed.dsLoc
    			? get_spread_update(khach_spread_levels, [get_spread_object(ctx.khach), khach_spread_levels[1]])
    			: {};

    			khach.$set(khach_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(khach.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(khach.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(khach, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(296:12) {#each dsLoc as khach, id}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let section;
    	let header;
    	let div4;
    	let div0;
    	let h3;
    	let t1;
    	let div2;
    	let div1;
    	let select;
    	let t2;
    	let div3;
    	let button0;
    	let i0;
    	let t3;
    	let t4;
    	let div5;
    	let t6;
    	let div11;
    	let div9;
    	let div8;
    	let div6;
    	let t7;
    	let div7;
    	let button1;
    	let i1;
    	let t8;
    	let t9;
    	let div10;
    	let input;
    	let t10;
    	let hr;
    	let t11;
    	let main;
    	let div13;
    	let div12;
    	let table;
    	let thead;
    	let tr;
    	let th0;
    	let t13;
    	let th1;
    	let t15;
    	let th2;
    	let t17;
    	let th3;
    	let t19;
    	let th4;
    	let t21;
    	let th5;
    	let t23;
    	let th6;
    	let thead_resize_listener;
    	let t25;
    	let tbody;
    	let div12_resize_listener;
    	let div13_resize_listener;
    	let t26;
    	let footer;
    	let br;
    	let t27;
    	let div17;
    	let div14;
    	let t28;
    	let t29_value = ctx.$kho.dskh.length + "";
    	let t29;
    	let t30;
    	let div15;
    	let t31;
    	let t32_value = JSON.stringify(ctx.$kho.hosocapnhat) + "";
    	let t32;
    	let t33;
    	let div16;
    	let t34;
    	let t35;
    	let t36;
    	let t37_value = ctx.dsLoc.length + "";
    	let t37;
    	let t38;
    	let current;
    	let dispose;
    	let each_value_2 = ctx.dsnam;
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let if_block = ctx.$kho.showProgress && create_if_block$1(ctx);
    	let each_value_1 = ctx.dstim;
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = ctx.dsLoc;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			div4 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN NĂM ";
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");
    			select = element("select");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t2 = space();
    			div3 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			div5 = element("div");
    			div5.textContent = " ";
    			t6 = space();
    			div11 = element("div");
    			div9 = element("div");
    			div8 = element("div");
    			div6 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t7 = space();
    			div7 = element("div");
    			button1 = element("button");
    			i1 = element("i");
    			t8 = text("\r\n              Xóa hết");
    			t9 = space();
    			div10 = element("div");
    			input = element("input");
    			t10 = space();
    			hr = element("hr");
    			t11 = space();
    			main = element("main");
    			div13 = element("div");
    			div12 = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "STT";
    			t13 = space();
    			th1 = element("th");
    			th1.textContent = "Mã hồ sơ";
    			t15 = space();
    			th2 = element("th");
    			th2.textContent = "Số hồ sơ";
    			t17 = space();
    			th3 = element("th");
    			th3.textContent = "Khách hàng";
    			t19 = space();
    			th4 = element("th");
    			th4.textContent = "Địa chỉ";
    			t21 = space();
    			th5 = element("th");
    			th5.textContent = "Liên hệ";
    			t23 = space();
    			th6 = element("th");
    			th6.textContent = "Ghi chú";
    			t25 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t26 = space();
    			footer = element("footer");
    			br = element("br");
    			t27 = space();
    			div17 = element("div");
    			div14 = element("div");
    			t28 = text("Tổng số hồ sơ: ");
    			t29 = text(t29_value);
    			t30 = space();
    			div15 = element("div");
    			t31 = text("$kho.hosocapnhat = ");
    			t32 = text(t32_value);
    			t33 = space();
    			div16 = element("div");
    			t34 = text("bạn đang xem hồ sơ thứ ");
    			t35 = text(curHoso);
    			t36 = text(" trong ");
    			t37 = text(t37_value);
    			t38 = text(" hồ sơ chọn lọc");
    			attr_dev(h3, "class", "svelte-10n6z3l");
    			add_location(h3, file$1, 207, 8, 4941);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$1, 206, 6, 4909);
    			attr_dev(select, "class", "custom-select");
    			attr_dev(select, "id", "selectnam");
    			if (ctx.namhoso === void 0) add_render_callback(() => ctx.select_change_handler.call(select));
    			add_location(select, file$1, 211, 10, 5082);
    			attr_dev(div1, "class", "input-group");
    			add_location(div1, file$1, 210, 8, 5045);
    			attr_dev(div2, "class", "col-auto");
    			add_location(div2, file$1, 209, 6, 5013);
    			attr_dev(i0, "class", "fa fa-sync-alt");
    			add_location(i0, file$1, 223, 10, 5495);
    			attr_dev(button0, "class", "btn btn-outline-primary btn-rounded");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$1, 219, 8, 5365);
    			attr_dev(div3, "class", "col-auto");
    			add_location(div3, file$1, 218, 6, 5333);
    			attr_dev(div4, "class", "row justify-content-center text-primary");
    			add_location(div4, file$1, 205, 4, 4848);
    			add_location(div5, file$1, 245, 4, 6115);
    			attr_dev(div6, "class", "col");
    			add_location(div6, file$1, 249, 10, 6241);
    			attr_dev(i1, "class", "fa fa-trash fa-lg");
    			add_location(i1, file$1, 262, 14, 6733);
    			attr_dev(button1, "class", "btn");
    			add_location(button1, file$1, 261, 12, 6667);
    			attr_dev(div7, "class", "col-auto");
    			add_location(div7, file$1, 260, 10, 6631);
    			attr_dev(div8, "class", "row");
    			add_location(div8, file$1, 248, 8, 6212);
    			attr_dev(div9, "class", "col border border-primary");
    			add_location(div9, file$1, 247, 6, 6163);
    			attr_dev(input, "class", "col");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Tìm ... (không phân biệt chữ hoa hay thường)");
    			add_location(input, file$1, 269, 8, 6895);
    			attr_dev(div10, "class", "col-3");
    			add_location(div10, file$1, 268, 6, 6866);
    			attr_dev(div11, "class", "row");
    			add_location(div11, file$1, 246, 4, 6138);
    			add_location(hr, file$1, 277, 4, 7116);
    			attr_dev(header, "class", "container-fluid");
    			add_location(header, file$1, 204, 2, 4810);
    			attr_dev(th0, "scope", "col");
    			add_location(th0, file$1, 285, 14, 7433);
    			attr_dev(th1, "scope", "col");
    			add_location(th1, file$1, 286, 14, 7473);
    			attr_dev(th2, "scope", "col");
    			add_location(th2, file$1, 287, 14, 7518);
    			attr_dev(th3, "scope", "col");
    			add_location(th3, file$1, 288, 14, 7563);
    			attr_dev(th4, "scope", "col");
    			add_location(th4, file$1, 289, 14, 7610);
    			attr_dev(th5, "scope", "col");
    			add_location(th5, file$1, 290, 14, 7654);
    			attr_dev(th6, "scope", "col");
    			add_location(th6, file$1, 291, 14, 7698);
    			add_location(tr, file$1, 284, 12, 7413);
    			set_style(thead, "width", ctx.$kho.tblWidth + "px");
    			attr_dev(thead, "class", "svelte-10n6z3l");
    			add_render_callback(() => ctx.thead_resize_handler.call(thead));
    			add_location(thead, file$1, 283, 10, 7329);
    			set_style(tbody, "max-height", ctx.caonoidung + "px");
    			attr_dev(tbody, "class", "svelte-10n6z3l");
    			add_location(tbody, file$1, 294, 10, 7777);
    			attr_dev(table, "class", "table table-hover");
    			add_location(table, file$1, 282, 8, 7284);
    			attr_dev(div12, "class", "table-responsive");
    			add_render_callback(() => ctx.div12_resize_handler.call(div12));
    			add_location(div12, file$1, 281, 6, 7216);
    			attr_dev(div13, "class", "container-fluid");
    			add_render_callback(() => ctx.div13_resize_handler.call(div13));
    			add_location(div13, file$1, 280, 4, 7151);
    			add_location(main, file$1, 279, 2, 7139);
    			add_location(br, file$1, 304, 4, 8012);
    			attr_dev(div14, "class", "col-auto");
    			add_location(div14, file$1, 306, 6, 8049);
    			attr_dev(div15, "class", "col");
    			add_location(div15, file$1, 307, 6, 8118);
    			attr_dev(div16, "class", "col-auto");
    			add_location(div16, file$1, 310, 6, 8220);
    			attr_dev(div17, "class", "row");
    			add_location(div17, file$1, 305, 4, 8024);
    			add_location(footer, file$1, 303, 2, 7998);
    			add_location(section, file$1, 203, 0, 4797);

    			dispose = [
    				listen_dev(select, "change", ctx.select_change_handler),
    				listen_dev(button0, "click", ctx.xemHoso, false, false, false),
    				listen_dev(button1, "click", ctx.click_handler, false, false, false),
    				listen_dev(input, "input", ctx.input_input_handler),
    				listen_dev(input, "keydown", ctx.addDsTim, false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			append_dev(header, div4);
    			append_dev(div4, div0);
    			append_dev(div0, h3);
    			append_dev(div4, t1);
    			append_dev(div4, div2);
    			append_dev(div2, div1);
    			append_dev(div1, select);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(select, null);
    			}

    			select_option(select, ctx.namhoso);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, button0);
    			append_dev(button0, i0);
    			append_dev(header, t3);
    			if (if_block) if_block.m(header, null);
    			append_dev(header, t4);
    			append_dev(header, div5);
    			append_dev(header, t6);
    			append_dev(header, div11);
    			append_dev(div11, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div6);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div6, null);
    			}

    			append_dev(div8, t7);
    			append_dev(div8, div7);
    			append_dev(div7, button1);
    			append_dev(button1, i1);
    			append_dev(button1, t8);
    			append_dev(div11, t9);
    			append_dev(div11, div10);
    			append_dev(div10, input);
    			set_input_value(input, ctx.stim);
    			append_dev(header, t10);
    			append_dev(header, hr);
    			append_dev(section, t11);
    			append_dev(section, main);
    			append_dev(main, div13);
    			append_dev(div13, div12);
    			append_dev(div12, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t13);
    			append_dev(tr, th1);
    			append_dev(tr, t15);
    			append_dev(tr, th2);
    			append_dev(tr, t17);
    			append_dev(tr, th3);
    			append_dev(tr, t19);
    			append_dev(tr, th4);
    			append_dev(tr, t21);
    			append_dev(tr, th5);
    			append_dev(tr, t23);
    			append_dev(tr, th6);
    			thead_resize_listener = add_resize_listener(thead, ctx.thead_resize_handler.bind(thead));
    			append_dev(table, t25);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			div12_resize_listener = add_resize_listener(div12, ctx.div12_resize_handler.bind(div12));
    			div13_resize_listener = add_resize_listener(div13, ctx.div13_resize_handler.bind(div13));
    			append_dev(section, t26);
    			append_dev(section, footer);
    			append_dev(footer, br);
    			append_dev(footer, t27);
    			append_dev(footer, div17);
    			append_dev(div17, div14);
    			append_dev(div14, t28);
    			append_dev(div14, t29);
    			append_dev(div17, t30);
    			append_dev(div17, div15);
    			append_dev(div15, t31);
    			append_dev(div15, t32);
    			append_dev(div17, t33);
    			append_dev(div17, div16);
    			append_dev(div16, t34);
    			append_dev(div16, t35);
    			append_dev(div16, t36);
    			append_dev(div16, t37);
    			append_dev(div16, t38);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (changed.dsnam) {
    				each_value_2 = ctx.dsnam;
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(changed, child_ctx);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (changed.namhoso) {
    				select_option(select, ctx.namhoso);
    			}

    			if (ctx.$kho.showProgress) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(header, t4);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (changed.curdstim || changed.xoaDstim || changed.dstim) {
    				each_value_1 = ctx.dstim;
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(changed, child_ctx);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div6, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (changed.stim) {
    				set_input_value(input, ctx.stim);
    			}

    			if (!current || changed.$kho) {
    				set_style(thead, "width", ctx.$kho.tblWidth + "px");
    			}

    			if (changed.dsLoc) {
    				each_value = ctx.dsLoc;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || changed.caonoidung) {
    				set_style(tbody, "max-height", ctx.caonoidung + "px");
    			}

    			if ((!current || changed.$kho) && t29_value !== (t29_value = ctx.$kho.dskh.length + "")) set_data_dev(t29, t29_value);
    			if ((!current || changed.$kho) && t32_value !== (t32_value = JSON.stringify(ctx.$kho.hosocapnhat) + "")) set_data_dev(t32, t32_value);
    			if ((!current || changed.dsLoc) && t37_value !== (t37_value = ctx.dsLoc.length + "")) set_data_dev(t37, t37_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks_2, detaching);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks_1, detaching);
    			thead_resize_listener.cancel();
    			destroy_each(each_blocks, detaching);
    			div12_resize_listener.cancel();
    			div13_resize_listener.cancel();
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
    let curHoso = 0;

    function instance$1($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	let dsnam = [2020, 2019, 2018, 2017, 2016];
    	let namhoso = 2019;
    	set_store_value(kho, $kho.tblWidth = 20000, $kho);
    	set_store_value(kho, $kho.progress = 0, $kho);
    	set_store_value(kho, $kho.showProgress = true, $kho);
    	set_store_value(kho, $kho.dskh = [], $kho);

    	function xemHoso() {

    		axios({
    			method: "get",
    			url: "http://localhost:8888/api1108/hoso/",
    			responseType: "json",
    			responseEncoding: "utf8",
    			onDownloadProgress: progressEvent => {
    				let percentCompleted = parseInt(Math.round(progressEvent.loaded * 100 / progressEvent.total));
    				set_store_value(kho, $kho.progress = percentCompleted, $kho);
    				console.log("$kho.progress=" + $kho.progress);
    			}
    		}).then(response => {
    			let dulieu = response.data;
    			console.log("response.data=" + dulieu);

    			if (dulieu !== null || dulieu !== undefined || dulieu !== "") {
    				set_store_value(kho, $kho.dskh = dulieu.hoso, $kho);
    				console.log("$dulieu.hoso=" + dulieu.hoso);
    				console.log("$dulieu.info=" + dulieu.info);
    			}
    		});
    	}

    	let dskh = [
    		{
    			mahoso: "2019hs001",
    			khachhang: "Nguyen Van A",
    			sohoso: "GM01200/19",
    			diachi: "123 Tran Van Thoi, Q10",
    			maq: "01",
    			maqp: "0102",
    			mota: "",
    			ngaygan: "2019/10/20",
    			sodhn: "1232",
    			chisodhn: 0,
    			madma: "xxx",
    			malotrinh: "112",
    			trongai: "",
    			tainhap: "",
    			taithicong: "",
    			hoantien: "",
    			lienhe: "",
    			hieudhn: "kent"
    		},
    		{
    			mahoso: "2019hs002",
    			khachhang: "Pham Van Tuan",
    			diachi: "625 Tran Van Thoi, Q11",
    			maq: "01",
    			maqp: "0102",
    			mota: "",
    			ngaygan: "2019/10/20",
    			sodhn: "1232",
    			chisodhn: 0,
    			madma: "xxx",
    			malotrinh: "112",
    			trongai: "",
    			tainhap: "",
    			taithicong: "",
    			hoantien: "",
    			lienhe: "",
    			hieudhn: "kent",
    			sohoso: ""
    		},
    		{
    			mahoso: "2019hs003",
    			khachhang: "Tran Van Ty",
    			diachi: "1243 Tran Van Thoi, Q12",
    			maq: "01",
    			maqp: "0102",
    			mota: "",
    			ngaygan: "2019/10/20",
    			sodhn: "1232",
    			chisodhn: 0,
    			madma: "xxx",
    			malotrinh: "112",
    			trongai: "",
    			tainhap: "",
    			taithicong: "",
    			hoantien: "",
    			lienhe: "",
    			hieudhn: "kent",
    			sohoso: ""
    		},
    		{
    			mahoso: "2019hs004",
    			khachhang: "Nguyen Thi Nhanh",
    			diachi: "125 Tran Van Thoi, Q12",
    			maq: "01",
    			maqp: "0102",
    			mota: "",
    			ngaygan: "2019/10/20",
    			sodhn: "1232",
    			chisodhn: 0,
    			madma: "xxx",
    			malotrinh: "112",
    			trongai: "",
    			tainhap: "",
    			taithicong: "",
    			hoantien: "",
    			lienhe: "",
    			hieudhn: "kent",
    			sohoso: ""
    		}
    	];

    	set_store_value(kho, $kho.dskh = dskh, $kho);
    	let stim = "";
    	let dstim = [];
    	let curdstim = 0;

    	function addDsTim(event) {
    		if (event.key === "Enter" && stim.length > 0) {
    			$$invalidate("stim", stim = stim.trim());
    			let dai = dstim.length;
    			let data = [stim];

    			for (let i = 0; i < dai; i++) {
    				if (dstim[i] !== stim) {
    					data.push(dstim[i]);
    				}
    			}

    			$$invalidate("dstim", dstim = data);
    			$$invalidate("stim", stim = "");
    		}
    	}

    	function xoaDstim() {
    		let dai = dstim.length;
    		let data = [];

    		for (let i = 0; i < dai; i++) {
    			if (i !== curdstim) {
    				data.push(dstim[i]);
    			}
    		}

    		$$invalidate("dstim", dstim = data);
    	}

    	function locNhom(nhom) {
    		let l = nhom.length || 0;
    		let data = $kho.dskh;

    		if (l > 0) {
    			for (let i = 0; i < l; i++) {
    				let s = nhom[i];
    				data = filterListObj(data, s);
    			}
    		}

    		return data;
    	}

    	let rongbang = 2000;
    	let caobang = 500;
    	let caotieude = 16;

    	function select_change_handler() {
    		namhoso = select_value(this);
    		$$invalidate("namhoso", namhoso);
    		$$invalidate("dsnam", dsnam);
    	}

    	const mouseover_handler = ({ id }) => $$invalidate("curdstim", curdstim = id);
    	const click_handler = () => $$invalidate("dstim", dstim = []);

    	function input_input_handler() {
    		stim = this.value;
    		$$invalidate("stim", stim);
    	}

    	function thead_resize_handler() {
    		caotieude = this.clientHeight;
    		$$invalidate("caotieude", caotieude);
    	}

    	function div12_resize_handler() {
    		rongbang = this.clientWidth;
    		$$invalidate("rongbang", rongbang);
    	}

    	function div13_resize_handler() {
    		caobang = this.clientHeight;
    		$$invalidate("caobang", caobang);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("dsnam" in $$props) $$invalidate("dsnam", dsnam = $$props.dsnam);
    		if ("namhoso" in $$props) $$invalidate("namhoso", namhoso = $$props.namhoso);
    		if ("dskh" in $$props) dskh = $$props.dskh;
    		if ("stim" in $$props) $$invalidate("stim", stim = $$props.stim);
    		if ("dstim" in $$props) $$invalidate("dstim", dstim = $$props.dstim);
    		if ("curdstim" in $$props) $$invalidate("curdstim", curdstim = $$props.curdstim);
    		if ("curHoso" in $$props) $$invalidate("curHoso", curHoso = $$props.curHoso);
    		if ("rongbang" in $$props) $$invalidate("rongbang", rongbang = $$props.rongbang);
    		if ("caobang" in $$props) $$invalidate("caobang", caobang = $$props.caobang);
    		if ("caotieude" in $$props) $$invalidate("caotieude", caotieude = $$props.caotieude);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("tincapnhat" in $$props) tincapnhat = $$props.tincapnhat;
    		if ("dsLocNhom" in $$props) $$invalidate("dsLocNhom", dsLocNhom = $$props.dsLocNhom);
    		if ("dsLoc" in $$props) $$invalidate("dsLoc", dsLoc = $$props.dsLoc);
    		if ("caonoidung" in $$props) $$invalidate("caonoidung", caonoidung = $$props.caonoidung);
    	};

    	let tincapnhat;
    	let dsLocNhom;
    	let dsLoc;
    	let caonoidung;

    	$$self.$$.update = (changed = { rongbang: 1, $kho: 1, dstim: 1, dsLocNhom: 1, stim: 1, caobang: 1, caotieude: 1 }) => {
    		if (changed.rongbang) {
    			 set_store_value(kho, $kho.tblWidth = rongbang - 10, $kho);
    		}

    		if (changed.$kho) {
    			 tincapnhat = JSON.stringify($kho.tinserver);
    		}

    		if (changed.dstim) {
    			 $$invalidate("dsLocNhom", dsLocNhom = locNhom(dstim));
    		}

    		if (changed.dsLocNhom || changed.stim) {
    			 $$invalidate("dsLoc", dsLoc = filterListObj(dsLocNhom, stim));
    		}

    		if (changed.caobang || changed.caotieude) {
    			 $$invalidate("caonoidung", caonoidung = caobang - caotieude);
    		}
    	};

    	return {
    		dsnam,
    		namhoso,
    		xemHoso,
    		stim,
    		dstim,
    		curdstim,
    		addDsTim,
    		xoaDstim,
    		rongbang,
    		caobang,
    		caotieude,
    		$kho,
    		dsLoc,
    		caonoidung,
    		select_change_handler,
    		mouseover_handler,
    		click_handler,
    		input_input_handler,
    		thead_resize_handler,
    		div12_resize_handler,
    		div13_resize_handler
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const app = new App({
      target: document.getElementById('app')
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
