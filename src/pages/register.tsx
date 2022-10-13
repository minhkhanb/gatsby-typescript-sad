import React from 'react';
import NoAuth from '@src/components/NoAuth';
import { RouterProps } from '@gatsbyjs/reach-router';
import { Button, Form, Input } from '@src/components/ui';
import * as yup from 'yup';
import MainForm from '@src/components/MainForm';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const defaultValues = {
  email: '',
};

const Register = ({ location }: RouterProps) => {
  const [loading] = React.useState<boolean>(false);
  const ref = React.useRef(null);

  return (
    <NoAuth location={location}>
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 sss'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Your Company'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Sign up for free
            </h2>
          </div>

          <MainForm
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log('submitted: ', values);
            }}
          >
            <Form.Field
              name='email'
              component={Input}
              placeholder='Email Address'
              inputRef={ref}
              id='email'
            />

            <Button.Submit submitting={loading}>Get Started for Free</Button.Submit>
          </MainForm>
        </div>
      </div>
    </NoAuth>
  );
};

export default Register;
