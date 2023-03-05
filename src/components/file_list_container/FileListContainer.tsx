import style from './FileListContainer.module.scss'

import { List, Paper } from '@mui/material'
import FileItem from '../../components/list/FileListItem'
import {
  ModifyType,
  DeleteOpts,
  FileItemProps,
  FileItemType,
} from '../../types/FileListItem'
import { CURRENT_PARENT_DIRECTORY } from '../../Consts'
import UploadSpeedDial from '../upload/UploadSpeedDial'

interface Props {
  fileItemList: FileItemProps[]
  parentDirectory: string
  onFileClick: (
    parentDirectory: string,
    fileName: string,
    fileType: FileItemType
  ) => void
  onFileSelected: (fileList: FileList) => void
}

const FileListContainer = ({
  parentDirectory,
  fileItemList,
  onFileSelected,
  onFileClick,
}: Props) => {
  const handleFileClick = (
    parentDirectory: string,
    fileName: string,
    fileType: FileItemType
  ) => {
    console.log('row clicked', parentDirectory, fileName)
    onFileClick(parentDirectory, fileName, fileType)
  }
  const onModify = (
    name: string,
    parentDirectory: string,
    type: ModifyType,
    opts?: DeleteOpts
  ) => {
    switch (type) {
      case ModifyType.DELETE:
        console.log('deleted!', parentDirectory)
        break
      case ModifyType.MOVE:
        console.log('move', parentDirectory, opts)
        break
      case ModifyType.RENAME:
        console.log('rename', parentDirectory, opts)
    }
  }
  return (
    <>
      <List
        className={style.FileListContainer}
        sx={{
          // height: {
          //   xs: 480,
          //   md: 720,
          // },
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: -8,
            backgroundColor: '#fff',
            zIndex: 1001,
          }}
        >
          <FileItem
            fileName={CURRENT_PARENT_DIRECTORY}
            fileType={FileItemType.DIRECTORY}
            parentDirectory={parentDirectory}
            onFileClick={() =>
              handleFileClick(
                parentDirectory,
                CURRENT_PARENT_DIRECTORY,
                FileItemType.DIRECTORY
              )
            }
            onModify={() => {}}
            isBackToParent={true}
          ></FileItem>
        </div>
        {fileItemList.map(({ fileName, fileType }) => (
          <FileItem
            key={parentDirectory + fileName}
            fileName={fileName}
            fileType={fileType}
            parentDirectory={parentDirectory}
            onFileClick={handleFileClick}
            onModify={onModify}
          />
        ))}
      </List>
      <UploadSpeedDial onFileSelected={onFileSelected} />
    </>
  )
}

export default FileListContainer
