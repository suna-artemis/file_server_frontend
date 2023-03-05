import style from './FileListItem.module.scss'

import {
  useCallback,
  MouseEvent,
  useState,
  CSSProperties,
  ChangeEvent,
} from 'react'

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  ListItem,
  Box,
  ListItemButton,
  Menu,
  MenuItem,
  Typography,
  Input,
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  ModifyType,
  FileItemType,
  ModifyHandler,
  FileItemProps,
} from '../../types/FileListItem'
import { fileNameValidator } from '../../Utils'

interface Props extends FileItemProps {
  parentDirectory: string
  onModify: ModifyHandler
  isBackToParent?: boolean
  onFileClick: (
    parentDirectory: string,
    fileName: string,
    fileType: FileItemType
  ) => void
  style?: CSSProperties
}

const FileItem = ({
  parentDirectory,
  fileName,
  fileType,
  isBackToParent = false,
  onFileClick: onClick,
  onModify,
  ...restProps
}: Props) => {
  const [stateFileName, setStateFileName] = useState(fileName)
  const [isEdit, setIsEdit] = useState(false)
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  const generateItemIcon = useCallback(() => {
    switch (fileType) {
      case FileItemType.DIRECTORY:
        return <FolderIcon />
      case FileItemType.FILE:
        return <InsertDriveFileIcon />
    }
  }, [fileType])

  const handleClick = () => {
    onClick(parentDirectory, fileName, fileType)
  }
  const handleFileNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setStateFileName(e.target.value)
  }
  const handleDownload = () => {
    console.log('download')
  }
  const handleRename = () => {
    const isAllowToRename = fileNameValidator(stateFileName.trim())
    setIsEdit(false)
  }
  const handleDelete = (e: MouseEvent) => {
    // prevent parent dom element caught click event
    e.stopPropagation()
    onModify(parentDirectory, fileName, ModifyType.DELETE)
  }
  const handleMenuClose = () => {
    setAnchor(null)
  }

  return (
    <ListItem
      {...restProps}
      className={style.ListItem}
      secondaryAction={
        !isBackToParent ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => {
                e.preventDefault()
                setAnchor(e.currentTarget)
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchor}
              open={!!anchor}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={(e) => {
                  e.preventDefault()
                  setIsEdit(true)
                  handleMenuClose()
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Rename</ListItemText>
                <Typography variant="body2" color="text.secondary" />
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <></>
        )
      }
    >
      <ListItemButton style={{ display: 'flex' }} onClick={handleClick}>
        <ListItemAvatar>
          <ListItemIcon>{generateItemIcon()}</ListItemIcon>
        </ListItemAvatar>
        {isEdit ? (
          <Input
            sx={{ width: '100%' }}
            value={stateFileName}
            onChange={handleFileNameChanged}
            onBlur={handleRename}
          />
        ) : (
          <ListItemText
            primary={fileName}
            secondary={null && parentDirectory}
          />
        )}
      </ListItemButton>
    </ListItem>
  )
}

export default FileItem
