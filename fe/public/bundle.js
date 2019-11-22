
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

    /* src\Timhoso.svelte generated by Svelte v3.15.0 */
    const file$1 = "src\\Timhoso.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	child_ctx.id = i;
    	return child_ctx;
    }

    // (70:10) {#each dstim as item, id}
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
    			add_location(button, file$1, 70, 12, 1833);

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
    		source: "(70:10) {#each dstim as item, id}",
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
    			t1 = text("\r\n            Xóa lọc");
    			t2 = space();
    			div4 = element("div");
    			input = element("input");
    			attr_dev(div0, "class", "col");
    			add_location(div0, file$1, 68, 8, 1765);
    			attr_dev(i, "class", "fa fa-trash fa-lg");
    			add_location(i, file$1, 81, 12, 2204);
    			attr_dev(button, "class", "btn");
    			add_location(button, file$1, 80, 10, 2140);
    			attr_dev(div1, "class", "col-auto");
    			add_location(div1, file$1, 79, 8, 2106);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$1, 67, 6, 1738);
    			attr_dev(div3, "class", "col border border-primary");
    			add_location(div3, file$1, 66, 4, 1691);
    			attr_dev(input, "class", "col");
    			attr_dev(input, "type", "search");
    			attr_dev(input, "placeholder", "Tìm ... (không phân biệt chữ hoa hay thường)");
    			add_location(input, file$1, 88, 6, 2352);
    			attr_dev(div4, "class", "col-3");
    			add_location(div4, file$1, 87, 4, 2325);
    			attr_dev(div5, "class", "row");
    			add_location(div5, file$1, 65, 2, 1668);
    			attr_dev(div6, "class", "container-fluid");
    			add_location(div6, file$1, 64, 0, 1635);

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

    	$$self.$$.update = (changed = { dstim: 1, dsLocNhom: 1, stim: 1, $kho: 1 }) => {
    		if (changed.dstim) {
    			 $$invalidate("dsLocNhom", dsLocNhom = locNhom(dstim));
    		}

    		if (changed.dsLocNhom || changed.stim) {
    			 set_store_value(kho, $kho.dsloc = filterListObj(dsLocNhom, stim), $kho);
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
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timhoso",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\Hoso.svelte generated by Svelte v3.15.0 */

    const { Object: Object_1 } = globals;
    const file$2 = "src\\Hoso.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.hs = list[i];
    	child_ctx.stt = i;
    	return child_ctx;
    }

    // (94:14) {#if stt >= $kho.hs_start && stt <= $kho.hs_stop}
    function create_if_block_2(ctx) {
    	let tr;
    	let t;
    	let dispose;

    	function select_block_type(changed, ctx) {
    		if (ctx.editGroup && ctx.rowCur === ctx.stt && ctx.rowEdit === ctx.stt) return create_if_block_3;
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
    			add_location(tr, file$2, 94, 16, 2533);
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
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(94:14) {#if stt >= $kho.hs_start && stt <= $kho.hs_stop}",
    		ctx
    	});

    	return block;
    }

    // (135:18) {:else}
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
    	let t5_value = ctx.hs.madot + "";
    	let t5;
    	let t6;
    	let td2;
    	let t7_value = ctx.hs.sohoso + "";
    	let t7;
    	let t8;
    	let td3;
    	let t9_value = ctx.hs.khachhang + "";
    	let t9;
    	let t10;
    	let td4;
    	let t11_value = ctx.hs.diachi + "";
    	let t11;
    	let t12;
    	let td5;
    	let t13_value = ctx.hs.lienhe + "";
    	let t13;
    	let t14;
    	let td6;
    	let t15_value = ctx.hs.mota + "";
    	let t15;
    	let t16;
    	let td7;
    	let t17_value = ctx.hs.trongai + "";
    	let t17;
    	let t18;
    	let td8;
    	let t19_value = ctx.hs.tainhap + "";
    	let t19;
    	let t20;
    	let td9;
    	let t21_value = ctx.hs.taithicong + "";
    	let t21;
    	let t22;
    	let td10;
    	let t23_value = ctx.hs.hoantien + "";
    	let t23;
    	let dispose;

    	function click_handler(...args) {
    		return ctx.click_handler(ctx, ...args);
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
    			t22 = space();
    			td10 = element("td");
    			t23 = text(t23_value);
    			attr_dev(i, "class", "fa fa-edit");
    			add_location(i, file$2, 145, 24, 4621);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 136, 22, 4197);
    			attr_dev(th, "scope", "row");
    			add_location(th, file$2, 135, 20, 4157);
    			add_location(td0, file$2, 149, 20, 4762);
    			add_location(td1, file$2, 150, 20, 4804);
    			add_location(td2, file$2, 151, 20, 4845);
    			add_location(td3, file$2, 152, 20, 4887);
    			add_location(td4, file$2, 153, 20, 4932);
    			add_location(td5, file$2, 154, 20, 4974);
    			add_location(td6, file$2, 155, 20, 5016);
    			add_location(td7, file$2, 156, 20, 5056);
    			add_location(td8, file$2, 157, 20, 5099);
    			add_location(td9, file$2, 158, 20, 5142);
    			add_location(td10, file$2, 159, 20, 5188);
    			dispose = listen_dev(button, "click", click_handler, false, false, false);
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
    			insert_dev(target, t22, anchor);
    			insert_dev(target, td10, anchor);
    			append_dev(td10, t23);
    		},
    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if (changed.danhsach && t3_value !== (t3_value = ctx.hs.mahoso + "")) set_data_dev(t3, t3_value);
    			if (changed.danhsach && t5_value !== (t5_value = ctx.hs.madot + "")) set_data_dev(t5, t5_value);
    			if (changed.danhsach && t7_value !== (t7_value = ctx.hs.sohoso + "")) set_data_dev(t7, t7_value);
    			if (changed.danhsach && t9_value !== (t9_value = ctx.hs.khachhang + "")) set_data_dev(t9, t9_value);
    			if (changed.danhsach && t11_value !== (t11_value = ctx.hs.diachi + "")) set_data_dev(t11, t11_value);
    			if (changed.danhsach && t13_value !== (t13_value = ctx.hs.lienhe + "")) set_data_dev(t13, t13_value);
    			if (changed.danhsach && t15_value !== (t15_value = ctx.hs.mota + "")) set_data_dev(t15, t15_value);
    			if (changed.danhsach && t17_value !== (t17_value = ctx.hs.trongai + "")) set_data_dev(t17, t17_value);
    			if (changed.danhsach && t19_value !== (t19_value = ctx.hs.tainhap + "")) set_data_dev(t19, t19_value);
    			if (changed.danhsach && t21_value !== (t21_value = ctx.hs.taithicong + "")) set_data_dev(t21, t21_value);
    			if (changed.danhsach && t23_value !== (t23_value = ctx.hs.hoantien + "")) set_data_dev(t23, t23_value);
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
    			if (detaching) detach_dev(t22);
    			if (detaching) detach_dev(td10);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(135:18) {:else}",
    		ctx
    	});

    	return block;
    }

    // (96:18) {#if editGroup && rowCur === stt && rowEdit === stt}
    function create_if_block_3(ctx) {
    	let th;
    	let button;
    	let i;
    	let t0;
    	let t1_value = ctx.stt + 1 + "";
    	let t1;
    	let t2;
    	let td0;
    	let t3_value = ctx.hssua.mahoso + "";
    	let t3;
    	let t4;
    	let td1;
    	let t5_value = ctx.hssua.madot + "";
    	let t5;
    	let t6;
    	let td2;
    	let input0;
    	let t7;
    	let td3;
    	let input1;
    	let t8;
    	let td4;
    	let input2;
    	let t9;
    	let td5;
    	let input3;
    	let t10;
    	let td6;
    	let input4;
    	let t11;
    	let td7;
    	let input5;
    	let t12;
    	let td8;
    	let input6;
    	let t13;
    	let td9;
    	let input7;
    	let t14;
    	let td10;
    	let input8;
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
    			t3 = text(t3_value);
    			t4 = space();
    			td1 = element("td");
    			t5 = text(t5_value);
    			t6 = space();
    			td2 = element("td");
    			input0 = element("input");
    			t7 = space();
    			td3 = element("td");
    			input1 = element("input");
    			t8 = space();
    			td4 = element("td");
    			input2 = element("input");
    			t9 = space();
    			td5 = element("td");
    			input3 = element("input");
    			t10 = space();
    			td6 = element("td");
    			input4 = element("input");
    			t11 = space();
    			td7 = element("td");
    			input5 = element("input");
    			t12 = space();
    			td8 = element("td");
    			input6 = element("input");
    			t13 = space();
    			td9 = element("td");
    			input7 = element("input");
    			t14 = space();
    			td10 = element("td");
    			input8 = element("input");
    			attr_dev(i, "class", "fa fa-save");
    			add_location(i, file$2, 101, 24, 2883);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 97, 22, 2707);
    			attr_dev(th, "scope", "row");
    			add_location(th, file$2, 96, 20, 2667);
    			add_location(td0, file$2, 105, 20, 3024);
    			add_location(td1, file$2, 106, 20, 3069);
    			add_location(input0, file$2, 108, 22, 3141);
    			add_location(td2, file$2, 107, 20, 3113);
    			add_location(input1, file$2, 111, 22, 3253);
    			add_location(td3, file$2, 110, 20, 3225);
    			add_location(input2, file$2, 114, 22, 3368);
    			add_location(td4, file$2, 113, 20, 3340);
    			add_location(input3, file$2, 117, 22, 3480);
    			add_location(td5, file$2, 116, 20, 3452);
    			add_location(input4, file$2, 120, 22, 3592);
    			add_location(td6, file$2, 119, 20, 3564);
    			add_location(input5, file$2, 123, 22, 3702);
    			add_location(td7, file$2, 122, 20, 3674);
    			add_location(input6, file$2, 126, 22, 3815);
    			add_location(td8, file$2, 125, 20, 3787);
    			add_location(input7, file$2, 129, 22, 3928);
    			add_location(td9, file$2, 128, 20, 3900);
    			add_location(input8, file$2, 132, 22, 4044);
    			add_location(td10, file$2, 131, 20, 4016);

    			dispose = [
    				listen_dev(button, "click", ctx.btnSave, false, false, false),
    				listen_dev(input0, "input", ctx.input0_input_handler),
    				listen_dev(input1, "input", ctx.input1_input_handler),
    				listen_dev(input2, "input", ctx.input2_input_handler),
    				listen_dev(input3, "input", ctx.input3_input_handler),
    				listen_dev(input4, "input", ctx.input4_input_handler),
    				listen_dev(input5, "input", ctx.input5_input_handler),
    				listen_dev(input6, "input", ctx.input6_input_handler),
    				listen_dev(input7, "input", ctx.input7_input_handler),
    				listen_dev(input8, "input", ctx.input8_input_handler)
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
    			append_dev(td1, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, td2, anchor);
    			append_dev(td2, input0);
    			set_input_value(input0, ctx.hssua.sohoso);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, td3, anchor);
    			append_dev(td3, input1);
    			set_input_value(input1, ctx.hssua.khachhang);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, td4, anchor);
    			append_dev(td4, input2);
    			set_input_value(input2, ctx.hssua.diachi);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, td5, anchor);
    			append_dev(td5, input3);
    			set_input_value(input3, ctx.hssua.lienhe);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, td6, anchor);
    			append_dev(td6, input4);
    			set_input_value(input4, ctx.hssua.mota);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, td7, anchor);
    			append_dev(td7, input5);
    			set_input_value(input5, ctx.hssua.trongai);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, td8, anchor);
    			append_dev(td8, input6);
    			set_input_value(input6, ctx.hssua.tainhap);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, td9, anchor);
    			append_dev(td9, input7);
    			set_input_value(input7, ctx.hssua.taithicong);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, td10, anchor);
    			append_dev(td10, input8);
    			set_input_value(input8, ctx.hssua.hoantien);
    		},
    		p: function update(changed, ctx) {
    			if (changed.hssua && t3_value !== (t3_value = ctx.hssua.mahoso + "")) set_data_dev(t3, t3_value);
    			if (changed.hssua && t5_value !== (t5_value = ctx.hssua.madot + "")) set_data_dev(t5, t5_value);

    			if (changed.hssua && input0.value !== ctx.hssua.sohoso) {
    				set_input_value(input0, ctx.hssua.sohoso);
    			}

    			if (changed.hssua && input1.value !== ctx.hssua.khachhang) {
    				set_input_value(input1, ctx.hssua.khachhang);
    			}

    			if (changed.hssua && input2.value !== ctx.hssua.diachi) {
    				set_input_value(input2, ctx.hssua.diachi);
    			}

    			if (changed.hssua && input3.value !== ctx.hssua.lienhe) {
    				set_input_value(input3, ctx.hssua.lienhe);
    			}

    			if (changed.hssua && input4.value !== ctx.hssua.mota) {
    				set_input_value(input4, ctx.hssua.mota);
    			}

    			if (changed.hssua && input5.value !== ctx.hssua.trongai) {
    				set_input_value(input5, ctx.hssua.trongai);
    			}

    			if (changed.hssua && input6.value !== ctx.hssua.tainhap) {
    				set_input_value(input6, ctx.hssua.tainhap);
    			}

    			if (changed.hssua && input7.value !== ctx.hssua.taithicong) {
    				set_input_value(input7, ctx.hssua.taithicong);
    			}

    			if (changed.hssua && input8.value !== ctx.hssua.hoantien) {
    				set_input_value(input8, ctx.hssua.hoantien);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(td0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(td1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(td2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(td3);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(td4);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(td5);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(td6);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(td7);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(td8);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(td9);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(td10);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(96:18) {#if editGroup && rowCur === stt && rowEdit === stt}",
    		ctx
    	});

    	return block;
    }

    // (93:12) {#each danhsach as hs, stt}
    function create_each_block$1(ctx) {
    	let if_block_anchor;
    	let if_block = ctx.stt >= ctx.$kho.hs_start && ctx.stt <= ctx.$kho.hs_stop && create_if_block_2(ctx);

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
    			if (ctx.stt >= ctx.$kho.hs_start && ctx.stt <= ctx.$kho.hs_stop) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block_2(ctx);
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
    		source: "(93:12) {#each danhsach as hs, stt}",
    		ctx
    	});

    	return block;
    }

    // (197:8) {#if $kho.tongtrang > 0}
    function create_if_block_1(ctx) {
    	let div6;
    	let div0;
    	let input0;
    	let input0_max_value;
    	let t0;
    	let div5;
    	let div1;
    	let t2;
    	let div2;
    	let button0;
    	let i0;
    	let t3;
    	let input1;
    	let input1_updating = false;
    	let t4;
    	let div3;
    	let button1;
    	let i1;
    	let t5;
    	let div4;
    	let t6;
    	let t7_value = ctx.$kho.tongtrang + "";
    	let t7;
    	let dispose;

    	function input1_input_handler_1() {
    		input1_updating = true;
    		ctx.input1_input_handler_1.call(input1);
    	}

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			div5 = element("div");
    			div1 = element("div");
    			div1.textContent = "Trang";
    			t2 = space();
    			div2 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t3 = space();
    			input1 = element("input");
    			t4 = space();
    			div3 = element("div");
    			button1 = element("button");
    			i1 = element("i");
    			t5 = space();
    			div4 = element("div");
    			t6 = text("/");
    			t7 = text(t7_value);
    			attr_dev(input0, "class", "col");
    			attr_dev(input0, "type", "range");
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", input0_max_value = ctx.$kho.tongtrang - 1);
    			add_location(input0, file$2, 199, 14, 6348);
    			attr_dev(div0, "class", "row");
    			add_location(div0, file$2, 198, 12, 6315);
    			attr_dev(div1, "class", "col-2");
    			add_location(div1, file$2, 207, 14, 6594);
    			attr_dev(i0, "class", "fa fa-caret-square-left");
    			add_location(i0, file$2, 213, 18, 6869);
    			attr_dev(button0, "class", "btn btn-outline-secondary");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$2, 209, 16, 6677);
    			attr_dev(div2, "class", "col-2");
    			add_location(div2, file$2, 208, 14, 6640);
    			attr_dev(input1, "class", "col-4");
    			attr_dev(input1, "type", "number");
    			add_location(input1, file$2, 216, 14, 6971);
    			attr_dev(i1, "class", "fa fa-caret-square-right");
    			add_location(i1, file$2, 222, 18, 7314);
    			attr_dev(button1, "class", "btn btn-outline-secondary");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$2, 218, 16, 7088);
    			attr_dev(div3, "class", "col-2");
    			add_location(div3, file$2, 217, 14, 7051);
    			attr_dev(div4, "class", "col-2");
    			add_location(div4, file$2, 225, 14, 7417);
    			attr_dev(div5, "class", "row");
    			add_location(div5, file$2, 206, 12, 6561);
    			attr_dev(div6, "class", "col-4 mb-3 chontrang");
    			add_location(div6, file$2, 197, 10, 6267);

    			dispose = [
    				listen_dev(input0, "change", ctx.input0_change_input_handler),
    				listen_dev(input0, "input", ctx.input0_change_input_handler),
    				listen_dev(button0, "click", ctx.click_handler_1, false, false, false),
    				listen_dev(input1, "input", input1_input_handler_1),
    				listen_dev(button1, "click", ctx.click_handler_2, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div0);
    			append_dev(div0, input0);
    			set_input_value(input0, ctx.$kho.curtrang);
    			append_dev(div6, t0);
    			append_dev(div6, div5);
    			append_dev(div5, div1);
    			append_dev(div5, t2);
    			append_dev(div5, div2);
    			append_dev(div2, button0);
    			append_dev(button0, i0);
    			append_dev(div5, t3);
    			append_dev(div5, input1);
    			set_input_value(input1, ctx.$kho.curtrang);
    			append_dev(div5, t4);
    			append_dev(div5, div3);
    			append_dev(div3, button1);
    			append_dev(button1, i1);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, t6);
    			append_dev(div4, t7);
    		},
    		p: function update(changed, ctx) {
    			if (changed.$kho && input0_max_value !== (input0_max_value = ctx.$kho.tongtrang - 1)) {
    				attr_dev(input0, "max", input0_max_value);
    			}

    			if (changed.$kho) {
    				set_input_value(input0, ctx.$kho.curtrang);
    			}

    			if (!input1_updating && changed.$kho) {
    				set_input_value(input1, ctx.$kho.curtrang);
    			}

    			input1_updating = false;
    			if (changed.$kho && t7_value !== (t7_value = ctx.$kho.tongtrang + "")) set_data_dev(t7, t7_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(197:8) {#if $kho.tongtrang > 0}",
    		ctx
    	});

    	return block;
    }

    // (231:8) {#if $kho.tongbang > 0}
    function create_if_block$1(ctx) {
    	let div6;
    	let div0;
    	let input0;
    	let input0_max_value;
    	let t0;
    	let div5;
    	let div1;
    	let t2;
    	let div2;
    	let button0;
    	let i0;
    	let t3;
    	let input1;
    	let input1_updating = false;
    	let t4;
    	let div3;
    	let button1;
    	let i1;
    	let t5;
    	let div4;
    	let t6;
    	let t7_value = ctx.$kho.tongbang + "";
    	let t7;
    	let dispose;

    	function input1_input_handler_2() {
    		input1_updating = true;
    		ctx.input1_input_handler_2.call(input1);
    	}

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			div5 = element("div");
    			div1 = element("div");
    			div1.textContent = "Bang";
    			t2 = space();
    			div2 = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t3 = space();
    			input1 = element("input");
    			t4 = space();
    			div3 = element("div");
    			button1 = element("button");
    			i1 = element("i");
    			t5 = space();
    			div4 = element("div");
    			t6 = text("/");
    			t7 = text(t7_value);
    			attr_dev(input0, "class", "col");
    			attr_dev(input0, "type", "range");
    			attr_dev(input0, "min", "0");
    			attr_dev(input0, "max", input0_max_value = ctx.$kho.tongbang - 1);
    			add_location(input0, file$2, 233, 14, 7640);
    			attr_dev(div0, "class", "row");
    			add_location(div0, file$2, 232, 12, 7607);
    			attr_dev(div1, "class", "col-2");
    			add_location(div1, file$2, 241, 14, 7884);
    			attr_dev(i0, "class", "fa fa-caret-square-left");
    			add_location(i0, file$2, 247, 18, 8156);
    			attr_dev(button0, "class", "btn btn-outline-secondary");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$2, 243, 16, 7966);
    			attr_dev(div2, "class", "col-2");
    			add_location(div2, file$2, 242, 14, 7929);
    			attr_dev(input1, "class", "col-4");
    			attr_dev(input1, "type", "number");
    			add_location(input1, file$2, 250, 14, 8258);
    			attr_dev(i1, "class", "fa fa-caret-square-right");
    			add_location(i1, file$2, 256, 18, 8596);
    			attr_dev(button1, "class", "btn btn-outline-secondary");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$2, 252, 16, 8374);
    			attr_dev(div3, "class", "col-2");
    			add_location(div3, file$2, 251, 14, 8337);
    			attr_dev(div4, "class", "col-2");
    			add_location(div4, file$2, 259, 14, 8699);
    			attr_dev(div5, "class", "row");
    			add_location(div5, file$2, 240, 12, 7851);
    			attr_dev(div6, "class", "col-4 mb-12 chonbang");
    			add_location(div6, file$2, 231, 10, 7559);

    			dispose = [
    				listen_dev(input0, "change", ctx.input0_change_input_handler_1),
    				listen_dev(input0, "input", ctx.input0_change_input_handler_1),
    				listen_dev(button0, "click", ctx.click_handler_3, false, false, false),
    				listen_dev(input1, "input", input1_input_handler_2),
    				listen_dev(button1, "click", ctx.click_handler_4, false, false, false)
    			];
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div0);
    			append_dev(div0, input0);
    			set_input_value(input0, ctx.$kho.curbang);
    			append_dev(div6, t0);
    			append_dev(div6, div5);
    			append_dev(div5, div1);
    			append_dev(div5, t2);
    			append_dev(div5, div2);
    			append_dev(div2, button0);
    			append_dev(button0, i0);
    			append_dev(div5, t3);
    			append_dev(div5, input1);
    			set_input_value(input1, ctx.$kho.curbang);
    			append_dev(div5, t4);
    			append_dev(div5, div3);
    			append_dev(div3, button1);
    			append_dev(button1, i1);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, t6);
    			append_dev(div4, t7);
    		},
    		p: function update(changed, ctx) {
    			if (changed.$kho && input0_max_value !== (input0_max_value = ctx.$kho.tongbang - 1)) {
    				attr_dev(input0, "max", input0_max_value);
    			}

    			if (changed.$kho) {
    				set_input_value(input0, ctx.$kho.curbang);
    			}

    			if (!input1_updating && changed.$kho) {
    				set_input_value(input1, ctx.$kho.curbang);
    			}

    			input1_updating = false;
    			if (changed.$kho && t7_value !== (t7_value = ctx.$kho.tongbang + "")) set_data_dev(t7, t7_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(231:8) {#if $kho.tongbang > 0}",
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
    	let div2;
    	let div1;
    	let table;
    	let thead;
    	let tr;
    	let th0;
    	let t2;
    	let th1;
    	let t4;
    	let th2;
    	let t6;
    	let th3;
    	let t8;
    	let th4;
    	let t10;
    	let th5;
    	let t12;
    	let th6;
    	let t14;
    	let th7;
    	let t16;
    	let th8;
    	let t18;
    	let th9;
    	let t20;
    	let th10;
    	let t22;
    	let th11;
    	let t24;
    	let tbody;
    	let t25;
    	let footer;
    	let hr;
    	let t26;
    	let div13;
    	let div12;
    	let div10;
    	let div4;
    	let div3;
    	let t27;
    	let t28;
    	let t29;
    	let t30;
    	let t31;
    	let t32;
    	let div9;
    	let div8;
    	let div7;
    	let div5;
    	let span0;
    	let t34;
    	let input;
    	let input_updating = false;
    	let t35;
    	let div6;
    	let span1;
    	let t37;
    	let t38;
    	let t39;
    	let div11;
    	let button;
    	let i;
    	let current;
    	let dispose;
    	const timhoso = new Timhoso({ $$inline: true });
    	let each_value = ctx.danhsach;
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	function input_input_handler() {
    		input_updating = true;
    		ctx.input_input_handler.call(input);
    	}

    	let if_block0 = ctx.$kho.tongtrang > 0 && create_if_block_1(ctx);
    	let if_block1 = ctx.$kho.tongbang > 0 && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			header = element("header");
    			div0 = element("div");
    			create_component(timhoso.$$.fragment);
    			t0 = space();
    			main = element("main");
    			div2 = element("div");
    			div1 = element("div");
    			table = element("table");
    			thead = element("thead");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "STT";
    			t2 = space();
    			th1 = element("th");
    			th1.textContent = "Mã hồ sơ";
    			t4 = space();
    			th2 = element("th");
    			th2.textContent = "Mã đợt";
    			t6 = space();
    			th3 = element("th");
    			th3.textContent = "Số hồ sơ";
    			t8 = space();
    			th4 = element("th");
    			th4.textContent = "Khách hàng";
    			t10 = space();
    			th5 = element("th");
    			th5.textContent = "Địa chỉ";
    			t12 = space();
    			th6 = element("th");
    			th6.textContent = "Liên hệ";
    			t14 = space();
    			th7 = element("th");
    			th7.textContent = "Mô tả";
    			t16 = space();
    			th8 = element("th");
    			th8.textContent = "Trở ngại";
    			t18 = space();
    			th9 = element("th");
    			th9.textContent = "Tái nhập";
    			t20 = space();
    			th10 = element("th");
    			th10.textContent = "Tái thi công";
    			t22 = space();
    			th11 = element("th");
    			th11.textContent = "Hoàn tiền";
    			t24 = space();
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t25 = space();
    			footer = element("footer");
    			hr = element("hr");
    			t26 = space();
    			div13 = element("div");
    			div12 = element("div");
    			div10 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			t27 = text("Hiện có ");
    			t28 = text(ctx.tongloc);
    			t29 = text("/");
    			t30 = text(ctx.tonghoso);
    			t31 = text(" hồ sơ");
    			t32 = space();
    			div9 = element("div");
    			div8 = element("div");
    			div7 = element("div");
    			div5 = element("div");
    			span0 = element("span");
    			span0.textContent = "Xem";
    			t34 = space();
    			input = element("input");
    			t35 = space();
    			div6 = element("div");
    			span1 = element("span");
    			span1.textContent = "hồ sơ/trang";
    			t37 = space();
    			if (if_block0) if_block0.c();
    			t38 = space();
    			if (if_block1) if_block1.c();
    			t39 = space();
    			div11 = element("div");
    			button = element("button");
    			i = element("i");
    			attr_dev(div0, "class", "container-fluid");
    			add_location(div0, file$2, 66, 4, 1578);
    			add_location(header, file$2, 65, 2, 1564);
    			attr_dev(th0, "scope", "col");
    			add_location(th0, file$2, 77, 14, 1832);
    			attr_dev(th1, "scope", "col");
    			add_location(th1, file$2, 78, 14, 1872);
    			attr_dev(th2, "scope", "col");
    			add_location(th2, file$2, 79, 14, 1917);
    			attr_dev(th3, "scope", "col");
    			add_location(th3, file$2, 80, 14, 1960);
    			attr_dev(th4, "scope", "col");
    			add_location(th4, file$2, 81, 14, 2005);
    			attr_dev(th5, "scope", "col");
    			add_location(th5, file$2, 82, 14, 2052);
    			attr_dev(th6, "scope", "col");
    			add_location(th6, file$2, 83, 14, 2096);
    			attr_dev(th7, "scope", "col");
    			add_location(th7, file$2, 84, 14, 2140);
    			attr_dev(th8, "scope", "col");
    			add_location(th8, file$2, 85, 14, 2182);
    			attr_dev(th9, "scope", "col");
    			add_location(th9, file$2, 86, 14, 2227);
    			attr_dev(th10, "scope", "col");
    			add_location(th10, file$2, 87, 14, 2272);
    			attr_dev(th11, "scope", "col");
    			add_location(th11, file$2, 88, 14, 2321);
    			add_location(tr, file$2, 76, 12, 1812);
    			add_location(thead, file$2, 75, 10, 1791);
    			add_location(tbody, file$2, 91, 10, 2402);
    			attr_dev(table, "class", "table table-hover");
    			add_location(table, file$2, 74, 8, 1746);
    			attr_dev(div1, "class", "table-responsive");
    			add_location(div1, file$2, 73, 6, 1706);
    			attr_dev(div2, "class", "container-fluid");
    			add_location(div2, file$2, 72, 4, 1669);
    			attr_dev(main, "class", "svelte-o55vrm");
    			add_location(main, file$2, 71, 2, 1657);
    			add_location(hr, file$2, 171, 4, 5395);
    			attr_dev(div3, "class", "col");
    			add_location(div3, file$2, 176, 12, 5533);
    			attr_dev(div4, "class", "row");
    			add_location(div4, file$2, 175, 10, 5502);
    			attr_dev(span0, "class", "input-group-text");
    			add_location(span0, file$2, 182, 18, 5785);
    			attr_dev(div5, "class", "input-group-prepend");
    			add_location(div5, file$2, 181, 16, 5732);
    			attr_dev(input, "class", "form-control col");
    			attr_dev(input, "type", "number");
    			add_location(input, file$2, 184, 16, 5868);
    			attr_dev(span1, "class", "input-group-text");
    			add_location(span1, file$2, 189, 18, 6070);
    			attr_dev(div6, "class", "input-group-append");
    			add_location(div6, file$2, 188, 16, 6018);
    			attr_dev(div7, "class", "input-group mb-3");
    			add_location(div7, file$2, 180, 14, 5684);
    			attr_dev(div8, "class", "col");
    			add_location(div8, file$2, 179, 12, 5651);
    			attr_dev(div9, "class", "row");
    			add_location(div9, file$2, 178, 10, 5620);
    			attr_dev(div10, "class", "col-3");
    			add_location(div10, file$2, 174, 8, 5471);
    			attr_dev(i, "class", "fa fa-plus");
    			add_location(i, file$2, 271, 12, 9015);
    			attr_dev(button, "class", "btn btn-outline-secondary");
    			attr_dev(button, "type", "button");
    			add_location(button, file$2, 265, 10, 8841);
    			attr_dev(div11, "class", "col-1 mb-3");
    			add_location(div11, file$2, 264, 8, 8805);
    			attr_dev(div12, "class", "row");
    			add_location(div12, file$2, 173, 6, 5444);
    			attr_dev(div13, "class", "container-fluid");
    			add_location(div13, file$2, 172, 4, 5407);
    			add_location(footer, file$2, 170, 2, 5381);
    			attr_dev(section, "class", "svelte-o55vrm");
    			add_location(section, file$2, 64, 0, 1551);

    			dispose = [
    				listen_dev(input, "input", input_input_handler),
    				listen_dev(button, "click", ctx.click_handler_5, false, false, false)
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
    			append_dev(main, div2);
    			append_dev(div2, div1);
    			append_dev(div1, table);
    			append_dev(table, thead);
    			append_dev(thead, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t2);
    			append_dev(tr, th1);
    			append_dev(tr, t4);
    			append_dev(tr, th2);
    			append_dev(tr, t6);
    			append_dev(tr, th3);
    			append_dev(tr, t8);
    			append_dev(tr, th4);
    			append_dev(tr, t10);
    			append_dev(tr, th5);
    			append_dev(tr, t12);
    			append_dev(tr, th6);
    			append_dev(tr, t14);
    			append_dev(tr, th7);
    			append_dev(tr, t16);
    			append_dev(tr, th8);
    			append_dev(tr, t18);
    			append_dev(tr, th9);
    			append_dev(tr, t20);
    			append_dev(tr, th10);
    			append_dev(tr, t22);
    			append_dev(tr, th11);
    			append_dev(table, t24);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			append_dev(section, t25);
    			append_dev(section, footer);
    			append_dev(footer, hr);
    			append_dev(footer, t26);
    			append_dev(footer, div13);
    			append_dev(div13, div12);
    			append_dev(div12, div10);
    			append_dev(div10, div4);
    			append_dev(div4, div3);
    			append_dev(div3, t27);
    			append_dev(div3, t28);
    			append_dev(div3, t29);
    			append_dev(div3, t30);
    			append_dev(div3, t31);
    			append_dev(div10, t32);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div7);
    			append_dev(div7, div5);
    			append_dev(div5, span0);
    			append_dev(div7, t34);
    			append_dev(div7, input);
    			set_input_value(input, ctx.$kho.hs_trang);
    			append_dev(div7, t35);
    			append_dev(div7, div6);
    			append_dev(div6, span1);
    			append_dev(div12, t37);
    			if (if_block0) if_block0.m(div12, null);
    			append_dev(div12, t38);
    			if (if_block1) if_block1.m(div12, null);
    			append_dev(div12, t39);
    			append_dev(div12, div11);
    			append_dev(div11, button);
    			append_dev(button, i);
    			current = true;
    		},
    		p: function update(changed, ctx) {
    			if (changed.$kho || changed.rowCur || changed.editGroup || changed.rowEdit || changed.hssua || changed.btnSave || changed.danhsach || changed.hsgoc || changed.JSON) {
    				each_value = ctx.danhsach;
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

    			if (!current || changed.tongloc) set_data_dev(t28, ctx.tongloc);
    			if (!current || changed.tonghoso) set_data_dev(t30, ctx.tonghoso);

    			if (!input_updating && changed.$kho) {
    				set_input_value(input, ctx.$kho.hs_trang);
    			}

    			input_updating = false;

    			if (ctx.$kho.tongtrang > 0) {
    				if (if_block0) {
    					if_block0.p(changed, ctx);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(div12, t38);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (ctx.$kho.tongbang > 0) {
    				if (if_block1) {
    					if_block1.p(changed, ctx);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(div12, t39);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
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
    			if (detaching) detach_dev(section);
    			destroy_component(timhoso);
    			destroy_each(each_blocks, detaching);
    			if (if_block0) if_block0.d();
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

    function instance$2($$self, $$props, $$invalidate) {
    	let $kho;
    	validate_store(kho, "kho");
    	component_subscribe($$self, kho, $$value => $$invalidate("$kho", $kho = $$value));
    	set_store_value(kho, $kho.curbang = 0, $kho);
    	set_store_value(kho, $kho.tongbang = 4, $kho);
    	let editGroup = false;
    	let rowCur = 0;
    	let rowEdit = -1;
    	let hsgoc = {};
    	let hssua = {};

    	function btnSave() {
    		$$invalidate("editGroup", editGroup = false);
    		$$invalidate("rowEdit", rowEdit = -1);
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

    			guiWeb(hssua);
    		}

    		$$invalidate("hssua", hssua = {});
    	}

    	function input0_input_handler() {
    		hssua.sohoso = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input1_input_handler() {
    		hssua.khachhang = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input2_input_handler() {
    		hssua.diachi = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input3_input_handler() {
    		hssua.lienhe = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input4_input_handler() {
    		hssua.mota = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input5_input_handler() {
    		hssua.trongai = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input6_input_handler() {
    		hssua.tainhap = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input7_input_handler() {
    		hssua.taithicong = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	function input8_input_handler() {
    		hssua.hoantien = this.value;
    		$$invalidate("hssua", hssua);
    	}

    	const click_handler = ({ stt, hs }) => {
    		$$invalidate("editGroup", editGroup = true);
    		$$invalidate("rowEdit", rowEdit = stt);
    		$$invalidate("hsgoc", hsgoc = JSON.parse(JSON.stringify(hs)));
    		$$invalidate("hssua", hssua = JSON.parse(JSON.stringify(hs)));
    	};

    	const mouseover_handler = ({ stt }) => $$invalidate("rowCur", rowCur = stt);

    	function input_input_handler() {
    		$kho.hs_trang = to_number(this.value);
    		kho.set($kho);
    	}

    	function input0_change_input_handler() {
    		$kho.curtrang = to_number(this.value);
    		kho.set($kho);
    	}

    	const click_handler_1 = () => $kho.curtrang > 0
    	? set_store_value(kho, $kho.curtrang--, $kho)
    	: 0;

    	function input1_input_handler_1() {
    		$kho.curtrang = to_number(this.value);
    		kho.set($kho);
    	}

    	const click_handler_2 = () => $kho.curtrang < $kho.tongtrang - 1
    	? set_store_value(kho, $kho.curtrang++, $kho)
    	: $kho.tongtrang - 1;

    	function input0_change_input_handler_1() {
    		$kho.curbang = to_number(this.value);
    		kho.set($kho);
    	}

    	const click_handler_3 = () => $kho.curbang > 0
    	? set_store_value(kho, $kho.curbang--, $kho)
    	: 0;

    	function input1_input_handler_2() {
    		$kho.curbang = to_number(this.value);
    		kho.set($kho);
    	}

    	const click_handler_4 = () => $kho.curbang < $kho.tongbang - 1
    	? set_store_value(kho, $kho.curbang++, $kho)
    	: $kho.tongbang - 1;

    	const click_handler_5 = () => {
    		set_store_value(kho, $kho.dskh = [], $kho);
    	};

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("editGroup" in $$props) $$invalidate("editGroup", editGroup = $$props.editGroup);
    		if ("rowCur" in $$props) $$invalidate("rowCur", rowCur = $$props.rowCur);
    		if ("rowEdit" in $$props) $$invalidate("rowEdit", rowEdit = $$props.rowEdit);
    		if ("hsgoc" in $$props) $$invalidate("hsgoc", hsgoc = $$props.hsgoc);
    		if ("hssua" in $$props) $$invalidate("hssua", hssua = $$props.hssua);
    		if ("$kho" in $$props) kho.set($kho = $$props.$kho);
    		if ("tonghoso" in $$props) $$invalidate("tonghoso", tonghoso = $$props.tonghoso);
    		if ("tongloc" in $$props) $$invalidate("tongloc", tongloc = $$props.tongloc);
    		if ("danhsach" in $$props) $$invalidate("danhsach", danhsach = $$props.danhsach);
    	};

    	let tonghoso;
    	let tongloc;
    	let danhsach;

    	$$self.$$.update = (changed = { $kho: 1 }) => {
    		if (changed.$kho) {
    			 $$invalidate("tonghoso", tonghoso = $kho.dskh ? $kho.dskh.length : 0);
    		}

    		if (changed.$kho) {
    			 $$invalidate("tongloc", tongloc = $kho.dsloc ? $kho.dsloc.length : 0);
    		}

    		if (changed.$kho) {
    			 $$invalidate("danhsach", danhsach = $kho.dsloc ? $kho.dsloc : []);
    		}
    	};

    	return {
    		editGroup,
    		rowCur,
    		rowEdit,
    		hsgoc,
    		hssua,
    		btnSave,
    		$kho,
    		tonghoso,
    		tongloc,
    		danhsach,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		input6_input_handler,
    		input7_input_handler,
    		input8_input_handler,
    		click_handler,
    		mouseover_handler,
    		input_input_handler,
    		input0_change_input_handler,
    		click_handler_1,
    		input1_input_handler_1,
    		click_handler_2,
    		input0_change_input_handler_1,
    		click_handler_3,
    		input1_input_handler_2,
    		click_handler_4,
    		click_handler_5
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

    /* src\App.svelte generated by Svelte v3.15.0 */
    const file$3 = "src\\App.svelte";

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
    			add_location(option, file$3, 62, 14, 1714);
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
    			add_location(h3, file$3, 53, 8, 1417);
    			attr_dev(div0, "class", "col-auto");
    			add_location(div0, file$3, 52, 6, 1385);
    			attr_dev(select, "class", "custom-select");
    			attr_dev(select, "id", "selectnam");
    			if (ctx.namhoso === void 0) add_render_callback(() => ctx.select_change_handler.call(select));
    			add_location(select, file$3, 57, 10, 1558);
    			attr_dev(div1, "class", "input-group");
    			add_location(div1, file$3, 56, 8, 1521);
    			attr_dev(div2, "class", "col-auto");
    			add_location(div2, file$3, 55, 6, 1489);
    			attr_dev(i, "class", "fa fa-sync-alt");
    			add_location(i, file$3, 72, 10, 1994);
    			attr_dev(button, "class", "btn btn-outline-primary btn-rounded");
    			attr_dev(button, "type", "button");
    			add_location(button, file$3, 68, 8, 1862);
    			attr_dev(div3, "class", "col-auto");
    			add_location(div3, file$3, 67, 6, 1830);
    			attr_dev(div4, "class", "row justify-content-center text-primary");
    			add_location(div4, file$3, 51, 4, 1324);
    			attr_dev(header, "class", "container-fluid");
    			add_location(header, file$3, 50, 2, 1286);
    			attr_dev(div5, "class", "container-fluid");
    			add_location(div5, file$3, 80, 4, 2116);
    			attr_dev(main, "class", "svelte-1jhup2v");
    			add_location(main, file$3, 79, 2, 2104);
    			add_location(footer, file$3, 85, 2, 2217);
    			attr_dev(section, "class", "svelte-1jhup2v");
    			add_location(section, file$3, 49, 0, 1273);

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
    			attr_dev(header, "class", "svelte-ya6dx6");
    			add_location(header, file$5, 44, 2, 835);
    			attr_dev(nav, "class", "svelte-ya6dx6");
    			add_location(nav, file$5, 47, 2, 900);
    			attr_dev(main, "class", "svelte-ya6dx6");
    			add_location(main, file$5, 48, 2, 911);
    			attr_dev(aside, "class", "svelte-ya6dx6");
    			add_location(aside, file$5, 51, 2, 969);
    			attr_dev(footer, "class", "svelte-ya6dx6");
    			add_location(footer, file$5, 52, 2, 982);
    			attr_dev(div, "class", "webapp svelte-ya6dx6");
    			add_location(div, file$5, 43, 0, 811);
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
