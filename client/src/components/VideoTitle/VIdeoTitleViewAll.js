import React from 'react'
import { Link } from 'react-router-dom'

import './VideoTitle.css'

const VideoTitleViewAll = props => {
  return (
    <div className="headerVideoTitle">
      <h3 style={{marginBottom: 3}}>{props.title}</h3>
      <Link
        to={`/categories/${props.categoryTag}`}
        className="categoryLinkTitleViewAll"
      >
        {props.category} - View all?
      </Link>
    </div>
  )
}

export default VideoTitleViewAll