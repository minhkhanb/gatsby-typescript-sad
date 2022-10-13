/* eslint-disable @typescript-eslint/no-explicit-any, no-unused-vars, react-hooks/exhaustive-deps, react-hooks/rules-of-hooks */
import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useDebouncedCallback from '@src/hooks/useDebouncedCallback';
import { withProperties } from '@src/utils';
import ReactDOM from 'react-dom';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useId } from 'react-id-generator';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import tw from 'twin.macro';
import Button from '../Button';
import DirtyFormContext from '@src/components/Router/DirtyFormContext';
import { ReactComponent as CheckIcon } from '@src/assets/images/check.svg';
import type Lazy from 'yup/lib/Lazy';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { FormState } from 'react-hook-form/dist/types/form';
import { ErrorMessage } from '@hookform/error-message';

yup.setLocale({
  mixed: {
    default: 'This field is invalid.',
    required: 'This field is required.',
  },
  string: {
    email: 'Please provide a valid email address.',
    url: 'Please provide a valid URL.',
  },
});
enum SubmitMode {
  onSubmitButton = 'onSubmitButton',
  onChangeDebounced = 'onChangeDebounced',
}

type Value = string | number | boolean | DefaultValues;
interface DefaultValues {
  [key: string]: Value | Value[];
}

export interface FormProps {
  className?: string;
  children?: any;
  /**  Specify when onSubmit is called. */
  submitMode?: SubmitMode;
  onSubmit?: (
    values: any,
    defaultValues?: any,
    formState?: FormState<any>,
    formHandlers?: UseFormReturn<FieldValues, any>
  ) => any;
  validationSchema?: yup.AnyObjectSchema | Lazy<any, unknown>;
  defaultValues?: any;
  mode?: 'onBlur' | 'onSubmit' | 'onChange' | undefined;
  showUnsavedChangesDialog?: boolean;
}

interface FieldLabelProps {
  title: any;
  className?: string;
}

interface FormComponent extends React.FunctionComponent<FormProps> {
  Field: any;
  FieldLabel: React.FunctionComponent<FieldLabelProps>;
  ErrorMessage: React.FunctionComponent<any>;
  Status: React.FunctionComponent<any>;
}

interface Errors {
  [key: string]: string;
}

interface FormOptions {
  submitMode?: SubmitMode;
  onSubmit?: (
    values: any,
    defaultValues?: any,
    formState?: FormState<any>,
    formHandlers?: UseFormReturn
  ) => any;
  formId: string;
  imageUpload: { [key: string]: boolean };
  setImageUpload: React.Dispatch<{ [key: string]: any }>;
}

export const FormOptionsContext = React.createContext<FormOptions | any>({});

const Form: FormComponent = ({
  mode = 'onSubmit',
  validationSchema,
  submitMode = SubmitMode.onSubmitButton,
  defaultValues = {},
  showUnsavedChangesDialog,
  ...props
}: FormProps) => {
  const formHandlers = useForm<any>({
    mode,
    resolver: validationSchema && yupResolver(validationSchema),
    defaultValues,
  });
  React.useEffect(() => {
    // Don't reset if dirty
    // The reality is this should only reset if any of the fields this form cares
    // about have changed - not any field in defaultValues
    if (defaultValues && !formHandlers.formState.isDirty) {
      formHandlers.reset(defaultValues);
    }
  }, [formHandlers.reset, JSON.stringify(defaultValues)]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // this part is for stopping parent forms to trigger their submit
    if (event) {
      // sometimes not true, e.g. React Native
      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === 'function') {
        // prevent any outer forms from receiving the event too
        event.stopPropagation();
      }
    }

    return formHandlers.handleSubmit(async (values) => {
      try {
        props.onSubmit &&
          (await props.onSubmit(values, defaultValues, formHandlers.formState, formHandlers));
      } catch (e: any) {
        console.info('SUBMIT ERROR: ', typeof e, ' >', e, '<');
        if (e instanceof SubmitError && e.errors) {
          Object.keys(e.errors).map((name) => formHandlers.setError(name, e.errors[name]));
        } else {
          formHandlers.setError('_', e.toString());
        }
      }
    })(event);
  };

  // create state for uploading image
  const [imageUpload, setImageUpload] = React.useState({});

  const formRef = React.useRef<HTMLFormElement>(null);
  const [formId] = useId();

  // read dirty form context
  const { forms, setForms } = React.useContext(DirtyFormContext);

  // update dirty form context when dirty state changes
  React.useEffect(() => {
    if (showUnsavedChangesDialog) {
      // update dirty state in context
      setForms({
        ...forms,
        [formId]: {
          dirty: formHandlers.formState.isDirty,
          isSubmitting: formHandlers.formState.isSubmitting,
          submit: onSubmit,
          reset: formHandlers.reset,
          triggerValidation: formHandlers.trigger,
        },
      });
    }

    return () => {
      const newState = { ...forms };
      delete newState[formId];
      setForms(newState);
    };
  }, [formHandlers.formState.isDirty, formHandlers.formState.isSubmitting]);

  return (
    <FormOptionsContext.Provider
      value={{ submitMode, onSubmit, formId, imageUpload, setImageUpload }}
    >
      <FormProvider {...formHandlers}>
        <form {...props} id={formId} onSubmit={onSubmit} ref={formRef}>
          {props.children}
        </form>
      </FormProvider>
    </FormOptionsContext.Provider>
  );
};

export class SubmitError extends Error {
  errors: Errors;

  constructor(errors: Errors) {
    super('SubmitError');
    this.name = 'SubmitError';
    this.errors = errors;
  }
}

Form.FieldLabel = ({ title, className }) => (
  <div className={`text-md text-color-input-field mb-1/2e ${className}`}>{title}</div>
);

interface FieldProps {
  name: string;
  component: any;
  errors: any;
  onChange?: any;
  className?: string;
  type?: string;
}

Form.Field = styled(({ name, className, component, errors, ...props }: FieldProps) => {
  const { formState } = useFormContext();
  const { errors: contextErrors } = formState;

  return (
    <div css={tw`mb-4`} className={`flex flex-col ${className}`}>
      <Form.Field.Input {...props} name={name} component={component} onChange={props.onChange} />
      {props.type !== 'hidden' && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }: any) => {
            message = message || contextErrors[name]?.message || '';

            return (
              <Label basic color='red' pointing className='error-message'>
                {message}
              </Label>
            );
          }}
        />
      )}
    </div>
  );
})``;

Form.Field.Input = styled(({ name, component: Component, inputRef, ...props }: any) => {
  const { onSubmit, submitMode } = React.useContext(FormOptionsContext);
  const formHandlers = useFormContext();

  const onSubmitDebounced = useDebouncedCallback(async () => {
    submitMode === SubmitMode.onChangeDebounced && (await onSubmit());
  });

  const { control } = formHandlers;

  const onChange = (
    evt: React.ChangeEvent<any>,
    onChangeController: ControllerRenderProps['onChange']
  ) => {
    if (evt === undefined) return null;

    const value = evt.target ? evt.target.value : evt;

    onSubmitDebounced();

    onChangeController(evt);
    props.onChange && props.onChange(value);

    return value;
  };

  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Component
            {...field}
            {...props}
            ref={inputRef}
            onChange={(evt: React.ChangeEvent) => onChange(evt, field.onChange)}
          />
        );
      }}
    />
  );
})``;

interface SubmitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  dirtyText?: string;
  cleanText?: string;
  children?: any;
  containerId?: string;
  className?: string;
  disabled?: boolean;
  hideOnClean?: boolean;
  button?: FunctionComponent;
  submitting?: boolean;
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  containerId,
  hideOnClean,
  submitting,
  ...props
}) => {
  const { formState } = useFormContext();
  const { formId, imageUpload } = React.useContext(FormOptionsContext);

  // is there any image uploading
  const isImageUploading = imageUpload && Object.values(imageUpload).includes(true);

  const { isSubmitting, isDirty, isValid, isSubmitted } = formState;

  if (!isDirty && hideOnClean) {
    return null;
  }

  const disabled =
    props.disabled || isSubmitting || (!isDirty && !isValid && isSubmitted) || isImageUploading;

  const hasErrors = !isDirty && !isValid && isSubmitted && !isSubmitting;

  const children = (
    <Button.Submit
      isDirty={isDirty}
      submitting={isSubmitting || !!submitting}
      disabled={disabled}
      formId={formId}
      {...props}
      className={`${hasErrors ? 'bg-color-error' : ''} ${props.className}`}
    />
  );

  if (containerId) {
    const el = document.getElementById(containerId);

    return el ? ReactDOM.createPortal(children, el) : null;
  } else {
    return children;
  }
};

interface FormErrorMessageProps {
  className?: string;
  message?: string;
}

Form.ErrorMessage = ({
  className,
  message = 'Please check required fields and errors in this form.',
}: FormErrorMessageProps) => {
  const { formState } = useFormContext();
  const { errors } = formState;

  let errorMessage: any = '';

  if (Object.entries(errors).length > 0) {
    errorMessage = errors._ ? errors._.message : message;
  }

  if (!errorMessage || errorMessage.length === 0) {
    return null;
  }

  return (
    <div
      className={className}
      css={css`
        ${tw`text-red-600 mb-4`}
      `}
    >
      {errorMessage}
    </div>
  );
};

Form.Status = (props: { className?: string }) => {
  const { formState } = useFormContext();
  const { isSubmitted, isDirty, isValid } = formState;
  const isSaved = !isDirty && isSubmitted && isValid;

  return (
    <div
      css={css`
        ${!isSaved && tw`opacity-0`}
      `}
      className={`flex items-center bg-blue-1 text-blue-3 rounded-full py-2 px-3 transition-color duration-500 ${props.className}`}
    >
      <img alt='check' className='pr-2 h-6' src={CheckIcon} />
      Changes saved!
    </div>
  );
};

export default withProperties(Form, { SubmitMode, SubmitButton });
