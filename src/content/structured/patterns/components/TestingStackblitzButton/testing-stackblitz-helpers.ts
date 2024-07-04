import kebabCase from "lodash.kebabcase";
import startCase from "lodash.startcase";

const designSystemPackageJson = require("../../../../../../package.json");

//! whats the bare minimum to get a cypress testing suite up and running?

export const createCyTestFile = (componentName: string) => {
  const component = startCase(componentName.replace(/\(.*?\)/g, "")).replace(
    /\s/g,
    ""
  );
  return `/// <reference types="cypress" />

describe('${component}', () => {
  it('renders', () => {
 mount(<SimpleAccordion />);
     cy.get('body').should('exist');
  });
}
`;
};

export const createCyConfigFile = () => {
  return `/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "cypress";

export const config: Cypress.ConfigOptions = {
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    fixturesFolder: "./src/component-tests",
    setupNodeEvents(on, config) {
      const getCompareSnapshotsPlugin = require("cypress-image-diff-js/plugin");
      getCompareSnapshotsPlugin(on, config);
      on('before:browser:launch', (_browser, launchActions) => {
        launchActions.preferences.width = 1600;
        launchActions.preferences.height = 1080;
        return launchActions;
      });
      config.browsers = config.browsers.filter((b) => b.name == 'electron')
      return config;
    },
    supportFile: "./cypress/support/index.ts",
    retries: {
      runMode: 3,
      openMode: 0
    },
  },
}

export default defineConfig(config);`;
};

export const packageJson = (
  projectTitle: string,
  fileExtension: "jsx" | "tsx"
) => {
  const dependenciesArray = [
    ["@mdi/js", "^7.4.47"],
    ["@ukic/fonts", `${designSystemPackageJson.dependencies["@ukic/fonts"]}`],
    ["@ukic/react", `${designSystemPackageJson.dependencies["@ukic/react"]}`],
    ["react", "^18.2.0"],
    ["react-dom", "^18.2.0"],
    ["react-jss", "^10.10.0"],
    ["react-router-dom", "^6.22.0"],
    ["cypress", "^13.3.1"],
    ["cypress-axe", "^1.5.0"],
    ["cypress-file-upload", "^5.0.8"],
    ["cypress-image-diff-js", "^2.1.3"],
    ["cypress-real-events", "^1.12.0"],
  ];

  if (fileExtension === "tsx") {
    dependenciesArray.splice(3, 0, [
      "@ukic/web-components",
      `${designSystemPackageJson.dependencies["@ukic/web-components"]}`,
    ]);
  }

  const dependencies = Object.fromEntries(dependenciesArray);

  const reactDevDependencies = {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
  };
  const devDependencies = { vite: "^5.0.12" };

  return {
    name: `icds-${kebabCase(projectTitle)}`,
    version: "0.0.0",
    private: true,
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
      prettier: "prettier --write .",
    },
    dependencies,
    devDependencies: { ...devDependencies, ...reactDevDependencies },
    stackblitz: {
      startCommand:
        "npm i --save-dev prettier && npm run prettier && npm run cypress:component",
    },
  };
};

export const tsConfig = `{
    "compilerOptions": {
      "jsx": "react-jsx",
      "lib": ["DOM", "ES2022"],
      "moduleResolution": "node",
      "target": "ES2022"
    }
  }`;

export const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;
