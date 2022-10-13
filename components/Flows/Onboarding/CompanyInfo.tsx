import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from 'antd'
import { motion } from 'framer-motion'

import { DefaultStepProps } from './..'
import styles from './styles.module.less'

const SECTOR_OPTIONS = [
  {
    key: 'tech',
    label: 'Software',
  },
  {
    key: 'media',
    label: 'Media',
  },
  {
    key: 'food',
    label: 'Food',
  },
  {
    key: 'mobility',
    label: 'Mobility',
  },
]

const TEAM_SIZE_OPTIONS = [
  {
    key: '1',
    label: '1-10',
  },
  {
    key: '10',
    label: '10-50',
  },
  {
    key: '50',
    label: '50-100',
  },
  {
    key: '100',
    label: '100-500',
  },
  {
    key: '500',
    label: '>500',
  },
]

export const CompanyInfo = ({ onNext }: DefaultStepProps) => {
  return (
    <div>
      <Tag className="super-text">Company Info</Tag>
      <h1>{`Welcome! 👋`}</h1>
      <div className="description">
        {`To get started, we need some basic information about the organization that you represent.`}
      </div>

      <Form layout="vertical">
        <Form.Item label="Company Name">
          <Input placeholder="Acme Inc." />
        </Form.Item>

        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item label="Choose sectors">
              <Select mode="multiple" placeholder="Please select">
                {SECTOR_OPTIONS.map((option) => (
                  <Select.Option key={option.key}>{option.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Team size">
              <Select placeholder="Please select">
                {TEAM_SIZE_OPTIONS.map((option) => (
                  <Select.Option key={option.key}>{option.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Checkbox>
            I hereby confirm that the organization I represent is not involved
            in fossil fuel extraction, xyz
          </Checkbox>
        </Form.Item>
      </Form>

      <Space>
        <Button onClick={onNext} size="large" type="primary">
          Continue
        </Button>
      </Space>
    </div>
  )
}

const variantsWoman = {
  hidden: {
    bottom: -200,
    opacity: 0,
  },
  visible: {
    bottom: 160,
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
    bottom: 200,
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
