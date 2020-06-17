import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeStory, unlikeStory } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedStory = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.storyId === this.props.storyId
      )
    )
      return true;
    else return false;
  };
  likeStory = () => {
    this.props.likeStory(this.props.storyId);
  };
  unlikeStory = () => {
    this.props.unlikeStory(this.props.storyId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedStory() ? (
      <MyButton tip="Undo like" onClick={this.unlikeStory}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeStory}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  storyId: PropTypes.string.isRequired,
  likeStory: PropTypes.func.isRequired,
  unlikeStory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeStory,
  unlikeStory
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
