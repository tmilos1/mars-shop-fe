import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'

const useStyles = makeStyles((theme) => ({
    meniKategorija: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },    
    leviMeni: {
        // border: "1px solid yellow",
        // height: "1000px",
        padding: "10px",
        fontFamily: "Helvetica",
    }    
}))

export default function CategoryMenu(props) {
    const classes = useStyles()

    return (
        <Box className={classes.leviMeni}>

            <TreeView
                className={classes.meniKategorija}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                >
                <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="10" label="OSS" />
                    <TreeItem nodeId="6" label="Material-UI">
                    <TreeItem nodeId="7" label="src">
                        <TreeItem nodeId="8" label="index.js" />
                        <TreeItem nodeId="9" label="tree-view.js" />
                    </TreeItem>
                    </TreeItem>
                </TreeItem>
            </TreeView>                                
        </Box>        
    )
}
