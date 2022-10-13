/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
import React from 'react';
import { FieldValues, FormState, useFormContext, UseFormReturn } from 'react-hook-form';

import { Form, Input } from '@src/components/ui';
import { FormProps, SubmitError } from '@src/components/ui/Form';

function throwError(e: any): any {
  const error = e;

  if (!error) {
    throw new SubmitError({ _: e.message });
  }

  if (error.message) {
    throw new SubmitError({
      _: error.message,
    });
  }
}

const useBeforeUnloadBrowserDialog = (dirty: boolean) => {
  const handleBeforeunload = (event: any) => {
    if (dirty) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  React.useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, [dirty]);
  return null;
};

const UnsavedChangesDialog: React.FunctionComponent = () => {
  const formHandlers = useFormContext();
  const { formState } = formHandlers;
  const { isDirty } = formState;

  // on page change using browser
  useBeforeUnloadBrowserDialog(isDirty);

  return null;
};

const MainForm: React.FunctionComponent<FormProps> = ({ showUnsavedChangesDialog, ...props }) => {
  return (
    <Form
      {...props}
      showUnsavedChangesDialog={showUnsavedChangesDialog || false}
      onSubmit={async (
        values: any,
        defaultValues: any,
        formState: FormState<any> | undefined,
        formHandlers: UseFormReturn<FieldValues, any> | undefined
      ) => {
        try {
          props.onSubmit && (await props.onSubmit(values, defaultValues, formState, formHandlers));
        } catch (e: any) {
          console.error('Form Error: ', e);

          if (e.name === 'SubmitError') {
            throw e;
          }

          // TODO: How do we show error if not e.graphQLErrors ?
          if (e.graphQLErrors) throwError(e);

          throw e;
        }
      }}
    >
      {showUnsavedChangesDialog && <UnsavedChangesDialog />}
      <Form.Field name='id' component={Input} type='hidden' className='hidden' />
      {props.children}
    </Form>
  );
};

export default MainForm;
