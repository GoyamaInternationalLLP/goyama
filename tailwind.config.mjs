/** @type {import('tailwindcss').Config} */
import aspectRatio from "@tailwindcss/aspect-ratio";
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
				slideup: "slideup 1s ease-in-out",
				slidedown: "slidedown 1s ease-in-out",
				slideleft: "slideleft 1s ease-in-out",
				slideright: "slideright 1s ease-in-out",
				heroslidedown: "heroslidedown 1s ease-in-out",
			},
			keyframes: {
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))',
					},
				},
				slideup: {
					from: { opacity: "0", transform: "translateY(25%)" },
					to: { opacity: "1", transform: "none" },
				},
				slidedown: {
					from: { opacity: "0", transform: "translateY(-25%)" },
					to: { opacity: "1", transform: "none" },
				},
				heroslidedown: {
					from: { opacity: "0", transform: "translateY(-3%)" },
					to: { opacity: "1", transform: "none" },
				},
				slideleft: {
					from: { opacity: "0", transform: "translateX(-20px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				slideright: {
					from: { opacity: "0", transform: "translateX(20px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
			},
			colors: {
				green: {
					'50': '#30AF5B',
					'90': '#292C27'
				},
				gray: {
					'10': '#EEEEEE',
					'20': '#A2A2A2',
					'30': '#7B7B7B',
					'50': '#585858',
					'90': '#141414'
				},
				orange: {
					'50': '#FF814C'
				},
				blue: {
					'70': '#021639'
				},
				yellow: {
					'50': '#FEC601'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			backgroundImage: {
				'bg-img-1': "url('/img38.png)",
				'bg-img-2': "url('/img37.png')",
				'bg-img-3': "url('/img44.png')",
				'bg-img-4': "url('/img-25.png')",
				'bg-img-5': "url('/img30.png')",
				'bg-img-6': "url('/img31.png')",
				'bg-img-7': "url('/img39.png')",
				'bg-img-8': "url('/img40.png')",
				'feature-bg': "url('/feature-bg.png')",
				'pattern': "url('/pattern.png')",
				'pattern-2': "url('/pattern-bg.png')"
			},
			screens: {
				xs: '400px',
				'3xl': '1680px',
				'4xl': '2200px'
			},
			maxWidth: {
				'10xl': '1512px'
			},
			borderRadius: {
				'5xl': '40px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [aspectRatio, require("tailwindcss-animate")],
};
