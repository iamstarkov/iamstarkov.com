var React = require('react');

module.exports = React.createClass({
    displayName: 'Index',

    render: function() {
        return (
            <div className='frontpage'>
                <div className='post post--front'>
                    <div className='post__content' dangerouslySetInnerHTML={{__html: require('./index.md').content}} />
                </div>
            </div>
        );
    }
});
