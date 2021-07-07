## Console

Virtual console that visualizes typing and executing commands.

![npm](https://img.shields.io/npm/v/@mertsolak/console)
![license](https://img.shields.io/npm/l/@mertsolak/console)
![size](https://img.shields.io/bundlephobia/min/@mertsolak/console)
![issue](https://img.shields.io/github/issues/mert-solak/console)

## Installation

Use node package manager to install @mertsolak/console.

```bash
npm i @mertsolak/console
```

## Usage

```typescript
import { Console } from '@mertsolak/console';

const App = () => {
  const commands = [
    { speed: 25, command: 'console.log("command1");', isExecutable: true },
    { speed: 50, command: 'console.log("command2");', isExecutable: false },
  ];

  return <Console commands={commands} containerClassName="container" terminalClassName="terminal" />;
};
```
