import { Grid } from 'antd'
import _isEmpty from 'lodash.isempty'

import { getBreakpoints } from '../utils'

const { useBreakpoint } = Grid

const INITIAL_BREAKPOINTS = getBreakpoints()

// the ant design useBreakpoint hook is empty on
// initial render which can be problematic for SSR
// we initialize the breakpoint values outside of the
// react life cycle to prevent this

export const useBreakpoints = () => {
  let breakpoints = useBreakpoint()
  if (_isEmpty(breakpoints)) {
    breakpoints = INITIAL_BREAKPOINTS
  }

  return breakpoints
}
