import { Field, Form, Formik } from 'formik';
import { AiFillFolderOpen } from 'react-icons/ai';
import { BsFileEarmarkCode } from 'react-icons/bs';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { Child, childFamily, selectedAtom } from '../atoms';
import { ValidationSchemaInput } from '../type';
import { validationSchemaDefault } from '../utils';

function CreateInput({
  id,
  initialValue,
  className = 'rounded-sm p-2 py-1 text-xs mb-1 ',
  validationShema = validationSchemaDefault,
  type,
}: {
  id: string;
  initialValue: string;
  validationShema: ValidationSchemaInput;
  type: 'file' | 'folder';
  className?: string;
}) {
  const initialValueDefault = {
    input: initialValue,
  };
  const setSelected = useSetRecoilState(selectedAtom);
  const item = useRecoilValue(childFamily(id));

  // useEffect(() => {
  //   if (!item) return;
  //   if (item.type === 'folder') {
  //     setSelected({ file: null, folder: id });
  //   } else {
  //     setSelected((prevSelected) => ({
  //       file: id,
  //       folder: prevSelected?.folder,
  //     }));
  //   }
  // }, []);

  const callback = useRecoilCallback(
    ({ set }) =>
      (item: Child, { id, name }: { id: string; name: string }) => {
        set(childFamily(id), {
          ...item,
          name,
        });
      },
  );
  return (
    <Formik
      initialValues={initialValueDefault}
      validationSchema={validationShema}
      onSubmit={(values) => {
        if (item) {
          callback(item, { id, name: values.input });
        }
      }}
    >
      {(e) => {
        const { errors, isValid, values, dirty, setErrors } = e;

        return (
          <Form className="flex h-full  items-center relative">
            <div className="flex items-center ">
              <span className="flex-shrink-0 w-6 h-6  flex items-center justify-start ">
                {type == 'file' ? (
                  <BsFileEarmarkCode
                    size="17"
                    className={`${
                      errors.input ? 'text-red-500' : 'text-green-600'
                    }`}
                  />
                ) : (
                  <AiFillFolderOpen
                    size="17"
                    className={`${
                      errors.input ? 'text-red-500' : 'text-green-600'
                    }`}
                  />
                )}
              </span>

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
                className={` mb-0  h-full block outline-none ${
                  errors.input
                    ? 'border-red-500 border text-red-500'
                    : isValid && dirty
                    ? 'border-green-500 border text-green-900'
                    : 'border-gray-500 border text-gray-900'
                } ${className}`}
              />
              <p className="text-red-500 text-xs pl-1 pt-1  z-[3]">
                {errors.input}
              </p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateInput;
