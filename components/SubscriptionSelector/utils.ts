export interface PlanPricingProps {
  price: number
  maxEmployees?: number
  maxFundsize?: number
}

export const calculatePricePoint = (
  pricing?: PlanPricingProps[],
  maxCount?: number,
  isVentureCapital = false
) => {
  if (!pricing) return undefined

  const maxAttribute = isVentureCapital ? 'maxFundsize' : 'maxEmployees'

  return pricing.find(
    (price) => (price[maxAttribute] || Infinity) >= (maxCount || 0)
  )
}

export const getUpgradeEmailBody = ({
  companyName,
  plan,
  size,
  userName,
}: {
  companyName: string
  plan: string
  size: string
  userName: string
}) => `Hello lfca.earth Team! 
We would love to upgrade our membership to ${plan}. Our team size as of today is ${size}. Could you please provide us with a payment link?

Thanks,
${userName}
${companyName}`
