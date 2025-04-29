function initSnow(config = {}) {
	const defaults = {
		id: "snow",
		enabled: false,
		maxFlakes: 200,
		maxSize: 10,
		minSpeed: 5,
		maxSpeed: 15,
		debug: false,
		classBody: {
			allow: [],
			reject: []
		},
		responsive: {}
	};

	function deepMerge(base, override) {
		const out = { ...base };
		for (let k in override) {
			if (typeof override[k] === "object" && override[k] !== null && !Array.isArray(override[k])) {
				out[k] = deepMerge(base[k] || {}, override[k]);
			} else {
				out[k] = override[k];
			}
		}
		return out;
	}

	const opts = deepMerge(defaults, config);
	const log = opts.debug ? console.log : () => {};
	const toArray = v => Array.isArray(v) ? v : v ? [v] : [];
	const bodyClass = document.body.classList;
	const allow = toArray(opts.classBody.allow);
	const reject = toArray(opts.classBody.reject);

	log("🌨 Snow options:", opts);

	for (let c of reject) if (bodyClass.contains(c)) return log("⛔ reject class matched:", c);
	if (allow.length && !allow.some(c => bodyClass.contains(c))) return log("⛔ no allow class matched");

	const remove = () => document.getElementById(opts.id)?.remove();
	const run = () => {
		let s = {
			enabled: opts.enabled,
			maxFlakes: opts.maxFlakes,
			maxSize: opts.maxSize,
			minSpeed: opts.minSpeed,
			maxSpeed: opts.maxSpeed
		};

		const bp = Object.keys(opts.responsive || {}).map(Number).sort((a, b) => a - b);
		const w = window.innerWidth;
		for (let b of bp) if (w <= b) {
			Object.assign(s, opts.responsive[b]);
			log(`📱 responsive @ ≤${b}px:`, opts.responsive[b]);
			break;
		}

		log("✅ Final snow config:", s);
		if (!s.enabled) return log("🚫 snow disabled");

		remove();

		const r = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
		const randColor = () => [
			"radial-gradient(circle at top left,#dcf2fd,#60b4f2)",
			"#dbf2fd", "#d8f8ff", "#b8ddfa"
		][r(0, 3)];

		let css = `
			.snowflake {
				position: absolute;
				border-radius: 50%;
				margin-top: -10px;
				filter: blur(2px);
			}
		`;
		let html = "";

		for (let i = 0; i < s.maxFlakes; i++) {
			const size = r(3, s.maxSize),
				x = r(0, 10000) * 0.01,
				offset = r(5, 20) * 0.1,
				top = (r(3, 8) * 10).toFixed(2),
				scale = (r(50, 1000) * 0.001).toFixed(2),
				opacity = (r(10, 1000) * 0.001).toFixed(2),
				speed = r(s.minSpeed, s.maxSpeed),
				delay = r(0, speed);

			html += `<i class="snowflake"></i>\n`;
			css += `
				.snowflake:nth-child(${i + 1}) {
					width: ${size}px;
					height: ${size}px;
					background: ${randColor()};
					opacity: ${opacity};
					transform: translate(${x.toFixed(2)}vw, -10px) scale(${scale});
					animation: snowfall-${i + 1} ${speed}s -${delay}s linear infinite;
				}
				@keyframes snowfall-${i + 1} {
					${top}% {
						transform: translate(${(x + offset).toFixed(2)}vw, ${top}vh) scale(${scale});
					}
					to {
						transform: translate(${(x + offset * 1.2).toFixed(2)}vw, 105vh) scale(${scale});
					}
				}
			`;
		}

		const el = document.createElement("div");
		el.id = opts.id;
		el.innerHTML = `
			<style>
				#${opts.id} {
					position: fixed;
					left: 0;
					top: 0;
					bottom: 0;
					width: 100vw;
					height: 100vh;
					overflow: hidden;
					z-index: 9999999;
					pointer-events: none;
				}
				${css}
			</style>
		${html}`;
		document.body.appendChild(el);
	};

	run();
	window.addEventListener("resize", run);
}