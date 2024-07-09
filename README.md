# SMS-API-SERVER

in Progress - [SMS Wiki](./docs/SMS-TA-MANAGEMENT-TOOL.md) - link to docs

## System Requirements

- Node@18^ (20 preferred)
- PNPM@8^
- Docker@24^ - **optional|required for production emulation**

## Available Scripts

In the project directory, you can run:

- **`dev`**: Runs the app in development mode using `nodemon`.
- **`start`**: Runs the app using `ts-node` with support for `tsconfig-paths`.
- **`build`**: Compiles the TypeScript code using `tspc`.
- **`test`**: Runs the test suite using `jest`.
- **`test:watch`**: Runs the test suite in watch mode using `jest`.
- **`test:coverage`**: Runs the test suite and generates a coverage report using `jest`.
- **`lint`**: Lints the codebase using `eslint`.
- **`lint:fix`**: Lints and fixes the codebase using `eslint`.
- **`format`**: Formats the codebase using `prettier`.

## Production Deployment

Application builds a docker image and can be launched in a container using the following commands:

- `docker build -t sms-api-server:latest .`
- `docker run -p 3000:3000 -n chem-webtools sms-api-server:latest`

There is a shell script availiable to simplify the process of running the various docker cli commands required for setup and tear down of the application.

```bash
# <rootDir>/launch.sh
$>sh launch.sh
Docker made easy
Please select one of the following options:
1) Build docker image
2) Remove container
3) Create and run deattched container
4) Stop container
5) Exit
Enter your choice then press enter[1-5]: 
```
