import React from 'react'

// eslint-disable-next-line import/no-webpack-loader-syntax

const Image = props => <img alt="Image" {...props} src={props.src} height={props.height} />

export default Image
