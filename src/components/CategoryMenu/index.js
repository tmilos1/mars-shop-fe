import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'

import { useQuery } from 'react-query'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
    leviMeni: {
        padding: "10px",
        fontFamily: "Helvetica",
    }
}))

export default function CategoryMenu(props) {
    const classes = useStyles()

    const fetchCategories = () => fetch(
        process.env.REACT_APP_API_ROOT
        + "/categories"
    ).then((res) => res.json())

    const { isLoading, data: categories, error, isSuccess }
        = useQuery("categoriesData", () =>
            fetchCategories())    

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    )

    return (
        <Box className={classes.leviMeni}>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon />}
            >   {isSuccess &&
                    renderTree(categories)
                }
            </TreeView>
        </Box>
    )
}
