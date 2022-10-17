import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Popover, Rate, Tag } from 'antd'
import classNames from 'classnames'

import { ServiceProviderFragment } from '../../../services/lfca-backend'
import { formatCurrency } from '../../../utils'

interface ReviewMetaDataProps {
  disabled?: boolean
  provider: ServiceProviderFragment
  onOpenReviews?: (provider: ServiceProviderFragment) => void
}

export const ReviewMetaData = ({
  disabled,
  onOpenReviews,
  provider,
}: ReviewMetaDataProps) => {
  const priceRange =
    provider.lowestPrice === provider.highestPrice
      ? formatCurrency(provider.lowestPrice)
      : `${formatCurrency(provider.lowestPrice)} - ${formatCurrency(
          provider.highestPrice
        )}`

  return (
    <div className="review-meta-data">
      <Popover
        content="Take this with a grain of salt because we only have a small number of reviews so far."
        open={
          provider.reviewsCount && provider.reviewsCount < 3 ? undefined : false
        }
        overlayClassName="popover-sm"
        placement="top"
      >
        <span>
          <Rate
            allowHalf
            className={classNames({
              disabled: disabled,
              light: provider.reviewsCount < 3,
            })}
            disabled
            value={provider.averageRating ?? undefined}
          />
        </span>
      </Popover>
      <Button
        disabled={disabled}
        onClick={
          onOpenReviews && !disabled ? () => onOpenReviews(provider) : undefined
        }
        size="small"
        type="link"
      >
        {provider.reviewsCount
          ? `See ${provider.reviewsCount > 1 ? 'all ' : ''}${
              provider.reviewsCount
            } review${provider.reviewsCount > 1 ? 's' : ''}`
          : 'No reviews yet, add one'}
      </Button>
      <div className="ranges">
        {(typeof provider.highestPrice === 'number' ||
          typeof provider.lowestPrice === 'number') &&
        provider.reviewsCount > 2 ? (
          <Popover
            content="The price range (yearly) is based on experiences shared by
               other members. The value is not necessarily indicative of the
               actual price."
            overlayClassName="popover-sm"
            placement="bottom"
          >
            <Tag icon={<InfoCircleOutlined />}>{priceRange}</Tag>
          </Popover>
        ) : null}
      </div>
    </div>
  )
}
