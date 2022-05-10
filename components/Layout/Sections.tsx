import classNames from 'classnames'


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
}: {
    children: any
    title?: any
    className?: any
}) => (

    <div className={classNames('page-section', className)}>
        {title && <h2 className="title">{title}</h2>}
        {children}
    </div>

)