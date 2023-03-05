import style from './FileListContainer.module.scss'

import { List, Paper } from '@mui/material'
import FileItem from '../../components/list/FileListItem'
import {
  ModifyType,
  DeleteOpts,
  FileItemProps,
  FileItemType,
} from '../../types/FileListItem'
import { CURRENT_DIRECTORY } from '../../Consts'
import UploadSpeedDial from '../upload/UploadSpeedDial'

interface Props {
  fileItemList: FileItemProps[]
  parentDirectory: string
  onFileSelected: (fileList: FileList) => void
}

const FileListContainer = ({
  parentDirectory,
  fileItemList,
  onFileSelected: onUpload,
}: Props) => {
  const onRowClick = (
    parentDirectory: string,
    fileName: string,
    fileType: FileItemType
  ) => {
    console.log('row clicked', parentDirectory, fileName)
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
    <Paper
      sx={(theme) => ({
        p: '12px',
        position: 'relative',
        borderRadius: 4,
        mr: 2,
        margin: {
          xs: 4,
          md: 0,
        },
      })}
    >
      <List
        className={style.FileListContainer}
        sx={{
          height: {
            xs: 480,
            md: 720,
          },
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
            fileName={CURRENT_DIRECTORY}
            fileType={FileItemType.DIRECTORY}
            parentDirectory={parentDirectory}
            onClick={() =>
              onRowClick(parentDirectory, '', FileItemType.DIRECTORY)
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
            onClick={onRowClick}
            onModify={onModify}
          />
        ))}
      </List>
      <UploadSpeedDial onFileSelected={onUpload} />
    </Paper>
  )
}

export default FileListContainer
