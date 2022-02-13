import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

const Comment = ({ comment, width }) => {
  // Source for Date handling: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date (13.02.2022)
  const createdAt = new Date(comment.createdAt);

  return (
    <Card sx={{ boxShadow: 2, width: width, justifyContent: 'center', my: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{comment.userID.substring(0, 1)}</Avatar>}
        title={comment.userID}
        subheader={createdAt.toLocaleDateString() + ' ' + createdAt.toLocaleTimeString()}
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ py: 1 }}>
        <Typography variant='body' color='text.primary'>
          {comment.commentText ? comment.commentText : 'no text specified'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
