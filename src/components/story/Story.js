import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteStory from './DeleteStory';
import StoryDialog from './StoryDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    marginBottom: 20
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Story extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      story: {
        body,
        createdAt,
        userImage,
        userHandle,
        storyId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteStory storyId={storyId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            <Typography
              variant="h6"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
          }
          subheader={
            <Typography color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
          }
          avatar={
            <img src={userImage} className={classes.avatar} alt="avatar" />
          }
        />
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          {deleteButton}
          <Typography variant="body1">{body}</Typography>
          <LikeButton storyId={storyId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <StoryDialog
            storyId={storyId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Story.propTypes = {
  user: PropTypes.object.isRequired,
  story: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Story));
