import {
  ApiOutlined,
  BankOutlined,
  BulbOutlined,
  CalculatorOutlined,
  CarOutlined,
  ControlOutlined,
  ExperimentOutlined,
  ForkOutlined,
  GlobalOutlined,
  HeartOutlined,
  HomeOutlined,
  ReadOutlined,
  ScheduleOutlined,
  ShakeOutlined,
  ShoppingCartOutlined,
  SisternodeOutlined,
  SmileOutlined,
  SolutionOutlined,
  StarOutlined,
} from '@ant-design/icons'

import { CompanyFragment, EventFragment } from '../../services/lfca-backend'

const contains = (string: string, words: string[]) => {
  for (const word of words) {
    if (string?.toLowerCase()?.indexOf(word) > -1) return true
  }
  return false
}

export const matchStringToIcon = (s: string) => {
  if (contains(s, ['e-commerce'])) return <ShoppingCartOutlined />
  if (contains(s, ['energy'])) return <BulbOutlined />
  if (contains(s, ['machine'])) return <ControlOutlined />
  if (contains(s, ['agency'])) return <StarOutlined />
  if (contains(s, ['design'])) return <SmileOutlined />
  if (contains(s, ['transport'])) return <CarOutlined />
  if (contains(s, ['health'])) return <HeartOutlined />
  if (contains(s, ['construction'])) return <HomeOutlined />
  if (contains(s, ['education'])) return <ReadOutlined />
  if (contains(s, ['insurance', 'financial'])) return <BankOutlined />
  if (contains(s, ['gaming', 'media'])) return <ShakeOutlined />
  if (contains(s, ['accounting'])) return <CalculatorOutlined />
  if (contains(s, ['events'])) return <ScheduleOutlined />
  if (contains(s, ['marketing', 'b2b'])) return <ForkOutlined />
  if (contains(s, ['mobility'])) return <SisternodeOutlined />
  if (contains(s, ['events'])) return <ScheduleOutlined />
  if (contains(s, ['consul'])) return <SolutionOutlined />
  if (contains(s, ['tourism'])) return <GlobalOutlined />
  if (contains(s, ['api', 'cloud', 'tech'])) return <ApiOutlined />
  if (contains(s, ['chem', 'physics'])) return <ExperimentOutlined />
  return <HeartOutlined />
}

export const getUniqueParticipatingCompanies = (event: EventFragment) => {
  const uniqueCompaniesById = event.participants.reduce((acc, curr) => {
    if (
      'company' in curr.user &&
      curr.user.company?.id &&
      !acc[curr.user.company.id]
    ) {
      acc[curr.id] = curr.user.company
    }
    return acc
  }, {} as Record<string, Pick<CompanyFragment, 'id' | 'logoUrl'>>)

  return Object.values(uniqueCompaniesById)
}
