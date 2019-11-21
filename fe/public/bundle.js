
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
        object.setAttribute('aria-hidden', 'true');
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

    function filterListObj(listobj, stim) {
      let s = stim.toLowerCase() || '';
      let data = listobj.filter(v => JSON.stringify(v).toLowerCase().indexOf(s) > -1);
      return JSON.parse(JSON.stringify(data));
    }

    /* src\Timhoso.svelte generated by Svelte v3.15.0 */
    const file = "src\\Timhoso.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.id = i;
    	return child_ctx;
    }

    // (52:10) {#each dstim as item, id}
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
    			add_location(button, file, 52, 12, 1268);

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
    			if (changed.dstim && t0_value !== (t0_value = ctx.item + "")) set_data_dev(t0, t0_value);
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
    		source: "(52:10) {#each dstim as item, id}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
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
    	let each_value = ctx.dstim;
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
    			t1 = text("\r\n            Xóa hết");
    			t2 = space();
    			div4 = element("div");
    			input = element("input");
    			attr_dev(div0, "class", "col");
    			add_location(div0, file, 50, 8, 1200);
    			attr_dev(i, "class", "fa fa-trash fa-lg");
    			add_location(i, file, 63, 12, 1639);
    			attr_dev(button, "class", "btn");
    			add_location(button, file, 62, 10, 1575);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file, 61, 8, 1541);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file, 49, 6, 1173);
    			attr_dev(div3, "class", "col border border-primary");
    			add_location(div3, file, 48, 4, 1126);
    			attr_dev(input, "class", "col");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Tìm ... (không phân biệt chữ hoa hay thường)");
    			add_location(input, file, 70, 6, 1787);
    			attr_dev(div4, "class", "col-3");
    			add_location(div4, file, 69, 4, 1760);
    			attr_dev(div5, "class", "row");
    			add_location(div5, file, 47, 2, 1103);
    			attr_dev(div6, "class", "container-fluid");
    			add_location(div6, file, 46, 0, 1070);

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
    			if (changed.curdstim || changed.xoaDstim || changed.dstim) {
    				each_value = ctx.dstim;
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
    	set_store_value(kho, $kho.dsloc = [], $kho);
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

    	const mouseover_handler = ({ id }) => $$invalidate("curdstim", curdstim = id);
    	const click_handler = () => $$invalidate("dstim", dstim = []);

    	function input_input_handler() {
    		stim = this.value;
    		$$invalidate("stim", stim);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("stim" in $$props) $$invalidate("stim", stim = $$props.stim);
    		if ("dstim" in $$props) $$invalidate("dstim", dstim = $$props.dstim);
    		if ("curdstim" in $$props) $$invalidate("curdstim", curdstim = $$props.curdstim);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("dsLocNhom" in $$props) $$invalidate("dsLocNhom", dsLocNhom = $$props.dsLocNhom);
    	};

    	let dsLocNhom;

    	$$self.$$.update = (changed = { dstim: 1, dsLocNhom: 1, stim: 1 }) => {
    		if (changed.dstim) {
    			 $$invalidate("dsLocNhom", dsLocNhom = locNhom(dstim));
    		}

    		if (changed.dsLocNhom || changed.stim) {
    			 set_store_value(kho, $kho.dsloc = filterListObj(dsLocNhom, stim), $kho);
    		}
    	};

    	return {
    		stim,
    		dstim,
    		curdstim,
    		addDsTim,
    		xoaDstim,
    		mouseover_handler,
    		click_handler,
    		input_input_handler
    	};
    }

    class Timhoso extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timhoso",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src\Hoso.svelte generated by Svelte v3.15.0 */
    const file$1 = "src\\Hoso.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.hs = list[i];
    	child_ctx.each_value = list;
    	child_ctx.stt = i;
    	return child_ctx;
    }

    // (133:16) {:else}
    function create_else_block(ctx) {
    	let th;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.stt + 1 + "";
    	let t1;
    	let t2;
    	let td0;
    	let t3_value = ctx.hs.mahoso + "";
    	let t3;
    	let t4;
    	let td1;
    	let t5_value = ctx.hs.sohoso + "";
    	let t5;
    	let t6;
    	let td2;
    	let t7_value = ctx.hs.khachhang + "";
    	let t7;
    	let t8;
    	let td3;
    	let t9_value = ctx.hs.diachi + "";
    	let t9;
    	let t10;
    	let td4;
    	let t11_value = ctx.hs.lienhe + "";
    	let t11;
    	let t12;
    	let td5;
    	let t13_value = ctx.hs.mota + "";
    	let t13;
    	let t14;
    	let td6;
    	let t15_value = ctx.hs.trongai + "";
    	let t15;
    	let t16;
    	let td7;
    	let t17_value = ctx.hs.tainhap + "";
    	let t17;
    	let t18;
    	let td8;
    	let t19_value = ctx.hs.taithicong + "";
    	let t19;
    	let t20;
    	let td9;
    	let t21_value = ctx.hs.hoantien + "";
    	let t21;
    	let dispose;

    	function click_handler_1(...args) {
    		return ctx.click_handler_1(ctx, ...args);
    	}

    	const block = {
    		c: function create() {
    			th = element("th");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			td0 = element("td");
    			t3 = text(t3_value);
    			t4 = space();
    			td1 = element("td");
    			t5 = text(t5_value);
    			t6 = space();
    			td2 = element("td");
    			t7 = text(t7_value);
    			t8 = space();
    			td3 = element("td");
    			t9 = text(t9_value);
    			t10 = space();
    			td4 = element("td");
    			t11 = text(t11_value);
    			t12 = space();
    			td5 = element("td");
    			t13 = text(t13_value);
    			t14 = space();
    			td6 = element("td");
    			t15 = text(t15_value);
    			t16 = space();
    			td7 = element("td");
    			t17 = text(t17_value);
    			t18 = space();
    			td8 = element("td");
    			t19 = text(t19_value);
    			t20 = space();
    			td9 = element("td");
    			t21 = text(t21_value);
    			attr_dev(i, "class", "fa fa-edit");
    			add_location(i, file$1, 141, 22, 4010);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$1, 134, 20, 3737);
    			attr_dev(th, "scope", "row");
    			add_location(th, file$1, 133, 18, 3699);
    			add_location(td0, file$1, 145, 18, 4143);
    			add_location(td1, file$1, 146, 18, 4183);
    			add_location(td2, file$1, 147, 18, 4223);
    			add_location(td3, file$1, 148, 18, 4266);
    			add_location(td4, file$1, 149, 18, 4306);
    			add_location(td5, file$1, 150, 18, 4346);
    			add_location(td6, file$1, 151, 18, 4384);
    			add_location(td7, file$1, 152, 18, 4425);
    			add_location(td8, file$1, 153, 18, 4466);
    			add_location(td9, file$1, 154, 18, 4510);
    			dispose = listen_dev(button, "click", click_handler_1, false, false, false);
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
    			insert_dev(target, t14, anchor);
    			insert_dev(target, td6, anchor);
    			append_dev(td6, t15);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, td7, anchor);
    			append_dev(td7, t17);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, td8, anchor);
    			append_dev(td8, t19);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, td9, anchor);
    			append_dev(td9, t21);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.$kho && t3_value !== (t3_value = ctx.hs.mahoso + "")) set_data_dev(t3, t3_value);
    			if (changed.$kho && t5_value !== (t5_value = ctx.hs.sohoso + "")) set_data_dev(t5, t5_value);
    			if (changed.$kho && t7_value !== (t7_value = ctx.hs.khachhang + "")) set_data_dev(t7, t7_value);
    			if (changed.$kho && t9_value !== (t9_value = ctx.hs.diachi + "")) set_data_dev(t9, t9_value);
    			if (changed.$kho && t11_value !== (t11_value = ctx.hs.lienhe + "")) set_data_dev(t11, t11_value);
    			if (changed.$kho && t13_value !== (t13_value = ctx.hs.mota + "")) set_data_dev(t13, t13_value);
    			if (changed.$kho && t15_value !== (t15_value = ctx.hs.trongai + "")) set_data_dev(t15, t15_value);
    			if (changed.$kho && t17_value !== (t17_value = ctx.hs.tainhap + "")) set_data_dev(t17, t17_value);
    			if (changed.$kho && t19_value !== (t19_value = ctx.hs.taithicong + "")) set_data_dev(t19, t19_value);
    			if (changed.$kho && t21_value !== (t21_value = ctx.hs.hoantien + "")) set_data_dev(t21, t21_value);
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
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(td6);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(td7);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(td8);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(td9);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(133:16) {:else}",
    		ctx
    	});

    	return block;
    }

    // (91:16) {#if isEdit && cur_id === stt && edit_id === stt}
    function create_if_block(ctx) {
    	let th;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.stt + 1 + "";
    	let t1;
    	let t2;
    	let td0;
    	let t3_value = ctx.hs.mahoso + "";
    	let t3;
    	let t4;
    	let td1;
    	let input0;
    	let t5;
    	let td2;
    	let input1;
    	let t6;
    	let td3;
    	let input2;
    	let t7;
    	let td4;
    	let input3;
    	let t8;
    	let td5;
    	let input4;
    	let t9;
    	let td6;
    	let input5;
    	let t10;
    	let td7;
    	let input6;
    	let t11;
    	let td8;
    	let input7;
    	let t12;
    	let td9;
    	let input8;
    	let dispose;

    	function input0_input_handler() {
    		ctx.input0_input_handler.call(input0, ctx);
    	}

    	function input1_input_handler() {
    		ctx.input1_input_handler.call(input1, ctx);
    	}

    	function input2_input_handler() {
    		ctx.input2_input_handler.call(input2, ctx);
    	}

    	function input3_input_handler() {
    		ctx.input3_input_handler.call(input3, ctx);
    	}

    	function input4_input_handler() {
    		ctx.input4_input_handler.call(input4, ctx);
    	}

    	function input5_input_handler() {
    		ctx.input5_input_handler.call(input5, ctx);
    	}

    	function input6_input_handler() {
    		ctx.input6_input_handler.call(input6, ctx);
    	}

    	function input7_input_handler() {
    		ctx.input7_input_handler.call(input7, ctx);
    	}

    	function input8_input_handler() {
    		ctx.input8_input_handler.call(input8, ctx);
    	}

    	const block = {
    		c: function create() {
    			th = element("th");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			td0 = element("td");
    			t3 = text(t3_value);
    			t4 = space();
    			td1 = element("td");
    			input0 = element("input");
    			t5 = space();
    			td2 = element("td");
    			input1 = element("input");
    			t6 = space();
    			td3 = element("td");
    			input2 = element("input");
    			t7 = space();
    			td4 = element("td");
    			input3 = element("input");
    			t8 = space();
    			td5 = element("td");
    			input4 = element("input");
    			t9 = space();
    			td6 = element("td");
    			input5 = element("input");
    			t10 = space();
    			td7 = element("td");
    			input6 = element("input");
    			t11 = space();
    			td8 = element("td");
    			input7 = element("input");
    			t12 = space();
    			td9 = element("td");
    			input8 = element("input");
    			attr_dev(i, "class", "fa fa-save");
    			add_location(i, file$1, 100, 22, 2565);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$1, 92, 20, 2256);
    			attr_dev(th, "scope", "row");
    			add_location(th, file$1, 91, 18, 2218);
    			add_location(td0, file$1, 104, 18, 2698);
    			add_location(input0, file$1, 106, 20, 2764);
    			add_location(td1, file$1, 105, 18, 2738);
    			add_location(input1, file$1, 109, 20, 2867);
    			add_location(td2, file$1, 108, 18, 2841);
    			add_location(input2, file$1, 112, 20, 2973);
    			add_location(td3, file$1, 111, 18, 2947);
    			add_location(input3, file$1, 115, 20, 3076);
    			add_location(td4, file$1, 114, 18, 3050);
    			add_location(input4, file$1, 118, 20, 3179);
    			add_location(td5, file$1, 117, 18, 3153);
    			add_location(input5, file$1, 121, 20, 3280);
    			add_location(td6, file$1, 120, 18, 3254);
    			add_location(input6, file$1, 124, 20, 3384);
    			add_location(td7, file$1, 123, 18, 3358);
    			add_location(input7, file$1, 127, 20, 3488);
    			add_location(td8, file$1, 126, 18, 3462);
    			add_location(input8, file$1, 130, 20, 3595);
    			add_location(td9, file$1, 129, 18, 3569);

    			dispose = [
    				listen_dev(button, "click", ctx.click_handler, false, false, false),
    				listen_dev(input0, "input", input0_input_handler),
    				listen_dev(input1, "input", input1_input_handler),
    				listen_dev(input2, "input", input2_input_handler),
    				listen_dev(input3, "input", input3_input_handler),
    				listen_dev(input4, "input", input4_input_handler),
    				listen_dev(input5, "input", input5_input_handler),
    				listen_dev(input6, "input", input6_input_handler),
    				listen_dev(input7, "input", input7_input_handler),
    				listen_dev(input8, "input", input8_input_handler)
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
    			insert_dev(target, t4, anchor);
    			insert_dev(target, td1, anchor);
    			append_dev(td1, input0);
    			set_input_value(input0, ctx.hs.sohoso);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, td2, anchor);
    			append_dev(td2, input1);
    			set_input_value(input1, ctx.hs.khachhang);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, td3, anchor);
    			append_dev(td3, input2);
    			set_input_value(input2, ctx.hs.diachi);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, td4, anchor);
    			append_dev(td4, input3);
    			set_input_value(input3, ctx.hs.lienhe);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, td5, anchor);
    			append_dev(td5, input4);
    			set_input_value(input4, ctx.hs.mota);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, td6, anchor);
    			append_dev(td6, input5);
    			set_input_value(input5, ctx.hs.trongai);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, td7, anchor);
    			append_dev(td7, input6);
    			set_input_value(input6, ctx.hs.tainhap);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, td8, anchor);
    			append_dev(td8, input7);
    			set_input_value(input7, ctx.hs.taithicong);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, td9, anchor);
    			append_dev(td9, input8);
    			set_input_value(input8, ctx.hs.hoantien);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.$kho && t3_value !== (t3_value = ctx.hs.mahoso + "")) set_data_dev(t3, t3_value);

    			if (changed.$kho && input0.value !== ctx.hs.sohoso) {
    				set_input_value(input0, ctx.hs.sohoso);
    			}

    			if (changed.$kho && input1.value !== ctx.hs.khachhang) {
    				set_input_value(input1, ctx.hs.khachhang);
    			}

    			if (changed.$kho && input2.value !== ctx.hs.diachi) {
    				set_input_value(input2, ctx.hs.diachi);
    			}

    			if (changed.$kho && input3.value !== ctx.hs.lienhe) {
    				set_input_value(input3, ctx.hs.lienhe);
    			}

    			if (changed.$kho && input4.value !== ctx.hs.mota) {
    				set_input_value(input4, ctx.hs.mota);
    			}

    			if (changed.$kho && input5.value !== ctx.hs.trongai) {
    				set_input_value(input5, ctx.hs.trongai);
    			}

    			if (changed.$kho && input6.value !== ctx.hs.tainhap) {
    				set_input_value(input6, ctx.hs.tainhap);
    			}

    			if (changed.$kho && input7.value !== ctx.hs.taithicong) {
    				set_input_value(input7, ctx.hs.taithicong);
    			}

    			if (changed.$kho && input8.value !== ctx.hs.hoantien) {
    				set_input_value(input8, ctx.hs.hoantien);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(td0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(td1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(td2);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(td3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(td4);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(td5);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(td6);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(td7);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(td8);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(td9);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(91:16) {#if isEdit && cur_id === stt && edit_id === stt}",
    		ctx
    	});

    	return block;
    }

    // (89:12) {#each $kho.dsloc as hs, stt}
    function create_each_block$1(ctx) {
    	let tr;
    	let t;
    	let dispose;

    	function select_block_type(changed, ctx) {
    		if (ctx.isEdit && ctx.cur_id === ctx.stt && ctx.edit_id === ctx.stt) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(null, ctx);
    	let if_block = current_block_type(ctx);

    	function mouseover_handler(...args) {
    		return ctx.mouseover_handler(ctx, ...args);
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			if_block.c();
    			t = space();
    			add_location(tr, file$1, 89, 14, 2091);
    			dispose = listen_dev(tr, "mouseover", mouseover_handler, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			if_block.m(tr, null);
    			append_dev(tr, t);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;

    			if (current_block_type === (current_block_type = select_block_type(changed, ctx)) && if_block) {
    				if_block.p(changed, ctx);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(tr, t);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if_block.d();
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(89:12) {#each $kho.dsloc as hs, stt}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let session;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let t2;
    	let t3;
    	let div4;
    	let div3;
    	let div2;
    	let table;
    	let thead;
    	let tr;
    	let th0;
    	let t5;
    	let th1;
    	let t7;
    	let th2;
    	let t9;
    	let th3;
    	let t11;
    	let th4;
    	let t13;
    	let th5;
    	let t15;
    	let th6;
    	let t17;
    	let th7;
    	let t19;
    	let th8;
    	let t21;
    	let th9;
    	let t23;
    	let th10;
    	let t25;
    	let tbody;
    	let current;
    	const timhoso = new Timhoso({ $$inline: true });
    	let each_value = ctx.$kho.dsloc;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			session = element("session");
    			div0 = element("div");
    			create_component(timhoso.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			t1 = text("curid =");
    			t2 = text(ctx.cur_id);
    			t3 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "STT";
    			t5 = space();
    			th1 = element("th");
    			th1.textContent = "Mã hồ sơ";
    			t7 = space();
    			th2 = element("th");
    			th2.textContent = "Số hồ sơ";
    			t9 = space();
    			th3 = element("th");
    			th3.textContent = "Khách hàng";
    			t11 = space();
    			th4 = element("th");
    			th4.textContent = "Địa chỉ";
    			t13 = space();
    			th5 = element("th");
    			th5.textContent = "Liên hệ";
    			t15 = space();
    			th6 = element("th");
    			th6.textContent = "Mô tả";
    			t17 = space();
    			th7 = element("th");
    			th7.textContent = "Trở ngại";
    			t19 = space();
    			th8 = element("th");
    			th8.textContent = "Tái nhập";
    			t21 = space();
    			th9 = element("th");
    			th9.textContent = "Tái thi công";
    			t23 = space();
    			th10 = element("th");
    			th10.textContent = "Hoàn tiền";
    			t25 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "container-fluid");
    			add_location(div0, file$1, 64, 2, 1222);
    			add_location(div1, file$1, 67, 2, 1282);
    			attr_dev(th0, "scope", "col");
    			add_location(th0, file$1, 74, 14, 1498);
    			attr_dev(th1, "scope", "col");
    			add_location(th1, file$1, 75, 14, 1538);
    			attr_dev(th2, "scope", "col");
    			add_location(th2, file$1, 76, 14, 1583);
    			attr_dev(th3, "scope", "col");
    			add_location(th3, file$1, 77, 14, 1628);
    			attr_dev(th4, "scope", "col");
    			add_location(th4, file$1, 78, 14, 1675);
    			attr_dev(th5, "scope", "col");
    			add_location(th5, file$1, 79, 14, 1719);
    			attr_dev(th6, "scope", "col");
    			add_location(th6, file$1, 80, 14, 1763);
    			attr_dev(th7, "scope", "col");
    			add_location(th7, file$1, 81, 14, 1805);
    			attr_dev(th8, "scope", "col");
    			add_location(th8, file$1, 82, 14, 1850);
    			attr_dev(th9, "scope", "col");
    			add_location(th9, file$1, 83, 14, 1895);
    			attr_dev(th10, "scope", "col");
    			add_location(th10, file$1, 84, 14, 1944);
    			add_location(tr, file$1, 73, 12, 1478);
    			attr_dev(thead, "class", "svelte-uxc2h8");
    			add_location(thead, file$1, 72, 10, 1457);
    			add_location(tbody, file$1, 87, 10, 2025);
    			attr_dev(table, "class", "table table-hover");
    			add_location(table, file$1, 71, 8, 1412);
    			attr_dev(div2, "class", "table-responsive");
    			add_location(div2, file$1, 70, 6, 1372);
    			attr_dev(div3, "class", "box svelte-uxc2h8");
    			add_location(div3, file$1, 69, 4, 1347);
    			attr_dev(div4, "class", "container-fluid");
    			add_location(div4, file$1, 68, 2, 1312);
    			attr_dev(session, "class", "svelte-uxc2h8");
    			add_location(session, file$1, 63, 0, 1209);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, session, anchor);
    			append_dev(session, div0);
    			mount_component(timhoso, div0, null);
    			append_dev(session, t0);
    			append_dev(session, div1);
    			append_dev(div1, t1);
    			append_dev(div1, t2);
    			append_dev(session, t3);
    			append_dev(session, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t5);
    			append_dev(tr, th1);
    			append_dev(tr, t7);
    			append_dev(tr, th2);
    			append_dev(tr, t9);
    			append_dev(tr, th3);
    			append_dev(tr, t11);
    			append_dev(tr, th4);
    			append_dev(tr, t13);
    			append_dev(tr, th5);
    			append_dev(tr, t15);
    			append_dev(tr, th6);
    			append_dev(tr, t17);
    			append_dev(tr, th7);
    			append_dev(tr, t19);
    			append_dev(tr, th8);
    			append_dev(tr, t21);
    			append_dev(tr, th9);
    			append_dev(tr, t23);
    			append_dev(tr, th10);
    			append_dev(table, t25);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (!current || changed.cur_id) set_data_dev(t2, ctx.cur_id);

    			if (changed.cur_id || changed.isEdit || changed.edit_id || changed.$kho || changed.suaHoso) {
    				each_value = ctx.$kho.dsloc;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
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
    			if (detaching) detach_dev(session);
    			destroy_component(timhoso);
    			destroy_each(each_blocks, detaching);
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

    let curmahoso = "";

    function suaHoso() {
    	let h = {};
    	h.mahoso = mahoso;
    	h.sohoso = sohoso;
    	h.khachhang = khachhang;
    	h.diachi = diachi;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	let isEdit = false;
    	let cur_id = 0;
    	let edit_id = -1;
    	let hososua = [];

    	let hosomoi = {
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
    	};

    	let rongbang;
    	let caobang;
    	let caotieude;

    	const click_handler = () => {
    		$$invalidate("isEdit", isEdit = false);
    		$$invalidate("edit_id", edit_id = -1);
    		suaHoso();
    	};

    	function input0_input_handler({ hs }) {
    		hs.sohoso = this.value;
    	}

    	function input1_input_handler({ hs }) {
    		hs.khachhang = this.value;
    	}

    	function input2_input_handler({ hs }) {
    		hs.diachi = this.value;
    	}

    	function input3_input_handler({ hs }) {
    		hs.lienhe = this.value;
    	}

    	function input4_input_handler({ hs }) {
    		hs.mota = this.value;
    	}

    	function input5_input_handler({ hs }) {
    		hs.trongai = this.value;
    	}

    	function input6_input_handler({ hs }) {
    		hs.tainhap = this.value;
    	}

    	function input7_input_handler({ hs }) {
    		hs.taithicong = this.value;
    	}

    	function input8_input_handler({ hs }) {
    		hs.hoantien = this.value;
    	}

    	const click_handler_1 = ({ stt }) => {
    		$$invalidate("isEdit", isEdit = true);
    		$$invalidate("edit_id", edit_id = stt);
    	};

    	const mouseover_handler = ({ stt }) => $$invalidate("cur_id", cur_id = stt);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("isEdit" in $$props) $$invalidate("isEdit", isEdit = $$props.isEdit);
    		if ("cur_id" in $$props) $$invalidate("cur_id", cur_id = $$props.cur_id);
    		if ("edit_id" in $$props) $$invalidate("edit_id", edit_id = $$props.edit_id);
    		if ("curmahoso" in $$props) curmahoso = $$props.curmahoso;
    		if ("hososua" in $$props) hososua = $$props.hososua;
    		if ("hosomoi" in $$props) hosomoi = $$props.hosomoi;
    		if ("rongbang" in $$props) $$invalidate("rongbang", rongbang = $$props.rongbang);
    		if ("caobang" in $$props) $$invalidate("caobang", caobang = $$props.caobang);
    		if ("caotieude" in $$props) $$invalidate("caotieude", caotieude = $$props.caotieude);
    		if ("caonoidung" in $$props) caonoidung = $$props.caonoidung;
    		if ("scrollWidth" in $$props) scrollWidth = $$props.scrollWidth;
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    	};

    	let caonoidung;
    	let scrollWidth;

    	$$self.$$.update = (changed = { caobang: 1, caotieude: 1, rongbang: 1 }) => {
    		if (changed.caobang || changed.caotieude) {
    			 caonoidung = caobang - caotieude;
    		}

    		if (changed.rongbang) {
    			 scrollWidth = rongbang - 10;
    		}
    	};

    	return {
    		isEdit,
    		cur_id,
    		edit_id,
    		$kho,
    		click_handler,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		input6_input_handler,
    		input7_input_handler,
    		input8_input_handler,
    		click_handler_1,
    		mouseover_handler
    	};
    }

    class Hoso extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hoso",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\HosoMoi.svelte generated by Svelte v3.15.0 */
    const file$2 = "src\\HosoMoi.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.hs = list[i];
    	child_ctx.stt = i;
    	return child_ctx;
    }

    // (150:12) {:else}
    function create_else_block$1(ctx) {
    	let span0;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.stt + 1 + "";
    	let t1;
    	let t2;
    	let span1;
    	let t3_value = ctx.hs.mahoso + "";
    	let t3;
    	let t4;
    	let span2;
    	let t5_value = ctx.hs.madot + "";
    	let t5;
    	let t6;
    	let span3;
    	let t7_value = ctx.hs.sohoso + "";
    	let t7;
    	let t8;
    	let span4;
    	let t9_value = ctx.hs.khachhang + "";
    	let t9;
    	let t10;
    	let span5;
    	let t11_value = ctx.hs.diachi + "";
    	let t11;
    	let t12;
    	let span6;
    	let t13_value = ctx.hs.lienhe + "";
    	let t13;
    	let t14;
    	let span7;
    	let t15_value = ctx.hs.mota + "";
    	let t15;
    	let t16;
    	let span8;
    	let t17_value = ctx.hs.trongai + "";
    	let t17;
    	let t18;
    	let span9;
    	let t19_value = ctx.hs.tainhap + "";
    	let t19;
    	let t20;
    	let span10;
    	let t21_value = ctx.hs.taithicong + "";
    	let t21;
    	let t22;
    	let span11;
    	let t23_value = ctx.hs.hoantien + "";
    	let t23;
    	let dispose;

    	function click_handler(...args) {
    		return ctx.click_handler(ctx, ...args);
    	}

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			span2 = element("span");
    			t5 = text(t5_value);
    			t6 = space();
    			span3 = element("span");
    			t7 = text(t7_value);
    			t8 = space();
    			span4 = element("span");
    			t9 = text(t9_value);
    			t10 = space();
    			span5 = element("span");
    			t11 = text(t11_value);
    			t12 = space();
    			span6 = element("span");
    			t13 = text(t13_value);
    			t14 = space();
    			span7 = element("span");
    			t15 = text(t15_value);
    			t16 = space();
    			span8 = element("span");
    			t17 = text(t17_value);
    			t18 = space();
    			span9 = element("span");
    			t19 = text(t19_value);
    			t20 = space();
    			span10 = element("span");
    			t21 = text(t21_value);
    			t22 = space();
    			span11 = element("span");
    			t23 = text(t23_value);
    			attr_dev(i, "class", "fa fa-edit");
    			add_location(i, file$2, 159, 18, 4485);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 151, 16, 4175);
    			attr_dev(span0, "class", "svelte-ubihcs");
    			add_location(span0, file$2, 150, 14, 4151);
    			attr_dev(span1, "class", "svelte-ubihcs");
    			add_location(span1, file$2, 163, 14, 4604);
    			attr_dev(span2, "class", "svelte-ubihcs");
    			add_location(span2, file$2, 164, 14, 4644);
    			attr_dev(span3, "class", "svelte-ubihcs");
    			add_location(span3, file$2, 165, 14, 4683);
    			attr_dev(span4, "class", "svelte-ubihcs");
    			add_location(span4, file$2, 166, 14, 4723);
    			attr_dev(span5, "class", "svelte-ubihcs");
    			add_location(span5, file$2, 167, 14, 4766);
    			attr_dev(span6, "class", "svelte-ubihcs");
    			add_location(span6, file$2, 168, 14, 4806);
    			attr_dev(span7, "class", "svelte-ubihcs");
    			add_location(span7, file$2, 169, 14, 4846);
    			attr_dev(span8, "class", "svelte-ubihcs");
    			add_location(span8, file$2, 170, 14, 4884);
    			attr_dev(span9, "class", "svelte-ubihcs");
    			add_location(span9, file$2, 171, 14, 4925);
    			attr_dev(span10, "class", "svelte-ubihcs");
    			add_location(span10, file$2, 172, 14, 4966);
    			attr_dev(span11, "class", "svelte-ubihcs");
    			add_location(span11, file$2, 173, 14, 5010);
    			dispose = listen_dev(button, "click", click_handler, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, button);
    			append_dev(button, i);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, span2, anchor);
    			append_dev(span2, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, span3, anchor);
    			append_dev(span3, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, span4, anchor);
    			append_dev(span4, t9);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, span5, anchor);
    			append_dev(span5, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, span6, anchor);
    			append_dev(span6, t13);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, span7, anchor);
    			append_dev(span7, t15);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, span8, anchor);
    			append_dev(span8, t17);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, span9, anchor);
    			append_dev(span9, t19);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, span10, anchor);
    			append_dev(span10, t21);
    			insert_dev(target, t22, anchor);
    			insert_dev(target, span11, anchor);
    			append_dev(span11, t23);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.$kho && t3_value !== (t3_value = ctx.hs.mahoso + "")) set_data_dev(t3, t3_value);
    			if (changed.$kho && t5_value !== (t5_value = ctx.hs.madot + "")) set_data_dev(t5, t5_value);
    			if (changed.$kho && t7_value !== (t7_value = ctx.hs.sohoso + "")) set_data_dev(t7, t7_value);
    			if (changed.$kho && t9_value !== (t9_value = ctx.hs.khachhang + "")) set_data_dev(t9, t9_value);
    			if (changed.$kho && t11_value !== (t11_value = ctx.hs.diachi + "")) set_data_dev(t11, t11_value);
    			if (changed.$kho && t13_value !== (t13_value = ctx.hs.lienhe + "")) set_data_dev(t13, t13_value);
    			if (changed.$kho && t15_value !== (t15_value = ctx.hs.mota + "")) set_data_dev(t15, t15_value);
    			if (changed.$kho && t17_value !== (t17_value = ctx.hs.trongai + "")) set_data_dev(t17, t17_value);
    			if (changed.$kho && t19_value !== (t19_value = ctx.hs.tainhap + "")) set_data_dev(t19, t19_value);
    			if (changed.$kho && t21_value !== (t21_value = ctx.hs.taithicong + "")) set_data_dev(t21, t21_value);
    			if (changed.$kho && t23_value !== (t23_value = ctx.hs.hoantien + "")) set_data_dev(t23, t23_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(span1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(span2);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(span3);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(span4);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(span5);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(span6);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(span7);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(span8);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(span9);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(span10);
    			if (detaching) detach_dev(t22);
    			if (detaching) detach_dev(span11);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(150:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (129:12) {#if editGroup && rowCur === stt && rowEdit === stt}
    function create_if_block$1(ctx) {
    	let span0;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.stt + 1 + "";
    	let t1;
    	let t2;
    	let span1;
    	let t3_value = ctx.$kho.hososua.mahoso + "";
    	let t3;
    	let t4;
    	let span2;
    	let t5_value = ctx.$kho.hososua.madot + "";
    	let t5;
    	let t6;
    	let span3;
    	let t7_value = ctx.$kho.hososua.sohoso + "";
    	let t7;
    	let t8;
    	let span4;
    	let t9_value = ctx.$kho.hososua.khachhang + "";
    	let t9;
    	let t10;
    	let span5;
    	let t11_value = ctx.$kho.hososua.diachi + "";
    	let t11;
    	let t12;
    	let span6;
    	let t13_value = ctx.$kho.hososua.lienhe + "";
    	let t13;
    	let t14;
    	let span7;
    	let t15_value = ctx.$kho.hososua.mota + "";
    	let t15;
    	let t16;
    	let span8;
    	let t17_value = ctx.$kho.hososua.trongai + "";
    	let t17;
    	let t18;
    	let span9;
    	let t19_value = ctx.$kho.hososua.tainhap + "";
    	let t19;
    	let t20;
    	let span10;
    	let t21_value = ctx.$kho.hososua.taithicong + "";
    	let t21;
    	let t22;
    	let span11;
    	let t23_value = ctx.$kho.hososua.hoantien + "";
    	let t23;
    	let dispose;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			span2 = element("span");
    			t5 = text(t5_value);
    			t6 = space();
    			span3 = element("span");
    			t7 = text(t7_value);
    			t8 = space();
    			span4 = element("span");
    			t9 = text(t9_value);
    			t10 = space();
    			span5 = element("span");
    			t11 = text(t11_value);
    			t12 = space();
    			span6 = element("span");
    			t13 = text(t13_value);
    			t14 = space();
    			span7 = element("span");
    			t15 = text(t15_value);
    			t16 = space();
    			span8 = element("span");
    			t17 = text(t17_value);
    			t18 = space();
    			span9 = element("span");
    			t19 = text(t19_value);
    			t20 = space();
    			span10 = element("span");
    			t21 = text(t21_value);
    			t22 = space();
    			span11 = element("span");
    			t23 = text(t23_value);
    			attr_dev(i, "class", "fa fa-save");
    			add_location(i, file$2, 134, 18, 3453);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 130, 16, 3301);
    			attr_dev(span0, "class", "svelte-ubihcs");
    			add_location(span0, file$2, 129, 14, 3277);
    			attr_dev(span1, "class", "svelte-ubihcs");
    			add_location(span1, file$2, 138, 14, 3572);
    			attr_dev(span2, "class", "svelte-ubihcs");
    			add_location(span2, file$2, 139, 14, 3622);
    			attr_dev(span3, "class", "svelte-ubihcs");
    			add_location(span3, file$2, 140, 14, 3671);
    			attr_dev(span4, "class", "svelte-ubihcs");
    			add_location(span4, file$2, 141, 14, 3721);
    			attr_dev(span5, "class", "svelte-ubihcs");
    			add_location(span5, file$2, 142, 14, 3774);
    			attr_dev(span6, "class", "svelte-ubihcs");
    			add_location(span6, file$2, 143, 14, 3824);
    			attr_dev(span7, "class", "svelte-ubihcs");
    			add_location(span7, file$2, 144, 14, 3874);
    			attr_dev(span8, "class", "svelte-ubihcs");
    			add_location(span8, file$2, 145, 14, 3922);
    			attr_dev(span9, "class", "svelte-ubihcs");
    			add_location(span9, file$2, 146, 14, 3973);
    			attr_dev(span10, "class", "svelte-ubihcs");
    			add_location(span10, file$2, 147, 14, 4024);
    			attr_dev(span11, "class", "svelte-ubihcs");
    			add_location(span11, file$2, 148, 14, 4078);
    			dispose = listen_dev(button, "click", ctx.btnSave, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, button);
    			append_dev(button, i);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, span2, anchor);
    			append_dev(span2, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, span3, anchor);
    			append_dev(span3, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, span4, anchor);
    			append_dev(span4, t9);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, span5, anchor);
    			append_dev(span5, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, span6, anchor);
    			append_dev(span6, t13);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, span7, anchor);
    			append_dev(span7, t15);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, span8, anchor);
    			append_dev(span8, t17);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, span9, anchor);
    			append_dev(span9, t19);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, span10, anchor);
    			append_dev(span10, t21);
    			insert_dev(target, t22, anchor);
    			insert_dev(target, span11, anchor);
    			append_dev(span11, t23);
    		},
    		p: function update(changed, ctx) {
    			if (changed.$kho && t3_value !== (t3_value = ctx.$kho.hososua.mahoso + "")) set_data_dev(t3, t3_value);
    			if (changed.$kho && t5_value !== (t5_value = ctx.$kho.hososua.madot + "")) set_data_dev(t5, t5_value);
    			if (changed.$kho && t7_value !== (t7_value = ctx.$kho.hososua.sohoso + "")) set_data_dev(t7, t7_value);
    			if (changed.$kho && t9_value !== (t9_value = ctx.$kho.hososua.khachhang + "")) set_data_dev(t9, t9_value);
    			if (changed.$kho && t11_value !== (t11_value = ctx.$kho.hososua.diachi + "")) set_data_dev(t11, t11_value);
    			if (changed.$kho && t13_value !== (t13_value = ctx.$kho.hososua.lienhe + "")) set_data_dev(t13, t13_value);
    			if (changed.$kho && t15_value !== (t15_value = ctx.$kho.hososua.mota + "")) set_data_dev(t15, t15_value);
    			if (changed.$kho && t17_value !== (t17_value = ctx.$kho.hososua.trongai + "")) set_data_dev(t17, t17_value);
    			if (changed.$kho && t19_value !== (t19_value = ctx.$kho.hososua.tainhap + "")) set_data_dev(t19, t19_value);
    			if (changed.$kho && t21_value !== (t21_value = ctx.$kho.hososua.taithicong + "")) set_data_dev(t21, t21_value);
    			if (changed.$kho && t23_value !== (t23_value = ctx.$kho.hososua.hoantien + "")) set_data_dev(t23, t23_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(span1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(span2);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(span3);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(span4);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(span5);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(span6);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(span7);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(span8);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(span9);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(span10);
    			if (detaching) detach_dev(t22);
    			if (detaching) detach_dev(span11);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(129:12) {#if editGroup && rowCur === stt && rowEdit === stt}",
    		ctx
    	});

    	return block;
    }

    // (127:8) {#each $kho.dsloc as hs, stt}
    function create_each_block$2(ctx) {
    	let div;
    	let t;
    	let dispose;

    	function select_block_type(changed, ctx) {
    		if (ctx.editGroup && ctx.rowCur === ctx.stt && ctx.rowEdit === ctx.stt) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(null, ctx);
    	let if_block = current_block_type(ctx);

    	function mouseover_handler(...args) {
    		return ctx.mouseover_handler(ctx, ...args);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			t = space();
    			attr_dev(div, "class", "rec noidung svelte-ubihcs");
    			add_location(div, file$2, 127, 10, 3134);
    			dispose = listen_dev(div, "mouseover", mouseover_handler, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    			append_dev(div, t);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;

    			if (current_block_type === (current_block_type = select_block_type(changed, ctx)) && if_block) {
    				if_block.p(changed, ctx);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, t);
    				}
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
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(127:8) {#each $kho.dsloc as hs, stt}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let session;
    	let div0;
    	let div0_resize_listener;
    	let t0;
    	let div4;
    	let div3;
    	let div1;
    	let span0;
    	let t2;
    	let span1;
    	let t4;
    	let span2;
    	let t6;
    	let span3;
    	let t8;
    	let span4;
    	let t10;
    	let span5;
    	let t12;
    	let span6;
    	let t14;
    	let span7;
    	let t16;
    	let span8;
    	let t18;
    	let span9;
    	let t20;
    	let span10;
    	let t22;
    	let span11;
    	let t24;
    	let div2;
    	let div3_resize_listener;
    	let current;
    	let dispose;
    	add_render_callback(ctx.onwindowscroll);
    	const timhoso = new Timhoso({ $$inline: true });
    	let each_value = ctx.$kho.dsloc;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			session = element("session");
    			div0 = element("div");
    			create_component(timhoso.$$.fragment);
    			t0 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "STT";
    			t2 = space();
    			span1 = element("span");
    			span1.textContent = "Mã hồ sơ";
    			t4 = space();
    			span2 = element("span");
    			span2.textContent = "Đợt";
    			t6 = space();
    			span3 = element("span");
    			span3.textContent = "Số hồ sơ";
    			t8 = space();
    			span4 = element("span");
    			span4.textContent = "Khách hàng";
    			t10 = space();
    			span5 = element("span");
    			span5.textContent = "Địa chỉ";
    			t12 = space();
    			span6 = element("span");
    			span6.textContent = "Liên hệ";
    			t14 = space();
    			span7 = element("span");
    			span7.textContent = "Ghi chú";
    			t16 = space();
    			span8 = element("span");
    			span8.textContent = "Trở ngại";
    			t18 = space();
    			span9 = element("span");
    			span9.textContent = "Tái nhập";
    			t20 = space();
    			span10 = element("span");
    			span10.textContent = "Tái thi công";
    			t22 = space();
    			span11 = element("span");
    			span11.textContent = "Hoàn tiền";
    			t24 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "container-fluid");
    			add_render_callback(() => ctx.div0_elementresize_handler.call(div0));
    			add_location(div0, file$2, 103, 2, 2389);
    			attr_dev(span0, "class", "svelte-ubihcs");
    			add_location(span0, file$2, 110, 8, 2611);
    			attr_dev(span1, "class", "svelte-ubihcs");
    			add_location(span1, file$2, 111, 8, 2637);
    			attr_dev(span2, "class", "svelte-ubihcs");
    			add_location(span2, file$2, 112, 8, 2668);
    			attr_dev(span3, "class", "svelte-ubihcs");
    			add_location(span3, file$2, 113, 8, 2694);
    			attr_dev(span4, "class", "svelte-ubihcs");
    			add_location(span4, file$2, 114, 8, 2725);
    			attr_dev(span5, "class", "svelte-ubihcs");
    			add_location(span5, file$2, 115, 8, 2758);
    			attr_dev(span6, "class", "svelte-ubihcs");
    			add_location(span6, file$2, 116, 8, 2788);
    			attr_dev(span7, "class", "svelte-ubihcs");
    			add_location(span7, file$2, 117, 8, 2818);
    			attr_dev(span8, "class", "svelte-ubihcs");
    			add_location(span8, file$2, 118, 8, 2848);
    			attr_dev(span9, "class", "svelte-ubihcs");
    			add_location(span9, file$2, 119, 8, 2879);
    			attr_dev(span10, "class", "svelte-ubihcs");
    			add_location(span10, file$2, 120, 8, 2910);
    			attr_dev(span11, "class", "svelte-ubihcs");
    			add_location(span11, file$2, 121, 8, 2945);
    			attr_dev(div1, "id", "tieude");
    			attr_dev(div1, "class", "rec svelte-ubihcs");
    			add_location(div1, file$2, 109, 6, 2572);
    			attr_dev(div2, "id", "grid-table");
    			set_style(div2, "width", ctx.$kho.tblW - 10 + "px");
    			set_style(div2, "height", ctx.$kho.tblH + "px");
    			attr_dev(div2, "class", "svelte-ubihcs");
    			add_location(div2, file$2, 123, 6, 2989);
    			attr_dev(div3, "class", "container-fluid");
    			add_render_callback(() => ctx.div3_elementresize_handler.call(div3));
    			add_location(div3, file$2, 108, 4, 2506);
    			attr_dev(div4, "class", "bangdulieu svelte-ubihcs");
    			add_location(div4, file$2, 107, 2, 2476);
    			attr_dev(session, "class", "svelte-ubihcs");
    			add_location(session, file$2, 102, 0, 2376);

    			dispose = listen_dev(window, "scroll", () => {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    				ctx.onwindowscroll();
    			});
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, session, anchor);
    			append_dev(session, div0);
    			mount_component(timhoso, div0, null);
    			div0_resize_listener = add_resize_listener(div0, ctx.div0_elementresize_handler.bind(div0));
    			append_dev(session, t0);
    			append_dev(session, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, span0);
    			append_dev(div1, t2);
    			append_dev(div1, span1);
    			append_dev(div1, t4);
    			append_dev(div1, span2);
    			append_dev(div1, t6);
    			append_dev(div1, span3);
    			append_dev(div1, t8);
    			append_dev(div1, span4);
    			append_dev(div1, t10);
    			append_dev(div1, span5);
    			append_dev(div1, t12);
    			append_dev(div1, span6);
    			append_dev(div1, t14);
    			append_dev(div1, span7);
    			append_dev(div1, t16);
    			append_dev(div1, span8);
    			append_dev(div1, t18);
    			append_dev(div1, span9);
    			append_dev(div1, t20);
    			append_dev(div1, span10);
    			append_dev(div1, t22);
    			append_dev(div1, span11);
    			append_dev(div3, t24);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			div3_resize_listener = add_resize_listener(div3, ctx.div3_elementresize_handler.bind(div3));
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (changed.cuontrai && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(ctx.cuontrai, window.pageYOffset);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (changed.rowCur || changed.editGroup || changed.rowEdit || changed.$kho || changed.btnSave || changed.hosocu || changed.JSON) {
    				each_value = ctx.$kho.dsloc;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div2, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || changed.$kho) {
    				set_style(div2, "width", ctx.$kho.tblW - 10 + "px");
    			}

    			if (!current || changed.$kho) {
    				set_style(div2, "height", ctx.$kho.tblH + "px");
    			}
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
    			if (detaching) detach_dev(session);
    			destroy_component(timhoso);
    			div0_resize_listener.cancel();
    			destroy_each(each_blocks, detaching);
    			div3_resize_listener.cancel();
    			dispose();
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

    function instance$2($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	set_store_value(kho, $kho.hososua = {}, $kho);
    	set_store_value(kho, $kho.tblH = 200, $kho);
    	set_store_value(kho, $kho.cuontrai = 0, $kho);
    	let editGroup = false;
    	let rowCur = 0;
    	let rowEdit = -1;
    	let hosocu = {};

    	function btnSave() {
    		$$invalidate("editGroup", editGroup = false);
    		$$invalidate("rowEdit", rowEdit = -1);
    		let tam = {};

    		for (let k in $kho.hososua) {
    			if ($kho.hososua[k].length > 0 && $kho.hososua[k] !== hosocu[k]) {
    				tam[k] = typeof $kho.hososua[k] === "string"
    				? $kho.hososua[k].trim()
    				: $kho.hososua[k];
    			}
    		}

    		if (tam.length > 0) {
    			set_store_value(kho, $kho.hososua = JSON.parse(JSON.stringify(tam)), $kho);
    			let dai = $kho.dskh.length;

    			for (let i = 0; i < dai; i++) {
    				let a = $kho.dskh[i];

    				if (a.mahoso === hosocu.mahoso) {
    					for (let k in $kho.hososua) {
    						if (a.hasOwnProperty(k)) {
    							a[k] = $kho.hososua[k];
    						}
    					}
    				}
    			}

    			let tincangui = $kho.hososua;
    			postServer(tincangui);
    		}

    		set_store_value(kho, $kho.hososua = {}, $kho);
    	}

    	let timH;
    	let timL;
    	let cuontrai;

    	function onwindowscroll() {
    		$$invalidate("cuontrai", cuontrai = window.pageXOffset);
    	}

    	function div0_elementresize_handler() {
    		timH = this.clientHeight;
    		$$invalidate("timH", timH);
    	}

    	const click_handler = ({ stt, hs }) => {
    		$$invalidate("editGroup", editGroup = true);
    		$$invalidate("rowEdit", rowEdit = stt);
    		$$invalidate("hosocu", hosocu = JSON.parse(JSON.stringify(hs)));
    	};

    	const mouseover_handler = ({ stt }) => $$invalidate("rowCur", rowCur = stt);

    	function div3_elementresize_handler() {
    		$kho.tblW = this.clientWidth;
    		kho.set($kho);
    	}

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("editGroup" in $$props) $$invalidate("editGroup", editGroup = $$props.editGroup);
    		if ("rowCur" in $$props) $$invalidate("rowCur", rowCur = $$props.rowCur);
    		if ("rowEdit" in $$props) $$invalidate("rowEdit", rowEdit = $$props.rowEdit);
    		if ("hosocu" in $$props) $$invalidate("hosocu", hosocu = $$props.hosocu);
    		if ("timH" in $$props) $$invalidate("timH", timH = $$props.timH);
    		if ("timL" in $$props) timL = $$props.timL;
    		if ("cuontrai" in $$props) $$invalidate("cuontrai", cuontrai = $$props.cuontrai);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    	};

    	$$self.$$.update = (changed = { cuontrai: 1 }) => {
    		if (changed.cuontrai) {
    			 set_store_value(kho, $kho.cuontrai = cuontrai, $kho);
    		}
    	};

    	return {
    		editGroup,
    		rowCur,
    		rowEdit,
    		hosocu,
    		btnSave,
    		timH,
    		cuontrai,
    		$kho,
    		onwindowscroll,
    		div0_elementresize_handler,
    		click_handler,
    		mouseover_handler,
    		div3_elementresize_handler
    	};
    }

    class HosoMoi extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HosoMoi",
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
        hieudhn:'kent'
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

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.namlamviec = list[i];
    	return child_ctx;
    }

    // (65:12) {#each dsnam as namlamviec}
    function create_each_block$3(ctx) {
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
    			add_location(option, file$3, 65, 14, 1892);
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
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(65:12) {#each dsnam as namlamviec}",
    		ctx
    	});

    	return block;
    }

    // (80:4) {#if $kho.showProgress}
    function create_if_block$2(ctx) {
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
    			add_location(div0, file$3, 83, 12, 2384);
    			attr_dev(div1, "class", "progress");
    			add_location(div1, file$3, 82, 10, 2348);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$3, 81, 8, 2319);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file$3, 80, 6, 2292);
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
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(80:4) {#if $kho.showProgress}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
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
    	let t5;
    	let t6_value = ctx.$kho.cuontrai + "";
    	let t6;
    	let t7;
    	let main;
    	let div6;
    	let t8;
    	let footer;
    	let div10;
    	let div9;
    	let div7;
    	let t10;
    	let div8;
    	let button1;
    	let i1;
    	let current;
    	let dispose;
    	let each_value = ctx.dsnam;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	let if_block = ctx.$kho.showProgress && create_if_block$2(ctx);
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
    			div4 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN NĂM ";
    			t1 = space();
    			div2 = element("div");
    			div1 = element("div");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			div3 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			div5 = element("div");
    			t5 = text("cuon trai = ");
    			t6 = text(t6_value);
    			t7 = space();
    			main = element("main");
    			div6 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t8 = space();
    			footer = element("footer");
    			div10 = element("div");
    			div9 = element("div");
    			div7 = element("div");
    			div7.textContent = "Tổng số hồ sơ:";
    			t10 = space();
    			div8 = element("div");
    			button1 = element("button");
    			i1 = element("i");
    			add_location(h3, file$3, 59, 8, 1628);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$3, 58, 6, 1596);
    			attr_dev(select, "class", "custom-select");
    			attr_dev(select, "id", "selectnam");
    			if (ctx.namhoso === void 0) add_render_callback(() => ctx.select_change_handler.call(select));
    			add_location(select, file$3, 63, 10, 1769);
    			attr_dev(div1, "class", "input-group");
    			add_location(div1, file$3, 62, 8, 1732);
    			attr_dev(div2, "class", "col-auto");
    			add_location(div2, file$3, 61, 6, 1700);
    			attr_dev(i0, "class", "fa fa-sync-alt");
    			add_location(i0, file$3, 75, 10, 2182);
    			attr_dev(button0, "class", "btn btn-outline-primary btn-rounded");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$3, 71, 8, 2052);
    			attr_dev(div3, "class", "col-auto");
    			add_location(div3, file$3, 70, 6, 2020);
    			attr_dev(div4, "class", "row justify-content-center text-primary");
    			add_location(div4, file$3, 57, 4, 1535);
    			add_location(div5, file$3, 97, 4, 2802);
    			attr_dev(header, "class", "container-fluid");
    			add_location(header, file$3, 56, 2, 1497);
    			attr_dev(div6, "class", "container-fluid");
    			add_location(div6, file$3, 100, 4, 2869);
    			attr_dev(main, "class", "svelte-1jhup2v");
    			add_location(main, file$3, 99, 2, 2857);
    			attr_dev(div7, "class", "col-auto");
    			add_location(div7, file$3, 107, 8, 3064);
    			attr_dev(i1, "class", "fa fa-plus");
    			add_location(i1, file$3, 116, 12, 3358);
    			attr_dev(button1, "class", "btn btn-outline-secondary");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$3, 109, 10, 3150);
    			attr_dev(div8, "class", "col-auto");
    			add_location(div8, file$3, 108, 8, 3116);
    			attr_dev(div9, "class", "row justify-content-between");
    			add_location(div9, file$3, 106, 6, 3013);
    			attr_dev(div10, "class", "container");
    			add_location(div10, file$3, 105, 4, 2982);
    			add_location(footer, file$3, 104, 2, 2968);
    			attr_dev(section, "class", "svelte-1jhup2v");
    			add_location(section, file$3, 55, 0, 1484);

    			dispose = [
    				listen_dev(select, "change", ctx.select_change_handler),
    				listen_dev(button0, "click", ctx.xemHoso, false, false, false),
    				listen_dev(button1, "click", ctx.click_handler, false, false, false)
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

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
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
    			append_dev(div5, t5);
    			append_dev(div5, t6);
    			append_dev(section, t7);
    			append_dev(section, main);
    			append_dev(main, div6);

    			if (switch_instance) {
    				mount_component(switch_instance, div6, null);
    			}

    			append_dev(section, t8);
    			append_dev(section, footer);
    			append_dev(footer, div10);
    			append_dev(div10, div9);
    			append_dev(div9, div7);
    			append_dev(div9, t10);
    			append_dev(div9, div8);
    			append_dev(div8, button1);
    			append_dev(button1, i1);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (changed.dsnam) {
    				each_value = ctx.dsnam;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
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

    			if (ctx.$kho.showProgress) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(header, t4);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if ((!current || changed.$kho) && t6_value !== (t6_value = ctx.$kho.cuontrai + "")) set_data_dev(t6, t6_value);

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
    					mount_component(switch_instance, div6, null);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    			if (switch_instance) destroy_component(switch_instance);
    			run_all(dispose);
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
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	set_store_value(kho, $kho.namhoso = 2019, $kho);
    	set_store_value(kho, $kho.dskh = tamdskh, $kho);
    	set_store_value(kho, $kho.progress = 0, $kho);
    	set_store_value(kho, $kho.showProgress = true, $kho);
    	let curComp = Hoso;
    	let dsnam = [2020, 2019, 2018, 2017, 2016];
    	let namhoso = 2019;

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

    	function select_change_handler() {
    		namhoso = select_value(this);
    		$$invalidate("namhoso", namhoso);
    		$$invalidate("dsnam", dsnam);
    	}

    	const click_handler = () => {
    		$$invalidate("curComp", curComp = HosoMoi);
    		set_store_value(kho, $kho.dskh = [], $kho);
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("curComp" in $$props) $$invalidate("curComp", curComp = $$props.curComp);
    		if ("dsnam" in $$props) $$invalidate("dsnam", dsnam = $$props.dsnam);
    		if ("namhoso" in $$props) $$invalidate("namhoso", namhoso = $$props.namhoso);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    	};

    	return {
    		curComp,
    		dsnam,
    		namhoso,
    		xemHoso,
    		$kho,
    		select_change_handler,
    		click_handler
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
      target: document.getElementById('app')
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
