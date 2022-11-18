import { InfoCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Popover,
  Row,
  Select,
  Space,
  Tag,
} from 'antd'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ONBOARDING_STEPS, useAnalytics } from '../../../hooks/segment'
import { useBreakpoints } from '../../../hooks/useBreakpoints'
import useIsClient from '../../../hooks/useIsClient'
import { OnboardingSharedStateProps } from '../../../pages/onboarding'
import companyTagStatsData from '../../../public/data/_company-tag-stats.json'
import companyTagsData from '../../../public/data/_company-tags-data.json'
import subscriptionsData from '../../../public/data/_subscriptions-data.json'
import { Country } from '../../../services/contentful'
import { CompanySubscriptionType } from '../../../services/lfca-backend'
import {
  getTextFromOptionChildren,
  isVentureCapitalCompany,
} from '../../../utils'
import { CLOUDINARY_PRESETS } from '../../FileUpload/helper'
import { ImageUpload } from '../../FileUpload/ImageUpload'
import { DefaultStepProps } from './..'
import styles from './styles.module.less'

const { useForm, useWatch } = Form

const BASIC_PLAN = subscriptionsData.find(
  (s) => s.name === CompanySubscriptionType.BASIC
)
const COMMUNITY_ADMITTANCE_URL =
  'https://lfca.earth/become-a-member#requirements'

const FUND_SIZE_OPTIONS = BASIC_PLAN?.pricingVentureCapital.reduce(
  (acc, val, i) => {
    const prev = acc[i - 1]

    acc.push({
      key: val.maxFundsize || 0,
      label: `${prev ? `${prev.key + 1} -` : '<'} ${val.maxFundsize}`,
    })

    return acc
  },
  [] as Array<{ key: number; label: string }>
)

const SECTOR_OPTIONS = companyTagsData.map((t) => ({
  key: t,
  label: t,
}))

export interface CompanyInfoFormProps {
  country: string
  fundSize?: number
  name: string
  employeeCount: number
  tags: string[]
  logoUrl: string
}

export const CompanyInfo = ({
  countries,
  country,
  onNext,
  setSharedState,
  sharedState,
  title,
}: DefaultStepProps & {
  countries: Country[]
  country?: string | string[]
  sharedState?: OnboardingSharedStateProps
  setSharedState?: (state: OnboardingSharedStateProps) => void
}) => {
  const analytics = useAnalytics()
  const isDesktop = useBreakpoints().md
  const [companyInfoForm] = useForm()
  const [otherCompanies, setOtherCompanies] = useState<number | null>(null)
  const sectorStats = companyTagStatsData as { [key: string]: number }
  const selectedTags = useWatch('tags', companyInfoForm) || []
  const isVC = isVentureCapitalCompany(selectedTags)

  const onValuesChange = (
    changedValue: CompanyInfoFormProps,
    allValues: CompanyInfoFormProps
  ) => {
    if (allValues?.tags?.length > 0 && changedValue.tags) {
      let countOtherCompanies = 0
      for (const tag of allValues?.tags) {
        countOtherCompanies += sectorStats[tag]
      }
      setOtherCompanies(countOtherCompanies)
    } else if (allValues?.tags?.length === 0) {
      setOtherCompanies(null)
    }
  }

  const onFinish = (allValues: CompanyInfoFormProps) => {
    // completed form
    analytics.track(ONBOARDING_STEPS.COMPLETED_COMPANY_INFO_STEP)

    setSharedState?.({ ...sharedState, company: allValues })
    onNext?.()
  }

  // resync form state
  useEffect(() => {
    companyInfoForm.setFieldsValue(sharedState?.company)
  }, [companyInfoForm, sharedState])

  // update based on url param
  useEffect(() => {
    if (countries.findIndex((c) => c.countryCode === country) > -1) {
      companyInfoForm.setFieldValue('country', country)
    }
  }, [country, countries, companyInfoForm])

  // track start of onboarding funnel
  useIsClient(() => {
    analytics.track(ONBOARDING_STEPS.STARTED_ONBOARDING)
  })

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Welcome! 👋`}</h1>
      <div className="description">
        {`To get started, we need to collect some basic information about the organization that you represent.`}
      </div>

      <Form
        form={companyInfoForm}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Row gutter={16}>
          <Col md={18} xs={24}>
            <Form.Item
              label="Company name"
              name="name"
              rules={[
                { message: 'Please input your company name', required: true },
              ]}
            >
              <Input placeholder="Acme Inc." />
            </Form.Item>
          </Col>
          <Col md={6} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ message: 'Please select a country', required: true }]}
            >
              <Select
                className="with-icon"
                filterOption={(input, option) => {
                  return (getTextFromOptionChildren(option?.children) ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }}
                optionFilterProp="children"
                placeholder="Select"
                showSearch
              >
                {countries.map((country) => (
                  <Select.Option key={country.countryCode}>
                    <Space align="center">
                      <Image
                        alt={country.name}
                        height={17}
                        layout="fixed"
                        src={country.icon?.url}
                        width={17}
                      />
                      <span className="name">{country.name}</span>
                    </Space>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col md={18} xs={24}>
            <Form.Item
              hasFeedback
              label="Which categories best describe your company?"
              name="tags"
              rules={[
                { message: 'Please choose at least 1 tag', required: true },
              ]}
            >
              <Select
                className="capitalize"
                mode="multiple"
                placeholder="Please select"
                popupClassName="capitalize"
              >
                {SECTOR_OPTIONS.map((option) => (
                  <Select.Option key={option.key}>{option.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={6} xs={24}>
            <Form.Item
              label="Team size"
              name="employeeCount"
              rules={[
                { message: 'Please share your team size', required: true },
              ]}
            >
              <InputNumber
                max={1000000}
                min={1}
                placeholder="120"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        {isVC && FUND_SIZE_OPTIONS ? (
          <Form.Item
            label="Fund Size in Million USD"
            name="fundSize"
            rules={[{ message: 'Please share your fund size', required: true }]}
          >
            <Select placeholder="Please select">
              {FUND_SIZE_OPTIONS.map((option) => (
                <Select.Option key={option.key}>{option.label} M</Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}

        <Form.Item
          label={
            <Popover
              content="Your logo will be used on your microsite and throughout the app"
              placement="left"
            >
              Logo <InfoCircleOutlined />
            </Popover>
          }
          name="logoUrl"
          rules={[{ message: 'Please add your company logo', required: true }]}
        >
          <ImageUpload customPreset={CLOUDINARY_PRESETS.companyLogos} />
        </Form.Item>
        <Form.Item
          name="policy"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        'Please accept our community admittance guidelines'
                      )
                    ),
            },
          ]}
          valuePropName="checked"
        >
          <Checkbox>
            I hereby confirm that the organization I represent meets the LFCA
            membership criteria.{' '}
            <a href={COMMUNITY_ADMITTANCE_URL} rel="noreferrer" target="_blank">
              Read more
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Popover
            content={
              <span>
                {`It’s a match! We found `}
                <b style={{ color: '#1E1C1C' }}>{otherCompanies}</b>
                {` companies similar to you 🎉`}
              </span>
            }
            getPopupContainer={(container) => container}
            open={!!otherCompanies}
            overlayClassName="popover-md no-max-width"
            placement={isDesktop ? 'right' : 'bottom'}
          >
            <Button htmlType="submit" size="large" type="primary">
              Continue
            </Button>
          </Popover>
        </Form.Item>
      </Form>
    </div>
  )
}

const variantsWoman = {
  hidden: {
    bottom: -200,
    opacity: 0,
  },
  visible: {
    bottom: 100,
    opacity: 1,
    transition: { damping: 10, duration: 2, stiffness: 20, type: 'spring' },
  },
}

const variantsMan = {
  hidden: {
    bottom: -200,
    opacity: 0,
  },
  visible: {
    bottom: 130,
    opacity: 1,
    transition: {
      damping: 10,
      delay: 0.5,
      duration: 2,
      stiffness: 20,
      type: 'spring',
    },
  },
}

export const CompanyInfoSide = () => {
  return (
    <div className={styles['animation-container']}>
      <motion.div
        animate="visible"
        className="bubble-wrapper element-1"
        initial="hidden"
        variants={variantsMan}
      >
        <div className="video-wrapper">
          <video autoPlay loop muted>
            <source src="/video/woman-talking.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      <motion.div
        animate="visible"
        className="bubble-wrapper element-2"
        initial="hidden"
        variants={variantsWoman}
      >
        <div className="video-wrapper">
          <video autoPlay loop muted>
            <source src="/video/man-talking.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>
    </div>
  )
}
