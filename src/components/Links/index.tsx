import React, {FC} from 'react';
import { Link } from 'react-router';

interface LinkProps {
    items: {
        label: string,
        to: string
    }[]
}

const Links: FC<LinkProps> = ({items}) => {
    return (
        <>
            {items.map((i, index) => (
                <React.Fragment key={index}>
                    <Link to={i.to}>{i.label}</Link>
                    {index < items.length - 1 && ', '}
                </React.Fragment>
            ))}
        </>
    );
};

export default Links;
