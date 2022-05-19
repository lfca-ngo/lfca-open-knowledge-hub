import type { GetStaticProps, NextPage } from 'next'

import { ContentList } from '../components/ContentList'
import { Main, Section, SiderLayout } from '../components/Layout'
import { ContentfulContentCollectionFields } from '../services/contentful'
import { fetchAllContentCollections } from '../services/contentful/fetch-all-content-collections'
import { withAuth } from '../utils/with-auth'

const Community: NextPage = ({
  content,
}: {
  content?: ContentfulContentCollectionFields[]
}) => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Community" titleSize="big">
          <ContentList content={content} />
        </Section>
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

export default withAuth(Community)
