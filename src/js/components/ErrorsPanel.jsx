/**
 * Make a floating panel for Tangram errors. Not all errors have line numbers.
 * This just creates a panel to display all of them.
 */
import React from 'react';
import PropTypes from 'prop-types';
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
    const displayStyle = { display: 'none' };

    if (this.state.show) {
      displayStyle.display = 'block';
    }

    return (
      <Draggable
        bounds="#draggable-container"
        handle=".floating-panel-drag"
      >
        <div className="errors-panel modal" style={displayStyle}>
          <div className="floating-panel-topbar">
            <div className="floating-panel-drag">Scene errors</div>
            <button className="floating-panel-close" onClick={this.onClickClose}>×</button>
          </div>
          <div className="errors-panel-viewport">
            <div className="errors-panel-content">
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

                let moreLink;
                if (error.link) {
                  moreLink = (
                    <a href={error.link} target="_blank" rel="noopener noreferrer">
                      Learn more.
                    </a>
                  );
                }

                return (
                  <div key={index} className="errors-panel-item">
                    <div className={iconTypeClass} />
                    <div className="errors-panel-text">
                      {displayText}
                      {' '}{moreLink}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}

ErrorsPanel.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
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
