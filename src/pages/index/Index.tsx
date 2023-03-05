import { useMutation, useQuery } from 'graphql-hooks'
import FileListContainer from '../../components/file_list_container/FileListContainer'
import { FileItemProps, FileItemType } from '../../types/FileListItem'
import Header from '../../components/header/Header'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Container } from '@mui/material'
import RootDirectoryContainer from '../../components/root_directory/RootDirectoryContainer'

const INFO_QUERY = /* GraphQL */ `
  query GetInfo {
    info
  }
`

const UPLOAD_FILE_LIST_MUTATION = /* GraphQL */ `
  mutation uploadFileList($fileList: [File!]!) {
    uploadFileList(fileList: $fileList)
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

const Index = () => {
  // query demo
  const infoRes = useQuery(INFO_QUERY)
  console.log(infoRes)

  // upload file demo
  const [uploadFiles] = useMutation(UPLOAD_FILE_LIST_MUTATION)
  // connect database demo
  const [createLink] = useMutation(CREATE_LINK_WITH_DESC)

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
  const handleFileSelected = (fileList: FileList) => {
    uploadFiles({
      variables: {
        fileList,
      },
    })
  }

  return (
    <Container maxWidth="xl">
      <Grid container={true} spacing={2} columnGap={2} disableEqualOverflow>
        <Grid sm={12} sx={{ mb: 2 }}>
          <Header />
        </Grid>
        <Grid mdOffset={1} md={3}>
          <RootDirectoryContainer />
        </Grid>
        <Grid xs={12} md={7}>
          <FileListContainer
            fileItemList={mockFileItemList}
            parentDirectory="/root/"
            onFileSelected={handleFileSelected}
          />
        </Grid>
      </Grid>
      <button
        onClick={async () => {
          const res = await createLink({
            variables: {
              desc: 'desc from your react',
              url: 'url from your react',
            },
          })
          console.log('res :>> ', res)
        }}
      >
        create link
      </button>
    </Container>
  )
}

export default Index
