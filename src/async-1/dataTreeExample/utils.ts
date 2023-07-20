import { v4 } from 'uuid';
import * as Yup from 'yup';
import { Child } from './atoms';
export function createDummyFiles(id: string): Child {
  const rn = Math.random() - 0.5 < 0 ? true : false;
  const data: Child = {
    id,
    name: rn ? 'src' : 'index.js',
    type: rn ? 'folder' : 'file',
    // we pass a children of an array after a request or a click in this case👍👍👍
    children: rn
      ? [
          { id: v4(), children: null },
          { id: v4(), children: null },
        ]
      : [],
  };

  return data;
}

export const validationSchemaFile = Yup.object().shape({
  input: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('name file Required')
    .matches(
      /^.*\.[^.]+$/,
      'please fill a valid name file with corresponding extension',
    ),
});
export const validationSchemaFolder = Yup.object().shape({
  input: Yup.string()
    .min(1, 'Too Short!')
    .max(70, 'Too Long!')
    .required('name folder Required'),
});

export const validationSchemaDefault = Yup.object().shape({
  input: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('name Required')
    .matches(/^.*\.[^.]+$/, 'please file a valid name file'),
});
