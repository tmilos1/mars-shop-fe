import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'

export default function ProductListSkeleton() {
    return (
        <Grid container spacing={5}>
            <Grid xs={12} sm={6} md={6} lg={4}>
                <Skeleton variant="text" height={30} width={"90%"} />
                <Skeleton variant="text" height={20} width={"90%"} />
                <Skeleton variant="rect" height={"180px"} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4}>
                <Skeleton variant="text" height={30} width={"90%"} />
                <Skeleton variant="text" height={20} width={"90%"} />
                <Skeleton variant="rect" height={"180px"} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={4}>
                <Skeleton variant="text" height={30} width={"90%"} />
                <Skeleton variant="text" height={20} width={"90%"} />
                <Skeleton variant="rect" height={"180px"} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
                <Skeleton variant="text" height={40} width={"90%"} />
            </Grid>
        </Grid>
    )
}
