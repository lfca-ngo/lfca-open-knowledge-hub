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
  Tag,
} from 'antd'
import { motion } from 'framer-motion'
import { useState } from 'react'

import companyTagsData from '../../../next-fetch-during-build/data/_company-tags-data.json'
import { CLOUDINARY_PRESETS } from '../../FileUpload/helper'
import { ImageUpload } from '../../FileUpload/ImageUpload'
import { DefaultStepProps } from './..'
import styles from './styles.module.less'

const SECTOR_OPTIONS = companyTagsData.map((t) => ({
  key: t,
  label: t,
}))

export const CompanyInfo = ({ onNext }: DefaultStepProps) => {
  const [otherCompanies, setOtherCompanies] = useState<string | null>(null)

  const onValuesChange = (_: any, allValues: any) => {
    if (allValues?.companyTags?.length > 0 && !otherCompanies) {
      setOtherCompanies((Math.random() * (120 - 12) + 12).toFixed(0))
    } else if (allValues?.companyTags?.length === 0) {
      setOtherCompanies(null)
    }
  }

  const onFinish = () => {
    onNext?.()
  }

  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Welcome! 👋`}</h1>
      <div className="description">
        {`To get started, we need some basic information about the organization that you represent.`}
      </div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="Company Name"
          name="name"
          rules={[
            { message: 'Please input your company name', required: true },
          ]}
        >
          <Input placeholder="Acme Inc." />
        </Form.Item>

        <Row gutter={16}>
          <Col md={12} xs={24}>
            <Form.Item
              hasFeedback
              label="Choose sectors"
              name="companyTags"
              rules={[
                { message: 'Please choose a sector tag', required: true },
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
          <Col md={12} xs={24}>
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
          label="Logo"
          name="logoUrl"
          rules={[{ message: 'Please add a picture', required: true }]}
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
                  : Promise.reject(new Error('Should accept policy')),
            },
          ]}
          valuePropName="checked"
        >
          <Checkbox>
            I hereby confirm that the organization I represent is not involved
            in fossil fuel extraction, xyz
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
            open={!!otherCompanies}
            placement="right"
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