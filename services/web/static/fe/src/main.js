import App from './App.svelte';

const app = new App({
  target: document.getElementById("pna"),
	props: {
		name: 'world'
	}
});

export default app;