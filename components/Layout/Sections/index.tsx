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
    titleSize
}: {
    children: any
    title?: any
    titleSize?: any
    className?: any
}) => (

    <div className={classNames('page-section', className, titleSize)}>
        {title && <h2 className="title">{title}</h2>}
        <div className='content'>
            {children}
        </div>
    </div>

)