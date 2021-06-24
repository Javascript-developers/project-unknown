import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from '../../styles/layout/tagsOnPost.style';
import tagsColors from '../../utils/tagsBackgroundColor';

const TagsOnPost = ({ tags }) => {
  const classes = useStyles();
  return (
    <div>
      {/* TODO: Not the best practice / must look to another implementation */}
      {tags.map((tag, i) => {
        let tagColor = tagsColors.find(
          (tagColors) => tagColors.tagName === tag
        );

        if (!tagColor) {
          tagColor = {
            bg: '#bdc3c7',
            text: 'black',
          };
        }

        return (
          <div className={classes.root} key={i}>
            <Link
              to={`/t/${tag}`}
              style={{
                backgroundColor: `${tagColor.bg}`,
                color: `${tagColor.text}`,
              }}
              className={classes.tag}
            >
              #{tag}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TagsOnPost;
