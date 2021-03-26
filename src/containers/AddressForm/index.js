import { useEffect, useReducer, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useForm, Controller } from "react-hook-form"

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import SaveIcon from '@material-ui/icons/Save'

import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
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
}))

// https://react-hook-form.com/get-started#IntegratingwithUIlibraries

function AddressForm() {
  const classes = useStyles()

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
    <>
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
    </>
  )
}

export default AddressForm
