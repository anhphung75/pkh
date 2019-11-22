
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

    let kho = writable({});

    /* src/Progress.svelte generated by Svelte v3.15.0 */
    const file = "src/Progress.svelte";

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
    			add_location(div0, file, 15, 8, 250);
    			attr_dev(div1, "class", "progress");
    			add_location(div1, file, 14, 6, 219);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file, 13, 4, 195);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file, 12, 2, 173);
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

    // import axios from 'axios';
    // web
    const API_URL = "http://localhost:8888/api1108/hoso/";

    function guiWeb(datajson) {
      let apiurl = API_URL;
      axios({
        method: "post",
        url: apiurl,
        // headers: { "X-Requested-With": "XMLHttpRequest" },
        data: datajson,
        xsrfCookieName: '_xsrf',
        onUploadProgress: progressEvent => {
          let percentCompleted = parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
          $kho.progress = percentCompleted;
          console.log("$kho.progress=" + $kho.progress);
        }
      }).then(response => {
        let dulieu = response.data;
        console.log("response.data=" + dulieu);
        //cap nhat hososua
      });
    }

    // socket
    const socket_url = "ws://localhost:8888/hoso/api1108";
    var ws = new WebSocket(socket_url);

    function filterListObj(listobj, stim) {
      let s = stim.toLowerCase() || '';
      let data = listobj.filter(v => JSON.stringify(v).toLowerCase().indexOf(s) > -1);
      return JSON.parse(JSON.stringify(data));
    }

    /* src/Timhoso.svelte generated by Svelte v3.15.0 */
    const file$1 = "src/Timhoso.svelte";

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
    			add_location(button, file$1, 69, 12, 1816);

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
    			t1 = text("\n            Xóa lọc");
    			t2 = space();
    			div4 = element("div");
    			input = element("input");
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$1, 67, 8, 1745);
    			attr_dev(i, "class", "fa fa-trash fa-lg");
    			add_location(i, file$1, 80, 12, 2181);
    			attr_dev(button, "class", "btn");
    			add_location(button, file$1, 79, 10, 2113);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$1, 78, 8, 2080);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$1, 66, 6, 1719);
    			attr_dev(div3, "class", "col border border-primary");
    			add_location(div3, file$1, 65, 4, 1673);
    			attr_dev(input, "class", "col");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Tìm ... (không phân biệt chữ hoa hay thường)");
    			add_location(input, file$1, 87, 6, 2322);
    			attr_dev(div4, "class", "col-3");
    			add_location(div4, file$1, 86, 4, 2296);
    			attr_dev(div5, "class", "row");
    			add_location(div5, file$1, 64, 2, 1651);
    			attr_dev(div6, "class", "container-fluid");
    			add_location(div6, file$1, 63, 0, 1619);

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
    		let data = $kho.dskh;

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

    /* src/Hoso.svelte generated by Svelte v3.15.0 */

    const { Object: Object_1 } = globals;
    const file$2 = "src/Hoso.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.hs = list[i];
    	child_ctx.stt = i;
    	return child_ctx;
    }

    // (95:14) {#if curbang === 0}
    function create_if_block_17(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;

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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 95, 16, 2198);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 96, 16, 2246);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 97, 16, 2292);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_17.name,
    		type: "if",
    		source: "(95:14) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (124:14) {:else}
    function create_else_block_3(ctx) {
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
    			div0.textContent = "Liên hệ4";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "Mô tả4";
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 124, 16, 3502);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 125, 16, 3550);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 126, 16, 3596);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 127, 16, 3644);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 128, 16, 3692);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 129, 16, 3744);
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
    		id: create_else_block_3.name,
    		type: "else",
    		source: "(124:14) {:else}",
    		ctx
    	});

    	return block;
    }

    // (117:38) 
    function create_if_block_16(ctx) {
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
    			div0.textContent = "Liên hệ3";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "Mô tả3";
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 117, 16, 3189);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 118, 16, 3237);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 119, 16, 3283);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 120, 16, 3331);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 121, 16, 3379);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 122, 16, 3431);
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
    		id: create_if_block_16.name,
    		type: "if",
    		source: "(117:38) ",
    		ctx
    	});

    	return block;
    }

    // (110:38) 
    function create_if_block_15(ctx) {
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
    			div0.textContent = "Liên hệ2";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "Mô tả2";
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 110, 16, 2859);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 111, 16, 2907);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 112, 16, 2953);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 113, 16, 3001);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 114, 16, 3049);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 115, 16, 3101);
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
    		id: create_if_block_15.name,
    		type: "if",
    		source: "(110:38) ",
    		ctx
    	});

    	return block;
    }

    // (103:38) 
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 103, 16, 2530);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 104, 16, 2578);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 105, 16, 2623);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 106, 16, 2671);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 107, 16, 2719);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 108, 16, 2771);
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
    		source: "(103:38) ",
    		ctx
    	});

    	return block;
    }

    // (101:14) {#if curbang === 0}
    function create_if_block_13(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Địa chỉ";
    			attr_dev(div, "class", "col");
    			add_location(div, file$2, 101, 16, 2444);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_13.name,
    		type: "if",
    		source: "(101:14) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (134:14) {#if stt >= hs_start && stt <= hs_stop}
    function create_if_block_1(ctx) {
    	let div;
    	let t;
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
    			attr_dev(div, "class", "row noidung svelte-nf9b5c");
    			add_location(div, file$2, 134, 16, 3926);
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
    		source: "(134:14) {#if stt >= hs_start && stt <= hs_stop}",
    		ctx
    	});

    	return block;
    }

    // (237:18) {:else}
    function create_else_block_1(ctx) {
    	let div0;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.stt + 1 + "";
    	let t1;
    	let t2;
    	let t3;
    	let div1;
    	let t4_value = ctx.hs.khachhang + "";
    	let t4;
    	let t5;
    	let if_block1_anchor;
    	let dispose;

    	function click_handler(...args) {
    		return ctx.click_handler(ctx, ...args);
    	}

    	let if_block0 = ctx.curbang === 0 && create_if_block_12(ctx);

    	function select_block_type_3(changed, ctx) {
    		if (ctx.curbang === 0) return create_if_block_8;
    		if (ctx.curbang === 1) return create_if_block_9;
    		if (ctx.curbang === 2) return create_if_block_10;
    		if (ctx.curbang === 3) return create_if_block_11;
    		return create_else_block_2;
    	}

    	let current_block_type = select_block_type_3(null, ctx);
    	let if_block1 = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block0) if_block0.c();
    			t3 = space();
    			div1 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(i, "class", "fa fa-edit");
    			add_location(i, file$2, 246, 24, 8762);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 238, 22, 8388);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$2, 237, 20, 8343);
    			attr_dev(div1, "class", "col-4");
    			add_location(div1, file$2, 255, 20, 9136);
    			dispose = listen_dev(button, "click", click_handler, false, false, false);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, button);
    			append_dev(button, i);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			insert_dev(target, t2, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t4);
    			insert_dev(target, t5, anchor);
    			if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;

    			if (ctx.curbang === 0) {
    				if (if_block0) {
    					if_block0.p(changed, ctx);
    				} else {
    					if_block0 = create_if_block_12(ctx);
    					if_block0.c();
    					if_block0.m(t3.parentNode, t3);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (changed.danhsach && t4_value !== (t4_value = ctx.hs.khachhang + "")) set_data_dev(t4, t4_value);

    			if (current_block_type === (current_block_type = select_block_type_3(changed, ctx)) && if_block1) {
    				if_block1.p(changed, ctx);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t5);
    			if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(237:18) {:else}",
    		ctx
    	});

    	return block;
    }

    // (136:18) {#if hs.isEdit}
    function create_if_block_2(ctx) {
    	let div0;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.stt + 1 + "";
    	let t1;
    	let t2;
    	let t3;
    	let div1;
    	let input;
    	let t4;
    	let if_block1_anchor;
    	let dispose;
    	let if_block0 = ctx.curbang === 0 && create_if_block_7(ctx);

    	function select_block_type_2(changed, ctx) {
    		if (ctx.curbang === 0) return create_if_block_3;
    		if (ctx.curbang === 1) return create_if_block_4;
    		if (ctx.curbang === 2) return create_if_block_5;
    		if (ctx.curbang === 3) return create_if_block_6;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type_2(null, ctx);
    	let if_block1 = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			button = element("button");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block0) if_block0.c();
    			t3 = space();
    			div1 = element("div");
    			input = element("input");
    			t4 = space();
    			if_block1.c();
    			if_block1_anchor = empty();
    			attr_dev(i, "class", "fa fa-save");
    			add_location(i, file$2, 141, 24, 4259);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 137, 22, 4087);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$2, 136, 20, 4042);
    			add_location(input, file$2, 153, 22, 4753);
    			attr_dev(div1, "class", "col-4");
    			add_location(div1, file$2, 152, 20, 4711);

    			dispose = [
    				listen_dev(button, "click", ctx.btnSave, false, false, false),
    				listen_dev(input, "input", ctx.input_input_handler_1)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, button);
    			append_dev(button, i);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			insert_dev(target, t2, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input);
    			set_input_value(input, ctx.hssua.khachhang);
    			insert_dev(target, t4, anchor);
    			if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    		},
    		p: function update(changed, ctx) {
    			if (ctx.curbang === 0) {
    				if (if_block0) {
    					if_block0.p(changed, ctx);
    				} else {
    					if_block0 = create_if_block_7(ctx);
    					if_block0.c();
    					if_block0.m(t3.parentNode, t3);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (changed.hssua && input.value !== ctx.hssua.khachhang) {
    				set_input_value(input, ctx.hssua.khachhang);
    			}

    			if (current_block_type === (current_block_type = select_block_type_2(changed, ctx)) && if_block1) {
    				if_block1.p(changed, ctx);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t4);
    			if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(136:18) {#if hs.isEdit}",
    		ctx
    	});

    	return block;
    }

    // (251:20) {#if curbang === 0}
    function create_if_block_12(ctx) {
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 251, 22, 8942);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 252, 22, 8999);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 253, 22, 9055);
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
    		},
    		p: function update(changed, ctx) {
    			if (changed.danhsach && t0_value !== (t0_value = ctx.hs.mahoso + "")) set_data_dev(t0, t0_value);
    			if (changed.danhsach && t2_value !== (t2_value = ctx.hs.madot + "")) set_data_dev(t2, t2_value);
    			if (changed.danhsach && t4_value !== (t4_value = ctx.hs.sohoso + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(251:20) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (280:20) {:else}
    function create_else_block_2(ctx) {
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 280, 22, 10502);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 281, 22, 10559);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 282, 22, 10614);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 283, 22, 10672);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 284, 22, 10730);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 285, 22, 10791);
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
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(280:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (273:44) 
    function create_if_block_11(ctx) {
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 273, 22, 10126);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 274, 22, 10183);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 275, 22, 10238);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 276, 22, 10296);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 277, 22, 10354);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 278, 22, 10415);
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
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(273:44) ",
    		ctx
    	});

    	return block;
    }

    // (266:44) 
    function create_if_block_10(ctx) {
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 266, 22, 9733);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 267, 22, 9790);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 268, 22, 9845);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 269, 22, 9903);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 270, 22, 9961);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 271, 22, 10022);
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
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(266:44) ",
    		ctx
    	});

    	return block;
    }

    // (259:44) 
    function create_if_block_9(ctx) {
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
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 259, 22, 9340);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 260, 22, 9397);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 261, 22, 9452);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 262, 22, 9510);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 263, 22, 9568);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 264, 22, 9629);
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
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(259:44) ",
    		ctx
    	});

    	return block;
    }

    // (257:20) {#if curbang === 0}
    function create_if_block_8(ctx) {
    	let div;
    	let t_value = ctx.hs.diachi + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "col");
    			add_location(div, file$2, 257, 22, 9238);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(changed, ctx) {
    			if (changed.danhsach && t_value !== (t_value = ctx.hs.diachi + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(257:20) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (146:20) {#if curbang === 0}
    function create_if_block_7(ctx) {
    	let div0;
    	let t0_value = ctx.hssua.mahoso + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = ctx.hssua.madot + "";
    	let t2;
    	let t3;
    	let div2;
    	let input;
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
    			input = element("input");
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 146, 22, 4439);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 147, 22, 4499);
    			add_location(input, file$2, 149, 24, 4600);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 148, 22, 4558);
    			dispose = listen_dev(input, "input", ctx.input_input_handler);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, input);
    			set_input_value(input, ctx.hssua.sohoso);
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && t0_value !== (t0_value = ctx.hssua.mahoso + "")) set_data_dev(t0, t0_value);
    			if (changed.hssua && t2_value !== (t2_value = ctx.hssua.madot + "")) set_data_dev(t2, t2_value);

    			if (changed.hssua && input.value !== ctx.hssua.sohoso) {
    				set_input_value(input, ctx.hssua.sohoso);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(146:20) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (217:20) {:else}
    function create_else_block(ctx) {
    	let div0;
    	let input0;
    	let t0;
    	let div1;
    	let input1;
    	let t1;
    	let div2;
    	let input2;
    	let t2;
    	let div3;
    	let input3;
    	let t3;
    	let div4;
    	let input4;
    	let t4;
    	let div5;
    	let input5;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t1 = space();
    			div2 = element("div");
    			input2 = element("input");
    			t2 = space();
    			div3 = element("div");
    			input3 = element("input");
    			t3 = space();
    			div4 = element("div");
    			input4 = element("input");
    			t4 = space();
    			div5 = element("div");
    			input5 = element("input");
    			add_location(input0, file$2, 218, 24, 7555);
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 217, 22, 7513);
    			add_location(input1, file$2, 221, 24, 7684);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 220, 22, 7642);
    			add_location(input2, file$2, 224, 24, 7811);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 223, 22, 7769);
    			add_location(input3, file$2, 227, 24, 7941);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 226, 22, 7899);
    			add_location(input4, file$2, 230, 24, 8071);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 229, 22, 8029);
    			add_location(input5, file$2, 233, 24, 8204);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 232, 22, 8162);

    			dispose = [
    				listen_dev(input0, "input", ctx.input0_input_handler_3),
    				listen_dev(input1, "input", ctx.input1_input_handler_3),
    				listen_dev(input2, "input", ctx.input2_input_handler_3),
    				listen_dev(input3, "input", ctx.input3_input_handler_3),
    				listen_dev(input4, "input", ctx.input4_input_handler_3),
    				listen_dev(input5, "input", ctx.input5_input_handler_3)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, ctx.hssua.lienhe);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, ctx.hssua.mota);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, input2);
    			set_input_value(input2, ctx.hssua.trongai);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, input3);
    			set_input_value(input3, ctx.hssua.tainhap);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, input4);
    			set_input_value(input4, ctx.hssua.taithicong);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, input5);
    			set_input_value(input5, ctx.hssua.hoantien);
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && input0.value !== ctx.hssua.lienhe) {
    				set_input_value(input0, ctx.hssua.lienhe);
    			}

    			if (changed.hssua && input1.value !== ctx.hssua.mota) {
    				set_input_value(input1, ctx.hssua.mota);
    			}

    			if (changed.hssua && input2.value !== ctx.hssua.trongai) {
    				set_input_value(input2, ctx.hssua.trongai);
    			}

    			if (changed.hssua && input3.value !== ctx.hssua.tainhap) {
    				set_input_value(input3, ctx.hssua.tainhap);
    			}

    			if (changed.hssua && input4.value !== ctx.hssua.taithicong) {
    				set_input_value(input4, ctx.hssua.taithicong);
    			}

    			if (changed.hssua && input5.value !== ctx.hssua.hoantien) {
    				set_input_value(input5, ctx.hssua.hoantien);
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
    		id: create_else_block.name,
    		type: "else",
    		source: "(217:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (198:44) 
    function create_if_block_6(ctx) {
    	let div0;
    	let input0;
    	let t0;
    	let div1;
    	let input1;
    	let t1;
    	let div2;
    	let input2;
    	let t2;
    	let div3;
    	let input3;
    	let t3;
    	let div4;
    	let input4;
    	let t4;
    	let div5;
    	let input5;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t1 = space();
    			div2 = element("div");
    			input2 = element("input");
    			t2 = space();
    			div3 = element("div");
    			input3 = element("input");
    			t3 = space();
    			div4 = element("div");
    			input4 = element("input");
    			t4 = space();
    			div5 = element("div");
    			input5 = element("input");
    			add_location(input0, file$2, 199, 24, 6747);
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 198, 22, 6705);
    			add_location(input1, file$2, 202, 24, 6876);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 201, 22, 6834);
    			add_location(input2, file$2, 205, 24, 7003);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 204, 22, 6961);
    			add_location(input3, file$2, 208, 24, 7133);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 207, 22, 7091);
    			add_location(input4, file$2, 211, 24, 7263);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 210, 22, 7221);
    			add_location(input5, file$2, 214, 24, 7396);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 213, 22, 7354);

    			dispose = [
    				listen_dev(input0, "input", ctx.input0_input_handler_2),
    				listen_dev(input1, "input", ctx.input1_input_handler_2),
    				listen_dev(input2, "input", ctx.input2_input_handler_2),
    				listen_dev(input3, "input", ctx.input3_input_handler_2),
    				listen_dev(input4, "input", ctx.input4_input_handler_2),
    				listen_dev(input5, "input", ctx.input5_input_handler_2)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, ctx.hssua.lienhe);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, ctx.hssua.mota);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, input2);
    			set_input_value(input2, ctx.hssua.trongai);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, input3);
    			set_input_value(input3, ctx.hssua.tainhap);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, input4);
    			set_input_value(input4, ctx.hssua.taithicong);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, input5);
    			set_input_value(input5, ctx.hssua.hoantien);
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && input0.value !== ctx.hssua.lienhe) {
    				set_input_value(input0, ctx.hssua.lienhe);
    			}

    			if (changed.hssua && input1.value !== ctx.hssua.mota) {
    				set_input_value(input1, ctx.hssua.mota);
    			}

    			if (changed.hssua && input2.value !== ctx.hssua.trongai) {
    				set_input_value(input2, ctx.hssua.trongai);
    			}

    			if (changed.hssua && input3.value !== ctx.hssua.tainhap) {
    				set_input_value(input3, ctx.hssua.tainhap);
    			}

    			if (changed.hssua && input4.value !== ctx.hssua.taithicong) {
    				set_input_value(input4, ctx.hssua.taithicong);
    			}

    			if (changed.hssua && input5.value !== ctx.hssua.hoantien) {
    				set_input_value(input5, ctx.hssua.hoantien);
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
    		source: "(198:44) ",
    		ctx
    	});

    	return block;
    }

    // (179:44) 
    function create_if_block_5(ctx) {
    	let div0;
    	let input0;
    	let t0;
    	let div1;
    	let input1;
    	let t1;
    	let div2;
    	let input2;
    	let t2;
    	let div3;
    	let input3;
    	let t3;
    	let div4;
    	let input4;
    	let t4;
    	let div5;
    	let input5;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t1 = space();
    			div2 = element("div");
    			input2 = element("input");
    			t2 = space();
    			div3 = element("div");
    			input3 = element("input");
    			t3 = space();
    			div4 = element("div");
    			input4 = element("input");
    			t4 = space();
    			div5 = element("div");
    			input5 = element("input");
    			add_location(input0, file$2, 180, 24, 5922);
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 179, 22, 5880);
    			add_location(input1, file$2, 183, 24, 6051);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 182, 22, 6009);
    			add_location(input2, file$2, 186, 24, 6178);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 185, 22, 6136);
    			add_location(input3, file$2, 189, 24, 6308);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 188, 22, 6266);
    			add_location(input4, file$2, 192, 24, 6438);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 191, 22, 6396);
    			add_location(input5, file$2, 195, 24, 6571);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 194, 22, 6529);

    			dispose = [
    				listen_dev(input0, "input", ctx.input0_input_handler_1),
    				listen_dev(input1, "input", ctx.input1_input_handler_1),
    				listen_dev(input2, "input", ctx.input2_input_handler_1),
    				listen_dev(input3, "input", ctx.input3_input_handler_1),
    				listen_dev(input4, "input", ctx.input4_input_handler_1),
    				listen_dev(input5, "input", ctx.input5_input_handler_1)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, ctx.hssua.lienhe);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, ctx.hssua.mota);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, input2);
    			set_input_value(input2, ctx.hssua.trongai);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, input3);
    			set_input_value(input3, ctx.hssua.tainhap);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, input4);
    			set_input_value(input4, ctx.hssua.taithicong);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, input5);
    			set_input_value(input5, ctx.hssua.hoantien);
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && input0.value !== ctx.hssua.lienhe) {
    				set_input_value(input0, ctx.hssua.lienhe);
    			}

    			if (changed.hssua && input1.value !== ctx.hssua.mota) {
    				set_input_value(input1, ctx.hssua.mota);
    			}

    			if (changed.hssua && input2.value !== ctx.hssua.trongai) {
    				set_input_value(input2, ctx.hssua.trongai);
    			}

    			if (changed.hssua && input3.value !== ctx.hssua.tainhap) {
    				set_input_value(input3, ctx.hssua.tainhap);
    			}

    			if (changed.hssua && input4.value !== ctx.hssua.taithicong) {
    				set_input_value(input4, ctx.hssua.taithicong);
    			}

    			if (changed.hssua && input5.value !== ctx.hssua.hoantien) {
    				set_input_value(input5, ctx.hssua.hoantien);
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
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(179:44) ",
    		ctx
    	});

    	return block;
    }

    // (160:44) 
    function create_if_block_4(ctx) {
    	let div0;
    	let input0;
    	let t0;
    	let div1;
    	let input1;
    	let t1;
    	let div2;
    	let input2;
    	let t2;
    	let div3;
    	let input3;
    	let t3;
    	let div4;
    	let input4;
    	let t4;
    	let div5;
    	let input5;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t1 = space();
    			div2 = element("div");
    			input2 = element("input");
    			t2 = space();
    			div3 = element("div");
    			input3 = element("input");
    			t3 = space();
    			div4 = element("div");
    			input4 = element("input");
    			t4 = space();
    			div5 = element("div");
    			input5 = element("input");
    			add_location(input0, file$2, 161, 24, 5097);
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$2, 160, 22, 5055);
    			add_location(input1, file$2, 164, 24, 5226);
    			attr_dev(div1, "class", "col");
    			add_location(div1, file$2, 163, 22, 5184);
    			add_location(input2, file$2, 167, 24, 5353);
    			attr_dev(div2, "class", "col");
    			add_location(div2, file$2, 166, 22, 5311);
    			add_location(input3, file$2, 170, 24, 5483);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 169, 22, 5441);
    			add_location(input4, file$2, 173, 24, 5613);
    			attr_dev(div4, "class", "col");
    			add_location(div4, file$2, 172, 22, 5571);
    			add_location(input5, file$2, 176, 24, 5746);
    			attr_dev(div5, "class", "col");
    			add_location(div5, file$2, 175, 22, 5704);

    			dispose = [
    				listen_dev(input0, "input", ctx.input0_input_handler),
    				listen_dev(input1, "input", ctx.input1_input_handler),
    				listen_dev(input2, "input", ctx.input2_input_handler),
    				listen_dev(input3, "input", ctx.input3_input_handler),
    				listen_dev(input4, "input", ctx.input4_input_handler),
    				listen_dev(input5, "input", ctx.input5_input_handler)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, input0);
    			set_input_value(input0, ctx.hssua.lienhe);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input1);
    			set_input_value(input1, ctx.hssua.mota);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, input2);
    			set_input_value(input2, ctx.hssua.trongai);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, input3);
    			set_input_value(input3, ctx.hssua.tainhap);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, input4);
    			set_input_value(input4, ctx.hssua.taithicong);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, input5);
    			set_input_value(input5, ctx.hssua.hoantien);
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && input0.value !== ctx.hssua.lienhe) {
    				set_input_value(input0, ctx.hssua.lienhe);
    			}

    			if (changed.hssua && input1.value !== ctx.hssua.mota) {
    				set_input_value(input1, ctx.hssua.mota);
    			}

    			if (changed.hssua && input2.value !== ctx.hssua.trongai) {
    				set_input_value(input2, ctx.hssua.trongai);
    			}

    			if (changed.hssua && input3.value !== ctx.hssua.tainhap) {
    				set_input_value(input3, ctx.hssua.tainhap);
    			}

    			if (changed.hssua && input4.value !== ctx.hssua.taithicong) {
    				set_input_value(input4, ctx.hssua.taithicong);
    			}

    			if (changed.hssua && input5.value !== ctx.hssua.hoantien) {
    				set_input_value(input5, ctx.hssua.hoantien);
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
    		source: "(160:44) ",
    		ctx
    	});

    	return block;
    }

    // (156:20) {#if curbang === 0}
    function create_if_block_3(ctx) {
    	let div;
    	let input;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			add_location(input, file$2, 157, 24, 4923);
    			attr_dev(div, "class", "col");
    			add_location(div, file$2, 156, 22, 4881);
    			dispose = listen_dev(input, "input", ctx.input_input_handler_2);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			set_input_value(input, ctx.hssua.diachi);
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && input.value !== ctx.hssua.diachi) {
    				set_input_value(input, ctx.hssua.diachi);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(156:20) {#if curbang === 0}",
    		ctx
    	});

    	return block;
    }

    // (133:12) {#each danhsach as hs, stt}
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
    		source: "(133:12) {#each danhsach as hs, stt}",
    		ctx
    	});

    	return block;
    }

    // (314:8) {#if tongbang > 0}
    function create_if_block$1(ctx) {
    	let div;
    	let input;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			attr_dev(input, "class", "col");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", tongbang);
    			add_location(input, file$2, 315, 12, 11512);
    			attr_dev(div, "class", "col-4 mb-12 chonbang");
    			add_location(div, file$2, 314, 10, 11465);

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
    		source: "(314:8) {#if tongbang > 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let header;
    	let div0;
    	let t0;
    	let main;
    	let div8;
    	let div7;
    	let div5;
    	let div4;
    	let div3;
    	let div1;
    	let t2;
    	let t3;
    	let div2;
    	let t5;
    	let t6;
    	let t7;
    	let div6;
    	let input;
    	let input_max_value;
    	let t8;
    	let footer;
    	let hr;
    	let t9;
    	let div13;
    	let div12;
    	let div10;
    	let div9;
    	let t10;
    	let t11;
    	let t12;
    	let t13;
    	let t14;
    	let t15;
    	let t16;
    	let div11;
    	let button;
    	let i;
    	let current;
    	let dispose;
    	const timhoso = new Timhoso({ $$inline: true });
    	let if_block0 = ctx.curbang === 0 && create_if_block_17(ctx);

    	function select_block_type(changed, ctx) {
    		if (ctx.curbang === 0) return create_if_block_13;
    		if (ctx.curbang === 1) return create_if_block_14;
    		if (ctx.curbang === 2) return create_if_block_15;
    		if (ctx.curbang === 3) return create_if_block_16;
    		return create_else_block_3;
    	}

    	let current_block_type = select_block_type(null, ctx);
    	let if_block1 = current_block_type(ctx);
    	let each_value = ctx.danhsach;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	let if_block2 = tongbang > 0 && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			div0 = element("div");
    			create_component(timhoso.$$.fragment);
    			t0 = space();
    			main = element("main");
    			div8 = element("div");
    			div7 = element("div");
    			div5 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			div1.textContent = "STT";
    			t2 = space();
    			if (if_block0) if_block0.c();
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "Khách hàng";
    			t5 = space();
    			if_block1.c();
    			t6 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t7 = space();
    			div6 = element("div");
    			input = element("input");
    			t8 = space();
    			footer = element("footer");
    			hr = element("hr");
    			t9 = space();
    			div13 = element("div");
    			div12 = element("div");
    			div10 = element("div");
    			div9 = element("div");
    			t10 = text("Hiện có ");
    			t11 = text(ctx.tongloc);
    			t12 = text("/");
    			t13 = text(ctx.tonghoso);
    			t14 = text(" hồ sơ");
    			t15 = space();
    			if (if_block2) if_block2.c();
    			t16 = space();
    			div11 = element("div");
    			button = element("button");
    			i = element("i");
    			attr_dev(div0, "class", "container-fluid");
    			add_location(div0, file$2, 82, 4, 1850);
    			add_location(header, file$2, 81, 2, 1837);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$2, 93, 14, 2116);
    			attr_dev(div2, "class", "col-4");
    			add_location(div2, file$2, 99, 14, 2358);
    			attr_dev(div3, "class", "row tieude");
    			add_location(div3, file$2, 92, 12, 2077);
    			attr_dev(div4, "class", "container-fluid");
    			add_location(div4, file$2, 91, 10, 2035);
    			attr_dev(div5, "id", "bang");
    			attr_dev(div5, "class", "col svelte-nf9b5c");
    			add_location(div5, file$2, 90, 8, 1997);
    			attr_dev(input, "id", "cuonhoso");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = ctx.tongloc - hs_per - 1);
    			attr_dev(input, "class", "svelte-nf9b5c");
    			add_location(input, file$2, 294, 10, 11032);
    			attr_dev(div6, "class", "cuonhoso");
    			set_style(div6, "width", "2%");
    			add_location(div6, file$2, 293, 8, 10981);
    			attr_dev(div7, "class", "row");
    			add_location(div7, file$2, 89, 6, 1971);
    			attr_dev(div8, "class", "container-fluid");
    			add_location(div8, file$2, 88, 4, 1935);
    			attr_dev(main, "class", "svelte-nf9b5c");
    			add_location(main, file$2, 87, 2, 1924);
    			add_location(hr, file$2, 306, 4, 11251);
    			attr_dev(div9, "class", "col");
    			add_location(div9, file$2, 310, 10, 11354);
    			attr_dev(div10, "class", "col-3");
    			add_location(div10, file$2, 309, 8, 11324);
    			attr_dev(i, "class", "fa fa-plus");
    			add_location(i, file$2, 331, 12, 11904);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 325, 10, 11736);
    			attr_dev(div11, "class", "col-1 mb-3");
    			add_location(div11, file$2, 324, 8, 11701);
    			attr_dev(div12, "class", "row");
    			add_location(div12, file$2, 308, 6, 11298);
    			attr_dev(div13, "class", "container-fluid");
    			add_location(div13, file$2, 307, 4, 11262);
    			add_location(footer, file$2, 305, 2, 11238);
    			attr_dev(section, "class", "svelte-nf9b5c");
    			add_location(section, file$2, 80, 0, 1825);

    			dispose = [
    				listen_dev(input, "change", ctx.input_change_input_handler),
    				listen_dev(input, "input", ctx.input_change_input_handler),
    				listen_dev(button, "click", ctx.click_handler_1, false, false, false)
    			];
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, header);
    			append_dev(header, div0);
    			mount_component(timhoso, div0, null);
    			append_dev(section, t0);
    			append_dev(section, main);
    			append_dev(main, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div3, t2);
    			if (if_block0) if_block0.m(div3, null);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div3, t5);
    			if_block1.m(div3, null);
    			append_dev(div4, t6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div4, null);
    			}

    			append_dev(div7, t7);
    			append_dev(div7, div6);
    			append_dev(div6, input);
    			set_input_value(input, ctx.hs_start);
    			append_dev(section, t8);
    			append_dev(section, footer);
    			append_dev(footer, hr);
    			append_dev(footer, t9);
    			append_dev(footer, div13);
    			append_dev(div13, div12);
    			append_dev(div12, div10);
    			append_dev(div10, div9);
    			append_dev(div9, t10);
    			append_dev(div9, t11);
    			append_dev(div9, t12);
    			append_dev(div9, t13);
    			append_dev(div9, t14);
    			append_dev(div12, t15);
    			if (if_block2) if_block2.m(div12, null);
    			append_dev(div12, t16);
    			append_dev(div12, div11);
    			append_dev(div11, button);
    			append_dev(button, i);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (ctx.curbang === 0) {
    				if (!if_block0) {
    					if_block0 = create_if_block_17(ctx);
    					if_block0.c();
    					if_block0.m(div3, t3);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (current_block_type !== (current_block_type = select_block_type(changed, ctx))) {
    				if_block1.d(1);
    				if_block1 = current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div3, null);
    				}
    			}

    			if (changed.hs_start || changed.hs_stop || changed.rowCur || changed.danhsach || changed.curbang || changed.hssua || changed.btnSave || changed.hsgoc || changed.JSON) {
    				each_value = ctx.danhsach;
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div4, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || changed.tongloc && input_max_value !== (input_max_value = ctx.tongloc - hs_per - 1)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (changed.hs_start) {
    				set_input_value(input, ctx.hs_start);
    			}

    			if (!current || changed.tongloc) set_data_dev(t11, ctx.tongloc);
    			if (!current || changed.tonghoso) set_data_dev(t13, ctx.tonghoso);
    			if (tongbang > 0) if_block2.p(changed, ctx);
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
    			if (if_block0) if_block0.d();
    			if_block1.d();
    			destroy_each(each_blocks, detaching);
    			if (if_block2) if_block2.d();
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

    let hs_per = 7;
    let tongbang = 4;

    function instance$2($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
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
    			$$invalidate("hssua", hssua = JSON.parse(JSON.stringify(tam)));
    			let dai = $kho.dskh.length;

    			for (let i = 0; i < dai; i++) {
    				let a = $kho.dskh[i];

    				if (a.mahoso === hssua.mahoso) {
    					for (let k in hssua) {
    						if (a.hasOwnProperty(k)) {
    							a[k] = hssua[k];
    						}
    					}
    				}
    			}

    			set_store_value(kho, $kho.dstim = [...$kho.dstim, "h"], $kho);
    			let r = $kho.dstim.pop();
    			guiWeb(hssua);
    		}

    		$$invalidate("hssua", hssua = {});
    	}

    	let hs_start = 0;
    	let curbang = 0;

    	function input_input_handler() {
    		hssua.sohoso = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input_input_handler_1() {
    		hssua.khachhang = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input_input_handler_2() {
    		hssua.diachi = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input0_input_handler() {
    		hssua.lienhe = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input1_input_handler() {
    		hssua.mota = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input2_input_handler() {
    		hssua.trongai = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input3_input_handler() {
    		hssua.tainhap = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input4_input_handler() {
    		hssua.taithicong = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input5_input_handler() {
    		hssua.hoantien = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input0_input_handler_1() {
    		hssua.lienhe = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input1_input_handler_1() {
    		hssua.mota = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input2_input_handler_1() {
    		hssua.trongai = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input3_input_handler_1() {
    		hssua.tainhap = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input4_input_handler_1() {
    		hssua.taithicong = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input5_input_handler_1() {
    		hssua.hoantien = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input0_input_handler_2() {
    		hssua.lienhe = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input1_input_handler_2() {
    		hssua.mota = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input2_input_handler_2() {
    		hssua.trongai = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input3_input_handler_2() {
    		hssua.tainhap = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input4_input_handler_2() {
    		hssua.taithicong = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input5_input_handler_2() {
    		hssua.hoantien = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input0_input_handler_3() {
    		hssua.lienhe = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input1_input_handler_3() {
    		hssua.mota = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input2_input_handler_3() {
    		hssua.trongai = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input3_input_handler_3() {
    		hssua.tainhap = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input4_input_handler_3() {
    		hssua.taithicong = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input5_input_handler_3() {
    		hssua.hoantien = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	const click_handler = ({ hs }) => {
    		$$invalidate("danhsach", hs.isEdit = true, danhsach);
    		$$invalidate("hsgoc", hsgoc = JSON.parse(JSON.stringify(hs)));
    		$$invalidate("hssua", hssua = JSON.parse(JSON.stringify(hs)));
    	};

    	const mouseover_handler = ({ stt }) => $$invalidate("rowCur", rowCur = stt);

    	function input_change_input_handler() {
    		hs_start = to_number(this.value);
    		$$invalidate("hs_start", hs_start);
    	}

    	function input_change_input_handler_1() {
    		curbang = to_number(this.value);
    		$$invalidate("curbang", curbang);
    	}

    	const click_handler_1 = () => {
    		set_store_value(kho, $kho.dskh = [], $kho);
    	};

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
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("tonghoso" in $$props) $$invalidate("tonghoso", tonghoso = $$props.tonghoso);
    		if ("tongloc" in $$props) $$invalidate("tongloc", tongloc = $$props.tongloc);
    		if ("danhsach" in $$props) $$invalidate("danhsach", danhsach = $$props.danhsach);
    		if ("hs_stop" in $$props) $$invalidate("hs_stop", hs_stop = $$props.hs_stop);
    	};

    	let tonghoso;
    	let tongloc;
    	let danhsach;
    	let hs_stop;

    	$$self.$$.update = (changed = { $kho: 1, tongloc: 1, hs_start: 1, hs_per: 1 }) => {
    		if (changed.$kho) {
    			 $$invalidate("tonghoso", tonghoso = $kho.dskh ? $kho.dskh.length : 0);
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
    		curbang,
    		$kho,
    		tonghoso,
    		tongloc,
    		danhsach,
    		hs_stop,
    		input_input_handler,
    		input_input_handler_1,
    		input_input_handler_2,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		input0_input_handler_1,
    		input1_input_handler_1,
    		input2_input_handler_1,
    		input3_input_handler_1,
    		input4_input_handler_1,
    		input5_input_handler_1,
    		input0_input_handler_2,
    		input1_input_handler_2,
    		input2_input_handler_2,
    		input3_input_handler_2,
    		input4_input_handler_2,
    		input5_input_handler_2,
    		input0_input_handler_3,
    		input1_input_handler_3,
    		input2_input_handler_3,
    		input3_input_handler_3,
    		input4_input_handler_3,
    		input5_input_handler_3,
    		click_handler,
    		mouseover_handler,
    		input_change_input_handler,
    		input_change_input_handler_1,
    		click_handler_1
    	};
    }

    class Hoso extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hoso",
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

    /* src/App.svelte generated by Svelte v3.15.0 */
    const file$3 = "src/App.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	return child_ctx;
    }

    // (62:12) {#each dsnam as item}
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
    			add_location(option, file$3, 62, 14, 1652);
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
    		source: "(62:12) {#each dsnam as item}",
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
    	let button;
    	let i;
    	let t3;
    	let t4;
    	let main;
    	let div5;
    	let t5;
    	let footer;
    	let current;
    	let dispose;
    	let each_value = ctx.dsnam;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

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
    			button = element("button");
    			i = element("i");
    			t3 = space();
    			create_component(progress.$$.fragment);
    			t4 = space();
    			main = element("main");
    			div5 = element("div");
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t5 = space();
    			footer = element("footer");
    			add_location(h3, file$3, 53, 8, 1364);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$3, 52, 6, 1333);
    			attr_dev(select, "class", "custom-select");
    			attr_dev(select, "id", "selectnam");
    			if (ctx.namhoso === void 0) add_render_callback(() => ctx.select_change_handler.call(select));
    			add_location(select, file$3, 57, 10, 1501);
    			attr_dev(div1, "class", "input-group");
    			add_location(div1, file$3, 56, 8, 1465);
    			attr_dev(div2, "class", "col-auto");
    			add_location(div2, file$3, 55, 6, 1434);
    			attr_dev(i, "class", "fa fa-sync-alt");
    			add_location(i, file$3, 72, 10, 1922);
    			attr_dev(button, "class", "btn btn-outline-primary btn-rounded");
    			attr_dev(button, "type", "button");
    			add_location(button, file$3, 68, 8, 1794);
    			attr_dev(div3, "class", "col-auto");
    			add_location(div3, file$3, 67, 6, 1763);
    			attr_dev(div4, "class", "row justify-content-center text-primary");
    			add_location(div4, file$3, 51, 4, 1273);
    			attr_dev(header, "class", "container-fluid");
    			add_location(header, file$3, 50, 2, 1236);
    			attr_dev(div5, "class", "container-fluid");
    			add_location(div5, file$3, 80, 4, 2036);
    			attr_dev(main, "class", "svelte-14749h6");
    			add_location(main, file$3, 79, 2, 2025);
    			add_location(footer, file$3, 85, 2, 2132);
    			attr_dev(section, "class", "svelte-14749h6");
    			add_location(section, file$3, 49, 0, 1224);

    			dispose = [
    				listen_dev(select, "change", ctx.select_change_handler),
    				listen_dev(button, "click", ctx.nhanWeb(), false, false, false)
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
    			append_dev(div3, button);
    			append_dev(button, i);
    			append_dev(header, t3);
    			mount_component(progress, header, null);
    			append_dev(section, t4);
    			append_dev(section, main);
    			append_dev(main, div5);

    			if (switch_instance) {
    				mount_component(switch_instance, div5, null);
    			}

    			append_dev(section, t5);
    			append_dev(section, footer);
    			current = true;
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
    					mount_component(switch_instance, div5, null);
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
    			destroy_each(each_blocks, detaching);
    			destroy_component(progress);
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

    const API_URL$1 = "http://localhost:8888/api1108/hoso/";

    function instance$3($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	set_store_value(kho, $kho.dskh = tamdskh, $kho);
    	set_store_value(kho, $kho.progress = 0, $kho);

    	function nhanWeb() {
    		let apiurl = namhoso ? API_URL$1 + namhoso : API_URL$1;

    		axios({
    			method: "get",
    			url: apiurl,
    			responseType: "json",
    			responseEncoding: "utf8",
    			onDownloadProgress: progressEvent => {
    				let percentCompleted = parseInt(Math.round(progressEvent.loaded * 100 / progressEvent.total));
    				set_store_value(kho, $kho.progress = percentCompleted, $kho);
    				console.log("$kho.progress=" + $kho.progress);
    			}
    		}).then(response => {
    			let dulieu = response.data;
    			set_store_value(kho, $kho.dskh = dulieu ? dulieu.hoso : [], $kho);
    		});
    	}

    	let curComp = Hoso;
    	let dsnam = [2020, 2019, 2018, 2017, 2016, 2015, 2014];
    	let namhoso = 2019;

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
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    	};

    	return {
    		nhanWeb,
    		curComp,
    		dsnam,
    		namhoso,
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

    /* src/Header.svelte generated by Svelte v3.15.0 */

    const file$4 = "src/Header.svelte";

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
    			t0 = text("\n          Đăng ký");
    			t1 = space();
    			div1 = element("div");
    			button1 = element("button");
    			i1 = element("i");
    			t2 = text("\n          Đăng nhập");
    			attr_dev(i0, "class", "fa fa-indent");
    			add_location(i0, file$4, 23, 10, 495);
    			attr_dev(button0, "class", "btn btn-outline-secondary");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$4, 22, 8, 428);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$4, 21, 6, 397);
    			attr_dev(i1, "class", "fa fa-sign-in ");
    			add_location(i1, file$4, 29, 10, 675);
    			attr_dev(button1, "class", "btn btn-outline-secondary");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$4, 28, 8, 608);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$4, 27, 6, 577);
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
    			add_location(div0, file$4, 12, 4, 156);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file$4, 11, 2, 134);
    			attr_dev(div2, "class", "container-fluid");
    			add_location(div2, file$4, 10, 0, 102);
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

    /* src/Base.svelte generated by Svelte v3.15.0 */
    const file$5 = "src/Base.svelte";

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
    			attr_dev(header, "class", "svelte-1ianwi5");
    			add_location(header, file$5, 44, 2, 791);
    			attr_dev(nav, "class", "svelte-1ianwi5");
    			add_location(nav, file$5, 47, 2, 853);
    			attr_dev(main, "class", "svelte-1ianwi5");
    			add_location(main, file$5, 48, 2, 863);
    			attr_dev(aside, "class", "svelte-1ianwi5");
    			add_location(aside, file$5, 51, 2, 918);
    			attr_dev(footer, "class", "svelte-1ianwi5");
    			add_location(footer, file$5, 52, 2, 930);
    			attr_dev(div, "class", "webapp svelte-1ianwi5");
    			add_location(div, file$5, 43, 0, 768);
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
