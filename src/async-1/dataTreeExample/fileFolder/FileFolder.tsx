import { useRecoilValue } from 'recoil';
import { childFamily } from '../atoms';
function FileFolder({
  parentId,

  id,
}: {
  parentId: string;

  id: string;
}) {
  const item = useRecoilValue(childFamily(id));
  if (!item) return null;
  const { type, name } = item;
  return (
    <ContainerFileFolder id={id}>
      {name == `rename ${type}` ? (
        <CreateInput
          id={id}
          validationShema={
            type == 'folder' ? validationSchemaFolder : validationSchemaFile
          }
          type={type}
          initialValue={`rename ${type}`}
        />
      ) : (
        <FileFolderContent id={id} parentId={parentId} />
      )}
    </ContainerFileFolder>
  );
}

import { validationSchemaFile, validationSchemaFolder } from '../utils';
import ContainerFileFolder from './ContainerFileFolder';
import CreateInput from './CreateInput';
import FileFolderContent from './FileFolderContent';

export default FileFolder;
