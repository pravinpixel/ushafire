import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'


export default {
    style: {
        postcss: {
            plugins: [
                tailwind("./src/tailwind.config.ts"),
                autoprefixer,
            ],
        },
    },
}
