import React from 'react'

// eslint-disable-next-line import/no-webpack-loader-syntax
import logo from 'url-loader!./logo.svg'
const height = '61px'

const LogoImage = props => <img alt="Logo" {...props} src={logo} height={height} />

export default LogoImage
