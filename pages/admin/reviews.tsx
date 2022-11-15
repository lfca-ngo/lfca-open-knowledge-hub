import type { NextPage } from 'next'

import { Main, Section, SiderLayout } from '../../components/Layout'
import { Container } from '../../components/Layout'
import { ReviewsAdminList } from '../../components/ReviewAdminList'
import { ADMIN_NAV } from '../../utils/navs'
import { withAuth } from '../../utils-server-only'

const Reviews: NextPage = () => {
  return (
    <SiderLayout nav={ADMIN_NAV}>
      <Main>
        <Section title="Reviews" titleSize="big">
          <Container>
            <ReviewsAdminList />
          </Container>
        </Section>
      </Main>
    </SiderLayout>
  )
}

export default withAuth(Reviews, { adminOnly: true })
