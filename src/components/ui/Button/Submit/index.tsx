import React from 'react';
import { Button } from '@src/components/ui';
import { css } from '@emotion/react';
import { Spinner } from '@src/components/Icons';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  submitting: boolean;
  isDirty?: boolean;
  dirtyText?: string;
  cleanText?: string;
  hideOnClean?: boolean;
  formId?: string;
  inverted?: boolean;
  button?: React.FunctionComponent;
}

const Submit: React.FunctionComponent<ButtonProps> = ({
  cleanText,
  dirtyText,
  hideOnClean,
  submitting,
  isDirty,
  disabled,
  formId,
  button = Button,
  ...props
}) => {
  const cleanTxt = cleanText || props.children || 'Close';
  const dirtyTxt = dirtyText || props.children || 'Save';

  let holdSpace = dirtyTxt;

  if (((cleanTxt as string)?.length ?? 0) > ((dirtyTxt as string)?.length ?? 0)) {
    holdSpace = cleanTxt;
  }

  const ButtonElement = button;

  return (
    <ButtonElement
      {...props}
      css={css`
        min-width: 8rem;
        whitespace-no-wrap;
        padding-right: 1rem;
        padding-left: 1rem;
        visibility: ${hideOnClean && !isDirty && !submitting ? 'hidden' : ''}
        & div {
          top: -1px;
          position: relative;
        }
        &:disabled {
          cursor: auto;
        }
      `}
      className={`duration-200 transition-all flex-col relative ${props.className}`}
      type='submit'
      form={formId}
      disabled={disabled || submitting}
    >
      <>
        {
          <div
            className={`inline-flex m-auto ${!submitting && !isDirty ? '' : 'hidden'}`}
            css={css`
              position: relative;
              height: 0;
            `}
          >
            {cleanTxt}
          </div>
        }
        {
          <div
            className={`inline-flex m-auto ${!submitting && isDirty ? '' : 'hidden'}`}
            css={css`
              position: relative;
              height: 0;
            `}
          >
            {dirtyTxt}
          </div>
        }
        <Spinner
          alt='spinning'
          className={`spinner m-auto ${submitting ? 'visible' : 'invisible h-0'}`}
          css={css`
            position: absolute;
            height: 50%;
          `}
        />
        <div className='inline-flex invisible'>{holdSpace}</div>
      </>
    </ButtonElement>
  );
};

export default Submit;
