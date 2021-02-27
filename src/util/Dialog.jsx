import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//material-ui
import {Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle} from '@material-ui/core'
//helpers
import { renderActionButton } from './Buttons'
import { ActionButton } from './Buttons'
/**
*
*  @params buttons - array of {label:String, onClick:Func, link:String}
*          onClick and link are optional, but if neither exist then button
*          does nothing
**/
export const DialogWrapper = ({open, title, mesg, buttons}) =>{
  return(
  <Dialog open={open} disableBackdropClick={true}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{mesg}</DialogContentText>
    </DialogContent>
    <DialogActions style={{display:'flex', justifyContent:'center'}}>
      {buttons.map((button,i) => 
        <ActionButton action={button} key={i} /> )}
    </DialogActions>
  </Dialog>
  )}

DialogWrapper.propTypes = {
  open: PropTypes.bool,
  title:PropTypes.string,
  mesg:PropTypes.string,
  buttons:PropTypes.array
}
DialogWrapper.defaultProps = {
  open:false,
  title:'',
  mesg:'',
  buttons:[]
}

//todo - use hook to add transition to come in slowly after 1-2 secs
export const LoadingAlert = ({item, plural}) =>
  <div style={{height:50, margin:30, backgroundColor:'white'}}>
    {item}{plural ? ' are':' is'} loading...
  </div>