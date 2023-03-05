import { useManualQuery, useMutation } from 'graphql-hooks'
import FileListContainer from '../../components/file_list_container/FileListContainer'
import { FileItemProps, FileItemType } from '../../types/FileListItem'
import Header from '../../components/header/Header'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Backdrop, Container, Paper } from '@mui/material'
import RootDirectoryContainer from '../../components/root_directory/RootDirectoryContainer'
import { useEffect, useState } from 'react'
import { CURRENT_PARENT_DIRECTORY, ROOT_DIR } from '../../Consts'

//#region demo
const INFO_QUERY = /* GraphQL */ `
  query GetInfo {
    info
  }
`
const CREATE_LINK_WITH_DESC = /* GraphQL */ `
  mutation createLink($desc: String!, $url: String!) {
    postLink(desc: $desc, url: $url) {
      id
      desc
    }
  }
`
//#endregion

//#region request graphQL query and mutation
const UPLOAD_FILE_LIST_MUTATION = /* GraphQL */ `
  mutation uploadFileList($fileList: [File!]!) {
    uploadFileList(fileList: $fileList)
  }
`
const GET_FILE_INFO_LIST_BY_PARENT_DIRECTORY = /* GraphQL */ `
  query MyQuery($parentDirectory: String!) {
    parentDirectory(parentDirectory: $parentDirectory)
    fileItemList: getFileListByParentDirectory(
      parentDirectory: $parentDirectory
    ) {
      fileName: name
      fileType: type
    }
  }
`
//#endregion

const Index = () => {
  //#region mock data
  const mockFileItemList: FileItemProps[] = [
    {
      fileName: 'README.md',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.DIRECTORY,
    },
    {
      fileName: 'README.md',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.DIRECTORY,
    },
    {
      fileName: 'README.md',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.DIRECTORY,
    },
    {
      fileName: 'README.md',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.DIRECTORY,
    },
    {
      fileName: 'README.md',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.DIRECTORY,
    },
    {
      fileName: 'README.md',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.DIRECTORY,
    },
    {
      fileName: 'README.md',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.DIRECTORY,
    },
    {
      fileName: 'README.md',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.FILE,
    },
    {
      fileName: 'main.ts',
      fileType: FileItemType.DIRECTORY,
    },
  ]
  // query demo
  // const infoRes = useQuery(INFO_QUERY)

  // connect database demo
  // const [createLink] = useMutation(CREATE_LINK_WITH_DESC)

  //#endregion

  //#region declare state
  const [uploadFiles] = useMutation(UPLOAD_FILE_LIST_MUTATION)
  const [parentDirectoryList, setParentDirectoryList] = useState<string[]>([
    ROOT_DIR,
  ])
  //#endregion

  //#region graphQL-hooks
  // fetch file info list
  const [getFileInfoByParentDirectory, fileInfoRes] = useManualQuery(
    GET_FILE_INFO_LIST_BY_PARENT_DIRECTORY,
    {
      variables: {
        parentDirectory: parentDirectoryList.join(''),
      },
    }
  )
  //#endregion

  //#region use effect
  useEffect(() => {
    console.log('parentDirectoryList :>> ', parentDirectoryList)
    getFileInfoByParentDirectory({
      variables: { parentDirectory: parentDirectoryList.join('') },
    })
  }, [getFileInfoByParentDirectory, parentDirectoryList])
  //#endregion

  //#region handle method
  const handleFileSelected = (fileList: FileList) => {
    uploadFiles({
      variables: {
        fileList,
      },
    })
  }
  const handleFileClick = (
    parentDirectory: string,
    fileName: string,
    fileType: FileItemType
  ) => {
    if (
      fileType !== FileItemType.DIRECTORY ||
      (parentDirectoryList.length === 1 &&
        fileName === CURRENT_PARENT_DIRECTORY)
    ) {
      // only allow go into directory and disallow to root directory's parent
      return
    } else if (fileName === CURRENT_PARENT_DIRECTORY) {
      // go back to parent directory
      setParentDirectoryList(
        parentDirectoryList.slice(0, parentDirectoryList.length - 1)
      )
    } else {
      // go into target directory
      setParentDirectoryList(parentDirectoryList.concat(`${fileName}/`))
    }
  }
  //#endregion

  return (
    <Container maxWidth="xl">
      <Grid container={true} spacing={2} columnGap={2} disableEqualOverflow>
        <Grid sm={12} sx={{ mb: 2 }}>
          <Header />
        </Grid>
        {/* <Grid mdOffset={1} md={3}>
          <RootDirectoryContainer />
        </Grid> */}
        <Grid mdOffset={2} xs={12} md={8}>
          <Paper
            sx={(theme) => ({
              // p: '12px',
              position: 'relative',
              borderRadius: 4,
              mr: 2,
              margin: {
                xs: 4,
                md: 0,
              },
              height: {
                xs: 480,
                md: 720,
              },
            })}
          >
            {fileInfoRes.data && (
              <FileListContainer
                fileItemList={fileInfoRes.data.fileItemList}
                parentDirectory={parentDirectoryList.join('')}
                onFileSelected={handleFileSelected}
                onFileClick={handleFileClick}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
      <Backdrop open={!!fileInfoRes.loading} />
      {fileInfoRes.error && <>error</>}
    </Container>
  )
}

export default Index
