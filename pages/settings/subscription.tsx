import type { GetStaticProps, NextPage } from 'next'

import { BenefitsList } from '../../components/BenefitsList'
import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout/Container'
import { ContentfulContentCollectionFields } from '../../services/contentful'
import { fetchAllContentCollections } from '../../services/contentful/fetch-all-content-collections'
import { withAuth } from '../../utils/with-auth'

const Subscription: NextPage = ({
  content,
}: {
  content?: ContentfulContentCollectionFields[]
}) => {
  return (
    <SiderLayout>
      <Main>
        <Section title="Your subscription" titleSize="big">
          <Container>
            <BenefitsList content={content} />
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

export default withAuth(Subscription)
