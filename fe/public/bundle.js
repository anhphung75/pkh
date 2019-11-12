
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
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
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

    /* src/Khach.svelte generated by Svelte v3.14.0 */

    const file = "src/Khach.svelte";

    function create_fragment(ctx) {
    	let li;
    	let span0;
    	let i0;
    	let t0;
    	let span1;
    	let t1;
    	let t2;
    	let span2;
    	let t3;
    	let t4;
    	let span3;
    	let t5;
    	let t6;
    	let span4;
    	let i1;
    	let dispose;

    	const block = {
    		c: function create() {
    			li = element("li");
    			span0 = element("span");
    			i0 = element("i");
    			t0 = space();
    			span1 = element("span");
    			t1 = text(ctx.mahoso);
    			t2 = space();
    			span2 = element("span");
    			t3 = text(ctx.khachhang);
    			t4 = space();
    			span3 = element("span");
    			t5 = text(ctx.diachi);
    			t6 = space();
    			span4 = element("span");
    			i1 = element("i");
    			attr_dev(i0, "class", "fa fa-lg");
    			add_location(i0, file, 29, 8, 469);
    			attr_dev(span0, "class", "hover-cursor svelte-z61uf");
    			add_location(span0, file, 28, 4, 433);
    			attr_dev(span1, "class", "mahoso svelte-z61uf");
    			add_location(span1, file, 31, 4, 510);
    			attr_dev(span2, "class", "khachhang svelte-z61uf");
    			add_location(span2, file, 32, 4, 551);
    			attr_dev(span3, "class", "diachi svelte-z61uf");
    			add_location(span3, file, 33, 4, 598);
    			attr_dev(i1, "class", "fa fa-trash-o fa-lg");
    			add_location(i1, file, 37, 8, 727);
    			attr_dev(span4, "class", "hover-cursor text-danger pull-right svelte-z61uf");
    			add_location(span4, file, 36, 4, 649);
    			attr_dev(li, "class", "hbox svelte-z61uf");
    			add_location(li, file, 27, 0, 411);
    			dispose = listen_dev(span4, "click", suaHoso, false, false, false);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, span0);
    			append_dev(span0, i0);
    			append_dev(li, t0);
    			append_dev(li, span1);
    			append_dev(span1, t1);
    			append_dev(li, t2);
    			append_dev(li, span2);
    			append_dev(span2, t3);
    			append_dev(li, t4);
    			append_dev(li, span3);
    			append_dev(span3, t5);
    			append_dev(li, t6);
    			append_dev(li, span4);
    			append_dev(span4, i1);
    		},
    		p: function update(changed, ctx) {
    			if (changed.mahoso) set_data_dev(t1, ctx.mahoso);
    			if (changed.khachhang) set_data_dev(t3, ctx.khachhang);
    			if (changed.diachi) set_data_dev(t5, ctx.diachi);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			dispose();
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

    function suaHoso() {
    	
    }

    function instance($$self, $$props, $$invalidate) {
    	let { mahoso } = $$props;
    	let { khachhang } = $$props;
    	let { diachi } = $$props;
    	
    	
    	const writable_props = ["mahoso", "khachhang", "diachi"];

    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith("$$")) console.warn(`<Khach> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ("mahoso" in $$props) $$invalidate("mahoso", mahoso = $$props.mahoso);
    		if ("khachhang" in $$props) $$invalidate("khachhang", khachhang = $$props.khachhang);
    		if ("diachi" in $$props) $$invalidate("diachi", diachi = $$props.diachi);
    	};

    	$$self.$capture_state = () => {
    		return { mahoso, khachhang, diachi };
    	};

    	$$self.$inject_state = $$props => {
    		if ("mahoso" in $$props) $$invalidate("mahoso", mahoso = $$props.mahoso);
    		if ("khachhang" in $$props) $$invalidate("khachhang", khachhang = $$props.khachhang);
    		if ("diachi" in $$props) $$invalidate("diachi", diachi = $$props.diachi);
    	};

    	return { mahoso, khachhang, diachi };
    }

    class Khach extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { mahoso: 0, khachhang: 0, diachi: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Khach",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || ({});

    		if (ctx.mahoso === undefined && !("mahoso" in props)) {
    			console.warn("<Khach> was created without expected prop 'mahoso'");
    		}

    		if (ctx.khachhang === undefined && !("khachhang" in props)) {
    			console.warn("<Khach> was created without expected prop 'khachhang'");
    		}

    		if (ctx.diachi === undefined && !("diachi" in props)) {
    			console.warn("<Khach> was created without expected prop 'diachi'");
    		}
    	}

    	get mahoso() {
    		throw new Error("<Khach>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mahoso(value) {
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
    }

    /* src/App.svelte generated by Svelte v3.14.0 */
    const file$1 = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.khach = list[i];
    	return child_ctx;
    }

    // (52:2) {#each $a2.dskh as khach}
    function create_each_block(ctx) {
    	let current;
    	const khach_spread_levels = [ctx.khach];
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
    			const khach_changes = changed.$a2
    			? get_spread_update(khach_spread_levels, [get_spread_object(ctx.khach)])
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
    		source: "(52:2) {#each $a2.dskh as khach}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let h1;
    	let t3;
    	let div2;
    	let div0;
    	let t5;
    	let div1;
    	let t7;
    	let ul;
    	let current;
    	let each_value = ctx.$a2.dskh;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = `Hello ${name}!`;
    			t3 = space();
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Nam";
    			t5 = space();
    			div1 = element("div");
    			div1.textContent = "Search";
    			t7 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h1, "class", "svelte-xbid1e");
    			add_location(h1, file$1, 44, 0, 785);
    			add_location(div0, file$1, 46, 2, 829);
    			add_location(div1, file$1, 47, 2, 846);
    			attr_dev(div2, "class", "hbox svelte-xbid1e");
    			add_location(div2, file$1, 45, 0, 808);
    			add_location(ul, file$1, 50, 0, 872);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t5);
    			append_dev(div2, div1);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (changed.$a2) {
    				each_value = ctx.$a2.dskh;
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
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
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
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(ul);
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

    function instance$1($$self, $$props, $$invalidate) {
    	let $a2;

    	let dskh = [
    		{
    			mahoso: "2019hs001",
    			khachhang: "Nguyen Van A",
    			diachi: "123 Tran Van Thoi, Q12"
    		},
    		{
    			mahoso: "2019hs002",
    			khachhang: "Nguyen Van A",
    			diachi: "123 Tran Van Thoi, Q12"
    		},
    		{
    			mahoso: "2019hs003",
    			khachhang: "Nguyen Van A",
    			diachi: "123 Tran Van Thoi, Q12"
    		},
    		{
    			mahoso: "2019hs004",
    			khachhang: "Nguyen Van A",
    			diachi: "123 Tran Van Thoi, Q12"
    		}
    	];

    	let a2 = writable({});
    	validate_store(a2, "a2");
    	component_subscribe($$self, a2, value => $$invalidate("$a2", $a2 = value));
    	set_store_value(a2, $a2.dskh = dskh, $a2);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("dskh" in $$props) dskh = $$props.dskh;
    		if ("a2" in $$props) $$invalidate("a2", a2 = $$props.a2);
    		if ("$a2" in $$props) a2.set($a2 = $$props.$a2);
    	};

    	return { a2, $a2 };
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
