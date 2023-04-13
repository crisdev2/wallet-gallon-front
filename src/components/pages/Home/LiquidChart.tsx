import { Liquid } from '@ant-design/charts'
import styled from '@emotion/styled'
import { useState } from 'react';
import { useLiquidContext } from '../../../context/liquidContext';

const StyledLiquidChart = styled.div`
`

const configLiquid = {
  radius: 0.5,
  color: '#76E4F7',
  outline: {
    border: 4,
    distance: 8,
    style: {
      stroke: '#C4F1F9'
    }
  },
  // wave: {
  //   length: 128
  // },
  liquidStyle: ({ percent }: any) => ({
    fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
    stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14'
  })
};

const LiquidChart = () => {
  const { tanque } = useLiquidContext()
  return (
    <StyledLiquidChart>
      <Liquid percent={tanque.usado / tanque.capacidadTotal} {...configLiquid} />
    </StyledLiquidChart>
  )
}

export default LiquidChart