import styled from '@emotion/styled'
import { Button, Grid, TextField } from '@mui/material'
import { useLiquidContext } from '../../../context/liquidContext'
import { useState } from 'react'

const StyledLiquidForm = styled.div`
`

const StyledButton = styled(Button)`
  height: 100%;
  margin-left: 8px;
`

const LiquidForm = () => {
  const { tanque, addLTS, addMLTS, addCM3, handleCapacidad } = useLiquidContext()

  const [lts, setLts] = useState(0);
  const [mlts, setMlts] = useState(0);
  const [cm3, setCm3] = useState(0);

  return (
    <StyledLiquidForm>
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <TextField
            id="capacidadTotal"
            name="capacidadTotal"
            label="Capacidad total (CM3)"
            onChange={(event) => handleCapacidad(Number(event.target.value))}
            value={tanque.capacidadTotal}
            variant="filled"
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="agregarLTS"
            name="agregarLTS"
            label="Agregar LTS"
            onChange={(event) => setLts(Number(event.target.value))}
            value={lts}
          />
          <StyledButton color="primary" variant="contained" onClick={() => addLTS(lts)}>Add</StyledButton>
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="agregarMLTS"
            name="agregarMLTS"
            label="Agregar MLTS"
            onChange={(event) => setMlts(Number(event.target.value))}
            value={mlts}
          />
          <StyledButton color="primary" variant="contained" onClick={() => addMLTS(mlts)}>Add</StyledButton>
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="agregarCM3"
            name="agregarCM3"
            label="Agregar CM3"
            onChange={(event) => setCm3(Number(event.target.value))}
            value={cm3}
          />
          <StyledButton color="primary" variant="contained" onClick={() => addCM3(cm3)}>Add</StyledButton>
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="disponible"
            name="disponible"
            label="Disponible (CM3)"
            value={tanque.disponible}
            variant="filled"
            disabled
          />
        </Grid>
      </Grid>
    </StyledLiquidForm>
  )
}

export default LiquidForm