import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

export const EmptyCommunityContent = () => {
  return (
    <div className="empty-state community-content">
      <div className="icon">
        <Image
          alt="bulb"
          height={50}
          layout="fixed"
          src={`/img/icons/bulb.svg`}
          width={50}
        />
      </div>

      <div className="title">Coming soon</div>
      <p>
        We are gradually adding more and more community powered content to the
        platform. You can check the{' '}
        <Link href={`/action/companyPledge`}>Measurement Action</Link> as an
        example. If you have relevant content ideas for this module, please
        share them with us!
      </p>

      <a href={`mailto:info@lfca.earth`}>
        <Button type="primary">Share idea</Button>
      </a>
    </div>
  )
}
