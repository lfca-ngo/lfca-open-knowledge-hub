export interface PlanPricingProps {
  price: number
  maxEmployees?: number
}

export const calculatePricePoint = (
  pricing?: PlanPricingProps[],
  maxCount?: number
) => {
  if (!pricing) return undefined

  return pricing.find(
    (price) => (price.maxEmployees || Infinity) >= (maxCount || 0)
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
