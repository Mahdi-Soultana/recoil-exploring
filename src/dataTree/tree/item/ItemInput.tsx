import { Field, Form, Formik } from 'formik';
import { produce } from 'immer';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import { isCreateAtom, itemStateFamily } from '../../atoms';
const validationSchemaDefault = Yup.object().shape({
  input: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('name Required')
    .matches(/^.*\.[^.]+$/, 'please file a valid name file'),
});

type ValidationSchemaInput = Yup.ObjectSchema<
  {
    input: string;
  },
  Yup.AnyObject,
  {
    input: undefined;
  },
  ''
>;

function ItemInput({
  id,
  initialValue,
  className = ' p-2 py-1 text-xs  ',
  validationShema = validationSchemaDefault,
  type,
  parent,
}: {
  id: string;
  parent: string;
  initialValue?: string;
  validationShema?: ValidationSchemaInput;
  type?: 'file' | 'folder' | 'default';
  className?: string;
}) {
  const initialValueDefault = {
    input: initialValue,
  };
  const setCreate = useSetRecoilState(isCreateAtom);

  const [item, setItem] = useRecoilState(itemStateFamily(id));

  return (
    <Formik
      initialValues={initialValueDefault}
      validationSchema={validationShema}
      onSubmit={(values) => {
        const newItem = produce(item, (draft) => {
          draft.name = values.input || '';
          draft.parent = parent;
          draft.type = type!;
          draft.id = v4();
        });
        setItem(newItem);
        setCreate(false);
      }}
    >
      {(e) => {
        const { errors, isValid, values, dirty, setErrors } = e;

        return (
          <Form className="flex relative h-full w-full  items-center ">
            <Field
              value={values.input}
              onBlur={() => {
                if (!dirty) {
                  setErrors({ input: 'please rename your ' + type });
                }
              }}
              name="input"
              autoFocus={true}
              placeholder={`${type == 'file' ? 'file.ts' : 'folderName'}`}
              className={`   w-full  h-full block outline-none ${
                errors.input
                  ? 'border-red-700 border text-red-700'
                  : isValid && dirty
                  ? 'border-blue-500 border text-blue-900'
                  : 'border-gray-500 border text-gray-900'
              } ${className}`}
            />
            {errors.input && (
              <p className="text-gray-100 text-xs absolute top-full left-0 w-full h-[20px] bg-red-600/90 capitalize  z-[3] px-4 border-red-700 border ">
                {errors.input}
              </p>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}

export default ItemInput;
