import React from 'react';

class Header extends React.Component {

    render() {
        const title = this.props.title || 'Pollz 4 Teamz';

        return (
            <div>
                <h1 className="server-title">{title}</h1>
                <p className="server-subtitle">Real-time team voting dashboard</p>
            </div>
        );

    }
}

export default Header;
