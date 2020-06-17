import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Story from '../components/story/Story';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import StorySkeleton from '../util/StorySkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    storyIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const storyId = this.props.match.params.storyId;

    if (storyId) this.setState({ storyIdParam: storyId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { storys, loading } = this.props.data;
    const { storyIdParam } = this.state;

    const storysMarkup = loading ? (
      <StorySkeleton />
    ) : storys === null ? (
      <p>No storys from this user</p>
    ) : !storyIdParam ? (
      storys.map((story) => <Story key={story.storyId} story={story} />)
    ) : (
      storys.map((story) => {
        if (story.storyId !== storyIdParam)
          return <Story key={story.storyId} story={story} />;
        else return <Story key={story.storyId} story={story} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {storysMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
