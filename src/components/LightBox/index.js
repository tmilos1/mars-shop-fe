import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
    modalStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    topBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: 80,
        width: '100%',
        background: theme.palette.primary.light
    },
    imageStyle: {  
        width: 800,
        height: 600,
        background: 'white',
    }
}))

export default function LightBox(props) {
    const classes = useStyles()

    return (
        
        <Modal
            className={classes.modalStyle}
            open={props.open}
            onClose={props.onClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            closeAfterTransition
        >
            <Fade in={props.open}>
            <div>
                <Box className={classes.topBar}>Proizvod...</Box>

                <img src="/img/vece/15000.jpg" className={classes.imageStyle} />
            </div>
            </Fade>
        </Modal>
    )
}
