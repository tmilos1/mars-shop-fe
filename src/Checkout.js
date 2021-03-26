import { useEffect, useReducer, useState } from 'react'
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

import Cart from './components/Cart'

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
    padding: '30px'
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
    marginTop: '15px'
  },
  buttonRow: {
    width: '100%',
    marginLeft: '-2px',
    marginTop: '20px'
  },
  totalsLabel: {
    width: '10em'
  },
  totalsValue: {
    width: '5em',
    textAlign: 'right'
  }
}))

// https://react-hook-form.com/get-started#IntegratingwithUIlibraries

function Checkout() {
  const classes = useStyles()
  let [totals, setTotals] = useState({subTotal: 0, tax: 0, total: 0})

  const sessionId = useSession()

  const { handleSubmit, control, errors: fieldsErrors, reset } = useForm()

  const handleSetTotals = (totals) => {
    setTotals({subTotal: totals.subTotal, tax: totals.tax, total: totals.total})
  }

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

        <Paper className={classes.body} >
          <Typography variant="h4">Narudžbenica</Typography>
          <Grid container spacing={2} >
            <Grid sm={12} md={12} item >
              <Cart sessionId={sessionId} onSetTotals={handleSetTotals} />
            </Grid>
            <Grid sm={12} md={12} item >
              <Typography variant="h5">Ukupno</Typography>
              <br />
              <Typography variant="body1">
                <table>
                  <tr>
                    <td className={classes.totalsLabel}>Iznos:</td>
                    <td className={classes.totalsValue}>{totals.subTotal}</td>
                  </tr>
                  <tr>
                    <td>PDV:</td>
                    <td className={classes.totalsValue}>{totals.tax}</td>
                  </tr>
                  <tr>
                    <td><Box fontWeight={500}>Za uplatu:</Box></td>
                    <td className={classes.totalsValue}><Box fontWeight={500}>{totals.total}</Box></td>
                  </tr>
                </table>
                <p> Ukoliko je iznos narudžbenice manji od 3.000 dinara, troškove dostave snosi kupac.</p>
              </Typography>


            </Grid>
            <Grid sm={12} md={12} item >

              <Typography variant="h5">Adresa</Typography>
              <form className={classes.root} onSubmit={handleSubmit(onSubmitForm)} noValidate autoComplete="off">
                <div className={classes.formRow}>
                  <Controller
                    name="firstName"
                    as={
                      <TextField
                        label="Ime"
                        variant="outlined"
                        className={classes.input}
                        error={!!fieldsErrors.firstName}
                        helperText={fieldsErrors.firstName ? fieldsErrors.firstName.message : null}
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
                    name="lastName"
                    as={
                      <TextField
                        label="Prezime"
                        variant="outlined"
                        className={classes.input}
                        error={!!fieldsErrors.lastName}
                        helperText={fieldsErrors.lastName ? fieldsErrors.lastName.message : null}
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
                    name="phone"
                    as={
                      <TextField
                        label="Telefon"
                        variant="outlined"
                        className={classes.input}
                        error={!!fieldsErrors.phone}
                        helperText={fieldsErrors.phone ? fieldsErrors.phone.message : null}
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
                    name="address"
                    as={
                      <TextField
                        label="Adresa"
                        variant="outlined"
                        className={classes.inputBig}
                        error={!!fieldsErrors.address}
                        helperText={fieldsErrors.address ? fieldsErrors.address.message : null}
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
                    name="city"
                    as={
                      <TextField
                        label="Grad/Mesto"
                        variant="outlined"
                        className={classes.input}
                        error={!!fieldsErrors.city}
                        helperText={fieldsErrors.city ? fieldsErrors.city.message : null}
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
                    name="postalCode"
                    as={
                      <TextField
                        label="Poštanski broj"
                        type="number"
                        variant="outlined"
                        error={!!fieldsErrors.postalCode}
                        helperText={fieldsErrors.postalCode ? fieldsErrors.postalCode.message : null}
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
                    name="note"
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
                <div className={classes.buttonRow}>
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
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}

export default Checkout;
