# Auto Pack CRM

Auto Pack CRM is a project that utilizes various packages for building a responsive CRM application. The project includes a custom theme configuration and uses Vite for development.

## Theme Configuration

The project uses Material-UI for styling and theming. The theme configuration is defined in the `ThemeProvider` component located in the `src/theme/ThemeProvider.tsx` file. This component provides a custom theme with predefined colors, shadows, typography, and other styling options.

### Theme Variants

The theme provides various variants and customization options. You can find these in the `src/theme` directory:

- **palette.ts**: Defines the color palette used in the theme.
- **shadows.ts**: Configures the shadow options for the theme.
- **overrides.ts**: Overrides the default styles of Material-UI components.
- **typography.ts**: Defines the typography styles for the theme.
- **custom-shadows.ts**: Configures custom shadows for the theme.

## Getting Started

Follow these steps to get started with the Auto Pack CRM project:

1. Install project dependencies:

   ```bash
   npm install

   ```

2. Run the Development Server

   npm run dev

3. Build the Project

npm run build

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```
