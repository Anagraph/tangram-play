/**
 * Make a floating panel for Tangram errors. Not all errors have line numbers.
 * This just creates a panel to display all of them.
 */
import React from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

class ErrorsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        };

        this.onClickClose = this.onClickClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors.length > 0) {
            this.setState({ show: true });
        } else {
            this.setState({ show: false });
        }
    }

    onClickClose() {
        this.setState({ show: !this.state.show });
    }

    render() {
        const errorStyles = {
            position: 'relative',
            width: '100%',
            height: 'calc(100% - 20px)',
            overflow: 'auto',
            padding: '10px',
        };

        if (this.state.show) {
            return (
                <Draggable
                    bounds="#draggable-container"
                    handle=".floating-panel-drag"
                >
                    <div className="errors-panel">
                        <div className="floating-panel-topbar">
                            <div className="floating-panel-drag">Scene errors</div>
                            <div className="floating-panel-close" onClick={this.onClickClose}>×</div>
                        </div>
                        <div style={errorStyles}>
                            {this.props.errors.map((error, index) => {
                                let iconTypeClass;
                                if (error.type === 'error') {
                                    iconTypeClass = 'btm bt-exclamation-triangle';
                                } else if (error.type === 'warning') {
                                    iconTypeClass = 'btm bt-exclamation-circle';
                                }

                                let displayText = error.message;
                                if (!displayText || displayText.length === 0) {
                                    displayText = `Unspecified ${error.type}.`;
                                }

                                return (
                                    <p key={index}>
                                        <span className={iconTypeClass} />
                                        {displayText}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </Draggable>
            );
        }

        return null;
    }
}

ErrorsPanel.propTypes = {
    errors: React.PropTypes.array,
};

ErrorsPanel.defaultProps = {
    errors: [],
};

function mapStateToProps(state) {
    return {
        errors: state.errors.errors || [],
    };
}

export default connect(mapStateToProps)(ErrorsPanel);
