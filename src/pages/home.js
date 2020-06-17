import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Story from '../components/story/Story';
import Profile from '../components/profile/Profile';
import StorySkeleton from '../util/StorySkeleton';

import { connect } from 'react-redux';
import { getStorys } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getStorys();
  }
  render() {
    const { storys, loading } = this.props.data;
    let recentStorysMarkup = !loading ? (
      storys.map((story) => <Story key={story.storyId} story={story} />)
    ) : (
      <StorySkeleton />
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentStorysMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getStorys: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getStorys }
)(home);
