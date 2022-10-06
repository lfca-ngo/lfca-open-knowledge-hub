import { MailOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import type { GetStaticProps, NextPage } from 'next'

import { ContentList } from '../components/ContentList'
import { Main, Section, SiderLayout } from '../components/Layout'
import { Container } from '../components/Layout/Container'
import { VideoWrapper } from '../components/VideoWrapper'
import { ContentfulContentCollectionFields } from '../services/contentful'
import { fetchAllContentCollections } from '../services/contentful'
import { DEFAULT_SUPPORT_EMAIL, PRODUCT_VIDEO_URL } from '../utils'
import { withAuth } from '../utils/with-auth'
const Support: NextPage = ({
  content,
}: {
  content?: ContentfulContentCollectionFields[]
}) => {
  return (
    <SiderLayout>
      <Main>
        <Container>
          <Section title="Do you need help?" titleSize="big">
            <p>
              {`Have a look at the following FAQs and resources to see if this
              helps resolve your support request. If you don't find what you are
              looking for, scroll down to the bottom of this page to contact us.`}
            </p>
          </Section>

          <Section bordered={false} title="FAQ" titleSize="default">
            <ContentList content={content} contentId="faq" type="accordion" />
          </Section>

          <Section bordered={false} title="How it works" titleSize="default">
            <p>
              If you would like to get an overview of how our Knowledge Hub
              works, have a look at the following video. It will give you a
              short tour of the most important areas.
            </p>
            <VideoWrapper
              sources={[{ src: PRODUCT_VIDEO_URL, type: 'video/mp4' }]}
            />
          </Section>

          <Section bordered={false} title="Contact us" titleSize="default">
            <p>
              If you could not resolve your request, shoot us an Email using the
              link below.
            </p>
            <a href={`mailto:${DEFAULT_SUPPORT_EMAIL}`}>
              <Button icon={<MailOutlined />} size="large" type="primary">
                Contact us
              </Button>
            </a>
          </Section>
        </Container>
      </Main>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await fetchAllContentCollections()

  return {
    props: {
      content,
    },
  }
}

export default withAuth(Support)
