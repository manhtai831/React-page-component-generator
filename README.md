# React Component Generator

Package fork from [React Component Generator [v2.2.8]](https://marketplace.visualstudio.com/items?itemName=IgorMatosDev.react-component-generator-full)

A Visual Studio Code extension for quickly generating React component folders with customizable file templates.

## Features

- Generate React components with a single command
- Automatically create associated files such as styles and tests
- Fully customizable file templates
- Supports placeholders for dynamic content

### Usage

![](https://raw.githubusercontent.com/igormatosDev/react-component-generator/master/demo.gif)

1. Right-click on a folder in the Explorer panel where you want to create a new component.
2. Select "Create React Component" from the context menu.
3. Enter the name of the new component in the input box that appears.
4. The extension will generate a new folder with the specified component name and create the necessary files inside it.

## Configuration

You can customize the generated files by updating the following settings in your VS Code settings:

- `react-component-generator.componentFile`: File name for the main component file (use `$COMPONENT_NAME` as a placeholder). Default: `$COMPONENT_NAME.tsx`
- `react-component-generator.componentContent`: Content for the main component file (use `$COMPONENT_NAME` as a placeholder). Default: [basic functional component template]
- `react-component-generator.styleFile`: File name for the style file (use `$COMPONENT_NAME` as a placeholder). Default: `$COMPONENT_NAME.module.scss`
- `react-component-generator.indexFile`: File name for the index file. Default: `index.ts`
- `react-component-generator.indexContent`: Content for the index file (use `$COMPONENT_NAME` as a placeholder). Default: `export { default } from './$COMPONENT_NAME';\n`
- `react-component-generator.testFile`: File name for the test file (use `$COMPONENT_NAME` as a placeholder, leave empty to disable). Default: ""
- `react-component-generator.testFileContent`: Content for the test file (use `$COMPONENT_NAME` as a placeholder). Default: [basic test template using React Testing Library]

To configure these settings, go to File > Preferences > Settings (or Code > Preferences > Settings on macOS), and search for "React Component Generator" or the name of your extension in the search bar at the top of the Settings tab.

## Example

Let's say you want to generate a new component called `MyComponent`. After installing the extension, right-click on the folder where you want to create the component and select "Create React Component". Enter `MyComponent` in the input box that appears.

The extension will generate a new folder named `MyComponent` and create the following files inside it:

- `MyComponent.tsx`: The main component file with a basic functional component template.
- `MyComponent.module.scss`: An empty SCSS module file for styling the component.
- `index.ts`: An index file that exports the component.

If you have configured a test file, it will also generate a test file with the specified name and content.

## Contributing

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/your-github-username/react-component-generator/issues) on GitHub.

Contributions are welcome! Feel free to submit a pull request with bug fixes or new features.

## License

This extension is released under the [MIT License](https://opensource.org/licenses/MIT).
