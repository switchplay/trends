import React, {Component, useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//material-ui
import Paper from '@material-ui/core/Paper'
import { List, ListItem, ListItemAvatar, ListItemSecondaryAction, 
  ListItemText } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
//icons
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import AddBoxIcon from '@material-ui/icons/AddBox';
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import AssessmentIcon from '@material-ui/icons/Assessment'

//children
import { DialogWrapper } from './Dialog'

export const renderIcon = (icon, options) =>{
  const opts = options ? options : {}
  switch(icon){
    case 'data':
      return(<AssessmentIcon/>)
    case 'arrow-for':
      return(<ArrowForwardIcon/>)
    case 'add':
      return(<AddCircleIcon/>)
    case 'add-group':
      return(<GroupAddIcon/>)
     case 'add-box':
      return(<AddBoxIcon fontSize={opts.fontSize}/>)
    case 'delete':
      return(<DeleteIcon/>)
    case 'edit':
      return(<Edit/>)
  }
}
//action either has a link, an onClick function, or a dialog
//if it has a dialog, that dialog itself may contain further actionbuttons

/**
*  action has label, icon(opt) dialog(opt) style(opt) id
*   if an action has dialog, the dialog has title, mesg, buttons (not cancel)
*   warning - if action has dialog, then links wont work
*             solution - use onClick:() =>{history.push(...)}
**/
export const ActionButton = ({action}) =>{
  const { dialog, style } = action

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleClick = () =>{
    if(dialog){
      console.log('setting dialog open... dialogActions:', dialog)
      setDialogOpen(true)
    }else{
      console.log('no dialog required...')
      action.onClick(action)
    }
  }
  let dialogButtons = []
  if(dialog && dialog.buttons){
    //add setDialogOpen(false) to all buttons
    const onButtonClick = button =>{
      setDialogOpen(false)
      if(button.onClick)
        button.onClick()
    }
    dialogButtons = dialog.buttons
      .map(but => { 
        return {...but, onClick:() => onButtonClick(but)} 
      })
  }

  return(
    <div style={style ? style : {}}>
      <div>
      {action.link ?
        <LinkActionButton action={action} dialogOpen={dialogOpen} 
          handleClick={handleClick} />
        :
        <FunctionActionButton action={action} dialogOpen={dialogOpen}
          handleClick={handleClick} />
      }
      </div>
      {dialog && <DialogWrapper 
          open={dialogOpen} 
          title={dialog.title ? dialog.title : ''}
          mesg={dialog.mesg ? dialog.mesg : ''}
          buttons={dialogButtons} />}
    </div>
    )
  }

const LinkActionButton = ({action, handleClick}) =>
  <Link to={action.link} style={{textDecoration:'none'}} >
    {action.icon ?
      <IconButton color="primary">
        {renderIcon(action.icon, action.options)}</IconButton>
      :
      <Button color="primary" variant="contained" >
        {action.label}</Button>}
  </Link>

const FunctionActionButton = ({action, handleClick}) =>
  <React.Fragment >
  {action.icon ?
    <IconButton color="primary" onClick={handleClick}> 
      {renderIcon(action.icon, action.options)}
    </IconButton>
    :
    <Button color="primary" variant="contained" onClick={handleClick}>
      {action.label}</Button>
  }
  </React.Fragment>


//LEGACY ONLY - HAVE MOVED TO USING COMPONENTS INSTEAD (AS ABOVE)
export const renderActionButton = (buttonAction, i) =>{
  const { icon, label, link, onClick, style, options} = buttonAction
  const extraStyle = style ? style : {}
  if(link)
    return(
      <Link to={link} style={{textDecoration:'none'}} key={'link-button'+link+(i ? i :'')}>
        {icon ?
          <IconButton color="primary" style={extraStyle}>{renderIcon(icon, options)}</IconButton>
          :
          <Button color="primary" variant="contained" style={extraStyle}>
            {label}</Button>}
      </Link>
    )
  else
    return(
      <React.Fragment key={'nonlink-button'+(i ? i :'')}>
      {icon ?
        <IconButton color="primary" style={extraStyle}
          onClick={() => buttonAction.onClick(buttonAction)}>
          {renderIcon(icon, options)}
        </IconButton>
        :
        <Button color="primary" variant="contained" style={extraStyle}
           onClick={() => onClick(buttonAction)}>
          {label}</Button>}
      </React.Fragment>
    )
}