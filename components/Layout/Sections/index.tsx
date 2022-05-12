import classNames from 'classnames'
require('./styles.less')


export const Main = ({ children }: { children: any }) => (
    <div className="main-section">
        {children}
    </div>
)

export const Sider = ({ children }: { children: any }) => (
    <div className="sider-section" >
        {children}
    </div>
)

export const Section = ({
    children,
    className,
    title,
    titleSize,
    bordered = true
}: {
    children: any
    title?: any
    titleSize?: any
    className?: any
    bordered?: boolean
}) => (

    <div className={classNames('page-section', className, titleSize, { 'bordered': bordered })}>
        {title && <h2 className="section-title">{title}</h2>}
        <div className='section-content'>
            {children}
        </div>
    </div>

)