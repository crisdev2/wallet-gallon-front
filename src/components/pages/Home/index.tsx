import { Alert, Card, CardContent, Grid } from '@mui/material'
import LiquidChart from './LiquidChart';
import LiquidForm from './LiquidForm';
import { useLiquidContext } from '../../../context/liquidContext';
import styled from '@emotion/styled';

const StyledAlert = styled(Alert)`
  margin-bottom: 20px;
`

const Home = () => {
  const { msg, handleHiddeMsg } = useLiquidContext()
  return (
    <Card>
      <CardContent>
        {msg.show &&
          <StyledAlert severity={msg.type} onClose={handleHiddeMsg}>{msg.msg}</StyledAlert>
        }
        <Grid container>
          <Grid item md={6}>
            <LiquidChart />
          </Grid>
          <Grid item md={6}>
            <LiquidForm />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Home