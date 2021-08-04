/**
 *
 * MainPage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
import reducer from './reducer';
import MaterialTableDemo from './MaterialTableDemo';
// import messages from './messages';

export function MainPage() {
  useInjectReducer({ key: 'mainPage', reducer });

  return (
    <div>
      <Helmet>
        <title>MainPage</title>
        <meta name="description" content="Description of MainPage" />
      </Helmet>
      <MaterialTableDemo />
      {/* <FormattedMessage {...messages.header} /> */}
    </div>
  );
}

MainPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainPage: makeSelectMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MainPage);
