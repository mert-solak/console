import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { range } from 'lodash';
import { useImmutableRef } from '@mertsolak/use-immutable-ref';

import { Props } from './Console.config';

import styles from './Console.module.scss';

export const Console: React.FC<Props> = ({ commands, containerClassName, terminalClassName }) => {
  const [terminal, setRef] = useImmutableRef<HTMLTextAreaElement>();

  const addConsoleSign = useCallback((nextLineCount: number = 0) => {
    let textWithSign = '';

    range(0, nextLineCount).forEach(() => {
      textWithSign += '\n';
    });

    textWithSign += '$ ';

    return textWithSign;
  }, []);

  const execute = useCallback((command: string) => {
    try {
      // eslint-disable-next-line no-new-func
      new Function(command)();
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }, []);

  const writeCommand = useCallback(
    (
      commandDelay: number,
      currentTerminal: HTMLTextAreaElement,
      speed: number,
      command: string,
      executable: boolean = false,
      lastCommand: boolean = false,
    ) => {
      const cloneOfCurrentTerminal = currentTerminal;

      [...command].forEach((char, index, array) => {
        const delay = speed * index;

        setTimeout(() => {
          if (index === 0) {
            cloneOfCurrentTerminal.value += addConsoleSign(commandDelay ? 2 : 0);
          }

          if (index === array.length - 1 && executable) {
            execute(command);
          }

          cloneOfCurrentTerminal.value += char;

          if (lastCommand && index === array.length - 1) {
            cloneOfCurrentTerminal.value += addConsoleSign(2);

            cloneOfCurrentTerminal.setSelectionRange(
              cloneOfCurrentTerminal.value.length,
              cloneOfCurrentTerminal.value.length,
            );
            cloneOfCurrentTerminal.focus();
          }
        }, commandDelay + delay);
      });
    },
    [],
  );

  const handleConsoleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const lastChar = event.target.value[event.target.value.length - 1];
      const { value } = event.target;

      if (lastChar === '$') {
        terminal.value += ' ';
        return;
      }

      const splitValueByLine = value.split(new RegExp('\\n'));
      const lastLine = splitValueByLine[splitValueByLine.length - 2];

      if ((lastChar?.match(new RegExp('\\n')) || []).length) {
        execute(lastLine.replace('$ ', ''));

        terminal.value += addConsoleSign(1);
      }
    },
    [terminal],
  );

  useEffect(() => {
    if (!terminal) {
      return;
    }

    let commandDelay = 0;
    commands.forEach((command, index) => {
      writeCommand(
        commandDelay,
        terminal,
        command.speed,
        command.command,
        command.isExecutable,
        index === commands.length - 1,
      );
      commandDelay += command.command.length * command.speed;
    });
  }, [terminal]);

  return (
    <div id="console" className={`${styles.container} ${containerClassName}`}>
      <div className={styles.header} />
      <textarea
        onChange={handleConsoleOnChange}
        ref={setRef}
        className={`${styles.terminal} ${terminalClassName}`}
      />
    </div>
  );
};
