import { useRecoilState } from 'recoil';
import * as Yup from 'yup';
import { ItemType, itemStateFamily } from '../../atoms';
import ItemInput from './ItemInput';
function ItemContent({
  name,
  id,
  parent,
  type,
}: {
  name: string;
  parent: string;
  id: string;
  type: ItemType;
}) {
  const [item, setItem] = useRecoilState(itemStateFamily(id));

  const validationSchemaFile = Yup.object().shape({
    input: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('name Required')
      .matches(/^.*\.[^.]+$/, 'please file a valid name file'),
  });
  const validationSchemaFolder = Yup.object().shape({
    input: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('name Required')
      .matches(/^[^.]*$/, 'please file a valid name folder'),
  });
  // console.log({ type });
  return (
    <>
      {name !== 'default' ? (
        <p className="text-sm  " onClick={() => console.log(item)}>
          {name}
        </p>
      ) : (
        <ItemInput
          parent={parent}
          initialValue="hello"
          id={id}
          type={type}
          validationShema={
            type == 'folder' ? validationSchemaFolder : validationSchemaFile
          }
        />
      )}
    </>
  );
}

export default ItemContent;
