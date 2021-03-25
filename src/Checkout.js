import { useEffect, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useForm, Controller } from "react-hook-form"

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import SaveIcon from '@material-ui/icons/Save'

import useSession from './util/useSession'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    body: {
        width: '100%',
        padding: '20px'
    },
    input: {
        minWidth: '30%'
    },
    inputBig: {
        minWidth: '62%'
    },
    button: {
        margin: theme.spacing(1),
    },
    formRow: {
        display: 'flex',
        gap: '20px',
        width: '100%',
    }
}))

// https://react-hook-form.com/get-started#IntegratingwithUIlibraries

function Checkout() {
    const classes = useStyles()

    const sessionId = useSession()

    const { handleSubmit, control, errors: fieldsErrors, reset } = useForm()

    const onSubmitForm = async data => {
        console.log(data)
        // const response = await UserService.signIn(data);
        // const responseData = await response.json();
        // if (response.ok) setTokenAndConfigureProfile(responseData.token);
        // else {
        //   if (responseData.non_field_errors) setGeneralLoginError(responseData.non_field_errors[0]);
        //   reset(
        //     {
        //       email: '',
        //       password: ''
        //     },
        //     {
        //       errors: true,
        //       dirtyFields: true
        //     }
        //   );
        // }
      }

    return (
        <Container>
            <Box component="span" m={5}>
                <Grid container spacing={2} >
                    <Grid sm={12} md={12} item >
                        <Paper className={classes.body} >
                            <Typography variant="h4">Narudžbenica</Typography>

                            <form className={classes.root} onSubmit={handleSubmit(onSubmitForm)} noValidate autoComplete="off">
                                <div className={classes.formRow}>
                                    <Controller
                                        name="ime"
                                        as={                                
                                            <TextField
                                                label="Ime"
                                                variant="outlined"
                                                className={classes.input}
                                                error={!!fieldsErrors.ime}
                                                helperText={fieldsErrors.ime ? fieldsErrors.ime.message : null}
                                                required
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Unesite ime.",
                                        }}
                                    />

                                    <Controller
                                        name="prezime"
                                        as={    
                                            <TextField
                                                label="Prezime"
                                                variant="outlined"
                                                className={classes.input}
                                                error={!!fieldsErrors.prezime}
                                                helperText={fieldsErrors.prezime ? fieldsErrors.prezime.message : null}
                                                required
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Unesite prezime.",
                                        }}    
                                    />                                        
                                </div>
                                <div className={classes.formRow}>
                                    <Controller
                                        name="telefon"
                                        as={    
                                            <TextField
                                                label="Telefon"
                                                variant="outlined"
                                                className={classes.input}
                                                error={!!fieldsErrors.telefon}
                                                helperText={fieldsErrors.telefon ? fieldsErrors.telefon.message : null}
                                                required
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Unesite telefon.",
                                        }}    
                                    />                                  
                                    <Controller
                                        name="email"
                                        as={    
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                className={classes.input}
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: true,
                                        }}    
                                    />  
                                </div>
                                <div className={classes.formRow}>
                                    <Controller
                                        name="adresa"
                                        as={    
                                            <TextField
                                                label="Adresa"
                                                variant="outlined"
                                                className={classes.inputBig}
                                                error={!!fieldsErrors.adresa}
                                                helperText={fieldsErrors.adresa ? fieldsErrors.adresa.message : null}
                                                required
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Unesite adresu.",
                                        }}    
                                    />  
                                </div>
                                <div className={classes.formRow}>
                                    <Controller
                                        name="grad"
                                        as={    
                                            <TextField
                                                label="Grad/Mesto"
                                                variant="outlined"
                                                className={classes.input}
                                                error={!!fieldsErrors.grad}
                                                helperText={fieldsErrors.grad ? fieldsErrors.grad.message : null}
                                                required
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Unesite grad.",
                                        }}    
                                    />  
                                    <Controller
                                        name="ptt"
                                        as={    
                                            <TextField
                                                label="Poštanski broj"
                                                type="number"
                                                variant="outlined"
                                                error={!!fieldsErrors.ptt}
                                                helperText={fieldsErrors.ptt ? fieldsErrors.ptt.message : null}
                                                required
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: "Unesite ptt broj.",                                
                                        }}    
                                    />  
                                </div>
                                <div className={classes.formRow}>
                                    <Controller
                                        name="napomena"
                                        as={    
                                            <TextField
                                                label="Napomena"
                                                variant="outlined"
                                                className={classes.inputBig}   
                                                multiline
                                                rows={4}                                                                             
                                            />
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: true,
                                        }}    
                                    />  
                                </div>
                                <div className={classes.formRow}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                        type="submit"
                                    >
                                        Zaključivanje narudžbenice
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Checkout;
