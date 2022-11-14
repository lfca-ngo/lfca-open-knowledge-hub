import type { GetStaticProps, NextPage } from 'next'

import { ContentList } from '../../components/ContentList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import {
  ContentfulContentCollectionFields,
  fetchContentCollectionById,
} from '../../services/contentful'
import { withAuth } from '../../utils-server-only'

const Community: NextPage = ({
  content,
}: {
  content?: ContentfulContentCollectionFields
}) => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Links" titleSize="big">
          <Container>
            <ContentList content={content} type="list" />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await fetchContentCollectionById('community')

  return {
    props: {
      content,
    },
  }
}

export default withAuth(Community)
