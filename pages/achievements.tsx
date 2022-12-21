import { List } from 'antd'
import type { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { Main, Section, TopNavLayout } from '../components/Layout'
import {
  ContentfulProgramFields,
  fetchAllPrograms,
} from '../services/contentful'

interface DashboardProps {
  programs: ContentfulProgramFields[]
}

const Achievements: NextPage<DashboardProps> = ({ programs }) => {
  return (
    <TopNavLayout>
      <Main>
        <div style={{ margin: '20px 0 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px' }}>Programs</h1>
        </div>

        <Section bordered={false} id="browse-actions">
          <List
            dataSource={programs}
            renderItem={(program) => <List.Item>{program.name}</List.Item>}
          />
        </Section>
      </Main>
    </TopNavLayout>
  )
}

export const getStaticProps: GetStaticProps<DashboardProps> = async () => {
  const programs = await fetchAllPrograms()

  return {
    props: {
      programs,
    },
  }
}

export default Achievements
