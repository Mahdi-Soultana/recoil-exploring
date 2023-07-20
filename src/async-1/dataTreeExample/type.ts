import * as Yup from 'yup';
export type ValidationSchemaInput = Yup.ObjectSchema<
  {
    input: string;
  },
  Yup.AnyObject,
  {
    input: undefined;
  },
  ''
>;
