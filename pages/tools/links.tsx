import type { GetStaticProps, NextPage } from 'next'

import { ContentList } from '../../components/ContentList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { ContentfulContentCollectionFields } from '../../services/contentful'
import { fetchAllContentCollections } from '../../services/contentful'
import { withAuth } from '../../utils/with-auth'

const Community: NextPage = ({
  content,
}: {
  content?: ContentfulContentCollectionFields[]
}) => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Links" titleSize="big">
          <Container>
            <ContentList content={content} />
          </Container>
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