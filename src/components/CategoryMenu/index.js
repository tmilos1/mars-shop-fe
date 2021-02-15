import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'

import { useQuery } from 'react-query'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 400,
    },
    treeItemLabel: {
        fontSize: "12px",
        fontFamily: "Helvetica",
    }
}))

export default function CategoryMenu(props) {
    const classes = useStyles()

    const fetchCategories = () => fetch(
        process.env.REACT_APP_API_ROOT
        + "/categories"
    ).then((res) => res.json())

    const { data: categories, isSuccess }
        = useQuery("categoriesData", () =>
            fetchCategories())


    const wrapCategories = (catCode) => {
        const topCategory = categories.filter(cat => cat.id === catCode).pop()

        return {
            id: topCategory.id,
            name: topCategory.name,
            children: topCategory.children
        }
    }

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} classes={{label: classes.treeItemLabel}} >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    )

    return (
        <Paper elevation={3}>
            <Box padding={1} paddingTop={3} paddingBottom={3}>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['IGR', 'DOM']}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeSelect={props.onCategoryChange}
                >   {isSuccess && (
                            <>
                                {renderTree(wrapCategories('IGR'))}
                                {renderTree(wrapCategories('DOM'))}
                            </>
                        )
                    }
                </TreeView>
            </Box>
        </Paper>
    )
}
