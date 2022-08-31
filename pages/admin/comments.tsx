import { DownloadOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout'
import { useCreateActionCommentExportMutation } from '../../services/lfca-backend'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils/with-auth'

const Comments: NextPage = () => {
  const [{ fetching: isExporting }, exportActionComments] =
    useCreateActionCommentExportMutation()

  const handleExport = () => {
    exportActionComments().then(({ data, error }) => {
      if (error) message.error(error.message)
      const url = data?.createActionCommentExport
      if (url) {
        window.location.assign(url)
      }
    })
  }

  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Comments" titleSize="big">
          <Container>
            <Button
              icon={<DownloadOutlined />}
              loading={isExporting}
              onClick={() => handleExport()}
              type="ghost"
            >
              Export
            </Button>
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Comments, { adminOnly: true })
