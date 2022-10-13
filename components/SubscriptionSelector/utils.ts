export const calculatePricePoint = (plan: any, employeeCount?: number) =>
  plan.pricing.find(
    (price: any) => (price.maxEmployees || Infinity) >= (employeeCount || 0)
  )

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
