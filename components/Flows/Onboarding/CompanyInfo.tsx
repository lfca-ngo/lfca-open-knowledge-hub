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

import { useBreakpoints } from '../../../hooks/useBreakpoints'
import companyTagStatsData from '../../../next-fetch-during-build/data/_company-tag-stats.json'
import companyTagsData from '../../../next-fetch-during-build/data/_company-tags-data.json'
import { Country } from '../../../services/contentful'
import { CLOUDINARY_PRESETS } from '../../FileUpload/helper'
import { ImageUpload } from '../../FileUpload/ImageUpload'
import { StepPropsWithSharedState } from './..'
import styles from './styles.module.less'

const { useForm } = Form

const COMMUNITY_ADMITTANCE_URL = 'https://lfca.earth/community-admittance'

const SECTOR_OPTIONS = companyTagsData.map((t) => ({
  key: t,
  label: t,
}))

export interface CompanyInfoFormProps {
  country: string
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
}: StepPropsWithSharedState & {
  countries: Country[]
  country?: string | string[]
}) => {
  const isDesktop = useBreakpoints().md
  const [companyInfoForm] = useForm()
  const [otherCompanies, setOtherCompanies] = useState<string | null>(null)

  const onValuesChange = (
    _: keyof CompanyInfoFormProps,
    allValues: CompanyInfoFormProps
  ) => {
    if (allValues?.tags?.length > 0 && !otherCompanies) {
      setOtherCompanies((Math.random() * (120 - 12) + 12).toFixed(0))
    } else if (allValues?.tags?.length === 0) {
      setOtherCompanies(null)
    }
  }

  const onFinish = (allValues: CompanyInfoFormProps) => {
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

  console.log(companyTagStatsData)

  return (
    <div>
      <Tag className="super-text">{title}</Tag>
      <h1>{`Welcome! 👋`}</h1>
      <div className="description">
        {`To get started, we need some basic information about the organization that you represent.`}
      </div>

      <Form
        form={companyInfoForm}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Row gutter={16}>
          <Col md={17} xs={24}>
            <Form.Item
              label="Company Name"
              name="name"
              rules={[
                { message: 'Please input your company name', required: true },
              ]}
            >
              <Input placeholder="Acme Inc." />
            </Form.Item>
          </Col>
          <Col md={7} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ message: 'Please select a country', required: true }]}
            >
              <Select className="with-icon" placeholder="Please select">
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
          <Col md={17} xs={24}>
            <Form.Item
              hasFeedback
              label="Which tags best describe your business?"
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
          <Col md={7} xs={24}>
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
          rules={[{ message: 'Please add a picture', required: false }]}
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
            I hereby confirm that the organization I represent is not
            affiliated, directly or indirectly, with the fossil fuel industry.{' '}
            <a href={COMMUNITY_ADMITTANCE_URL} rel="noreferrer" target="_blank">
              Read more
            </a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Popover
            content={
              <span>
                {`It’s a match! You’ll meet `}
                <b style={{ color: '#1E1C1C' }}>{otherCompanies}</b>
                {` similar companies 🎉`}
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
